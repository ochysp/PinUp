// @flow

import React from 'react'
import {db} from '../firebase';
import {PinNode} from "./PinNode";

type DbHandle = {
    detach: () => {},
}

type State = {
    pins: number[],
    dbHandle: DbHandle,
}

type Props = {}


export default class ListPins extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            pins: [],
            dbHandle: db.onOwnPins(
                this.keyEntered,
                this.keyLeft
            )
        };
    }

    componentWillUnmount() {
        this.state.dbHandle.detach();
    }

    keyEntered(key: number) {
        this.setState((prevState) => {
            const updatedNearbyPinKeys = prevState.pins.slice();
            updatedNearbyPinKeys.push(key);
            return {pins: updatedNearbyPinKeys};
        });
    };

    keyLeft(key: number) {
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
                {/*<button onClick={*/}
                {/*() => db.geoFireTest(this.keyEntered, this.keyLeft)*/}
                {/*}>*/}
                {/*Create a test-pin*/}
                {/*</button>*/}
            </div>
        );
    }

}


