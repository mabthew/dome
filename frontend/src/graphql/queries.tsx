import { gql } from "@apollo/client";

export const queries = {
    // GET_TODOS: gql`
    // query userTodoItems($user_id: ID!) {
    //     userTodoItems(user_id: $user_id) {
    //         id
    //         text
    //         completed
    //         created_at
    //         deleted_at
    //     }
    // }`,
    // ADD_TODO: gql`
    // mutation addTodoItem($text: String!, $user_id: ID!) {
    //   addTodoItem(text: $text, user_id: $user_id) {
    //     id
    //     text
    //     completed
    //     created_at
    //     deleted_at
    //   }
    // }`,
    UPDATE_ITEM: gql`
    mutation updateTodoItemText($text: String!, $id: ID!, $user_id: ID!) {
      updateTodoItemText(text: $text, id: $id, user_id: $user_id) {
        id
        text
        user_id
      }
    }`,
    TOGGLE_ITEM_COMPLETED: gql`
    mutation toggleTodoItemCompleted($id: ID!, $user_id: ID!) {
      toggleTodoItemCompleted(id: $id, user_id: $user_id) {
        id
        completed
      }
    }`,
    DELETE_ITEM: gql`
    mutation deleteTodoItem($id: ID!, $user_id: ID!) {
      deleteTodoItem(id: $id, user_id: $user_id)
    }`,
    UNDO_DELETE_ITEM: gql`
    mutation undoDeleteTodoItem($id: ID!, $user_id: ID!) {
      undoDeleteTodoItem(id: $id, user_id: $user_id)
    }`,
}
