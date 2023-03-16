import { DateTimeResolver } from 'graphql-scalars';
import Session from "supertokens-node/recipe/session";
import { User } from './sessions/user';

export const resolvers = {
  Query: {
    todoItems: async (_: any, __: any, { todosDB, req, res }: any) => {
      let userId = await User.getUserId({req,res});
      
      return todosDB.getUserTodoItems(userId);
    }
  },
  Mutation: {
    addTodoItem: async (_: any, { text, user_id }: any, { todosDB, req, res }: any) => {
      let userId = await User.getUserId({req,res});

      const rows =  await todosDB.addTodoItem(text, userId);
      return rows[0];
    },
    updateTodoItemText: async (_: any, { text, id , user_id }: any, { todosDB, req, res }: any) => {
      let userId = await User.getUserId({req,res});

      const rows = await todosDB.updateTodoItemText(text, id, userId);
      return rows[0];
    },
    deleteTodoItem: async (_: any, { id, user_id }: any, { todosDB, req, res }: any) => {
      let userId = await User.getUserId({req,res});

      const rows = await todosDB.deleteTodoItem(id, userId);
      return rows.length == 1; 
    },
    undoDeleteTodoItem: async (_: any, { id, user_id }: any, { todosDB, req, res }: any) => {
      let userId = await User.getUserId({req,res});

      const rows = await todosDB.undoDeleteTodoItem(id, userId);
      return rows.length == 1; 
    },
    toggleTodoItemCompleted: async (_: any, { id , user_id }: any, { todosDB, req, res }: any) => {
      let userId = await User.getUserId({req,res});
      
      const rows = await todosDB.toggleTodoItemCompleted(id, userId);
      return rows[0];
    },
  },
  Date: DateTimeResolver
};