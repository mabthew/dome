import { useMutation, gql } from "@apollo/client";
import { useState } from 'react';
import Modal from "./Modal";
import React from "react";
import { queries } from "../graphql/queries";
import { OperationType } from "../actions/actionTypes";
import { ADD_TODO } from "../operations/mutations/addTodoItem";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    datepicker?: boolean;
  }
};


export default function ItemInput(props: { userId: String, updateItems: Function, popToast: Function }) {
    let userId = props.userId;
    const [addTodoItem, { data, loading, error }] = useMutation(ADD_TODO, {});
    const [text, setText] = useState("");
    const [showModal, setShowModal] = React.useState(false);

    const submit = (e: React.FormEvent) => {
      e.preventDefault()
      addTodoItem({
        variables: { text: text, user_id: userId },
        update(cache, mutationResult) {
          const resultItem = mutationResult?.data?.addTodoItem;

          if (resultItem) {
            cache.modify({
              fields: {
                userTodoItems(existingItemsRef = []) {
                  const newItemRef = cache.writeFragment({
                    data: resultItem,
                    fragment: gql`
                      fragment NewTodoItem on TodoItem {
                        id
                        text
                        completed
                        created_at
                        deleted_at
                      }
                    `,
                  });

                  return existingItemsRef.concat(newItemRef);
                }
              }
            });
          }
        },
        optimisticResponse: {
          addTodoItem: {
            __typename: "TodoItem",
            id: Math.random() * -100,
            text: text,
            completed: false,
            created_at: new Date().toISOString(),
            deleted_at: null
          },
        },
       });

      setText("");

      props.popToast(OperationType.Add);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 50)
    }
    
    if (error) return <pre>{error.message}</pre>

    return (
      <div className="flex justify-center text-sm">
        <div className="flex w-1/2">
          {
            !showModal ?
            <div className="flex mt-8 ml-8 hover:text-indigo-700 hover:cursor-pointer" onClick={() => setShowModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <div className="ml-1 text-slate-600 dark:text-gray-400">Add a task</div>
            </div>
            :
            <div className="w-full h-full -mt-px border-t border-gray-50 z-10">
            <form onSubmit={submit} className="w-full h-full mt-1 p-2 border-top border border-zinc-200 focus-within:border-zinc-600 rounded-md">
              <div className="border-b border-zinc-200">
               <input onChange={e=>setText(e.target.value)} className="w-full outline-none bg-gray-50 py-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="What do you need to do?" value={text} required autoFocus></input>
              </div>
              <div className="flex flex-row text-xs font-semibold pt-2">
                  <div className="ml-auto">
                      <button type="reset" className="text-slate-800 mx-1 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-lg px-4 py-2 text-center dark:bg-zinc-300 dark:hover:bg-zinc-400 dark:focus:ring-indigo-800" onClick={()=>setShowModal(false)}>Cancel</button>
                  </div>
                  <div>
                      <button type="submit" className="text-white mx-1 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-lg px-4 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:opacity-50" onClick={submit} disabled={text === ""}>Save</button>
                  </div>
              </div>
            </form>
            </div>
          }          
        </div>
      </div>
    );
}