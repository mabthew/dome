const { SQLDataSource } = require("datasource-sql");

// TODO: consider using .cache() on some of these?
class PostgresDatabase extends SQLDataSource {
  getUserTodoItems(user_id: string) {
    return this
      .knex('todo_items')
      .where({ 
        user_id,
        'completed': false,
        'deleted_at': null
      })
      .orderBy('created_at', 'asc');
  }

  addTodoItem(text: string, user_id: string) {
    return this
      .knex('todo_items')
      .insert(
        { text, user_id },
        ['*']
      );
  }

  updateTodoItemText(text: string, id: string, user_id: string) {
    return this
      .knex('todo_items')
      .where({ id, user_id})
      .update(
        { text },
        ['*']
      );
  }

  deleteTodoItem(id: string, user_id: string) {
    return this
      .knex('todo_items')
      .where({ id, user_id })
      .update(
        { 'deleted_at': 'NOW()' },
        ['*']
      )
  }

  undoDeleteTodoItem(id: string, user_id: string) {
    return this
      .knex('todo_items')
      .where({ id, user_id })
      .update(
        { 'deleted_at': null },
        ['*']
      )
  }

  toggleTodoItemCompleted(id: string, user_id: string) {
    return this
      .knex('todo_items')
      .where({ id, user_id })
      .update(
        {'completed': this.knex.raw('NOT ??',  ['completed'])}, // super ugly, just sets completed = !completed
        ['*']
      )
  }
}

module.exports = PostgresDatabase;