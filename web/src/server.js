const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

const resolvers = {
  Query: {
    articles: async (_, { category, country }) => {
      const response = await axios.get(
        `http://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=100&apiKey=${process.env.NEWSAPI_KEY}`
      );
      const articles = response.data.articles;
      return articles;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} `);
});
