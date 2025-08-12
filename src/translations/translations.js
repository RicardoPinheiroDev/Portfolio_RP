export const translations = {
  pt: {
    nav: {
      home: 'Início',
      skills: 'Competências',
      projects: 'Projetos',
      language: 'Idioma',
      selectLanguage: 'Selecionar Idioma',
      portuguese: 'Português',
      english: 'Inglês'
    },
    routes: {
      home: 'inicio',
      skills: 'competencias',
      projects: 'projetos'
    },
    home: {
      greeting: 'Olá',
      intro: 'Chamo-me Ricardo Pinheiro, sou um programador web junior que gosta de usar a criatividade para desenvolver soluções inovadoras em aplicações full stack.',
      downloadCV: 'Descarregar CV',
      cvFileName: 'CV_RicardoPinheiro.pdf',
      copyright: '© 2025 Ricardo Pinheiro'
    },
    audioPlayer: {
      welcomeTitle: 'Bem-vindo ao meu Portfólio!',
      welcomeMessage: 'Gostarias de ouvir uma música de fundo enquanto exploras ?',
      welcomeNote: 'Nota :Este pop_up irá aparecer novamente se recaregares a página',
      yesButton: 'Sim, tocar música',
      noButton: 'Não, obrigado'
    },
    skills: {
      dirName: 'competencias',
      fileNames: {
        frontend: 'frontend',
        backend: 'backend',
        tools: 'ferramentas',
        android: 'android',
        database: 'base-de-dados',
        desktopTools: 'ferramentas-desktop'
      },
      welcomeMessage: 'Bem-vindo à secção de competências. Use os comandos no terminal para explorar os meus projetos e competências.',
      errorMessages: {
        commandNotFound: 'comando não encontrado',
        helpSuggestion: "Digite 'help' para listar os comandos disponíveis",
        noSuchFileOrDirectory: 'ficheiro ou diretório inexistente',
        repositoryNotFound: 'repositório não encontrado',
        targetNotAvailable: 'alvo indisponível',
        helpTopicNotFound: 'nenhum tópico de ajuda corresponde a'
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
      helpTip: "Dica: escreva 'help <comando>' para ver detalhes",
      help: {
        ls: { usage: 'ls', description: 'Lista itens no local atual' },
        cd: { usage: 'cd', description: 'Altera para um diretório diferente' },
        cat: { usage: 'cat <ficheiro>', description: 'Mostra o conteúdo do ficheiro' },
        open: { usage: 'open', description: 'Abre o repositório do projeto atual' },
        clear: { usage: 'clear', description: 'Limpa o terminal' },
        exit: { usage: 'exit', description: 'Reinicia o terminal para o estado inicial' }
      },
      tips: {
        openDemo: (alias) => `Dica: Execute 'open ${alias} ' para ver a demo`,
        linksHint: `Dica: Também pode 'cd links' e depois 'open repo' ou 'open demo'`
      },
      responses: {
        frontend: 'Desde que aprendi programação o frontend  foi uma das lados de desenvolvimento que mais me fascinnou,tenho sempre gosto em aprender novas tecnologias. As miinhas experiências no que toca a frontend são React, HTML, CSS, Javascript, Bootstrap e Fillament   ',
        backend: 'O backend tem sido uma tarefa desafiante para sincronizar com o frontend, mas quero dar sempre o meu melhor! Eu tenho conhecimentos basicos em Php e Laravel ( Framework baseada em Php). Ultimamente tenho me orientado mais em NodeJS pois é uma linguagem onde me sinto mais confortavel em trabalhar ',
        tools: 'Eu sei usar o Git para fazer uploads de projetos no Github ou Gitlab, tenho conhecimentos basicos sobre o Postman. Para fazer deploy de projetos online recentemente tenho usado o vercel com o vercel cli que  é um programa no temrinal que ajuda de uma maneira mais rapida  fazer deployements e atualizações de projetos em desenvolvimento sem precisar de ir ao site.',
        android: 'Durante a minha jornada, aprendi a desenvolver aplicações Android. Principalmente Java no Android Studio e também tenho vindo a explorar React Native e Kotlin',
        database: 'Tenho experiência em trabalhar com Mongodb e SQlite',
        desktopTools: 'Recentemente comecei a aprender Tauri, tem os mesmos fundamentos que o electron mas não utiliza chromium o que deixa a aplicação mais leve,também suporta desenvolvimento cross-plataform'
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
          description: 'O melhor lugar para encontrar filmes e séries sci-fi',
          tech: ['React', 'JavaScript', 'CSS'],
          link: 'https://github.com/RicardoPinheiroDev/TimeofScifi',
        },
        {
          id: 'projectEstagio',
          title: 'Projeto Estagio Ctesp',
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
      skills: 'Skills',
      projects: 'Projects',
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
      copyright: '© 2025 Richard Pinewood'
    },
    audioPlayer: {
      welcomeTitle: 'Welcome to my Portfolio!',
      welcomeMessage: 'Would you like to enjoy some background music while exploring?',
      welcomeNote: 'Note : This pop_up will appear again if you reload the page',
      yesButton: 'Yes, play music',
      noButton: 'No, thanks'
    },
    skills: {
      dirName: 'skills',
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
        frontend: 'The wonders of frontend are such that nothing can keep us apart. I have experience using  React, HTML, CSS, Javascript, Bootstrap and Fillament   ',
        backend: 'The backend has been a challenging task to synchronize with the frontend, but I always give my best to learn new technologies! I know the basics of PHP, Laravel (a framework based on PHP), and  I also have knowledge of Node.js which I am more comfortable working with',         
        tools: 'I know how to use Git, which gives me the advantage of uploading projects to GitHub and GitLab. I also have some basic knowledge of Postman. For deploying projects online, I have started to use Vercel with the Vercel CLI which is a command line tool to deploy and update projects quickly.',
        android: 'As for mobile development, I have knowledge of programming in Java using Android Studio. Recently, I have also been learning the basics of React Native for cross-platform development which I am very curious to explore more.',
        database: 'I have experience working with databases such as MongoDB and SQLite.',
        desktopTools: 'I’ve recently started learning Tauri, which is a framework similar to Electron but uses less RAM since it doesn’t rely on Chromium, and it also supports cross-platform development.'
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
