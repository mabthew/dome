import "./App.css";
import React from "react";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import { SuperTokensConfig } from "./config";
import Navbar from "./Navbar/Nav";


SuperTokens.init(SuperTokensConfig);

function App() {

    const [darkMode, setDarkMode] = React.useState(false)

    function toggleDarkMode() {
        setDarkMode(prevDarkMode => !prevDarkMode)
    }

    return (
        <SuperTokensWrapper>
            <div className={`flex flex-col w-full min-h-screen ${darkMode ? "dark" : "bg-gray-50"}`}>
                <Router>
                    <div>
                        <Routes>
                            {/* This shows the login UI on "/auth" route */}
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                            <Route
                                path="/"
                                element={
                                    /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */
                                    <SessionAuth>
                                        <Navbar
                                            darkMode={darkMode} 
                                            toggleDarkMode={toggleDarkMode} />
                                        <Home />
                                    </SessionAuth>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
