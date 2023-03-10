export default function Modal(props: {text: string, setText: Function, setShowModal: Function, saveItem: Function}) {

    // This is to save on enter, but not when shift entering
    function onEnterPress(e: any): void {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            props.saveItem()
        }
    }

    return (
    <div id="item-modal" tabIndex={-1} className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto bg-zinc-700 bg-opacity-75 md:inset-0 h-modal md:h-full flex h-screen">
        <div className="relative w-2/3 h-3/4 mx-auto my-auto">
            <div className="relative bg-zinc-50 rounded-lg h-full shadow dark:bg-zinc-800">
                <button type="button" onClick={() => props.setShowModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="item-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">What do you need to do?</h3>
                    <form onSubmit={() => props.saveItem()}className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                            <textarea onKeyDown={onEnterPress} onChange={e=>props.setText(e.target.value)} className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Take it easy" value={props.text} required></textarea>
                        </div>
                        {/* <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                        </div>
                        <input datepicker type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Select date"></input>
                        </div> */}

                        <div className="flex flex-row text-xs font-semibold">
                            <div className="ml-auto">
                                <button type="reset" className="text-slate-800 mx-1 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-lg px-4 py-2 text-center dark:bg-zinc-300 dark:hover:bg-zinc-400 dark:focus:ring-indigo-800" onClick={()=>props.setShowModal(false)}>Cancel</button>
                            </div>
                            <div>
                                <button type="submit" className="text-white mx-1 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-lg px-4 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800" onClick={()=>props.saveItem()}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
  );
}