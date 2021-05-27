import React from 'react'


import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { CasaCambioRouter } from './CasaCambioRouter';

export const AppRouter = () => {
    const isLoggedIn = false;
    return (
        <div>
                    <Router>
        <div>
            <Switch>
                <PublicRoute 
                    path="/app" 
                    component={CasaCambioRouter}
                    isAuth={isLoggedIn}
                />
                
                <PrivateRoute 
                    exact 
                    path="/admin" 
                    component={()=>(<h1>Wwewe</h1>)}
                    isAuth={isLoggedIn}
                />

            {/* <Redirect to="auth/login"/> */}
            </Switch>
        </div>
        </Router>
        </div>
    )
}
