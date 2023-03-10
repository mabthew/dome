import { useMutation, gql } from "@apollo/client";
import { queries } from "../graphql/queries";
import { GET_ALL_TODO_ITEMS } from '../operations/queries/getAllTodoItems';
import { OperationType } from "../actions/actionTypes";
const { DateTime } = require("luxon");

type TodoItemProps = {
  text: string;
  completed: string;
  created_at: string;
  id: string;
};

interface TodoItemsResult {
  todoItems: any;
}

export default function TodoItem(props: {userId: String, todoItem: TodoItemProps, updateItems: Function, openModal: Function, popToast: Function}) {
    let userId = props.userId;
    let todoItem = props.todoItem;
    
    const [completeTodoItem] = useMutation(queries.TOGGLE_ITEM_COMPLETED, {
      refetchQueries: [
        {
          query: GET_ALL_TODO_ITEMS, 
          variables: {user_id: userId}
        },
      ]
    });

    const [deleteTodoItem] = useMutation(queries.DELETE_ITEM, {
      refetchQueries: [
        {
          query: GET_ALL_TODO_ITEMS, 
          variables: {user_id: userId}
        },
      ]
    });

    function handleDelete(e: any) {
      if (!e) e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();

      deleteTodoItem({
        variables: { id: todoItem.id, user_id: userId },
        update(cache, _) {          
          let existingTodos = cache.readQuery<TodoItemsResult>({
            query: GET_ALL_TODO_ITEMS, 
            variables: {user_id: userId}
          })

          const newTodos = existingTodos!.todoItems.filter((t: any) => (t.id !== todoItem.id));
          
          cache.writeQuery({ query: GET_ALL_TODO_ITEMS , data: { todoItems: newTodos }, variables: { user_id: userId }});
        },
        optimisticResponse: {
          deleteTodoItem: {
              __typename: "TodoItem",
              id: todoItem.id
            }
         }
      });
      props.popToast(OperationType.Delete, todoItem.id);
    }

    function handleComplete(e: any) {
      if (!e) e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();

      completeTodoItem({
        variables: { id: todoItem.id, user_id: userId },
        update(cache, mutationResult) {
          
          let existingTodos = cache.readQuery<TodoItemsResult>({
            query: GET_ALL_TODO_ITEMS, 
            variables: {user_id: userId}
          })
     
          // this code looks the same as the delete code because the query GET_ALL_USER_TODO_ITEMS only returns
          // non-completed todo items in the firest place
          const newTodos = existingTodos!.todoItems.filter((t: any) => (t.id !== todoItem.id));
          
          cache.writeQuery({ query: GET_ALL_TODO_ITEMS , data: { todoItems: newTodos }, variables: { user_id: userId }});
        },
        optimisticResponse: {
          toggleTodoItemCompleted: {
              __typename: "TodoItem",
              id: todoItem.id,
              completed: true
            }
        }
      })
      props.popToast(OperationType.Complete, todoItem.id);
    }

    const date = DateTime.fromISO(todoItem.created_at);

    return (
        <div className={`w-full h-full ${parseInt(todoItem.id) < 0 ? "opacity-30" : ""}`} onClick={() => props.openModal(todoItem)}>
            <li className="py-5 w-full h-full text-sm border-b border-zinc-200 border-collapse hover:cursor-pointer dark:border-gray-600 item"key={todoItem.id}>
              <div className="flex flex-row">
                  <div className="basis-1 px-2 pt-1" onClick={(e) => handleComplete(e)}>
                    <button type="button" className="w-5 h-5 border border-slate-400 rounded-full complete-circle text-slate-400 dark:border-gray-500 hover:bg-slate-100 dark:hover:bg-zinc-700">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="pt-0.5 pl-0.5 w-4 h-4 complete">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                  </div>
                <div className="px-2">
                  {todoItem.text}
                  <div className="text-xs ml-1 text-slate-600 dark:text-gray-500">{date.toFormat('t')}</div>
                </div>
                <div className="flex w-12 ml-auto">
                  <button type="button" className="px-1 text-slate-400 hidden hover:cursor-pointer hover:text-indigo-700 ml-auto delete" onClick={() => props.openModal(todoItem)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                  </button>
                  <button type="button" className="px-1 text-slate-400 hidden hover:cursor-pointer hover:text-red-500 ml-auto delete" onClick={(e) => handleDelete(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
        </div>

    );
    
}
