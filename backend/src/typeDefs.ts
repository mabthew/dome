// The GraphQL schema
import { gql }  from 'apollo-server';

export const typeDefs = gql`
  scalar Date

  type TodoItem {
    id: ID!
    text: String!
    completed: Boolean!
    created_at: Date!
    deleted_at: Date
    user_id: String!
  }

  type Query {
    todoItems(user_id: ID!): [TodoItem!]!
  }
  
  type Mutation {
    addTodoItem(text: String!, user_id: ID!): TodoItem!
    updateTodoItemText(text: String!, id: ID!, user_id: ID!): TodoItem!
    deleteTodoItem(id: ID!, user_id: ID!): Boolean
    undoDeleteTodoItem(id: ID!, user_id: ID!): Boolean
    toggleTodoItemCompleted(id: ID!, user_id: ID!): TodoItem
  }
`;