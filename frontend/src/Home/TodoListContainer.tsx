import TodoList from "./TodoList";
import ItemInput from "./ItemInput";
import Loader from "../common/Loader";
import { useQuery, useMutation } from "@apollo/client";
import { queries } from '../graphql/queries';
import { useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { OperationType } from "../actions/actionTypes";
import ItemOperationAlert from "./ItemOperationAlert";
import Modal from "./Modal";
import { GET_ALL_TODO_ITEMS } from "../operations/queries/getAllTodoItems";

export default function TodoListContainer(props: { userId: String}) {

    let userId = props.userId;
    const [text, setText] = useState("");
    const [updateItem, {  }] = useMutation(queries.UPDATE_ITEM);

    const { data, loading, error, refetch} = useQuery(GET_ALL_TODO_ITEMS, {
      });

    function updateItems(): void {
        refetch();
    }

    const [activeItem, setActiveItem] = useState(-1);
    const [showModal, setShowModal] = React.useState(false);

    const notify = (type: OperationType, todoItemId: number) => {
        toast(
            (t) => (
                <ItemOperationAlert type={type} dismiss={toast.dismiss} toastId={t.id} undo={handleUndo} todoItemId={todoItemId}></ItemOperationAlert>
            ),
            {}
          );
    }

    const [undoCompleteItem] = useMutation(queries.TOGGLE_ITEM_COMPLETED, {
        refetchQueries: [
          {
            query: GET_ALL_TODO_ITEMS,
          },
        ]
      });

      const [undoDeleteItem] = useMutation(queries.UNDO_DELETE_ITEM, {
        refetchQueries: [
          {
            query: GET_ALL_TODO_ITEMS,
          },
        ]
      });

      const handleUndo = (type: OperationType, todoItemId: number) => {
        switch (type) {
            case OperationType.Complete:
                undoCompleteItem({ variables: { id: todoItemId, user_id: userId } });
                break;
            case OperationType.Delete:
                undoDeleteItem({ variables: { id: todoItemId, user_id: userId } });
                break;
            case OperationType.Add:
                // no op
                break;
            default:
                console.log('bad type')
        }
    }

    const openModal = (todoItem: any) => {
        setText(todoItem.text);
        setActiveItem(todoItem.id)
        setShowModal(true);
    }

    const submit = () => {
        updateItem({ variables: { text: text, id: activeItem, user_id: userId } })
        // props.updateItems();
        setShowModal(false);
    }

    const popToast = (type: OperationType, todoItemId: number) => {
        notify(type, todoItemId);
    }

    if (loading) 
    {
        return <Loader />
    }
    if (error) return <pre>{error.message}</pre>

    return (
        <div className="pb-12">
            <TodoList userId={userId} todoItems={data.todoItems} updateItems={refetch} popToast={popToast} openModal={openModal}/>
            <ItemInput userId={userId} updateItems={updateItems} popToast={popToast}/>
            {
                        showModal 
                        ? <Modal text={text} setText={setText} setShowModal={setShowModal} saveItem={submit}/> 
                        : null
                    }
        </div>
    );
}
