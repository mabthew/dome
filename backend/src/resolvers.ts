import { DateTimeResolver } from 'graphql-scalars';

export const resolvers = {
  Query: {
    todoItems: async (_: any, { user_id }: any , { dataSources } : any) => {
      return dataSources.db.getUserTodoItems(user_id);
    }
  },
  Mutation: {
    addTodoItem: async (_: any, { text, user_id }: any, { dataSources }: any) => {
      const res =  await dataSources.db.addTodoItem(text, user_id);
      return res[0];
    },
    updateTodoItemText: async (_: any, { text, id , user_id }: any, { dataSources }: any) => {
      const res = await dataSources.db.updateTodoItemText(text, id, user_id);
      return res[0];
    },
    deleteTodoItem: async (_: any, { id, user_id }: any, { dataSources }: any) => {
      const res = await dataSources.db.deleteTodoItem(id, user_id);
      return res.length == 1; 
    },
    undoDeleteTodoItem: async (_: any, { id, user_id }: any, { dataSources }: any) => {
      const res = await dataSources.db.undoDeleteTodoItem(id, user_id);
      return res.length == 1; 
    },
    toggleTodoItemCompleted: async (_: any, { id , user_id }: any, { dataSources }: any) => {
      const res = await dataSources.db.toggleTodoItemCompleted(id, user_id);
      return res[0];
    },
  },
  Date: DateTimeResolver
};