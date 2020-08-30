require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')
const bodyParser = require('body-parser')
const {
  makeSchema,
  objectType,
  idArg,
  stringArg,
  booleanArg,
} = require('@nexus/schema')

const { PrismaClient } = require('@prisma/client')
const { nexusPrismaPlugin } = require('nexus-prisma')
const { checkJwt } = require('../middleware/checkJwt')
const { getUser } = require('../middleware/getUser')
const { createUser } = require('../utils/create-user')
const FlowClient = require('../flow/client')

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
])

const got = require('got')

const CURATED_TOPICS = [
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
]

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.avatar()
    t.model.username()
    t.model.headline()
    t.model.walletAddress()
    t.model.walletIsSetup()
    t.model.name()
    t.model.followedTopics()
  },
})

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.text()
    t.model.post()
    t.model.author()
    t.model.replies()
    t.model.votes()
    t.boolean('upvoted', {
      resolve: async (_, _args, ctx) => {
        const currentUser = ctx.request.user
        if (currentUser) {
          const votes = await ctx.prisma.commentVote.findMany({
            where: {
              comment: { id: _.id },
              user: { id: currentUser.id },
            },
          })
          if (votes.length > 0) {
            return true
          }
        }
        return false
      },
    })
    t.int('votesCount', {
      resolve: async (_, _args, ctx) => {
        const votes = await ctx.prisma.commentVote.findMany({
          where: { comment: { id: _.id } },
        })
        return votes.length
      },
    })
  },
})

const CommentVote = objectType({
  name: 'CommentVote',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.user()
    t.model.comment()
  },
})

const Topic = objectType({
  name: 'Topic',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.name()
    t.model.slug()
    t.model.description()
    t.model.image()
    t.model.followersCount()
    t.model.postsCount()
    t.model.trending()
    t.model.posts()
    t.model.followedBy()
  },
})

const Vote = objectType({
  name: 'Vote',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.user()
    t.model.post()
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.date()
    t.model.description()
    t.model.image()
    t.model.logo()
    t.model.publisher()
    t.model.title()
    t.model.url()
    t.model.archived()
    t.model.pinned()
    t.model.submitterId()
    t.model.submitter()
    t.model.comments({ ordering: true })
    t.model.votes()
    t.boolean('upvoted', {
      resolve: async (_, _args, ctx) => {
        const currentUser = ctx.request.user
        if (currentUser) {
          const votes = await ctx.prisma.vote.findMany({
            where: {
              post: { id: _.id },
              user: { id: currentUser.id },
            },
          })
          if (votes.length > 0) {
            return true
          }
        }
        return false
      },
    })
    t.int('votesCount', {
      resolve: async (_, _args, ctx) => {
        const votes = await ctx.prisma.vote.findMany({
          where: { post: { id: _.id } },
        })
        return votes.length
      },
    })
  },
})

const Section = objectType({
  name: 'Section',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.date()
    t.model.posts()
  },
})

