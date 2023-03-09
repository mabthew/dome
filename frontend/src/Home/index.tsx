import TodoList from "./TodoList";
import ItemInput from "./ItemInput";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import Placeholder from "./TodoListContainer";
import TodoListContainer from "./TodoListContainer";



export default function Home() {
    
    const sessionContext = useSessionContext();

    if (sessionContext.loading === true) {
        return null;
    }

    return (
        <div>
            <TodoListContainer userId={sessionContext.userId}></TodoListContainer>
        </div>
    );
}
