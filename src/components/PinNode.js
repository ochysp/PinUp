// @flow

import React from 'react'
import {db} from '../firebase';
import * as _ from "lodash";

type Props = {
    pinId: number,
}

type State = {
    title: string,
}

export class PinNode extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: '',
        };
        db.onPin(this.props.pinId, (snapshot) => {
            this.updateData(snapshot.val())
        })
    }

    componentWillUnmount() {
        db.detachPin(this.props.pinId);
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
        return (
            <li>
                <div>
                    {this.state.title}
                </div>
            </li>
        )
    }
}