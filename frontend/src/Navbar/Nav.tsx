import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/session";
import Logout from "./Logout";

export default function Navbar(props: {darkMode: Boolean, toggleDarkMode: () => void}) {
    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }
    return (
      <nav className="sticky top-0 h-14 max-h-14 bg-white border-b border-zinc-200 px-2 sm:px-4 py-3.5 rounded dark:bg-neutral-800 dark:border-zinc-900 z-50">
        <div className="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          className="w-5 h-5 dark:invert"
        >
          <path
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M6 22H26V26H6z"
          ></path>
          <path
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M6 14H26V18H6z"
          ></path>
          <path
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M6 6H26V10H6z"
          ></path>
          <path d="M6 6H11V10H6z"></path>
          <path d="M6 14H21V18H6z"></path>
          <path d="M6 22H16V26H6z"></path>
        </svg>
          <span className="self-center text-lg font-semibold ml-2 whitespace-nowrap dark:text-white">dome</span>
          <div className="relative hidden lg:flex items-center order-last pl-6 border-l">
                  <button
                    id="theme-toggle"
                    onClick={props.toggleDarkMode}
                    type="button"
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 focus:outline-none rounded-lg text-sm p-1.5"
                  >
                    {
                      props.darkMode ?
                      <svg id="theme-toggle-light-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                      </svg>
                      :
                      <svg id="theme-toggle-dark-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    }
                    
                    
                  </button>
              <button data-collapse-toggle="mobile-menu-4" type="button" className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm p-2 inline-flex items-center dark:text-gray-400 dark:hover:bg-zinc-800 dark:focus:ring-gray-600" aria-controls="mobile-menu-4" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className="hidden md:flex justify-between items-center w-full ml-auto pr-6 md:w-auto md:order-1" id="mobile-menu-4">
            <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a href="#" className="bg-indigo-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-indigo-700 md:p-0 rounded dark:text-white" aria-current="page">Profile</a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><Logout logoutClicked={logoutClicked}></Logout></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    );
}
