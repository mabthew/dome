import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import Modal from "./Modal";
import TodoItem from './TodoItem';
import { useMutation } from '@apollo/client';
import { queries } from '../graphql/queries';
import autoAnimate from '@formkit/auto-animate';
import ItemOperationAlert from './ItemOperationAlert';
import { Toaster, toast } from 'react-hot-toast';
import { OperationType } from '../actions/actionTypes';
const { DateTime } = require("luxon");

// TODO (before-deploy): This file absolutely sucks. clean it up. probably start with finding a way
//                          to decrease the amount or prop passing with ItemOperationAlert
export default function TodoList(props: { userId: String, userTodoItems: [], updateItems: Function, popToast: Function, openModal: Function }) {
    let userId = props.userId;
    let userTodoItems = props.userTodoItems;

    const parentRef = useRef<HTMLDivElement>();
    const [updateItem, { data, loading, error }] = useMutation(queries.UPDATE_ITEM);

      const uniqueDays = new Set<String>;
      userTodoItems.forEach((item: any) => {
        let day = DateTime.fromISO(item.created_at).toFormat('EEE MMM dd');
        if (!uniqueDays.has(day)) {
            uniqueDays.add(day)
        }
      })

      const todoItemElementsByDate: JSX.Element[] = [];
      uniqueDays.forEach((day: any) => {
        const items: JSX.Element[] = userTodoItems.filter((item: any) => DateTime.fromISO(item.created_at).toFormat('EEE MMM dd') == day).map((it: any, index: number) => {
            return (
                <div key={index}>
                    <TodoItem key={index} userId={userId} todoItem={it} updateItems={props.updateItems} openModal={props.openModal} popToast={props.popToast}/>
                </div>)
        })

        todoItemElementsByDate.push(
                // ref={parentRef as React.RefObject<HTMLDivElement>}
                <div className="relative" key={day}>
                    <div className="sticky top-14 p-4 bg-gray-50 font-bold dark:bg-zinc-800 border-b border-zinc-200 dark:border-gray" key={day}>{day}</div>
                    {items}
                </div>
            )
      })

    return (
        <div className="flex justify-center top-14">
            <div className="flex w-1/2">
                <ul className="w-full">
                    {todoItemElementsByDate}
                </ul>
            </div>
            <div>
                {/* TODO (before-deploy): change for dark mode */}
                {/* TODO (before-deploy): handle pause on hover (look in bookmarks) */}
                <Toaster position="bottom-left" toastOptions={{
                    duration: 10000,
                    style: {
                        fontSize: "14px",
                        padding: "4px"
                    }
                }}/>
            </div>
        </div>
    );
    
}
