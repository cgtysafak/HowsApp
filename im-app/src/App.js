import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";


function App() {
    const [{user}, dispatch] = useStateValue();
    
    return (
        <div id="im-app" className="grid bg-gray-600 h-screen place-items-center">
            {!user ? ( //Check if user logged in
                <Login/>
            ):(
                <div id="im-body" className="grid grid-cols-8 flex bg-slate-300 -mt-12 h-screen/90 w-screen/90 shadow-2xl">
                <Router>
                    <div className="col-span-2">
                        <Sidebar/>
                    </div>
                    <Switch>
                        <Route path="/chat/:roomID">
                            <div className="col-span-6">
                                <Main/>
                            </div> 
                        </Route>
                        <Route exact path="/">
                            <div className="col-span-6">
                                <Main/>
                            </div> 
                        </Route>
                    </Switch>
                </Router>
            </div>
            )}
            
        </div>
    );
}

export default App;
