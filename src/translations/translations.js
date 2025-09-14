export const translations = {
  pt: {
    nav: {
      home: 'Início',
      skills: 'Coisas',
      projects: 'Projetos',
      language: 'Idioma',
      selectLanguage: 'Selecionar idioma',
      portuguese: 'Português',
      english: 'Inglês'
    },
    routes: {
      home: 'inicio',
      skills: 'skills',
      projects: 'projetos'
    },
    home: {
      greeting: 'Olá',
      intro: 'Chamo-me Ricardo Pinheiro e sou um Programador Web Júnior, focado no desenvolvimento de soluções full-stack robustas e escaláveis',
      downloadCV: 'Descarregar CV',
      cvFileName: 'CV_RicardoPinheiro.pdf',
      expertiseTitle: 'Competências e Tecnologias',
      expertiseIntro: 'Estas são algumas tecnologias e ferramentas com que trabalho no dia a dia.',
      expertise: {
        frontend: ['JavaScript', 'React', 'HTML', 'CSS', 'Bootstrap', 'Filament'],
        backend: ['PHP', 'Laravel', 'Node.js', 'Express'],
        mobile: ['Java', 'React Native'],
        desktop: ['Tauri'],
        ferramentas: ['Git', 'Postman', 'Vercel CLI', 'Visual Studio Code','Android Studio'],
        baseDeDados: ['MongoDB', 'SQLite', 'MySQL']
      },
      expertiseLabels: {
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        desktop: 'Desktop',
        ferramentas: 'Ferramentas',
        baseDeDados: 'Bases de dados'
      },
      copyright: '© 2025 Ricardo Pinheiro'
    },
    audioPlayer: {
      welcomeTitle: 'Bem-vindo ao meu Portfólio!',
      welcomeMessage: 'Gostarias de ouvir música de fundo enquanto exploras?',
      welcomeNote: 'Nota: este pop-up irá aparecer novamente se recarregares a página',
      yesButton: 'Sim, tocar música',
      noButton: 'Não, obrigado'
    },
    skills: {
      dirName: '',
      fileNames: {
        frontend: 'frontend',
        backend: 'backend',
        tools: 'ferramentas',
        android: 'android',
        database: 'base-de-dados',
        desktopTools: 'ferramentas-desktop'
      },
      welcomeMessage: 'Bem-vindo à secção de competências. Usa os comandos no terminal para explorar os meus projetos e competências.',
      errorMessages: {
        commandNotFound: 'comando não encontrado',
        helpSuggestion: "Escreve 'help' para listar os comandos disponíveis",
        noSuchFileOrDirectory: 'ficheiro ou diretório inexistente',
        repositoryNotFound: 'repositório não encontrado',
        targetNotAvailable: 'alvo indisponível',
        helpTopicNotFound: 'nenhum tópico de ajuda corresponde a'
      },
      helpList: {
        ls: {
          root: 'Listar diretórios (disponíveis: {dirs})',
          skillsDir: "Listar ficheiros em '{dir}' ({count} ficheiros)",
          projectsRoot: 'Listar projetos ({count} itens)',
          projectAlias: 'Listar itens disponíveis no projeto (info.txt, repo, demo)'
        },
        cat: {
          skillsDir: 'Mostrar conteúdo do ficheiro (disponíveis: {files})',
          projectsRoot: 'Mostrar detalhes do projeto (disponíveis: {projects})',
          projectAlias: 'Mostrar item (info.txt | repo | demo)',
          rootWithSkills: "Mostrar conteúdo do ficheiro (navega para '{skillsDir}' ou '{projectsDir}' primeiro)",
          rootNoSkills: "Mostrar conteúdo do ficheiro (navega para '{projectsDir}' primeiro)"
        },
        cd: {
          template: "Mudar de diretório. Usa '{dirs}', '..' para subir, '~' para ir ao início",
          joinOr: "' ou '"
        }
      },
      labels: {
        title: 'Título',
        stack: 'Tecnologias',
        summary: 'Resumo',
        links: 'Ligações',
        repo: 'Repositório',
        demo: 'Demonstração',
        opening: 'A abrir'
      },
      helpLabels: {
        command: 'Comando',
        usage: 'Uso',
        description: 'Descrição',
        examples: 'Exemplos'
      },
      helpTip: "Dica: escreve 'help <comando>' para ver detalhes",
      help: {
        ls: { usage: 'ls', description: 'Lista itens no local atual' },
        cd: { usage: 'cd', description: 'Altera para um diretório diferente' },
        cat: { usage: 'cat <ficheiro>', description: 'Mostra o conteúdo do ficheiro' },
        open: { usage: 'open', description: 'Abre o repositório do projeto atual' },
        clear: { usage: 'clear', description: 'Limpa o terminal' },
        exit: { usage: 'exit', description: 'Reinicia o terminal para o estado inicial' }
      },
      tips: {
        openDemo: (alias) => `Dica: executa 'open ${alias} demo' para ver a demo`,
        linksHint: `Dica: também podes 'cd links' e depois 'open repo' ou 'open demo'`
      },
      responses: {
        frontend: 'Desde que aprendi programação, o frontend foi uma das áreas de desenvolvimento que mais me fascinou; estou sempre com vontade de aprender novas tecnologias. As minhas experiências em frontend incluem React, HTML, CSS, JavaScript, Bootstrap e Filament.',
        backend: 'O backend tem sido um desafio para acompanhar o frontend, mas dou sempre o meu melhor. Tenho conhecimentos básicos de PHP e Laravel. Ultimamente tenho-me orientado mais para Node.js, linguagem com a qual me sinto mais confortável.',
        tools: 'Sei usar Git para fazer uploads de projetos no GitHub e GitLab e tenho conhecimentos básicos de Postman. Para fazer deploy de projetos online, recentemente tenho usado o Vercel e o Vercel CLI, que ajudam a publicar e atualizar projetos de forma rápida.',
        android: 'Durante a minha jornada, aprendi a desenvolver aplicações Android, principalmente com Java no Android Studio. Também tenho explorado React Native e Kotlin.',
        database: 'Tenho experiência com bases de dados como MongoDB e SQLite.',
        desktopTools: 'Recentemente comecei a aprender Tauri, que é semelhante ao Electron mas usa menos RAM por não depender do Chromium, e suporta desenvolvimento multiplataforma.'
      }
    },
    projects: {
      dirName: 'projetos',
      linksDirName: 'links',
      title: 'Os meus trabalhos',
      subtitle: 'Alguns dos meus trabalhos recentes',
      viewProject: 'Ver Projeto',
      seeOnGithub: 'Ver no GitHub',
      data: [
        {
          id: 'project01',
          title: 'Projeto 01',
          description: 'O melhor lugar para encontrar séries e filmes de ficção científica',
          tech: ['React', 'JavaScript', 'CSS'],
          link: 'https://github.com/RicardoPinheiroDev/TimeofScifi',
        },
        {
          id: 'projectEstagio',
          title: 'Projeto Estágio CTeSP',
          description: 'Plataforma de gestão e domínios com área de cliente',
          tech: ['PHP', 'Laravel', 'MySQL'],
          link: 'https://github.com/RicardoPinheiroDev/8220611_CTESP_Estagio_DWDM_2025',
        }
      ]
    }
  },
  en: {
    nav: {
      home: 'Home',
      skills: 'My Stuff',
      projects: 'My Stuff',
      language: 'Language',
      selectLanguage: 'Select Language',
      portuguese: 'Portuguese',
      english: 'English'
    },
    routes: {
      home: 'home',
      skills: 'skills',
      projects: 'projects'
    },
    home: {
      greeting: 'Hello',
      intro: 'My name is Richard Pinewood, I am a junior web developer who likes to use creativity to develop innovative solutions for full stack applications.',
      downloadCV: 'Download CV',
      cvFileName: 'CV_RichardPinewood.pdf',
      expertiseTitle: 'Expertise & Technologies',
      expertiseIntro: 'Here are some of the technologies and tools I work with.',
      expertise: {
        frontend: ['JavaScript', 'React', 'HTML', 'CSS', 'Bootstrap', 'Filament'],
        backend: ['PHP', 'Laravel', 'Node.js', 'Express'],
        mobile: ['Java', 'Kotlin', 'Android (Java)', 'React Native'],
        desktop: ['Tauri'],
        tools: ['Git', 'GitHub', 'GitLab', 'Postman', 'Vercel CLI'],
        databases: ['MongoDB', 'SQLite', 'MySQL']
      },
      expertiseLabels: {
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        desktop: 'Desktop',
        tools: 'Tools',
        databases: 'Databases'
      },
      copyright: '© 2025 Richard Pinewood'
    },
    audioPlayer: {
      welcomeTitle: 'Welcome to my Portfolio!',
      welcomeMessage: 'Would you like to enjoy some background music while exploring?',
      welcomeNote: 'Note: This pop-up will appear again if you reload the page',
      yesButton: 'Yes, play music',
      noButton: 'No, thanks'
    },
    skills: {
      dirName: '',
      fileNames: {
        frontend: 'frontend',
        backend: 'backend',
        tools: 'tools',
        android: 'android',
        database: 'database',
        desktopTools: 'desktop-tools'
      },
      welcomeMessage: 'Welcome to the skills section. Use the terminal commands to explore my projects and skills.',
      errorMessages: {
        commandNotFound: 'command not found',
        helpSuggestion: "Type 'help' to list available commands",
        noSuchFileOrDirectory: 'no such file or directory',
        repositoryNotFound: 'repository not found',
        targetNotAvailable: 'target not available',
        helpTopicNotFound: 'no help topics match'
      },
      helpList: {
        ls: {
          root: 'List directories (available: {dirs})',
          skillsDir: "List files in '{dir}' ({count} files)",
          projectsRoot: 'List projects ({count} items)',
          projectAlias: 'List available items in project (info.txt, repo, demo)'
        },
        cat: {
          skillsDir: 'Print file contents (available: {files})',
          projectsRoot: 'Show project details (available: {projects})',
          projectAlias: 'Print item (info.txt | repo | demo)',
          rootWithSkills: "Print file contents (navigate into '{skillsDir}' or '{projectsDir}' first)",
          rootNoSkills: "Print file contents (navigate into '{projectsDir}' first)"
        },
        cd: {
          template: "Change directory. Use '{dirs}', '..' to go up, '~' to go home",
          joinOr: "' or '"
        }
      },
      labels: {
        title: 'Title',
        stack: 'Stack',
        summary: 'Summary',
        links: 'Links',
        repo: 'Repo',
        demo: 'Demo',
        opening: 'Opening'
      },
      helpLabels: {
        command: 'Command',
        usage: 'Usage',
        description: 'Description',
        examples: 'Examples'
      },
      helpTip: "Tip: type 'help <command>' for details",
      help: {
        ls: { usage: 'ls', description: 'Lists items in the current location' },
        cd: { usage: 'cd', description: 'Changes to a different directory' },
        cat: { usage: 'cat <file>', description: 'Shows file contents' },
        open: { usage: 'open', description: 'Opens the repository of the current project' },
        clear: { usage: 'clear', description: 'Clears the terminal output' },
        exit: { usage: 'exit', description: 'Resets the terminal to its initial state' }
      },
      tips: {
        openDemo: (alias) => `Tip: Run 'open ${alias} demo' to view the live demo`,
        linksHint: `Tip: You can also 'cd links' then 'open repo' or 'open demo'`
      },
      responses: {
        frontend: 'The wonders of frontend are such that nothing can keep us apart. I have experience using React, HTML, CSS, JavaScript, Bootstrap and Filament.',
        backend: 'The backend has been a challenging task to synchronize with the frontend, but I always give my best to learn new technologies! I know the basics of PHP, Laravel (a framework based on PHP), and I also have knowledge of Node.js which I am more comfortable working with.',
        tools: 'I know how to use Git, which gives me the advantage of uploading projects to GitHub and GitLab. I also have some basic knowledge of Postman. For deploying projects online, I have started to use Vercel with the Vercel CLI which is a command line tool to deploy and update projects quickly.',
        android: 'As for mobile development, I have knowledge of programming in Java using Android Studio. Recently, I have also been learning the basics of React Native for cross-platform development which I am very curious to explore more.',
        database: 'I have experience working with databases such as MongoDB and SQLite.',
        desktopTools: "I've recently started learning Tauri, which is a framework similar to Electron but uses less RAM since it doesn't rely on Chromium, and it also supports cross-platform development."
      }
    },
    projects: {
      dirName: 'projects',
      linksDirName: 'links',
      title: 'My work',
      subtitle: 'Some of my recent work',
      viewProject: 'View Project',
      seeOnGithub: 'See on GitHub',
      data: [
        {
          id: 'project01',
          title: 'Project 01',
          description: 'The best place to find scifi tv shows and movies',
          tech: ['Html', 'Css', 'Nodejs'],
          link: 'https://github.com/RicardoPinheiroDev/TimeofScifi',
        },
        {
          id: 'projectEstagio',
          title: 'Internship Project',
          description: 'Management and domains platform with client area',
          tech: ['PHP', 'Laravel', 'MySQL'],
          link: 'https://github.com/RicardoPinheiroDev/8220611_CTESP_Estagio_DWDM_2025',
        }
      ]
    }
  }
};
