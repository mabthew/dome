import { OperationType } from "../actions/actionTypes";


export default function ItemOperationAlert(props: {type: OperationType, toastId: string, dismiss: Function, undo: Function, todoItemId: number}) {
    let message= "";
    let allowUndo = true;
    switch (props.type) {
        case OperationType.Complete:
            message = "Completed task";
            break;
        case OperationType.Delete:
            message = "Deleted task";
            break;
        case OperationType.Add:
            message = "Added task"
            allowUndo = false;
            break;
        default:
            message = "Uh oh I broken"
    }

    const handleUndo = () => {
        props.dismiss(props.toastId)
        if (allowUndo) {
            props.undo!(props.type, props.todoItemId)
        }   
    }
    return (
        <div className="flex">
            <p className="p-1.5">{message}</p>
            {/* TODO: Conditionally render bottom message if on a schedule */}
            {/* <p className="text-sm">Next occurrance: tomorrow</p> */}
            { allowUndo
                ? <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-red-500 hover:bg-gray-100 " onClick={handleUndo}>Undo</button>
                : <></>
            }
            <div className="p-1.5  py-1.5 rounded-lg text-sm hover:cursor-pointer hover:bg-gray-100" onClick={()=> props.dismiss(props.toastId)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    );
  }