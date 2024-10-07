const typeDefs = `#graphql
  type Course {
    id: ID!
    title: String!
    description: String!
    createdBy: String!
    isPublic: Boolean!
    createdAt: String!
    updatedAt: String!
    modules: [Module]
  }

  type Module {
    id: ID!
    title: String!
    description: String!
    courseId: String!
    type: String!
    pointValue: Int!
    createdAt: String!
    media: [MediaContent]
  }

  type MediaContent {
    id: ID!
    url: String!
    moduleId: String!
    type: String!
    pointValue: Int!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
  }

  type UserCourseAssignment {
    id: ID!
    userId: String!
    courseId: String!
    assignedBy: String!
    assignedAt: String!
  }

  type Query {
    courses: [Course]
    course(id: ID!): Course
    users: [User]
    user(id: ID!): User
    modules(courseId: ID!): [Module]
    media(moduleId: ID!): [MediaContent]
    userCourseAssignments(userId: ID!): [UserCourseAssignment]
    mediaContent(id: ID!): MediaContent
  }

  type Mutation {
    createCourse(
      title: String!
      description: String!
      createdBy: String
      isPublic: Boolean
    ): Course
    createModule(
      title: String!
      description: String!
      courseId: String!
      type: String!
      pointValue: Int!
    ): Module
    createMediaContent(
      url: String!
      moduleId: String!
      type: String!
      pointValue: Int!
    ): MediaContent
    updateMediaContent(
      id: ID!
      url: String
      type: String
      pointValue: Int
    ): MediaContent
    assignCourseToUser(
      userId: ID!
      courseId: ID!
      assignedBy: ID!
    ): UserCourseAssignment
    deleteMediaContent(id: ID!): MediaContent
  }
`;

export default typeDefs;
