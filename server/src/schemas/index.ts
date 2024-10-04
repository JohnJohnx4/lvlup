const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Module {
    id: ID!
    title: String!
    description: String
    type: String!
    pointValue: Int!
    createdBy: User
  }

  type MediaFile {
    id: ID!
    url: String!
    type: String!
    pointValue: Int!
    uploadedBy: User
  }

  type Query {
    users: [User]
    modules: [Module]
    mediaFiles: [MediaFile]
  }

  type Mutation {
    createUser(username: String!, passwordHash: String!, email: String!): User
    createModule(
      title: String!
      description: String
      type: String!
      pointValue: Int!
      createdBy: ID!
    ): Module
    createMediaFile(
      url: String!
      type: String!
      pointValue: Int!
      uploadedBy: ID!
    ): MediaFile
  }
`;

export default typeDefs;
