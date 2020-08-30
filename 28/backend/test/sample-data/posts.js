const posts = [
    {
      name: 'Hyperspektiv 2.0',
      slug: 'hyperspektiv-2-0',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Psychedelic glitch fx',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c08d114f-dd6f-4e5e-9083-c2a4a2df01f8?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Retrochat',
      slug: 'retrochat',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Slack bot for running retrospectives with action items',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/87f425f5-e30b-4c75-9c2f-9ccd986c5bc4?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'facebook-messenger' }, { slug: 'github' }] }
    },
    {
      name: 'Zoho Office Suite',
      slug: 'zoho-office-suite',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: "Zoho's new office suite of apps.",
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/dfa2002a-19d9-49db-89c7-fb8998c9906a?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Animated Icons Pack',
      slug: 'animated-icons-pack',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A pack of 100 animated vector icons.',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/544d7d66-d974-4809-a162-cd7cdf62af69?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'maker-tools' },
          { slug: 'outdoors' },
          { slug: 'delivery' },
          { slug: 'arkit' }
        ]
      }
    },
    {
      name: 'Insta360 evo',
      slug: 'insta360-evo',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: '360 Camera with eyes just like yours',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/0ea461ab-57cb-462b-b671-fa06bca33ca2?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Upvoty',
      slug: 'upvoty-2',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'User feedback in 1 simple overview 🔥',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/407e12d4-5d8a-40f4-b03b-cf5dd5a28e11?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'virtual-assistants' },
          { slug: 'medium' },
          { slug: 'growth-hacks' },
          { slug: 'work-in-progress' }
        ]
      }
    },
    {
      name: 'Slack Foundry',
      slug: 'slack-foundry-3',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A bot to help you with the basics of using Slack',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/dec978c8-9bb9-499d-9fe6-13472c552275?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'quantified-self' }] }
    },
    {
      name: 'WTF should I do in?',
      slug: 'wtf-should-i-do-in',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Find recommendations suggested by locals 🗺',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/68bfd1c2-4d77-4bd3-acc4-77597dd5cb34?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'reddit' },
          { slug: 'delivery' },
          { slug: 'star-wars' },
          { slug: 'airbnb' }
        ]
      }
    },
    {
      name: 'Fast Playback for Facebook Videos',
      slug: 'fast-playback-for-facebook-videos',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Control Facebook videos playback speed on Android',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e43d3d63-3a4b-493b-bdc4-51060b394b56?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'apple' }] }
    },
    {
      name: 'Crossfont',
      slug: 'crossfont',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Easy-to-use font editor for Mac',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/45e711e1-9cd6-4d43-a8ff-e4818402620b?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Nomad Text',
      slug: 'nomad-text',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Get SMS anywhere while traveling.',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/ce4548f3-7992-4d2a-b816-cd0172f43572?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'wallpaper' },
          { slug: 'github' },
          { slug: 'green-tech' }
        ]
      }
    },
    {
      name: 'Culrs 2.0',
      slug: 'culrs-2-0',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Thoughtfully crafted and easy-to-use color palettes',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/2980900f-ddbe-406b-a188-ed1f7fcc1d52?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'medtech' },
          { slug: 'snapchat' },
          { slug: 'linkedin' },
          { slug: 'facebook-messenger' }
        ]
      }
    },
    {
      name: 'Supernova V6',
      slug: 'supernova-v6',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Turn sketch into iOS, android, react and flutter in minutes',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a84860e8-dfa1-448b-9f85-9881ae3d70f6?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'growth-hacks' }] }
    },
    {
      name: 'UnDeck',
      slug: 'undeck',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Beautiful, free resources for your next deck. ',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/d9c016e5-c84e-4eb0-8549-43049a790814?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'biohacking' }, { slug: 'startup-lessons' }] }
    },
    {
      name: 'RadioGarden',
      slug: 'radiogarden',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'An interactive map of live radio stations across the globe.',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8d644dad-6ac5-4418-ad71-9c64c12750b2?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'quantified-self' },
          { slug: 'delivery' },
          { slug: 'developer-tools' }
        ]
      }
    },
    {
      name: 'Daily.co Video Call API',
      slug: 'daily-co-video-call-api',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Add 1-click video calls to any product, easily',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/ef4461bc-cc0f-4ffb-9165-1511cc9e082f?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'work-in-progress' },
          { slug: 'pokemon' },
          { slug: 'youtube' },
          { slug: 'github' }
        ]
      }
    },
    {
      name: 'The Juggernaut',
      slug: 'the-juggernaut',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A premium publication for untold South Asian stories',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/0e798752-c221-4360-999f-8e064e3d1fca?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'sketch' }, { slug: 'google' }, { slug: 'bots' }]
      }
    },
    {
      name: 'Travelchime',
      slug: 'travelchime',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Google Docs for planning your trips with friends.',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c1bb11a7-f489-46d4-850b-c19213d1de86?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'on-demand' }] }
    },
    {
      name: 'The Infatuation iOS 5.0',
      slug: 'the-infatuation-ios-5-0',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Restaurant reviews & guides',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f36c1305-94bf-471c-9913-3cb3e31070b7?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'reddit' },
          { slug: 'growth-hacks' },
          { slug: 'google-home' },
          { slug: 'books' }
        ]
      }
    },
    {
      name: 'Black 3.0',
      slug: 'black-3-0',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'The blackest black acrylic art paint',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/b86e98f8-740a-4b26-be5a-f7f59b3e994f?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'RADICLE',
      slug: 'radicle',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Collect art and interact with the art community',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/29266cc4-38a9-4108-93c0-a6e12f07d8bc?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Tinkersynth',
      slug: 'tinkersynth',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Create and purchase unique generative art',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f6bfa186-0ad8-439f-ae73-c3216f8dbf73?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'startup-lessons' }, { slug: 'kanye-west' }] }
    },
    {
      name: 'Blook',
      slug: 'blook-2',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: '= Medium + Books + Paypal',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/efe840a5-ee67-494d-9283-66813088bed6?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'wallpaper' }, { slug: 'apple' }, { slug: 'arkit' }]
      }
    },
    {
      name: 'Toky Instant Call',
      slug: 'toky-instant-call',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Start voice calls directly within Intercom Messenger',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8c3fc90b-f19d-4265-ace5-8fe9410760c8?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Paydrt',
      slug: 'paydrt',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Business management suite for bloggers',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e6407ded-9922-48c4-8079-568c793f096d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'youtube' },
          { slug: 'sketch' },
          { slug: 'alexa-skills' }
        ]
      }
    },
    {
      name: 'Genius Pack Supercharged',
      slug: 'genius-pack-supercharged',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A smarter carry on luggage with a 100% polycarbonate shell.',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/1f3800ad-4e0b-4314-8ece-56edc8784f98?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'touch-bar-apps' },
          { slug: 'tech' },
          { slug: 'google-home' }
        ]
      }
    },
    {
      name: 'SPF',
      slug: 'spf',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Mac app that lets you display a dark overlay over the screen',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/6bf0e52f-46d3-4b19-aaca-217cd0063cbe?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'mac-menu-bar-apps' }] }
    },
    {
      name: 'KraftNow',
      slug: 'kraftnow',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Next generation email template editor',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/36a16e96-1437-42b6-85b5-a2792ed4ca81?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'kanye-west' },
          { slug: 'donald-trump' },
          { slug: 'biohacking' },
          { slug: 'github' }
        ]
      }
    },
    {
      name: 'Lessons in Herstory',
      slug: 'lessons-in-herstory',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A new AR app that puts women back in the history books',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/0fcf8414-52f5-4fa6-bb2e-db4755d5426c?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'star-wars' }, { slug: 'books' }] }
    },
    {
      name: 'YoRemote',
      slug: 'yoremote',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Remote jobs for developers',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f9842cb8-8ea9-49ff-9ce6-88a0fb3b4d00?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Where is Carmen Sandiego?',
      slug: 'where-is-carmen-sandiego',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'You can try to catch Carmen Sandiego in Google Earth',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/fd7e2d6a-29af-4c86-a7b2-7169f14cbe1f?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'side-projects' },
          { slug: 'arkit' },
          { slug: 'virtual-assistants' },
          { slug: 'google' }
        ]
      }
    },
    {
      name: 'Upmetrics 2.0',
      slug: 'upmetrics-2-0',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Create professional business plans quickly',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f5270961-210f-4305-9d83-739a3c3c5f50?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'cannabis' },
          { slug: 'artificial-intelligence' },
          { slug: 'outdoors' },
          { slug: 'linkedin' }
        ]
      }
    },
    {
      name: 'Google Lookout',
      slug: 'google-lookout',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'An app that identifies objects for the visually impaired',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/3468dfd5-ade2-4376-ba3f-dec505ff8a3d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'alexa-skills' },
          { slug: 'outdoors' },
          { slug: 'e-commerce' }
        ]
      }
    },
    {
      name: 'andcards Kiosk',
      slug: 'andcards-kiosk',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'An app to help manage meeting room bookings',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/062eb397-a904-447c-bd1f-cbbe1cd1e9c8?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'youtube' },
          { slug: 'developer-tools' },
          { slug: 'maps' }
        ]
      }
    },
    {
      name: 'Compass by Jobtome',
      slug: 'compass-by-jobtome',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Analyze and identify your predominant type of intelligence.',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/eabdf2ec-be3c-4a8e-8b31-0cce5ea363bf?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Microsoft X Cloud',
      slug: 'microsoft-x-cloud',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: "Microsoft's new game streaming service",
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/da3d7478-9e78-4f6e-a997-b878c8e7a1e7?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'on-demand' }, { slug: 'biohacking' }] }
    },
    {
      name: 'The Startup Calculator',
      slug: 'the-startup-calculator',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Explore when your startup will hit profitability',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/27c4a5e0-fe66-4e9f-bdc9-e4b6054d7140?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'reddit' }, { slug: 'money' }] }
    },
    {
      name: 'Charts',
      slug: 'charts-3',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'The most comprehensive collection of charts for Sketch',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/4fa3efc0-d547-4626-962a-72c23f5f4a4a?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'biohacking' }, { slug: 'side-projects' }] }
    },
    {
      name: 'Rolando: Royal Edition',
      slug: 'rolando-royal-edition',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A completely remastered version of the classic game',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/4b918cba-25e4-4ef0-9ff9-6015e8635025?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'facebook-messenger' },
          { slug: 'bots' },
          { slug: 'work-in-progress' }
        ]
      }
    },
    {
      name: 'colorize.cc',
      slug: 'colorize-cc',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Colorize black and white photos with power of ML',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/2ce28a7e-40e8-4848-bdd3-1d12c1a9c0f9?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'wallpaper' }, { slug: 'work-in-progress' }] }
    },
    {
      name: 'MFY.im',
      slug: 'mfy-im',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Facebook Messenger sequences and growth widgets for creators',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/5efe33b5-5a63-46c6-8f0c-8f1036b7f259?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Askdata',
      slug: 'askdata',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Ask questions in natural language and find answers in data ⚡',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/fb14cd95-0daf-4c71-b365-a75c117aaf82?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'IKEA ThisAbles',
      slug: 'ikea-thisables',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: '3D printable add-ons to make furniture accessible by IKEA',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/2f7e79ba-5985-4d7e-b498-061be6123e8a?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'maps' }, { slug: 'github' }] }
    },
    {
      name: 'HiBy W5',
      slug: 'hiby-w5',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'The most powerful bluetooth HiFi amp for audiophiles',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/edfa7026-5470-43fb-928a-11c7a664a13e?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'kanye-west' },
          { slug: 'youtube' },
          { slug: 'cannabis' },
          { slug: 'medtech' }
        ]
      }
    },
    {
      name: 'Keeple',
      slug: 'keeple',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Share your stuff with friends for free or $$',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c71838fc-849f-4966-906c-5292a2d94189?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'tech' }, { slug: 'medtech' }] }
    },
    {
      name: 'The Angel Philosopher',
      slug: 'the-angel-philosopher',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: "A compilation of Naval's wisdom, knowledge and thoughts.",
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a43fe4cf-d09a-471d-b50c-eda281a3efaa?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Cord-Cutter Express',
      slug: 'cord-cutter-express',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Find the perfect cable replacement',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8b6bdc0f-86a2-4da6-9610-f9b29ba66893?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'pokemon' },
          { slug: 'touch-bar-apps' },
          { slug: 'medium' },
          { slug: 'side-projects' }
        ]
      }
    },
    {
      name: 'Firework',
      slug: 'firework-2',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A new way to watch short-form videos on mobile',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/502eeb42-c7da-47ff-8afd-5204ac7c28e6?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'google-home' },
          { slug: 'google' },
          { slug: 'side-projects' },
          { slug: 'sketch' }
        ]
      }
    },
    {
      name: 'Sloth Facts',
      slug: 'sloth-facts',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Learn everything there is to know about sloths',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/92a4539f-3e62-4cf1-b4c9-47d4f49cfd6e?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'facebook-messenger' }] }
    },
    {
      name: 'Credo360 2.0',
      slug: 'credo360-2-0',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Figure out who to trust by looking at a social credit score',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/0c103d3f-1a48-4242-94d4-d377ebd65773?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'cannabis' }] }
    },
    {
      name: 'Tune by Google',
      slug: 'tune-by-google',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'AI-powered Chrome extension that hides toxic comments',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/aad201d6-917f-4024-995c-ea4192b81086?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'blockstack' }, { slug: 'arkit' }] }
    },
    {
      name: 'Coterie',
      slug: 'coterie',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Party supplies delivered right to your door',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/afb2431d-225a-4939-9edc-53b167e94129?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Faradise',
      slug: 'faradise',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Enterprise solution for furniture and E-com brands',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/84f586d3-8226-494a-b71c-94e155d29162?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'side-projects' }, { slug: 'apple' }] }
    },
    {
      name: 'Warby Parker Virtual Try-On',
      slug: 'warby-parker-virtual-try-on',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'You can now try on our eyeglasses using your iPhone X',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/58e6810d-07a8-4531-8839-47ce112ed247?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Keystroke Pro',
      slug: 'keystroke-pro',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Keypress visualizer for macOS',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/9dfabb0c-2d9a-4bb9-91d9-7aab32c0aed3?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'games' }, { slug: 'github' }] }
    },
    {
      name: 'Kwikcal',
      slug: 'kwikcal',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Allow clients to schedule meetings directly in your calendar',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/90590566-496f-46ac-a9b8-59b406e8a94b?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'developer-tools' }, { slug: 'youtube' }] }
    },
    {
      name: 'Updatefy',
      slug: 'updatefy',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Convert a Google Sheet into a embed update page.',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/21f60c5a-8a92-4fda-9765-e6d4876d864d?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'delivery' }, { slug: 'augmented-reality' }] }
    },
    {
      name: 'Cursor Pro',
      slug: 'cursor-pro',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Mouse highlighter & magnifier for macOS',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/69822334-8d9c-407b-bec4-77fc7ec04db2?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'quantified-self' }, { slug: 'work-in-progress' }]
      }
    },
    {
      name: 'Pint',
      slug: 'pint',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Smaller more affordable electric mobility by OneWheel',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/34bf1150-58ff-4698-b7d5-473133dcf003?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'google' },
          { slug: 'delivery' },
          { slug: 'facebook-messenger' }
        ]
      }
    },
    {
      name: 'Houseparty Chrome Extension',
      slug: 'houseparty-chrome-extension',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: "See who's on Houseparty while you browse",
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/9d320ad6-18b7-4bbf-90b1-9b45eefe29e1?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'apple' }, { slug: 'on-demand' }, { slug: 'books' }]
      }
    },
    {
      name: 'Sathorn',
      slug: 'sathorn',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'An advanced music player for iPhone',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/00120019-de3a-49ec-be27-364953ff9edd?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'augmented-reality' },
          { slug: 'bots' },
          { slug: 'tech' },
          { slug: 'virtual-assistants' }
        ]
      }
    },
    {
      name: 'Character Count',
      slug: 'character-count',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A weekly podcast from Twitter about businesses 🎙️🐣',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/1d49deb0-a106-4506-97b7-9dfc6837efd1?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'growth-hacks' },
          { slug: 'airbnb' },
          { slug: 'biohacking' }
        ]
      }
    },
    {
      name: 'Withings Sleep',
      slug: 'withings-sleep',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A sleep tracking mat by Withings',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/bee857ec-2d3b-4378-9d64-eb81634c6cd5?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Unomaly',
      slug: 'unomaly',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: "Anomaly detection to learn your environment's current state ",
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/17d99e1d-8f49-45f4-b1f3-7af7face318c?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'games' }] }
    },
    {
      name: 'Fake faces',
      slug: 'fake-faces',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A tool to browse similar fake faces',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/1d142b05-c465-4768-a4a6-5610d19fe7b7?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'tech' },
          { slug: 'touch-bar-apps' },
          { slug: 'games' },
          { slug: 'alexa-skills' }
        ]
      }
    },
    {
      name: 'Instagram 2019 Content Spotlight',
      slug: 'instagram-2019-content-spotlight',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Stats, lessons, & tactics from world’s best marketers',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/ef930692-23b8-4190-b707-c2857843dcb2?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'reddit' }] }
    },
    {
      name: 'Time is Ltd',
      slug: 'time-is-ltd',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'One click productivity analytics inside of Slack',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a9894822-6c6d-4acd-aeb4-183c0a0855a4?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'product-hunt' },
          { slug: 'medium' },
          { slug: 'snapchat' },
          { slug: 'augmented-reality' }
        ]
      }
    },
    {
      name: 'Perfect Dude',
      slug: 'perfect-dude',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Helping you to be the perfect partner',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/27b1bd27-629e-4a3c-9d5c-3994163361fe?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'augmented-reality' }, { slug: 'donald-trump' }]
      }
    },
    {
      name: 'Microverse 2.0',
      slug: 'microverse-2-0',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'The global school for remote software developers.',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c75b1d50-ff62-422a-a8f1-52663f081e0f?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'github' },
          { slug: 'quantified-self' },
          { slug: 'artificial-intelligence' },
          { slug: 'medium' }
        ]
      }
    },
    {
      name: 'The Growth Machine by Yaguara',
      slug: 'the-growth-machine-by-yaguara',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Combine your company data and goals in three simple steps',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/b84d73b5-a57b-482b-bf75-9760f5c37dc0?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'virtual-assistants' },
          { slug: 'startup-lessons' },
          { slug: 'e-commerce' },
          { slug: 'wallpaper' }
        ]
      }
    },
    {
      name: 'Pensato',
      slug: 'pensato',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'An app to explore over 1400 musical scales and modes',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/fbb7ed58-4f6d-4ec1-b27f-a9f6d426f1d4?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Dubler Studio Kit',
      slug: 'dubler-studio-kit',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A real-time vocal recognition MIDI controller',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/3ccdd881-090e-41f1-bc68-a60ee26d38d6?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Workplace List',
      slug: 'workplace-list',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Crowdsourced list of places to work around the world 🗺️',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/36c278c8-26ee-4769-b1e3-e74b16f1299d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'augmented-reality' },
          { slug: 'work-in-progress' },
          { slug: 'e-commerce' },
          { slug: 'snapchat' }
        ]
      }
    },
    {
      name: 'Symbol Design System 2',
      slug: 'symbol-design-system-2',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Design with components based on Sketch nested symbols',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/3fb338f5-8f0a-4024-887c-773a54541af3?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'quantified-self' },
          { slug: 'growth-hacks' },
          { slug: 'green-tech' },
          { slug: 'snapchat' }
        ]
      }
    },
    {
      name: 'Zokyo',
      slug: 'zokyo',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'GitHub Chrome Extension to track and manage issues',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e377f42a-c94e-4a48-8709-1ecf227c8a1c?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'sketch' }] }
    },
    {
      name: 'PracticeBank',
      slug: 'practicebank',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Learn-by-doing personal finance for kids 💰',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c55bec38-008a-4df4-8354-31f8d3c815d5?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Product Resources List',
      slug: 'product-resources-list',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'The biggest list of free product management resources',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/1d56f7c7-9448-4e41-a571-6282ddfc7bbc?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'github' },
          { slug: 'pokemon' },
          { slug: 'developer-tools' }
        ]
      }
    },
    {
      name: 'Voiceflow',
      slug: 'voiceflow-2',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Build voice apps in your browser without coding',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c930c5e2-102a-443c-bb28-6d75484a4e99?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'wi-fi' }, { slug: 'star-wars' }, { slug: 'maps' }]
      }
    },
    {
      name: 'Vacuum Data',
      slug: 'vacuum-data',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Instant access to open/public data from a one-stop place.',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/3564663d-7a9e-4565-8721-e7b9840b1350?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'on-demand' }] }
    },
    {
      name: 'Vxcards',
      slug: 'vxcards',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Make greeting and invites cool again using augmented reality',
      day: '2019-03-14',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/ed5a4865-7246-43fd-8a6f-7c8a7eeb36cf?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'money' }] }
    },
    {
      name: 'Puzzle Swap',
      slug: 'puzzle-swap',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A calming game where you switch tiles to reveal an image',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/85cc283d-f8b6-48a1-843f-3f7d6ee06201?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'youtube' },
          { slug: 'netflix' },
          { slug: 'facebook-messenger' }
        ]
      }
    },
    {
      name: 'traduora',
      slug: 'traduora',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Translation management platform for teams',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/dadfac9d-c8bb-45b9-8d2a-0706302ba2a6?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'pokemon' },
          { slug: 'maker-tools' },
          { slug: 'google' }
        ]
      }
    },
    {
      name: 'Web Dev Education Platform',
      slug: 'web-dev-education-platform',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Build, share, learn, and thrive in front-end development',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/69a0e1fd-7185-4eb9-8203-265254fd5a56?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Keeper',
      slug: 'keeper-3',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Automatic tax write offs for freelancers',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/2801ff53-ce6e-4286-895e-e378c04b4d72?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'pokemon' },
          { slug: 'books' },
          { slug: 'quantified-self' }
        ]
      }
    },
    {
      name: 'Print My Tweets',
      slug: 'print-my-tweets',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Get your favorite tweet printed on a coffee mug for only $15',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/bb7bde2f-27e1-4e17-beb9-5e8f4b49e6f7?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'airbnb' },
          { slug: 'maker-tools' },
          { slug: 'on-demand' }
        ]
      }
    },
    {
      name: 'Spicer',
      slug: 'spicer',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Mobile app for couples to improve sex.',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e1f06d80-747e-463e-8542-be20c53de083?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'netflix' }] }
    },
    {
      name: 'The Classic Stone',
      slug: 'the-classic-stone',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'The notebook designed for chefs',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/1b99a777-b78d-4897-a4c4-c747db90e9ff?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'wi-fi' }, { slug: 'apple' }, { slug: 'star-wars' }]
      }
    },
    {
      name: 'RoomFifty',
      slug: 'roomfifty',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A marketplace for curated art',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/60cd150e-e6ac-4184-b0b4-9ec5c8084a0e?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'RadioPublic',
      slug: 'radiopublic-3',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'The podcast app that helps podcasters grow',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/96d03bf2-bab2-40cd-9c03-2f8bc47291b5?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'youtube' }] }
    },
    {
      name: 'Slogro',
      slug: 'slogro',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A job board for companies and people focused on slow growth.',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/36042d06-e272-4051-89f0-81da5ea7284d?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Epichat for Messenger',
      slug: 'epichat-for-messenger',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Raise your social media marketing to the next level',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/fee99ee1-e211-4288-8f61-e442dd78d1c3?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'medtech' },
          { slug: 'startup-lessons' },
          { slug: 'mac-menu-bar-apps' }
        ]
      }
    },
    {
      name: 'GoEat Me - Your food guru',
      slug: 'goeat-me-your-food-guru',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Discover dishes and restaurants while traveling at ease',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8a9b8f74-80c5-4423-8e53-a2344eb1ab16?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Healium',
      slug: 'healium-2',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Lower stress and increase mindfulness with VR',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/3a0db96b-0bbc-41bb-9a1f-8c72714791b5?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'arkit' },
          { slug: 'maps' },
          { slug: 'reddit' },
          { slug: 'sketch' }
        ]
      }
    },
    {
      name: 'Talent Garden',
      slug: 'talent-garden',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Co-working and innovation school bundled into one.',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/7b778bd5-a036-4315-85d3-ab72d7bce826?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'books' }, { slug: 'artificial-intelligence' }]
      }
    },
    {
      name: 'Pomo Timer',
      slug: 'pomo-timer',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A menu bar app to boost productivity',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c92423f4-993b-4349-9e4c-03b0d22e4c4d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'apple' },
          { slug: 'augmented-reality' },
          { slug: 'startup-lessons' }
        ]
      }
    },
    {
      name: 'Soul',
      slug: 'soul',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'An app to enable people to chat via anonymized videos',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/94a8edd7-fc75-42fd-abe5-10488cd1029c?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Twenty Tables',
      slug: 'twenty-tables',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: '$6 lunches from over 100 DC restaurants',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e633fcf2-821d-4368-8ce8-2aa1f3b8dca6?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'sketch' },
          { slug: 'on-demand' },
          { slug: 'maker-tools' }
        ]
      }
    },
    {
      name: 'Supportiv',
      slug: 'supportiv',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'The Support Network // Any Topic-24/7-No Trolls #PeerSupport',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/25992310-322c-403b-babe-263db8b34b20?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'linkedin' }, { slug: 'cannabis' }] }
    },
    {
      name: 'Rotate Videos',
      slug: 'rotate-videos',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Rotate web videos to your desired orientation',
      day: '2019-03-12',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/4c155c9f-c3d2-4cd0-b554-4a84ad96e5ee?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'quantified-self' },
          { slug: 'sketch' },
          { slug: 'google-home' },
          { slug: 'maps' }
        ]
      }
    },
    {
      name: 'TLD.party',
      slug: 'tld-party',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Search through 1000+ TLDs and find yours',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/3d155e2e-1ac2-4afd-b2ed-227e0ddce70c?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'virtual-assistants' },
          { slug: 'product-hunt' },
          { slug: 'maps' },
          { slug: 'blockstack' }
        ]
      }
    },
    {
      name: 'replies.cc',
      slug: 'replies-cc',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Get the replies to an email in a spreadsheet',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/51b3131b-81fa-4e03-8ce6-8885b47b7101?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'maker-tools' },
          { slug: 'virtual-assistants' },
          { slug: 'sketch' }
        ]
      }
    },
    {
      name: 'Grid Wallpaper',
      slug: 'grid-wallpaper',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Create your own grid wallpapers.',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/353bc907-5422-4672-86df-40706b9c88b2?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Lukas',
      slug: 'lukas',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: "The best boyfriend you've ever had",
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/b3341e21-87fb-4e85-8916-a40c537d4e3c?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'linkedin' }, { slug: 'on-demand' }] }
    },
    {
      name: 'GuestBot',
      slug: 'guestbot-2',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Touchscreen device to revolutionize vacation rentals',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8a706fe9-403a-4f15-a9c8-b59f4113d566?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'bots' },
          { slug: 'quantified-self' },
          { slug: 'star-wars' },
          { slug: 'wallpaper' }
        ]
      }
    },
    {
      name: 'YouWorth for Chrome',
      slug: 'youworth-for-chrome',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A salary estimate on every job listing',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/94c7fe94-d128-4ffe-8ba6-490b90d6d31d?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'snapchat' }] }
    },
    {
      name: 'Miit',
      slug: 'miit',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A platform to bring people together and end loneliness',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/cf15c514-4170-4923-aec8-52d5ec1e2a13?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'artificial-intelligence' },
          { slug: 'cannabis' },
          { slug: 'wallpaper' }
        ]
      }
    },
    {
      name: 'Thunderstack',
      slug: 'thunderstack',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Your privacy-first epic weight loss dashboard',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/90e279c6-49f8-494d-b61f-7656ef33e987?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'airbnb' }, { slug: 'pokemon' }] }
    },
    {
      name: 'Color.review',
      slug: 'color-review',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Colors that look and work great for everyone.',
      day: '2019-03-13',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/21bbd6f0-3f08-451f-9349-dd44f06c4d98?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'money' }] }
    },
    {
      name: 'Ginger-U',
      slug: 'ginger-u',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Helping women use contraceptives easily 🗓️',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f2f74d02-1e45-4ef6-a18a-4a87ff8a866d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'airbnb' },
          { slug: 'outdoors' },
          { slug: 'product-hunt' }
        ]
      }
    },
    {
      name: 'Online Signature Maker',
      slug: 'online-signature-maker',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Create a free downloadable electronic signature',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a1beeb3f-5019-4500-a325-64eb37caa53d?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Pyyros',
      slug: 'pyyros',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'The ultimate survival flashlight and multi-tool',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/535d2d63-f9e6-41f3-ac42-4d363635d491?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'developer-tools' },
          { slug: 'touch-bar-apps' },
          { slug: 'arkit' },
          { slug: 'quantified-self' }
        ]
      }
    },
    {
      name: 'NewCraft',
      slug: 'newcraft',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Unlock job referrals with paid, online apprenticeships',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/84e4e894-67a8-4589-9061-a9bc348db1bb?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Chronomics',
      slug: 'chronomics',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'See how your environment and lifestyle affects your DNA 🧬',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/1df412e9-83cd-4f38-8782-0efb08f0a856?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'airbnb' },
          { slug: 'facebook-messenger' },
          { slug: 'pokemon' }
        ]
      }
    },
    {
      name: 'Solid Balance',
      slug: 'solid-balance',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Deep insights about your health and life',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c5a61528-1fba-46c6-ac44-178ca885a8e8?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'developer-tools' }, { slug: 'apple' }] }
    },
    {
      name: 'KkiaPay',
      slug: 'kkiapay',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'An online payment gateway for African businesses 🌍',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/ff92e30a-0fb0-4e35-8f80-a1cf636d1c4e?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'artificial-intelligence' }] }
    },
    {
      name: 'GG Sex Life',
      slug: 'gg-sex-life',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Research-backed mental training for better confidence in bed',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/71308bc1-3204-42c2-ac7c-2e78bdf94397?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'apple' },
          { slug: 'augmented-reality' },
          { slug: 'alexa-skills' },
          { slug: 'wi-fi' }
        ]
      }
    },
    {
      name: 'Kith Elements',
      slug: 'kith-elements',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Copy paste reusable elements into your Bubble projects 🚧',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a45b1ee2-94bd-4a2e-859a-70c1d051ab1e?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'arkit' }, { slug: 'mac-menu-bar-apps' }] }
    },
    {
      name: 'Stress Buster Challenge',
      slug: 'stress-buster-challenge',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Write to throw away all your troubles',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f4c53999-4bbe-4989-9e14-6f544107b39d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'mac-menu-bar-apps' },
          { slug: 'apple' },
          { slug: 'startup-lessons' },
          { slug: 'touch-bar-apps' }
        ]
      }
    },
    {
      name: 'Deel',
      slug: 'deel',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Pay-as-you-go contracts for freelancers',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/3fa0f748-f29b-4b2f-a0fe-1ec3e35fa3cc?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'product-hunt' },
          { slug: 'kanye-west' },
          { slug: 'star-wars' },
          { slug: 'pokemon' }
        ]
      }
    },
    {
      name: 'The Rookies',
      slug: 'the-rookies',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Helping amateur artists launch careers.',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e009fecf-f397-469f-8161-a317d1439085?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'medium' },
          { slug: 'tech' },
          { slug: 'maps' },
          { slug: 'green-tech' }
        ]
      }
    },
    {
      name: 'Title Race',
      slug: 'title-race',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Race for the Premier League title',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c5e1813f-d38c-4d8b-a701-7a1615f17c8b?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'star-wars' },
          { slug: 'blockstack' },
          { slug: 'quantified-self' }
        ]
      }
    },
    {
      name: 'Peek',
      slug: 'peek-11',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'A timeline of movie and TV show recommendations',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/d177f515-d781-4fba-ad83-28af7ad1df1d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'arkit' },
          { slug: 'kanye-west' },
          { slug: 'on-demand' }
        ]
      }
    },
    {
      name: 'Pop Creators Studio',
      slug: 'pop-creators-studio',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Make money turning your photos into stickers',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/bd347199-a472-4ace-94dc-7df7236cf0a4?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'developer-tools' },
          { slug: 'apple' },
          { slug: 'netflix' }
        ]
      }
    },
    {
      name: 'Meowly',
      slug: 'meowly',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Cat app for cat lovers for iPhone and iPad',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8085d84f-3a25-4557-b516-d2c0f6f223ba?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: "Resume'ed",
      slug: 'resume-ed',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Craft your personal brand with a unique e-resume',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/2c1a3164-4427-4f34-94b6-7cd7be6c9d0e?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'e-commerce' }, { slug: 'money' }] }
    },
    {
      name: 'Day.ly',
      slug: 'day-ly',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Vlog using clips that turn into stories',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/96650d71-1364-475c-a919-34c017e1415b?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'green-tech' },
          { slug: 'imessage-apps' },
          { slug: 'maps' },
          { slug: 'apple' }
        ]
      }
    },
    {
      name: 'Metastream',
      slug: 'metastream',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Watch streaming media with friends',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/2bb4811f-2e6c-4e0a-9bc5-d4ebf54bda13?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'quantified-self' }] }
    },
    {
      name: 'Playnite',
      slug: 'playnite',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Provides one unified interface for your PC games',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/d2229d7f-64ad-4117-ada6-8bb0827797b5?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'linkedin' },
          { slug: 'work-in-progress' },
          { slug: 'apple' }
        ]
      }
    },
    {
      name: 'Bullets.tech',
      slug: 'bullets-tech',
      link: 'https://loomx.io/',
      description:
        'Put the outside world on hold – this is all about you and your music. No noise, no wires, no distractions. Just exceptional sound, industry-leading noise cancellation, and hour upon hour of pure listening freedom.',
      tagline: 'Articles for science lovers shortened to five bullet points.',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/179df2cc-1b85-4956-9620-367b794fca92?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Shift Keyboard',
      slug: 'shift-keyboard',
      tagline: 'A keyboard for your Apple Watch',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8ed298fe-38b1-4496-8bdc-dd8c11446248?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'books' },
          { slug: 'google' },
          { slug: 'linkedin' },
          { slug: 'alexa-skills' }
        ]
      }
    },
    {
      name: 'Gainful',
      slug: 'gainful',
      tagline: 'Protein powder tailored specifically to you',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/dd3ae0ee-e224-441c-94fc-6e7a069827c1?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'sketch' },
          { slug: 'cannabis' },
          { slug: 'google' },
          { slug: 'maker-tools' }
        ]
      }
    },
    {
      name: 'Day Night for macOS ',
      slug: 'day-night-for-macos',
      tagline: 'A desktop app that kills the procrastination in you.',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8042e684-2942-4e06-bb18-e198684adb84?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'donald-trump' }] }
    },
    {
      name: 'Menu World Time',
      slug: 'menu-world-time',
      tagline: 'World times at your fingertips',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/bf5110a2-a546-4bef-b929-90a71f641b4d?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'google-home' }] }
    },
    {
      name: 'Citationsy for Chrome',
      slug: 'citationsy-for-chrome',
      tagline: 'Cite anything in one-click right from Chrome',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/582d1f46-3c69-4a98-905c-3e4f85868830?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Dofollow Link Checker',
      slug: 'dofollow-link-checker',
      tagline: 'Check if a post provides dofollow or nofollow links',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/35de4600-a20d-437a-b243-379670630650?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'snapchat' }] }
    },
    {
      name: 'Wingman for DJI',
      slug: 'wingman-for-dji',
      tagline: 'Flight formation for DJI Drone',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/fc9a1894-af1a-4963-adb2-85af50b1360c?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'money' }] }
    },
    {
      name: 'Volpe',
      slug: 'volpe',
      tagline: 'A web reader for PDF & EPUB to enrich your publications',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/9e86a14a-487d-40e9-9150-40faa774435d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'kanye-west' },
          { slug: 'green-tech' },
          { slug: 'tech' }
        ]
      }
    },
    {
      name: 'HyperPush',
      slug: 'hyperpush',
      tagline: 'Increase your Instagram reach with analytics 📈',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/4dabda14-d8d6-4b59-83a5-8f20c2823f4e?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'star-wars' }] }
    },
    {
      name: 'Money Building',
      slug: 'money-building',
      tagline: 'Simple expense tracker with advanced reporting',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/27fbf5b2-1f1e-465d-a835-2f333ade905b?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'on-demand' }, { slug: 'touch-bar-apps' }] }
    },
    {
      name: 'Unicode Calendar Generator',
      slug: 'unicode-calendar-generator',
      tagline: 'Generate unique text calendars using Unicode 🗓️',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/57c706e1-3daa-4fea-a55d-9e7d21812a40?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'green-tech' },
          { slug: 'snapchat' },
          { slug: 'developer-tools' },
          { slug: 'outdoors' }
        ]
      }
    },
    {
      name: 'Maze 2.0',
      slug: 'maze-2-0',
      tagline: 'Go from prototype to UX report in minutes',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/af2139d4-b5a8-4a80-872e-b180bf83d823?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'medium' }] }
    },
    {
      name: 'Ella the Engineer 2.0',
      slug: 'ella-the-engineer-2-0',
      tagline: 'A comic encouraging young girls interest in STEM',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e08dd966-41eb-498b-a816-94f9a91acc09?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'money' }] }
    },
    {
      name: 'Egloo',
      slug: 'egloo-2',
      tagline: 'A customizable and versatile bio page',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/77ba0868-f1d4-455f-8a63-719a8be60aea?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'star-wars' }, { slug: 'mac-menu-bar-apps' }] }
    },
    {
      name: 'Pathfinder',
      slug: 'pathfinder',
      tagline: 'AI marketing employee for e-commerce stores',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e3afbb73-8532-423f-8d2d-f84df4d167ab?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'donald-trump' },
          { slug: 'youtube' },
          { slug: 'github' }
        ]
      }
    },
    {
      name: 'MusePeach',
      slug: 'musepeach',
      tagline: 'Journaling app that makes it easy for non writers to start.',
      day: '2019-03-10',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/d660ccf5-9d15-4beb-9446-7ca4bcaa30dd?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Ampler Curt',
      slug: 'ampler-curt',
      tagline: 'An e-bike designed for the city',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/d011eb8a-268e-4e18-b824-b253a8fb517e?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'PokeGuess',
      slug: 'pokeguess',
      tagline: 'Are you a Pokemon fan? Can you guess all of them?',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e51db68f-77d3-46ce-85ee-b6dcd6ce73f0?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Stairway',
      slug: 'stairway',
      tagline: 'Learn Mathematics, completely free!',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/ae205983-3c83-4a6a-8d22-ca501725af3e?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Personal Robots',
      slug: 'personal-robots',
      tagline: 'Discover a new toy robot every day',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/b4b64476-cca3-4d67-9b7f-2029d4737961?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'growth-hacks' }, { slug: 'augmented-reality' }]
      }
    },
    {
      name: 'Aero Attack',
      slug: 'aero-attack',
      tagline: "It's an addictive game of luck and skill.",
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e5e6ecf3-d170-4d87-b1fc-c5560c27a5ff?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'How Much Would You Make as a Woman?',
      slug: 'how-much-would-you-make-as-a-woman',
      tagline: 'Find out how much you would earn if you were a woman',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/4c31676d-8bc7-4530-9c1a-60b5c721685b?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'outdoors' },
          { slug: 'developer-tools' },
          { slug: 'tech' }
        ]
      }
    },
    {
      name: 'Women World Wide',
      slug: 'women-world-wide',
      tagline: 'An open source map of organizations for women in tech 🌎',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/b1416d42-97a1-4aac-bd92-de538b8e8dc7?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Byte - Crypto price tracker',
      slug: 'byte-crypto-price-tracker',
      tagline: 'Realtime crypto tracker for everyone',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/7f56696e-2667-40d6-8190-fd85ff14833e?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'virtual-assistants' }] }
    },
    {
      name: 'Women Made It',
      slug: 'women-made-it',
      tagline: 'Awesome design tools, books, podcasts & blogs made by women',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/534a9f53-b714-45ed-b826-ad3400e06acf?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'airbnb' },
          { slug: 'medium' },
          { slug: 'growth-hacks' }
        ]
      }
    },
    {
      name: 'Progress Dashboard',
      slug: 'progress-dashboard',
      tagline: 'Chrome dashboard to stay productive with progress bars',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c3703b8c-b1d2-4fda-b7b7-e65c81cc7e27?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'google' },
          { slug: 'arkit' },
          { slug: 'snapchat' },
          { slug: 'on-demand' }
        ]
      }
    },
    {
      name: 'Interview School',
      slug: 'interview-school',
      tagline: 'Cheatsheets for your next interview with AI assistance',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/47ca51eb-bd49-467a-989c-f7f19cf5e870?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'delivery' }] }
    },
    {
      name: 'Clubhouse',
      slug: 'clubhouse-3',
      tagline: 'Unique challenges with others in your city',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/bbe8f16e-eb2d-4d3c-b927-b685458ecca5?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Cafei',
      slug: 'cafei',
      tagline: 'Track caffeine intake in order to sleep better',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/d7cab965-359b-4d24-8f41-82e4fa89dc1a?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'biohacking' }] }
    },
    {
      name: 'AlgoExpert',
      slug: 'algoexpert',
      tagline: 'A better way to prep for tech interviews',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/7441f7c7-9104-4ccd-a418-4516665af02f?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'medium' }, { slug: 'maps' }] }
    },
    {
      name: 'Stenon',
      slug: 'stenon',
      tagline: 'Portable soil monitoring device',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/46acca03-a040-4e4a-b890-9745b5d5d4b4?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'green-tech' },
          { slug: 'side-projects' },
          { slug: 'artificial-intelligence' }
        ]
      }
    },
    {
      name: 'Locelle',
      slug: 'locelle',
      tagline: 'App for women to connect with like-minded friends & mentors',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/b923263c-da70-4b69-9e2d-da4e86eb8497?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'on-demand' },
          { slug: 'mac-menu-bar-apps' },
          { slug: 'linkedin' }
        ]
      }
    },
    {
      name: 'Haiku Animator',
      slug: 'haiku-animator',
      tagline: 'Create powerful animations for any app or website',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/bcd36d1e-62a3-4d17-b7d0-9f874f63a353?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'side-projects' }] }
    },
    {
      name: 'Nice Sex Tracker',
      slug: 'nice-sex-tracker',
      tagline: 'Privacy centric sex and intimacy tracking app for iOS',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/846f4a0a-8065-455c-8409-e3f539b7a9ae?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'FindMyInvoice',
      slug: 'findmyinvoice',
      tagline: 'Automatically collect expense receipts from your Gmail',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/623c3633-4536-43ad-b6a0-81ded30ea2a6?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'startup-lessons' },
          { slug: 'reddit' },
          { slug: 'maker-tools' },
          { slug: 'bots' }
        ]
      }
    },
    {
      name: 'Text Austin Music',
      slug: 'text-austin-music',
      tagline: 'Visual, artistic texts about the coolest SXSW music events',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e190534f-4b16-4807-a906-570c204e8f7c?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'bots' },
          { slug: 'side-projects' },
          { slug: 'imessage-apps' }
        ]
      }
    },
    {
      name: 'Who Runs The World',
      slug: 'who-runs-the-world',
      tagline: "Infographics website for International Women's Day 2019",
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/6a81c3c7-28a0-4a76-8bcb-1aad4021c3f7?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'netflix' }, { slug: 'star-wars' }] }
    },
    {
      name: 'Alethio',
      slug: 'alethio',
      tagline: 'Powerful blockchain data, analytics & visualization platform',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e2f26df4-0719-4d26-a6e8-1303f528b64f?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'bots' }] }
    },
    {
      name: 'Transposit',
      slug: 'transposit',
      tagline: 'Build API-dependent applications effortlessly',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/97e608f1-f5b5-48f7-827f-6f8a460d5f74?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'touch-bar-apps' }] }
    },
    {
      name: 'Screenlapse',
      slug: 'screenlapse',
      tagline: 'Automatically capture website screenshots every day/week/etc',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c343a3b6-813a-470a-a58a-e13c614b8a91?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'snapchat' }] }
    },
    {
      name: 'Hooch Rewards',
      slug: 'hooch-rewards',
      tagline: 'Hooch rewards up to 10% back when you shop',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/1b9f1430-790d-40d6-9874-6c49362aad1b?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Laazy',
      slug: 'laazy',
      tagline: 'Time saving image tools.',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/5466b5df-a2f6-4077-b8a8-bbfe6015ae89?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'reddit' },
          { slug: 'maker-tools' },
          { slug: 'on-demand' },
          { slug: 'google-home' }
        ]
      }
    },
    {
      name: 'Simple Quoter',
      slug: 'simple-quoter',
      tagline: 'The easiest way to build interactive sales quotes',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c4350fbf-2593-4cb7-9bd6-cf19b686447b?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'wi-fi' }] }
    },
    {
      name: 'Public Art - Street Art Museum',
      slug: 'public-art-street-art-museum',
      tagline: 'Discover street art photos found with ML from 170+ countries',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/7025803c-37ac-4078-beea-1cd43733e8ba?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'imessage-apps' }, { slug: 'reddit' }] }
    },
    {
      name: 'Stress & Anxiety Companion',
      slug: 'stress-anxiety-companion',
      tagline: 'An app to help counter stress and anxiety',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/71470115-a0c5-4867-b1da-3a67e424d95b?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'pokemon' }] }
    },
    {
      name: 'Everyday German',
      slug: 'everyday-german',
      tagline: 'Learn useful German words & phrases on every new tab',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f7e0ca5b-b1c6-4323-9351-e568e43f55de?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Labo VR Kit',
      slug: 'labo-vr-kit',
      tagline: "Nintendo's new VR kit for Labo",
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/4654d083-29be-4cf7-aeb3-052ff9555b0f?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'delivery' }, { slug: 'games' }, { slug: 'arkit' }]
      }
    },
    {
      name: 'Notion 2.3',
      slug: 'notion-2-3',
      tagline: 'Notions big update, now with Evernote import and web clipper',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8e622a00-46d7-4803-8eac-ed1eeafd4b67?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'augmented-reality' }] }
    },
    {
      name: 'ClipCoverage',
      slug: 'clipcoverage',
      tagline: 'A Google Slides add-on that automates media coverage reports',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/6283dce5-8bfd-4e4e-ba74-6134d6f5bd29?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'apple' }, { slug: 'google-home' }] }
    },
    {
      name: 'Vurku',
      slug: 'vurku',
      tagline: 'Download Instagram posts by username or hashtag',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/db06f1fc-c701-4908-a15d-0dcf2f7716ef?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'ReceiptLens',
      slug: 'receiptlens',
      tagline: 'A smart tool for receipt scanning,expense tracking&reporting',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/09461e24-2e27-4b60-87a1-7ddc3bb61415?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'star-wars' }, { slug: 'blockstack' }] }
    },
    {
      name: 'Code Time',
      slug: 'code-time',
      tagline: 'VS Code extension for automatic programming metrics',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/15cd4f6c-1138-4313-aaa0-fbed780966f6?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'snapchat' },
          { slug: 'google-home' },
          { slug: 'biohacking' },
          { slug: 'reddit' }
        ]
      }
    },
    {
      name: 'Easter Eggs by HoverSignal',
      slug: 'easter-eggs-by-hoversignal',
      tagline: 'Boost engagement & SEO with hidden presents on your website',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/27bf4465-ce7c-4db8-b4d1-c52793e3edd5?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'MakeML',
      slug: 'makeml',
      tagline: 'Train Neural Networks without a line of code',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/e754188c-7571-41c6-ab78-7b8d6341d590?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'wallpaper' }] }
    },
    {
      name: 'Butleroy 4.0',
      slug: 'butleroy-4-0',
      tagline: 'Your personal butler for more productivity',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/db7acb0f-2da6-446b-b309-7752908e5005?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'mac-menu-bar-apps' }, { slug: 'alexa-skills' }]
      }
    },
    {
      name: 'Faruno',
      slug: 'faruno',
      tagline: 'A unique email address within one inbox',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/0a1d47d3-5681-47b4-92fd-53a4cb7d8bcd?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'kanye-west' }, { slug: 'bots' }, { slug: 'netflix' }]
      }
    },
    {
      name: 'Sauna',
      slug: 'sauna',
      tagline: 'Track heat & cold exposure with your Apple Watch and iPhone',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/4917b1a4-9584-4e00-b524-96b6ee199771?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'alexa-skills' }] }
    },
    {
      name: 'Popcity',
      slug: 'popcity',
      tagline: 'Instantly map any photo on Instagram',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8dcba04e-3220-4978-a011-80c7ed9a1112?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'games' }, { slug: 'wi-fi' }] }
    },
    {
      name: 'UrbanWatch',
      slug: 'urbanwatch',
      tagline: 'Lets you access Urban Dictionary on your Apple Watch',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/139a0cbb-6cfe-4f66-adf6-440768d939db?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'mac-menu-bar-apps' },
          { slug: 'quantified-self' },
          { slug: 'sketch' },
          { slug: 'snapchat' }
        ]
      }
    },
    {
      name: 'Ruler Analytics',
      slug: 'ruler-analytics',
      tagline: 'Close the loop between leads and revenue',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a39c04cb-9013-4cac-b508-dd42bc90207c?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'snapchat' }] }
    },
    {
      name: 'Lazy Surfer',
      slug: 'lazy-surfer',
      tagline: 'Surf better waves with less effort',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/9eafd6ee-9721-4f81-baa3-6267c194a52e?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'sketch' }, { slug: 'games' }, { slug: 'maker-tools' }]
      }
    },
    {
      name: 'Music Match',
      slug: 'music-match',
      tagline: 'Find out how musically compatible you are with friends',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/ae724665-7133-4c59-9a86-bd24fa326212?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'wallpaper' }, { slug: 'mac-menu-bar-apps' }] }
    },
    {
      name: 'Health News',
      slug: 'health-news',
      tagline: 'Hacker News for health 🔬',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/4f9a82c6-2cd9-440c-b0ca-af51ae44b3eb?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'airbnb' }] }
    },
    {
      name: 'Elin.ai',
      slug: 'elin-ai-1',
      tagline: 'A slack bot to boost your team engagement and collaboration',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/47cdcca2-48cb-462d-b6a0-65e62b819a00?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Pei',
      slug: 'pei-2',
      tagline: 'Earn cashback in crypto using your debit or credit card',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/676750af-478a-499d-b7c9-c82bcf6cf563?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'games' },
          { slug: 'tech' },
          { slug: 'facebook-messenger' }
        ]
      }
    },
    {
      name: 'CalPal',
      slug: 'calpal-2',
      tagline: 'A super simple calculator with instant as you type results',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c60eed53-a0f3-4db9-a482-fcce6533e60f?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'pokemon' }, { slug: 'snapchat' }] }
    },
    {
      name: 'Kavtek',
      slug: 'kavtek',
      tagline: 'Augmented reality home improvement app',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8e096120-280d-401a-85c8-bf1abca8f95c?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'medtech' },
          { slug: 'touch-bar-apps' },
          { slug: 'developer-tools' },
          { slug: 'green-tech' }
        ]
      }
    },
    {
      name: 'GitHub Personal Website Generator',
      slug: 'github-personal-website-generator',
      tagline: 'Generate a personal website based on GitHub contributions',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/39a5b21b-3080-48a7-b057-4bb4d4220a7d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'augmented-reality' },
          { slug: 'growth-hacks' },
          { slug: 'virtual-assistants' }
        ]
      }
    },
    {
      name: 'newsletter-cli',
      slug: 'newsletter-cli',
      tagline: 'CLI tool to write and send newsletters in Markdown',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c7cf03cc-e3bb-4413-a18b-4cb9e21370e8?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'JustComments',
      slug: 'justcomments',
      tagline: 'Comment system for websites',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/147ce94f-1182-4cde-8395-0b003a494c8d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'side-projects' },
          { slug: 'maps' },
          { slug: 'developer-tools' },
          { slug: 'books' }
        ]
      }
    },
    {
      name: 'Tombot',
      slug: 'tombot',
      tagline: 'More realistic, affordable animal companion for the elderly',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8d99e939-b828-457e-bae3-1ded7206cc8c?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'snapchat' }] }
    },
    {
      name: 'Textstandup',
      slug: 'textstandup',
      tagline: 'Web application for text based stand-ups',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a7d72cb9-7395-4511-a92a-756c8e78334f?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'on-demand' }, { slug: 'netflix' }, { slug: 'wi-fi' }]
      }
    },
    {
      name: 'Reportz v2.0',
      slug: 'reportz-v2-0',
      tagline: 'All-in-one reporting tool for digital marketers',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/d6bd4f23-9707-4179-8324-a5a939214687?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'facebook-messenger' },
          { slug: 'medium' },
          { slug: 'snapchat' }
        ]
      }
    },
    {
      name: 'Baremetrics for Apple App Store Connect',
      slug: 'baremetrics-for-apple-app-store-connect',
      tagline: "Subscription analytics & insights for Apple's app store",
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/001cb5c6-e394-4be5-a17d-2f016d913643?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Feedbacks',
      slug: 'feedbacks',
      tagline: 'Capture user feedback effortlessly with emojis 😎',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/b6fef832-3785-4b79-886d-6d33ac8db8b5?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'e-commerce' }, { slug: 'wi-fi' }] }
    },
    {
      name: 'Product Hunt CLI',
      slug: 'product-hunt-cli',
      tagline: 'Access the top products on PH right from your terminal',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/cc2dfebc-de59-48d8-a07b-10546379bb35?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Fitbit Inspire',
      slug: 'fitbit-inspire',
      tagline: "Fitbit's newest tracker with a detachable band",
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/4eb37152-393f-4cd9-9126-8a8ac6dbb9e7?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'airbnb' }, { slug: 'maker-tools' }] }
    },
    {
      name: 'Fitbit Ace 2',
      slug: 'fitbit-ace-2',
      tagline: 'An activity tracker for kids',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f081f48b-e42a-488a-a35b-453aa0751230?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'donald-trump' }, { slug: 'green-tech' }] }
    },
    {
      name: 'Ompractice',
      slug: 'ompractice',
      tagline: 'Online interactive yoga+meditation classes via two-way video',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c67c4fa9-42b3-494c-a3cc-23eded9fc23b?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'virtual-assistants' },
          { slug: 'bots' },
          { slug: 'facebook-messenger' },
          { slug: 'medium' }
        ]
      }
    },
    {
      name: 'Fitbit Versa Lite',
      slug: 'fitbit-versa-lite',
      tagline: "Fitbit's new smart watch starting at $160",
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/2b818bfe-621d-4909-abed-57608094785a?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'side-projects' },
          { slug: 'quantified-self' },
          { slug: 'blockstack' },
          { slug: 'linkedin' }
        ]
      }
    },
    {
      name: 'Maker Stories by Product Hunt',
      slug: 'maker-stories-by-product-hunt',
      tagline: 'A platform for Makers to share their knowledge',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a6c8469c-68e2-4205-aa97-f37c27fcd18c?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'wi-fi' }, { slug: 'growth-hacks' }, { slug: 'games' }]
      }
    },
    {
      name: 'Good Job Description',
      slug: 'good-job-description',
      tagline: 'See good job descriptions from the most-loved companies',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/aed2faa8-6cea-4d8b-8c20-897eb06bd196?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'mac-menu-bar-apps' }, { slug: 'github' }] }
    },
    {
      name: 'Dendo Drive House ',
      slug: 'dendo-drive-house',
      tagline: 'Mitsubishi’s new power system lets your car power your home',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a8f3b6a6-6e81-4442-9369-1fdcddc3a0f7?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Vectary 3.0',
      slug: 'vectary-3-0',
      tagline: 'Create 3D and AR designs for your website',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/764820d8-1171-410d-bdbb-05efdc1b6155?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'games' },
          { slug: 'startup-lessons' },
          { slug: 'wallpaper' },
          { slug: 'work-in-progress' }
        ]
      }
    },
    {
      name: 'Kidpography',
      slug: 'kidpography',
      tagline: 'Save your children’s calligraphy forever',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/001eb426-6996-411a-8ea4-eb9e5558f4e6?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'star-wars' }] }
    },
    {
      name: 'Bolo',
      slug: 'bolo-2',
      tagline: 'Learn English and Hindi with your voice, available in: 🇮🇳',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/47a6225b-df57-4c49-a044-d6f503790640?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'on-demand' },
          { slug: 'cannabis' },
          { slug: 'books' },
          { slug: 'sketch' }
        ]
      }
    },
    {
      name: 'Minaurs',
      slug: 'minaurs',
      tagline: 'A unique adventure game full of exploratory expeditions.',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/9edc100f-6cce-4c32-b15b-b7599d80c3ab?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Birthday Cleaner',
      slug: 'birthday-cleaner',
      tagline: 'Review and clear birthdays from your calendar',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/cde1b1b5-cfa4-4a22-ab23-f1bea1f0771d?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'augmented-reality' }, { slug: 'virtual-assistants' }]
      }
    },
    {
      name: 'Two Three Bricks',
      slug: 'two-three-bricks',
      tagline: 'Customised LEGO caricatures to be used any way you want.',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/93fc21c4-d334-4ade-bd80-7cb627602b4c?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Battista',
      slug: 'battista',
      tagline: "Pinnfarina's 1'900 horse-power electric hypercar ",
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/87287ff9-c247-4466-b72f-6f4fbd88b6c1?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Repair Alert',
      slug: 'repair-alert',
      tagline: 'Never miss out on an Apple repair or exchange program.',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/013a8640-6bd2-45b2-b950-09e4322eae15?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'maps' }] }
    },
    {
      name: 'MuteRKelly',
      slug: 'muterkelly',
      tagline: 'Automatically mute all R. Kelly songs',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f8a05af1-9457-4830-99f1-e3c03081a84e?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'work-in-progress' }, { slug: 'snapchat' }] }
    },
    {
      name: 'Product Wars',
      slug: 'product-wars',
      tagline: 'A real-time war room for your product launch',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/bccd304d-0d94-4d23-be4c-4e53975bbc16?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'books' },
          { slug: 'google' },
          { slug: 'green-tech' },
          { slug: 'quantified-self' }
        ]
      }
    },
    {
      name: 'Aiko Meet',
      slug: 'aiko-meet',
      tagline: '🤖 Video Chat in browser with AI Subtitles + Transcript 🤖',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/81ab7105-3dfc-46a4-9571-1fdc4b8dcbdb?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'money' }, { slug: 'alexa-skills' }] }
    },
    {
      name: 'Freshstatus by Freshworks',
      slug: 'freshstatus-by-freshworks',
      tagline: 'Better statuspage, in 1-click, FREE forever 🔥',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/2e988fa7-74ae-449c-85c6-1f434c0caff4?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'GitPress',
      slug: 'gitpress',
      tagline: 'A blog writing tool based on GitHub, designed for developers',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/a97bda31-24da-47a8-a925-8e2a79eae89d?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'touch-bar-apps' }] }
    },
    {
      name: 'DigitalOcean Marketplace',
      slug: 'digitalocean-marketplace',
      tagline: 'Discover and deploy preconfigured one-click applications',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/3e6411a0-97e3-41fc-b867-4ae815810d73?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'pokemon' }] }
    },
    {
      name: 'Lightdogs',
      slug: 'lightdogs',
      tagline: 'Collect dogs by staying productive',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/8a92c488-56f9-4bad-8413-e92f34bf1fdf?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'wallpaper' }] }
    },
    {
      name: 'LinkPot',
      slug: 'linkpot',
      tagline: 'Add clickable links to your Instagram Posts',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/db66fee1-16fa-43a0-83fc-2cc84a9caa00?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'augmented-reality' },
          { slug: 'netflix' },
          { slug: 'youtube' }
        ]
      }
    },
    {
      name: 'Ear Palettes',
      slug: 'ear-palettes',
      tagline: 'Color palette inspirations from album covers',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/eaf5ef4b-e4b2-4e3f-9964-d1c885346974?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'apple' },
          { slug: 'money' },
          { slug: 'wi-fi' },
          { slug: 'on-demand' }
        ]
      }
    },
    {
      name: 'Routable',
      slug: 'routable',
      tagline: 'The simplest way to send B2B payments and invoices',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/6fdc71b5-b34c-44ff-afea-b17b620b0e6e?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'imessage-apps' }, { slug: 'snapchat' }] }
    },
    {
      name: 'Livestats',
      slug: 'livestats',
      tagline: 'Real time visitor stats for all of your websites',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/634faee4-7f0c-4c05-a5fa-20ffda626b9c?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Family Friendly Live',
      slug: 'family-friendly-live',
      tagline: 'Accessible, family-friendly Twitch streamers',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/542a4898-d533-4894-9231-065d8c212c3e?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'games' }] }
    },
    {
      name: 'Rank Math SEO',
      slug: 'rank-math-seo',
      tagline: 'A FREE powerful and lightweight SEO plugin for WordPress',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/77fd82d7-e4cb-4034-bc3d-c92b8aa71f61?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Truffle',
      slug: 'truffle-3',
      tagline: 'File your taxes like the 1%',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/c5b686ee-7034-4ec3-94b9-febe33d95dc9?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'imessage-apps' },
          { slug: 'arkit' },
          { slug: 'side-projects' },
          { slug: 'maps' }
        ]
      }
    },
    {
      name: 'AXDRAFT',
      slug: 'axdraft',
      tagline: 'Free legal documents for startups in minutes',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/96ca9b41-48ca-4f58-9c0c-fd235348b96f?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'virtual-assistants' }] }
    },
    {
      name: 'Jour',
      slug: 'jour',
      tagline: 'Jour is a daily journal, guiding you towards self-care',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/300cf281-aa89-4034-8198-320c334e7a37?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'wi-fi' }, { slug: 'airbnb' }] }
    },
    {
      name: 'Shopbrain',
      slug: 'shopbrain',
      tagline: 'Shopbrain instantly finds you the best price online',
      day: '2019-03-08',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/f111f013-8556-4e5a-8546-63789cbb0d63?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'e-commerce' }] }
    },
    {
      name: 'New Segment Platform',
      slug: 'new-segment-platform',
      tagline: '15,000 Customers, 9,000 Integrations Enabled / Month',
      day: '2019-03-05',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/9164fdf6-0bd9-428a-af0a-072229d9aef3?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'medtech' },
          { slug: 'work-in-progress' },
          { slug: 'touch-bar-apps' },
          { slug: 'snapchat' }
        ]
      }
    },
    {
      name: 'Merge SX',
      slug: 'merge-sx',
      tagline: 'Join a collection of videos into a single movie.',
      day: '2019-03-11',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/48b578a8-00d4-4e10-9aa0-13a7fe5286be?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'Divide SX',
      slug: 'divide-sx',
      tagline: 'Cut your movies into an arbitrary number of segments.',
      day: '2019-03-09',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/83a182ee-0b7a-488c-a5c2-2f04d0090c19?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'imessage-apps' },
          { slug: 'donald-trump' },
          { slug: 'delivery' },
          { slug: 'wi-fi' }
        ]
      }
    },
    {
      name: 'Moneon',
      slug: 'moneon',
      tagline: 'Free app to track and save money',
      day: '2019-03-07',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/35fdef8e-98b1-442e-a27b-9bb747c254f7?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'AM-RB 003',
      slug: 'am-rb-003',
      tagline: "Aston Martin's new hypercar",
      day: '2019-03-05',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/36eba69f-0ce5-4318-9b66-d46cd0194e43?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'product-hunt' }, { slug: 'apple' }] }
    },
    {
      name: 'August View Doorbell Camera',
      slug: 'august-view-doorbell-camera',
      tagline: 'Sleek, wire-free doorbell camera',
      day: '2019-03-05',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/6b0c3d7c-157a-44ef-b184-ca90d272a162?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'wi-fi' },
          { slug: 'biohacking' },
          { slug: 'artificial-intelligence' },
          { slug: 'maps' }
        ]
      }
    },
    {
      name: 'TidyShift',
      slug: 'tidyshift',
      tagline: 'A super-simple way to schedule shifts for members of staff',
      day: '2019-03-05',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/69848808-41f0-4454-87b3-688749a3c718?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'bots' }] }
    },
    {
      name: 'Midnight Lizard',
      slug: 'midnight-lizard-2',
      tagline: 'Accessible color schemes for all websites',
      day: '2019-03-05',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/47459082-0249-47ac-8c2a-d2ecd904b644?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [{ slug: 'books' }, { slug: 'alexa-skills' }, { slug: 'tech' }]
      }
    },
    {
      name: 'KettleBell Connect',
      slug: 'kettlebell-connect',
      tagline: 'A smart kettlebell with motion sensors',
      day: '2019-03-05',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/39ef5432-a1dd-4f5e-89d5-cd989432b4e7?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'touch-bar-apps' }, { slug: 'outdoors' }] }
    },
    {
      name: 'FaceCode',
      slug: 'facecode',
      tagline: 'Hire top tech talent with video interviews',
      day: '2019-03-05',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/6224299b-a5db-4a15-aba2-8c63628b489c?auto=format&fit=crop&h=570&w=430',
      topics: {
        connect: [
          { slug: 'product-hunt' },
          { slug: 'quantified-self' },
          { slug: 'alexa-skills' }
        ]
      }
    },
    {
      name: 'TeamSpoor',
      slug: 'teamspoor',
      tagline: 'Track your field force and automate their reporting',
      day: '2019-03-06',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/dd0b5aef-bf09-4165-bdbf-f009775089b2?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: '30 Seconds of Knowledge',
      slug: '30-seconds-of-knowledge-2',
      tagline: 'Become a better developer, one new tab at a time',
      day: '2019-03-05',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/3fadc0fe-5775-4fec-bd8b-6f2ee71fc517?auto=format&fit=crop&h=570&w=430'
    },
    {
      name: 'I.D Buggy',
      slug: 'i-d-buggy',
      tagline: "Volkswagen's electric dune buggy ",
      day: '2019-03-05',
      featured: true,
      thumbnail:
        'https://ph-files.imgix.net/de76c6f0-0dd9-4182-b536-ece60bd8a896?auto=format&fit=crop&h=570&w=430',
      topics: { connect: [{ slug: 'medtech' }, { slug: 'apple' }] }
    }
  ];
  const slugs = [
    'hyperspektiv-2-0',
    'retrochat',
    'zoho-office-suite',
    'animated-icons-pack',
    'insta360-evo',
    'upvoty-2',
    'slack-foundry-3',
    'wtf-should-i-do-in',
    'fast-playback-for-facebook-videos',
    'crossfont',
    'nomad-text',
    'culrs-2-0',
    'supernova-v6',
    'undeck',
    'radiogarden',
    'daily-co-video-call-api',
    'the-juggernaut',
    'travelchime',
    'the-infatuation-ios-5-0',
    'black-3-0',
    'radicle',
    'tinkersynth',
    'blook-2',
    'toky-instant-call',
    'paydrt',
    'genius-pack-supercharged',
    'spf',
    'kraftnow',
    'lessons-in-herstory',
    'yoremote',
    'where-is-carmen-sandiego',
    'upmetrics-2-0',
    'google-lookout',
    'andcards-kiosk',
    'compass-by-jobtome',
    'microsoft-x-cloud',
    'the-startup-calculator',
    'charts-3',
    'rolando-royal-edition',
    'colorize-cc',
    'mfy-im',
    'askdata',
    'ikea-thisables',
    'hiby-w5',
    'keeple',
    'the-angel-philosopher',
    'cord-cutter-express',
    'firework-2',
    'sloth-facts',
    'credo360-2-0',
    'tune-by-google',
    'coterie',
    'faradise',
    'warby-parker-virtual-try-on',
    'keystroke-pro',
    'kwikcal',
    'updatefy',
    'cursor-pro',
    'pint',
    'houseparty-chrome-extension',
    'sathorn',
    'character-count',
    'withings-sleep',
    'unomaly',
    'fake-faces',
    'instagram-2019-content-spotlight',
    'time-is-ltd',
    'perfect-dude',
    'microverse-2-0',
    'the-growth-machine-by-yaguara',
    'pensato',
    'dubler-studio-kit',
    'workplace-list',
    'symbol-design-system-2',
    'zokyo',
    'practicebank',
    'product-resources-list',
    'voiceflow-2',
    'vacuum-data',
    'vxcards',
    'puzzle-swap',
    'traduora',
    'web-dev-education-platform',
    'keeper-3',
    'print-my-tweets',
    'spicer',
    'the-classic-stone',
    'roomfifty',
    'radiopublic-3',
    'slogro',
    'epichat-for-messenger',
    'goeat-me-your-food-guru',
    'healium-2',
    'talent-garden',
    'pomo-timer',
    'soul',
    'twenty-tables',
    'supportiv',
    'rotate-videos',
    'tld-party',
    'replies-cc',
    'grid-wallpaper',
    'lukas',
    'guestbot-2',
    'youworth-for-chrome',
    'miit',
    'thunderstack',
    'color-review',
    'ginger-u',
    'online-signature-maker',
    'pyyros',
    'newcraft',
    'chronomics',
    'solid-balance',
    'kkiapay',
    'gg-sex-life',
    'kith-elements',
    'stress-buster-challenge',
    'deel',
    'the-rookies',
    'title-race',
    'peek-11',
    'pop-creators-studio',
    'meowly',
    'resume-ed',
    'day-ly',
    'metastream',
    'playnite',
    'bullets-tech',
    'shift-keyboard',
    'gainful',
    'day-night-for-macos',
    'menu-world-time',
    'citationsy-for-chrome',
    'dofollow-link-checker',
    'wingman-for-dji',
    'volpe',
    'hyperpush',
    'money-building',
    'unicode-calendar-generator',
    'maze-2-0',
    'ella-the-engineer-2-0',
    'egloo-2',
    'pathfinder',
    'musepeach',
    'ampler-curt',
    'pokeguess',
    'stairway',
    'personal-robots',
    'aero-attack',
    'how-much-would-you-make-as-a-woman',
    'women-world-wide',
    'byte-crypto-price-tracker',
    'women-made-it',
    'progress-dashboard',
    'interview-school',
    'clubhouse-3',
    'cafei',
    'algoexpert',
    'stenon',
    'locelle',
    'haiku-animator',
    'nice-sex-tracker',
    'findmyinvoice',
    'text-austin-music',
    'who-runs-the-world',
    'alethio',
    'transposit',
    'screenlapse',
    'hooch-rewards',
    'laazy',
    'simple-quoter',
    'public-art-street-art-museum',
    'stress-anxiety-companion',
    'everyday-german',
    'labo-vr-kit',
    'notion-2-3',
    'clipcoverage',
    'vurku',
    'receiptlens',
    'code-time',
    'easter-eggs-by-hoversignal',
    'makeml',
    'butleroy-4-0',
    'faruno',
    'sauna',
    'popcity',
    'urbanwatch',
    'ruler-analytics',
    'lazy-surfer',
    'music-match',
    'health-news',
    'elin-ai-1',
    'pei-2',
    'calpal-2',
    'kavtek',
    'github-personal-website-generator',
    'newsletter-cli',
    'justcomments',
    'tombot',
    'textstandup',
    'reportz-v2-0',
    'baremetrics-for-apple-app-store-connect',
    'feedbacks',
    'product-hunt-cli',
    'fitbit-inspire',
    'fitbit-ace-2',
    'ompractice',
    'fitbit-versa-lite',
    'maker-stories-by-product-hunt',
    'good-job-description',
    'dendo-drive-house',
    'vectary-3-0',
    'kidpography',
    'bolo-2',
    'minaurs',
    'birthday-cleaner',
    'two-three-bricks',
    'battista',
    'repair-alert',
    'muterkelly',
    'product-wars',
    'aiko-meet',
    'freshstatus-by-freshworks',
    'gitpress',
    'digitalocean-marketplace',
    'lightdogs',
    'linkpot',
    'ear-palettes',
    'routable',
    'livestats',
    'family-friendly-live',
    'rank-math-seo',
    'truffle-3',
    'axdraft',
    'jour',
    'shopbrain',
    'new-segment-platform',
    'merge-sx',
    'divide-sx',
    'moneon',
    'am-rb-003',
    'august-view-doorbell-camera',
    'tidyshift',
    'midnight-lizard-2',
    'kettlebell-connect',
    'facecode',
    'teamspoor',
    '30-seconds-of-knowledge-2',
    'i-d-buggy'
  ];
  module.exports = {
    posts,
    slugs
  };
  