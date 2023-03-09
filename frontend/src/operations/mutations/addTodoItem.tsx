
import { gql } from "@apollo/client";


export const ADD_TODO = gql`
    mutation addTodoItem($text: String!, $user_id: ID!) {
        addTodoItem(text: $text, user_id: $user_id) {
            id
            text
            completed
            created_at
            deleted_at
        }
    }
`
