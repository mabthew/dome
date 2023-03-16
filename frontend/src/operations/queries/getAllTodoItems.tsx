
import { gql } from "@apollo/client";

export const GET_ALL_TODO_ITEMS = gql`
    query todoItems {
        todoItems {
            id
            text
            completed
            created_at
            deleted_at
        }
    }
`