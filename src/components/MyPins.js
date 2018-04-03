// @flow

import React from 'react'
import {Route} from 'react-router-dom'
import * as routes from '../constants/routes';
import ListPins from "./Pin/ListPins";
import PinDetails from "./Pin/PinDetails";


type Props = {
    authUser: { uid: string },
}


export default class MyPins extends React.Component<Props> {
    render() {
        return (
            <div>
                <Route
                    exact path={routes.PINS}
                    render={(props) => (<ListPins {...props} authUser={this.props.authUser}/>)}
                />
                <Route
                    path={routes.PINS + '/:pinId'}
                    component={PinDetails}
                />
            </div>
        )
    }
}

