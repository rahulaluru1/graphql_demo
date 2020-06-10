var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        repo(id: Int!): Repo
        repos(topic: String): [Repo]
    },
    type Repo {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);
var repoData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer repo',
        author: 'Rahul Aluru',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://github.com/rahulaluru1/keepapp'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript repo for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]
var getRepo = function(args) { 
    var id = args.id;
    return repoData.filter(repo => {
        return repo.id == id;
    })[0];
}
var getReops = function(args) {
    return repoData;
}
var root = {
    repo: getRepo,
    repos: getReops
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));