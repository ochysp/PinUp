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
        db.onPin(this.props.match.params.pinId, (snapshot) => {
            this.updateData(snapshot.val())
        })
    }

    componentWillUnmount() {
        db.detachPin(this.props.match.params.pinId);
    }

    updateData(values: any) {
        let newState = _(values)
            .keys()
            .map(valueKey => {
                let cloned = _.clone(values[valueKey]);
                cloned.key = valueKey;
                return cloned;
            })
            .value();
        this.setState(newState);
    }

    render() {
        if (this.state.latitude && this.state.longitude && this.state.radius) {
            return (
                <Matches
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    radius={this.state.radius}/>
            )
        } else {
            return null
        }
    }
}
