import pg from 'pg';
const { Pool } = pg;
import { DateTimeResolver } from 'graphql-scalars';

const credentials = {
    user: "postgres",
    host: "localhost",
    database: "todo",
    port: 5432,
  };

const pool = new Pool(credentials);

export const resolvers = {
  Query: {
    todoItems: async () => {
      const { rows } = await pool.query(
          'SELECT * FROM todo_items ORDER BY created_at ASC'
      );
      return rows;
    },
    userTodoItems: async (_: any, { user_id }: any , __: any) => {

      const { rows } = await pool.query(
        'SELECT * FROM todo_items WHERE user_id = $1 AND completed = false AND deleted_at is NULL ORDER BY created_at ASC',
        [user_id]
      );

      return rows;
    }
  },
  Mutation: {
    addTodoItem: async (_: any, { text, user_id }: any, __: any) => {
        const { rows } = await pool.query(
          'INSERT INTO todo_items (text, user_id, completed) VALUES ($1, $2, FALSE) RETURNING *', [
            text,
            user_id
          ]
        );
        return rows[0];
      },
      updateTodoItemText: async (_: any, { text, id , user_id }: any, __: any) => {
        const { rows } = await pool.query(
          'UPDATE todo_items SET text = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
          [text, id, user_id]
        );
        return rows[0];
      },
      deleteTodoItem: async (_: any, { id, user_id }: any, __: any) => {
        let { rowCount } = await pool.query(
          'UPDATE todo_items SET deleted_at = now() WHERE id = $1 and user_id = $2;',
          [id, user_id]
        );

        return rowCount === 1;
      },
      undoDeleteTodoItem: async (_: any, { id, user_id }: any, __: any) => {
        // TODO (before-deploy): clean this up
        let { rowCount } = await pool.query(
          'UPDATE todo_items SET deleted_at = null WHERE id = $1 and user_id = $2;',
          [id, user_id]
        );
        return rowCount === 1;
      },
      toggleTodoItemCompleted: async (_: any, { id , user_id }: any, __: any) => {
        const { rows } = await pool.query(
          'UPDATE todo_items SET completed = NOT completed WHERE id = $1 AND user_id = $2 RETURNING *',
          [id, user_id]
        );
        return rows[0];
      },
  },
  Date: DateTimeResolver
};