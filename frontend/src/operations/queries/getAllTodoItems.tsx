
import { gql } from "@apollo/client";

export const GET_ALL_TODO_ITEMS = gql`
    query todoItems($user_id: ID!) {
        todoItems(user_id: $user_id) {
            id
            text
            completed
            created_at
            deleted_at
        }
    }
`