const SignedUpload = objectType({
  name: 'SignedUpload',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.signedRequest()
    t.model.url()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.sections()
    t.crud.posts()
    // t.crud.post()
    t.list.field('feedPosts', {
      type: 'Post',

      resolve: async (_, {}, ctx) => {
        const currentUser = ctx.request.user
        let queryParams = {}
        if (currentUser) {
          queryParams = { where: { NOT: { submitterId: currentUser.id } } }
        }

        // const queryParams = currentUser

        const posts = await ctx.prisma.post.findMany({
          ...queryParams,
          orderBy: {
            createdAt: 'desc',
          },
        })
        return posts
      },
    })
    t.list.field('userPosts', {
      type: 'Post',
      args: {
        username: stringArg(),
        archived: booleanArg(),
        pinned: booleanArg(),
      },
      resolve: async (
        _,
        { username, archived = false, pinned = false },
        ctx,
      ) => {
        const currentUser = ctx.request.user
        const user = username
          ? await ctx.prisma.user.findOne({
              where: { username },
            })
          : currentUser

        const posts = await ctx.prisma.post.findMany({
          where: { submitterId: user.id, archived, pinned },
          orderBy: {
            createdAt: 'desc',
          },
        })
        return posts
      },
    })
    t.list.field('userPostsInbox', {
      type: 'Post',
      args: {
        username: stringArg(),
      },
      resolve: async (_, { username }, ctx) => {
        const posts = await ctx.prisma.post.findMany({
          where: { username },
        })
        return posts
      },
    })
    t.list.field('curatedTopics', {
      type: 'Topic',
      resolve: async (_, { slug }, ctx) => {
        const topics = await ctx.prisma.topic.findMany({
          where: { slug: { in: CURATED_TOPICS } },
        })
        return topics
      },
    })
    t.field('post', {
      type: 'Post',
      nullable: true,
      args: {
        slug: stringArg(),
      },
      resolve: async (_, { slug }, ctx) => {
        const post = await ctx.prisma.post.findOne({
          where: { slug },
        })
        return post
      },
    })
    t.field('comment', {
      type: 'Comment',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: async (_, { id }, ctx) => {
        const comment = await ctx.prisma.comment.findOne({
          where: { id },
        })
        return comment
      },
    })
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: async (_, _args, ctx) => {
        const user = ctx.request.user
        if (user) {
          if (!user.token) {
            const currentUser = await ctx.prisma.user.findOne({
              where: { id: user.id },
            })
            return currentUser
          } else {
            return createUser(ctx)
          }
        }
        return null
      },
    })
    t.list.field('userSearch', {
      type: 'User',
      args: {
        keyword: stringArg(),
      },
      resolve: (_, { keyword }, ctx) => {
        return ctx.prisma.user.findMany({
          first: 3,
          where: {
            OR: [
              { username_lower: { contains: keyword } },
              { name_lower: { contains: keyword } },
            ],
          },
        })
      },
    })
    t.list.field('feed', {
      type: 'Post',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: true },
        })
      },
    })
    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    t.field('associateWallet', {
      type: 'User',
      args: {
        address: stringArg(),
      },
      resolve: async (_, { address }, ctx) => {
        const currentUser = ctx.request.user
        return await ctx.prisma.user.update({
          where: { id: currentUser.id },
          data: {
            walletAddress: address,
            walletIsSetup: true,
          },
        })
      },
    })
    t.field('archivePost', {
      type: 'Post',
      args: {
        postId: stringArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        return await ctx.prisma.post.update({
          where: { id: postId },
          data: {
            archived: true,
          },
        })
      },
    })
    t.field('unarchivePost', {
      type: 'Post',
      args: {
        postId: stringArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        return await ctx.prisma.post.update({
          where: { id: postId },
          data: {
            archived: false,
          },
        })
      },
    }),
      t.crud.deleteOnePost()
    t.field('commentVote', {
      type: 'CommentVote',
      args: {
        commentId: idArg(),
        userId: idArg(),
      },
      resolve: async (_, { userId, commentId }, ctx) => {
        const votes = await ctx.prisma.commentVote.findMany({
          where: {
            user: {
              id: userId,
            },
            comment: {
              id: commentId,
            },
          },
        })
        if (votes.length > 0) {
          return ctx.prisma.commentVote.delete({
            where: {
              id: votes[0].id,
            },
          })
        }
        return ctx.prisma.commentVote.create({
          data: {
            user: { connect: { id: userId } },
            comment: { connect: { id: commentId } },
          },
        })
      },
    })
    t.field('vote', {
      type: 'Vote',
      args: {
        postId: idArg(),
        userId: idArg(),
      },
      resolve: async (_, { userId, postId }, ctx) => {
        const votes = await ctx.prisma.vote.findMany({
          where: {
            user: {
              id: userId,
            },
            post: {
              id: postId,
            },
          },
        })
        if (votes.length > 0) {
          return ctx.prisma.vote.delete({
            where: {
              id: votes[0].id,
            },
          })
        }
        return ctx.prisma.vote.create({
          data: {
            user: { connect: { id: userId } },
            post: { connect: { id: postId } },
          },
        })
      },
    })
    t.field('createPost', {
      type: 'Post',
      args: {
        givenUrl: stringArg(),
      },
      resolve: async (_, { givenUrl }, ctx) => {
        const currentUser = ctx.request.user
        const { walletIsSetup, walletAddress } = currentUser
        const response = await saveUrl(givenUrl, currentUser)
        // Send 1 token to user that created the post
        if (walletIsSetup && walletAddress && process.env.FLOW_ENABLED) {
          FlowClient.mintAndSendTokens({
            quantity: 1,
            address: walletAddress,
          })
        }
        return response
      },
    })
    t.field('createComment', {
      type: 'Comment',
      args: {
        body: stringArg(),
        postId: idArg(),
        parentId: idArg(),
      },
      resolve: async (_, { body, postId, parentId }, ctx) => {
        const currentUser = ctx.request.user
        const obj = {
          author: { connect: { id: currentUser.id } },
          text: body,
        }
        if (parentId) {
          obj.parent = { connect: { id: parentId } }
        } else {
          obj.post = { connect: { id: postId } }
        }
        const comment = await prisma.comment.create({
          data: {
            ...obj,
          },
        })
        return comment
      },
    })
    t.field('updateFollowedTopic', {
      type: 'Topic',
      args: {
        userId: idArg(),
        topicId: idArg(),
        following: booleanArg(),
      },
      resolve: async (_, { userId, topicId, following }, ctx) => {
        const action = following ? 'connect' : 'disconnect'
        await ctx.prisma.user.update({
          where: { id: userId },
          data: {
            followedTopics: {
              [action]: { id: topicId },
            },
          },
        })
        return ctx.prisma.topic.findOne({ where: { id: topicId } })
      },
    })
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.post.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})

