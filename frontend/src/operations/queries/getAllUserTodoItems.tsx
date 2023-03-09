
import { gql } from "@apollo/client";

export const GET_ALL_USER_TODO_ITEMS = gql`
    query userTodoItems($user_id: ID!) {
        userTodoItems(user_id: $user_id) {
            id
            text
            completed
            created_at
            deleted_at
        }
    }
`