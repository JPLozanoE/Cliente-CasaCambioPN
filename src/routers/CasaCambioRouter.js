import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { MapScreen } from './../components/map/MapScreen';
import { FromScreen } from './../components/form/FromScreen';
import { LandingScreen } from './../components/landing/LandingScreen';

export const CasaCambioRouter = () => {
    return (
        
        <div>
        <Switch>
            <Route path="/app/main" component={LandingScreen} />
            <Route path="/app/map" component={MapScreen} />
            <Route path="/app/register" component={FromScreen} />
            <Redirect to="/app/main"/>
        </Switch>
        </div>
    )
}
