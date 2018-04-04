// @flow

import React from 'react'
import {db} from '../../backend/firebase/index';
import {PinNode} from "./PinNode";
import CreatePinForm from "./TESTING_CreatePin";


type DbHandle = {
    detach: () => {},
}

type State = {
    pins: number[],
    dbHandle: ?DbHandle,
}

type Props = {
    authUser: { uid: string },
}


export default class ListPins extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            pins: [],
            dbHandle: null
        };
    }

    componentDidMount() {
        this.setState({
            dbHandle: db.onOwnPins(
                this.props.authUser,
                this.keyEntered,
                this.keyLeft
            )
        })
    }

    componentWillUnmount() {
        if (this.state.dbHandle)
            this.state.dbHandle.detach();
    }

    keyEntered = (key: number) => {
        this.setState((prevState) => {
            const updatedNearbyPinKeys = prevState.pins.slice();
            updatedNearbyPinKeys.push(key);
            return {pins: updatedNearbyPinKeys};
        });
    };

    keyLeft = (key: number) => {
        this.setState((prevState) => {
            const updatedNearbyPinKeys = prevState.pins.slice();
            updatedNearbyPinKeys.splice(updatedNearbyPinKeys.indexOf(key), 1);
            return {pins: updatedNearbyPinKeys};
        });
    };

    render() {
        const listItems = this.state.pins.map((pinId) =>
            <PinNode pinId={pinId}/>
        );
        return (
            <div>
                <h1>My Pins</h1>
                <div>
                    <ul>{listItems}</ul>
                </div>
                <CreatePinForm authUser={this.props.authUser}/>
            </div>
        );
    }

}


