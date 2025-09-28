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
      intro: 'Chamo-me Ricardo Pinheiro e sou um Programador Web Júnior focado no desenvolvimento de soluções full-stack criativas e escaláveis.',
      downloadCV: 'Descarregar CV',
      cvFileName: 'CV_RicardoPinheiro01.pdf',
      expertiseTitle: 'Competências e Tecnologias',
      expertiseIntro: 'Estas são algumas das tecnologias e ferramentas que utilizo no dia a dia.',
      expertise: {
        frontend: ['JavaScript', 'React', 'HTML', 'CSS', 'Bootstrap', 'Filament'],
        backend: ['PHP', 'Laravel', 'Node.js'],
        mobile: ['Java', 'React Native'],
        desktop: ['Tauri', 'Linux'],
        ferramentas: ['Git', 'Postman', 'Vercel CLI', 'Visual Studio Code', 'Android Studio'],
        baseDeDados: ['MongoDB', 'SQLite']
      },
      expertiseLabels: {
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        desktop: 'Desktop',
        ferramentas: 'Ferramentas',
        baseDeDados: 'Bases de Dados'
      },
      copyright: '© 2025 Ricardo Pinheiro'
    },
    audioPlayer: {
      welcomeTitle: 'Bem-vindo ao meu Portfólio!',
      welcomeMessage: 'Gostarias de ouvir música de fundo enquanto exploras?',
      welcomeNote: 'Nota: este pop-up irá surgir novamente se recarregares a página',
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
        helpSuggestion: "Escreve 'help' para mostrar os comandos disponíveis",
        noSuchFileOrDirectory: 'ficheiro ou diretório inexistente',
        repositoryNotFound: 'repositório não encontrado',
        targetNotAvailable: 'alvo indisponível',
        helpTopicNotFound: 'nenhum tópico de ajuda corresponde a'
      },
      helpList: {
        ls: {
          root: 'Mostra os diretórios disponíveis'
        },
        cat: {
          skillsDir: 'Mosta o conteudo do ficheiro .txt',
          rootNoSkills: 'Mostra o conteudo do ficheit .txt'
        },
        cd: {
          template: "Muda de diretório. Usa '{dirs}', '..' para voltar ao diretório anterior, ou '~' para regressar ao diretório principal",
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
        ls: { usage: 'ls', description: 'Lista os itens no local atual' },
        cd: { usage: 'cd', description: 'Altera para um diretório diferente' },
        cat: { usage: 'cat <ficheiro>', description: 'Mosta o conteudo do ficheiro .txt' },
        open: { usage: 'open', description: 'Abre o repositório do projeto atual' },
        clear: { usage: 'clear', description: 'Limpa o terminal' },
        exit: { usage: 'exit', description: 'Reinicia o terminal para o estado inicial' }
      },
      tips: {
        openDemo: (alias) => `Dica: executa 'open ${alias} demo' para ver a demonstração`,
        linksHint: `Dica: também podes 'cd links' e depois 'open repo' ou 'open demo'`
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
          id: 'TimeofSciFI',
          title: 'Time of Scifi',
          description: 'O melhor lugar para descobrir séries e filmes de ficção científica',
          tech: ['HTML', 'JavaScript', 'CSS'],
          link: 'https://github.com/RicardoPinheiroDev/TimeofScifi'
        },
        {
          id: 'projectEstagio',
          title: 'Projeto de Estágio CTeSP',
          description: 'Plataforma de gestão para os serviços de alojamento de websites dos clientes da DigiUP',
          tech: ['PHP', 'Laravel', 'SQLite', 'Filament'],
          link: 'https://github.com/RicardoPinheiroDev/8220611_CTESP_Estagio_DWDM_2025'
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
      intro: 'My name is Richard Pinewood, I am a junior web developer who likes to use creativity to develop scalable and robust solutions for full stack applications.',
      downloadCV: 'Download CV',
      cvFileName: 'CV_RichardPinewood02.pdf',
      expertiseTitle: 'Expertise & Technologies',
      expertiseIntro: 'Here are some of the technologies and tools I work with.',
      expertise: {
        frontend: ['JavaScript', 'React', 'HTML', 'CSS', 'Bootstrap', 'Filament'],
        backend: ['PHP', 'Laravel', 'Node.js'],
        mobile: ['Java', 'Kotlin', 'React Native'],
        desktop: ['Tauri', 'Linux'],
        tools: ['Git', 'Postman', 'Vercel CLI', 'Android Studio', 'Visual Studio Code'],
        databases: ['MongoDB', 'SQLite']
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
          root: 'Show available directories'
        },
        cat: {
          skillsDir: 'Show the contents of the .txt file',
          rootNoSkills: 'Show the contents of the .txt file'
        },
        cd: {
          template: "Change directory. Use '{dirs}', '..' to go to the previous directory, or '~' to return to the home directory",
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
        cat: { usage: 'cat <file>', description: 'Shows the contents of the .txt file' },
        open: { usage: 'open', description: 'Opens the repository of the current project' },
        clear: { usage: 'clear', description: 'Clears the terminal output' },
        exit: { usage: 'exit', description: 'Resets the terminal to its initial state' }
      },
      tips: {
        openDemo: (alias) => `Tip: Run 'open ${alias} demo' to view the live demo`,
        linksHint: `Tip: You can also 'cd links' then 'open repo' or 'open demo'`
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
          id: 'TimeofSciFI',
          title: 'Project 01',
          description: 'The best place to find scifi tv shows and movies',
          tech: ['Html', 'Css', 'Nodejs'],
          link: 'https://github.com/RicardoPinheiroDev/TimeofScifi'
        },
        {
          id: 'projectEstagio',
          title: 'Internship Project',
          description: 'Management and domains platform with client area',
          tech: ['PHP', 'Laravel', 'SQLite'],
          link: 'https://github.com/RicardoPinheiroDev/8220611_CTESP_Estagio_DWDM_2025'
        }
      ]
    }
  }
};