const saveUrl = async (givenUrl, currentUser) => {
  const { body: html, url } = await got(givenUrl)
  const metadata = await metascraper({ html, url })
  return await prisma.post.create({
    data: {
      submitter: { connect: { id: currentUser.id } },
      ...metadata,
    },
  })
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
  schema: makeSchema({
    types: [
      Query,
      Mutation,
      Post,
      User,
      Section,
      Comment,
      CommentVote,
      Topic,
      Vote,
      SignedUpload,
    ],
    plugins: [nexusPrismaPlugin()],
  }),
  context: req => ({ ...req, prisma }),
  middlewares: [],
})

server.express.use(bodyParser.json()) // support json encoded bodies
server.express.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

server.express.get('/healthz', async (req, res, done) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  }
  res.json(healthcheck)
})

server.express.post('/save', checkJwt, async (req, res, done) => {
  // getUser(req, res, next, prisma)
  console.log('-------req.body------')
  console.log(req.body)
  console.log('-------------')
  console.log('-------req.headers------')
  console.log(req.headers)
  console.log('---------------')
  const { givenUrl, title } = req.body
  // const title = req.body.givenUrl
  const user = req.user
  const auth0id = req.user.sub
  const currentUser = await prisma.user.findOne({ where: { auth0id } })
  console.log('---currentUser---', currentUser)
  const response = await saveUrl(givenUrl, currentUser)
  console.log('---- response test ----', response)
  // console.log('...givenUrl...', givenUrl)

  res.json({ sendUrl: givenUrl })
})

server.express.post('/graphql', checkJwt, (err, req, res, next) => {
  if (err) return res.status(401).send(err.message)
  next()
})

// server.express.get('/health', (req, res, next) => {
//   console.log('---------------- ')
//   console.log('---------------- ')
//   console.log('---------------- ')
//   console.log('---------------- ')
//   res.json({ status: 'UP' })
// })

server.express.use('/graphql', (req, res, next) => {
  getUser(req, res, next, prisma)
})

server.start(
  {
    endpoint: '/graphql',
    playground: '/graphql',
    subscriptions: false,
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#5-using-the-graphql-api`,
    ),
)
