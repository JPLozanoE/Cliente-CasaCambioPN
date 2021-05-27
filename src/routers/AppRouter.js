import React from 'react'


import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { CasaCambioRouter } from './CasaCambioRouter';

export const AppRouter = () => {
    return (
        <div>
                    <Router>
        <div>
            <Switch>
                <PublicRoute 
                    path="/app" 
                    component={CasaCambioRouter}
                    // isAuth={isLoggedIn}
                />
                
                <PrivateRoute 
                    exact 
                    path="/admin" 
                    component={()=>(<h1>Wwewe</h1>)}
                    isAuth={true}
                />

            {/* <Redirect to="auth/login"/> */}
            </Switch>
        </div>
        </Router>
        </div>
    )
}
