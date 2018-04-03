// @flow

import React from 'react'
import {db} from '../firebase';
import * as _ from "lodash";
import Matches from "./Matches";
import type Match from 'react-router';


type State = {
    latitude: ?number,
    longitude: ?number,
    radius: ?number,
}

type Props = {
    match: Match,
}

export default class PinDetails extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            radius: null,
        };
    }

    componentDidMount() {
        db.onPin(this.props.match.params.pinId, (snapshot) => {
            this.updateData(snapshot.val())
        })
    }

    componentWillUnmount() {
        db.detachPin(this.props.match.params.pinId);
    }

    updateData = (values: any) => {
        console.log('new data: ' + values.latitude + ', ' + values.longitude + ', ' + values.radius);
        let newState = {
            latitude: values.latitude,
            longitude: values.longitude,
            radius: values.radius,
        };
        this.setState(newState);
    };

    render() {
        let matches = null;
        if (this.state.latitude && this.state.longitude && this.state.radius) {
            matches = <Matches
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                radius={this.state.radius}/>
        }
        return (
            <div>
                <h1>Matches</h1>
                {matches}
            </div>
        )
    }
}
