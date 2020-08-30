const topics = [
  {
    name: 'Growth Hacks',
    slug: 'growth-hacks',
    description: '',
    followersCount: 9,
    postsCount: 1,
    image:
      'https://ph-files.imgix.net/0606f196-dabe-41b0-8e42-24a425559414?auto=format',
    trending: false,
  },
  {
    name: 'Startup Lessons',
    slug: 'startup-lessons',
    description: '',
    followersCount: 37,
    postsCount: 9,
    image:
      'https://ph-files.imgix.net/27c4a5e0-fe66-4e9f-bdc9-e4b6054d7140?auto=format',
    trending: false,
  },
  {
    name: 'Money',
    slug: 'money',
    description: '',
    followersCount: 8,
    postsCount: 13,
    image:
      'https://ph-files.imgix.net/0475d182-2f53-4c90-b65c-95fe7661a495?auto=format',
    trending: false,
  },
  {
    name: 'Work In Progress',
    slug: 'work-in-progress',
    description: '',
    followersCount: 8,
    postsCount: 4,
    image:
      'https://ph-files.imgix.net/31166270-65ba-4f6d-b6f2-d4ec86682e64?auto=format',
    trending: false,
  },
  {
    name: 'Side Projects',
    slug: 'side-projects',
    description: '',
    followersCount: 25,
    postsCount: 12,
    image:
      'https://ph-files.imgix.net/31166270-65ba-4f6d-b6f2-d4ec86682e64?auto=format',
    trending: false,
  },
  {
    name: 'Maker Tools',
    slug: 'maker-tools',
    description: '',
    followersCount: 5,
    postsCount: 8,
    image:
      'https://ph-files.imgix.net/23da4ff8-129e-4eec-aadf-3e8dd7578e64?auto=format',
    trending: false,
  },
  {
    name: 'Blockstack',
    slug: 'blockstack',
    description: 'Decentralized apps built on Blockstack',
    followersCount: 45,
    postsCount: 26,
    image:
      'https://ph-files.imgix.net/1e77b77c-4d22-4ab6-8635-76172eb7926b?auto=format',
    trending: false,
  },
  {
    name: 'Medtech',
    slug: 'medtech',
    description:
      'Smart appliances and technologies revolutioning medicine and healthcare',
    followersCount: 75,
    postsCount: 9,
    image:
      'https://ph-files.imgix.net/b98826eb-4370-4853-bc3c-16b81211ca3a?auto=format',
    trending: false,
  },
  {
    name: 'Cannabis',
    slug: 'cannabis',
    description:
      'Marijuana is the new alcohol. With legalization sweeping all 50 states, a wave of startups is launching to help you enjoy it.',
    followersCount: 113,
    postsCount: 39,
    image:
      'https://ph-files.imgix.net/44ba96dd-e056-4536-9e3a-b8dc9f7b0f8a?auto=format',
    trending: false,
  },
  {
    name: 'Quantified Self',
    slug: 'quantified-self',
    description: 'Lifelogging detailed data can help make better choices',
    followersCount: 628,
    postsCount: 9,
    image:
      'https://ph-files.imgix.net/3cf58719-5905-4fec-bea4-91e74afa3d92?auto=format',
    trending: false,
  },
  {
    name: 'ARKit',
    slug: 'arkit',
    description: 'A framework to create Augmented Reality experiences for iOS',
    followersCount: 1655,
    postsCount: 127,
    image:
      'https://ph-files.imgix.net/540d66f6-3e39-403c-99f8-c6af7e089c6a?auto=format',
    trending: false,
  },
  {
    name: 'Apple',
    slug: 'apple',
    description:
      'Every new iDevice, app, and computer from the biggest 🍎  in the world.',
    followersCount: 9367,
    postsCount: 729,
    image:
      'https://ph-files.imgix.net/e6bd8096-2de0-433c-8880-baac0ccd62c7?auto=format',
    trending: false,
  },
  {
    name: 'Google',
    slug: 'google',
    description:
      'From search, email, and video to A.I., self-driving cars, and VR, Google does it all. Don"t miss the latest products, projects, and resources from Google teams around the 🌏.',
    followersCount: 12400,
    postsCount: 471,
    image:
      'https://ph-files.imgix.net/7bdc49c4-466b-4124-b685-d826ec9f3adb?auto=format',
    trending: false,
  },
  {
    name: 'Wallpaper',
    slug: 'wallpaper',
    description:
      'Beautify and decorate all your screens with everything and anything from sunsets over mountains to artsy photos of pebbles',
    followersCount: 4722,
    postsCount: 163,
    image:
      'https://ph-files.imgix.net/01370f29-a17a-4ce4-b778-46e741dbfda4?auto=format',
    trending: false,
  },
  {
    name: 'Google Home',
    slug: 'google-home',
    description: 'Ok Google! What are some of the awesome things you can do?',
    followersCount: 5444,
    postsCount: 94,
    image:
      'https://ph-files.imgix.net/22490cdf-0b74-4879-a9fa-0b1ac40cfddc?auto=format',
    trending: false,
  },
  {
    name: 'Alexa Skills',
    slug: 'alexa-skills',
    description: '🗣 Alexa, what awesome things can you do?',
    followersCount: 6642,
    postsCount: 226,
    image:
      'https://ph-files.imgix.net/7732bad8-65de-4f27-b38e-c943b08e2b80?auto=format',
    trending: false,
  },
  {
    name: 'Touch Bar Apps',
    slug: 'touch-bar-apps',
    description: 'Apps built for Apple"s new Touch Bar 👇',
    followersCount: 40668,
    postsCount: 203,
    image:
      'https://ph-files.imgix.net/c74c96b5-94a5-4fce-8b39-9ec0e094d7ac?auto=format',
    trending: false,
  },
  {
    name: 'Airbnb',
    slug: 'airbnb',
    description: 'Travel the world and experience a place like you live there.',
    followersCount: 5452,
    postsCount: 124,
    image:
      'https://ph-files.imgix.net/2726a4e7-566e-4327-b9ae-3e22fdb28a1a?auto=format',
    trending: false,
  },
  {
    name: 'Books',
    slug: 'books',
    description:
      'There’s just nothing like a good book. Expand your knowledge or just kick back with a great adventure.',
    followersCount: 96258,
    postsCount: 7797,
    image:
      'https://ph-files.imgix.net/65334d10-36be-4e72-81a2-61b9799c1760?auto=format',
    trending: false,
  },
  {
    name: 'Games',
    slug: 'games',
    description:
      'Find something new and exciting to play at home or on the go. Work can wait. Have some fun.',
    followersCount: 74724,
    postsCount: 9753,
    image:
      'https://ph-files.imgix.net/13464a83-6701-4257-b810-c4c84979e3fc?auto=format',
    trending: false,
  },
  {
    name: 'Tech',
    slug: 'tech',
    description:
      'Hardware or software. Invention or innovation. If someone’s pushing technology forward, you’ll find it here.',
    followersCount: 230527,
    postsCount: 95568,
    image:
      'https://ph-files.imgix.net/701fd26a-c028-48ec-a7e8-bf0f89d48e03?auto=format',
    trending: false,
  },
  {
    name: 'iMessage Apps',
    slug: 'imessage-apps',
    description:
      'New in iOS 10, apps are integrated with messaging on your iPhone to easily create and share content, add stickers, make payments, and more, without leaving the conversation. ',
    followersCount: 20291,
    postsCount: 922,
    image:
      'https://ph-files.imgix.net/a0e1d2e2-c3f8-48a9-9b94-81ac45b792ab?auto=format',
    trending: false,
  },
  {
    name: 'Green Tech',
    slug: 'green-tech',
    description: 'Making the world a cleaner place',
    followersCount: 7901,
    postsCount: 214,
    image:
      'https://ph-files.imgix.net/1cb42979-ae05-4827-bda4-50de94fd622b?auto=format',
    trending: false,
  },
  {
    name: 'Pokemon',
    slug: 'pokemon',
    description: 'Gotta catch "em all',
    followersCount: 7087,
    postsCount: 242,
    image:
      'https://ph-files.imgix.net/b99d037f-b683-4801-8dc0-8ef28a5d75fa?auto=format',
    trending: false,
  },
  {
    name: 'Facebook Messenger',
    slug: 'facebook-messenger',
    description: '',
    followersCount: 8365,
    postsCount: 689,
    image:
      'https://ph-files.imgix.net/beeb2966-d52b-4791-8f97-207ec8925c49?auto=format',
    trending: false,
  },
  {
    name: 'Outdoors',
    slug: 'outdoors',
    description: '',
    followersCount: 5606,
    postsCount: 288,
    image:
      'https://ph-files.imgix.net/e839e3f7-2260-4c2d-be06-6ded2ce5f8f2?auto=format',
    trending: false,
  },
  {
    name: 'LinkedIn',
    slug: 'linkedin',
    description:
      'The most professional network of them all is more than just the website. Here"s a variety of apps and hacks built on top of the platform.',
    followersCount: 23569,
    postsCount: 176,
    image:
      'https://ph-files.imgix.net/645f1693-11c3-4dec-86f9-1377ef360c4e?auto=format',
    trending: false,
  },
  {
    name: 'Bots',
    slug: 'bots',
    description:
      'There’s a bot for just about everything, from restaurant recommendations to cat GIFs. ​Bleep bloop beep',
    followersCount: 92571,
    postsCount: 3075,
    image:
      'https://ph-files.imgix.net/caecc8f1-18c0-4c61-82b6-f451b9d1d68b?auto=format',
    trending: false,
  },
  {
    name: 'Medium',
    slug: 'medium',
    description:
      'All things Medium. Tools that make your writing experience better, plug into the Medium API, and more!',
    followersCount: 14620,
    postsCount: 107,
    image:
      'https://ph-files.imgix.net/4cafc1d9-45dd-4bee-8879-bb9de1cc7b07?auto=format',
    trending: false,
  },
  {
    name: 'Maps',
    slug: 'maps',
    description: 'There"s a map for that 🌎',
    followersCount: 10583,
    postsCount: 463,
    image:
      'https://ph-files.imgix.net/0d126b36-130e-423f-a7ea-1a660344f00e?auto=format',
    trending: false,
  },
  {
    name: 'Star Wars',
    slug: 'star-wars',
    description:
      'Jedi, droids, Stormtroopers, and more. Love these products you will.',
    followersCount: 2418,
    postsCount: 96,
    image:
      'https://ph-files.imgix.net/468e1a59-e1af-4a59-8782-042db1c287c7?auto=format',
    trending: false,
  },
  {
    name: 'Mac Menu Bar Apps',
    slug: 'mac-menu-bar-apps',
    description:
      'Tiny little apps that do magical things and live in your OS X menu bar. Collect "em all!',
    followersCount: 10012,
    postsCount: 498,
    image:
      'https://ph-files.imgix.net/4b58fa67-37e0-4824-b2f2-df968c8c7131?auto=format',
    trending: false,
  },
  {
    name: 'reddit',
    slug: 'reddit',
    description: 'The front page of the Internet',
    followersCount: 11449,
    postsCount: 115,
    image:
      'https://ph-files.imgix.net/c293687c-f816-47fb-9bbb-a71ffc92bd73?auto=format',
    trending: false,
  },
  {
    name: 'Virtual Assistants',
    slug: 'virtual-assistants',
    description:
      'We could all use a personal assistant. Offload your to-do list and save time with these helpful services.',
    followersCount: 11580,
    postsCount: 273,
    image:
      'https://ph-files.imgix.net/19de1ad2-d61c-401d-bcab-a03991fdf18c?auto=format',
    trending: false,
  },
  {
    name: 'Snapchat',
    slug: 'snapchat',
    description:
      "The hottest 'new' ephemeral social network used for more than just selfies. Follow ProductHuntTeam. 👻",
    followersCount: 17203,
    postsCount: 279,
    image:
      'https://ph-files.imgix.net/f7647ae2-8d42-4153-a296-c1dd5b9ec104?auto=format',
    trending: false,
  },
  {
    name: 'YouTube',
    slug: 'youtube',
    description:
      'The place to watch cats (and everything else on the internet)📽. Here are some apps and sites to YouTube better.',
    followersCount: 11290,
    postsCount: 461,
    image:
      'https://ph-files.imgix.net/cfce0050-13fb-4790-90cf-3badb66194d1?auto=format',
    trending: false,
  },
  {
    name: 'E-Commerce',
    slug: 'e-commerce',
    description:
      'Now you never have to leave the comfort of your home. Discover and purchase whatever you want, whenever you want.',
    followersCount: 27104,
    postsCount: 1800,
    image:
      'https://ph-files.imgix.net/1aa939fc-89dd-49ae-9fde-d456f9a6c8d2?auto=format',
    trending: false,
  },
  {
    name: 'Delivery',
    slug: 'delivery',
    description:
      'Until we have teleportation, this is your best bet for getting anything from point A to point B 📦',
    followersCount: 5164,
    postsCount: 287,
    image:
      'https://ph-files.imgix.net/d1d10203-e0ce-4fc6-8038-0ac55f4a7730?auto=format',
    trending: false,
  },
  {
    name: 'Product Hunt',
    slug: 'product-hunt',
    description:
      'The place to discover your next favorite thing. Hunt products, search for inspiration, or build along with us. Our community has already created a ton of great sites, extensions and apps with our API.',
    followersCount: 45799,
    postsCount: 559,
    image:
      'https://ph-files.imgix.net/c39c11c7-2e21-450d-bec8-f262e9689b5b?auto=format',
    trending: false,
  },
  {
    name: 'On-Demand',
    slug: 'on-demand',
    description:
      'Get what you want, when you want it, with a few taps. Don"t lift a finger... Ok, maybe just one finger.',
    followersCount: 5284,
    postsCount: 313,
    image:
      'https://ph-files.imgix.net/2f4600e3-8497-4576-972e-d6bfe1773430?auto=format',
    trending: false,
  },
  {
    name: 'Wi-Fi',
    slug: 'wi-fi',
    description:
      'A necessity these days. There are a bunch of helpful products that can help to keep you connected 24/7. (P.S. Does not play well with airplanes…yet)',
    followersCount: 6989,
    postsCount: 150,
    image:
      'https://ph-files.imgix.net/a8ecbc67-d1d4-49bc-b118-22f310c85b46?auto=format',
    trending: false,
  },
  {
    name: 'Donald Trump',
    slug: 'donald-trump',
    description:
      'Politician, businessman, television personality, and potentially the next President of the United States... we"ll avoid talking politics here. 😁',
    followersCount: 911,
    postsCount: 215,
    image:
      'https://ph-files.imgix.net/b27f5c51-20f4-4e4a-b35e-c07df24986d7?auto=format',
    trending: false,
  },
  {
    name: 'GitHub',
    slug: 'github',
    description:
      'Distributed version control as a service. But it"s so much more than that. GitHub is where developers build, collaborate and share software.',
    followersCount: 32691,
    postsCount: 566,
    image:
      'https://ph-files.imgix.net/60058201-2c97-4b80-bf4f-3ced91160181?auto=format',
    trending: false,
  },
  {
    name: 'Sketch',
    slug: 'sketch',
    description:
      'An alernative to Photoshop and Illustrator often used to design today"s most popular apps and sites.',
    followersCount: 16711,
    postsCount: 444,
    image:
      'https://ph-files.imgix.net/39095508-195a-4c65-843f-30d2a70aff67?auto=format',
    trending: false,
  },
  {
    name: 'Augmented Reality',
    slug: 'augmented-reality',
    description:
      'Transforming the world, AR has the potential to change our lives.',
    followersCount: 35528,
    postsCount: 878,
    image:
      'https://ph-files.imgix.net/526b491f-b909-4796-8e28-42192c62357c?auto=format',
    trending: false,
  },
  {
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    description:
      'A.I. helps save us time and scale personalized services like shopping like never before. But watch out, the robots are getting smarter.',
    followersCount: 226827,
    postsCount: 4207,
    image:
      'https://ph-files.imgix.net/0418cd04-f440-4021-8cf9-56be06164b0d?auto=format',
    trending: false,
  },
  {
    name: 'Developer Tools',
    slug: 'developer-tools',
    description:
      'Writing code is hard. So we make software to help us write software. Whether it"s a new text editor or little command line app. Dev tools are here to make your life as a developer even easier.',
    followersCount: 265775,
    postsCount: 12514,
    image:
      'https://ph-files.imgix.net/bcfb0ae5-5ebf-4557-93ff-2684a4530c17?auto=format',
    trending: false,
  },
  {
    name: 'Netflix',
    slug: 'netflix',
    description:
      "There are all sorts of apps to 'Netflix and chill' (in the literal sense) and improve your TV/movie streaming experience.",
    followersCount: 35530,
    postsCount: 143,
    image:
      'https://ph-files.imgix.net/effef378-b483-447e-904a-abf36e63926f?auto=format',
    trending: false,
  },
  {
    name: 'Kanye West',
    slug: 'kanye-west',
    description:
      'What isn"t Kanye? Recording artist, songwriter, producer, entrepreneur, fashion designer, epic tweetstormer... Yeezy does it all.',
    followersCount: 575,
    postsCount: 21,
    image:
      'https://ph-files.imgix.net/a5f02e7d-2898-4194-8af2-c2fea91e3008?auto=format',
    trending: false,
  },
  {
    name: 'Biohacking',
    slug: 'biohacking',
    description:
      'Biotechnology is a fascinating field where scientists and innovators manipulate living systems to improve the way we function.',
    followersCount: 11111,
    postsCount: 157,
    image:
      'https://ph-files.imgix.net/c5ab3d52-2a07-41ba-af41-d08d684459c6?auto=format',
    trending: false,
  },
]

const slugs = [
  'growth-hacks',
  'startup-lessons',
  'money',
  'work-in-progress',
  'side-projects',
  'maker-tools',
  'blockstack',
  'medtech',
  'cannabis',
  'quantified-self',
  'arkit',
  'apple',
  'google',
  'wallpaper',
  'google-home',
  'alexa-skills',
  'touch-bar-apps',
  'airbnb',
  'books',
  'games',
  'tech',
  'imessage-apps',
  'green-tech',
  'pokemon',
  'facebook-messenger',
  'outdoors',
  'linkedin',
  'bots',
  'medium',
  'maps',
  'star-wars',
  'mac-menu-bar-apps',
  'reddit',
  'virtual-assistants',
  'snapchat',
  'youtube',
  'e-commerce',
  'delivery',
  'product-hunt',
  'on-demand',
  'wi-fi',
  'donald-trump',
  'github',
  'sketch',
  'augmented-reality',
  'artificial-intelligence',
  'developer-tools',
  'netflix',
  'kanye-west',
  'biohacking',
]

module.exports = {
  topics,
  slugs,
}
