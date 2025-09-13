import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const workerUrl = 'https://unpkg.com/@ffmpeg/core@0.11.6/dist/ffmpeg-core.js';

let ffmpegInstance = null;

export const getFFmpeg = async () => {
  if (!ffmpegInstance) {
    const ffmpeg = createFFmpeg({
      log: true,
      corePath: workerUrl,
    });
    
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    
    ffmpegInstance = ffmpeg;
  }
  
  return ffmpegInstance;
};

export const getVideoDuration = async (ffmpeg, file) => {
  const inputName = 'input_video.mp4';
  
  try {
    // Write the file to FFmpeg's virtual filesystem
    ffmpeg.FS('writeFile', inputName, await fetchFile(file));
    
    // Run FFprobe to get metadata
    await ffmpeg.run('-i', inputName, '-f', 'ffmetadata', 'metadata.txt');
    
    // Read and parse the metadata
    const metadata = ffmpeg.FS('readFile', 'metadata.txt').toString();
    const durationMatch = metadata.match(/Duration: (\d+):(\d+):([\d.]+)/);
    
    if (!durationMatch) {
      throw new Error('Could not determine video duration');
    }
    
    const hours = parseFloat(durationMatch[1]);
    const minutes = parseFloat(durationMatch[2]);
    const seconds = parseFloat(durationMatch[3]);
    
    // Clean up
    ffmpeg.FS('unlink', inputName);
    ffmpeg.FS('unlink', 'metadata.txt');
    
    return hours * 3600 + minutes * 60 + seconds;
  } catch (error) {
    // Clean up on error
    try {
      ffmpeg.FS('unlink', inputName);
      ffmpeg.FS('unlink', 'metadata.txt');
    } catch (e) {
      console.error('Cleanup error:', e);
    }
    
    throw error;
  }
};

export const createSeamlessLoop = async (ffmpeg, file, fadeDuration = 1) => {
  const inputName = 'input_video.mp4';
  const outputName = 'output_loop.mp4';
  
  try {
    // Get video duration
    const duration = await getVideoDuration(ffmpeg, file);
    const offset = Math.max(0.1, duration - fadeDuration); // Ensure offset is at least 0.1s
    
    if (offset <= 0) {
      throw new Error('Video is too short for the specified fade duration');
    }
    
    // Write the input file
    ffmpeg.FS('writeFile', inputName, await fetchFile(file));
    
    // Create seamless loop with crossfade
    await ffmpeg.run(
      '-i', inputName,
      '-filter_complex', 
      `[0]trim=0:${offset},setpts=PTS-STARTPTS[v0];
       [0]trim=${offset}:${duration},setpts=PTS-STARTPTS[v1];
       [v0][v1]xfade=transition=fade:duration=${fadeDuration}:offset=${offset},format=yuv420p`,
      '-movflags', '+faststart',
      '-c:v', 'libx264',
      '-profile:v', 'high',
      '-crf', '18',
      '-preset', 'fast',
      outputName
    );
    
    // Read the result
    const data = ffmpeg.FS('readFile', outputName);
    const blob = new Blob([data.buffer], { type: 'video/mp4' });
    
    return {
      blob,
      url: URL.createObjectURL(blob),
      duration,
      fadeDuration,
    };
    
  } finally {
    // Clean up
    try {
      ffmpeg.FS('unlink', inputName);
      ffmpeg.FS('unlink', outputName);
    } catch (e) {
      console.error('Cleanup error:', e);
    }
  }
};
