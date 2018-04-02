// @flow

import React from 'react'
import {Switch, Route} from 'react-router-dom'
import * as routes from '../constants/routes';
import ListPins from "./ListPins";
import PinDetails from "./PinDetails";

export default function MyPins() {
    return (
        <Switch>
            <Route exact path={routes.PINS} component={ListPins}/>
            <Route path={routes.PINS + '/:pinId'} component={PinDetails}/>
        </Switch>
    )
};
