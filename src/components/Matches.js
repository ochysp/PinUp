// @flow

import React from 'react'
import {db} from '../firebase';
import {PostNode} from "./PostNode";


type DbHandle = {
    detach: () => {},
}

type State = {
    posts: number[],
    dbHandle: ?DbHandle,
}

type Props = {
    latitude: number,
    longitude: number,
    radius: number,
}


export default class Matches extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            posts: [],
            dbHandle: null
        };
    }

    componentDidMount() {
        this.setState({
            dbHandle: db.onNearbyPosts(
                this.props.latitude,
                this.props.longitude,
                this.props.radius,
                this.keyEntered,
                this.keyLeft
            )
        })
    }

    componentWillUnmount() {
        if (this.state.dbHandle)
            this.state.dbHandle.detach();
    }

    keyEntered = (key: *, location: *, distance: *) => {
        console.log(key + " entered query at " + location + " (" + distance + " km from center)");
        this.setState((prevState, props) => {
            const updatedNearbyPostKeys = prevState.posts.slice();
            updatedNearbyPostKeys.push(key);
            return {posts: updatedNearbyPostKeys};
        });
    };

    keyLeft = (key: *, location: *, distance: *) => {
        console.log(key + " exited query to " + location + " (" + distance + " km from center)");
        this.setState((prevState, props) => {
            const updatedNearbyPostKeys = prevState.posts.slice();
            updatedNearbyPostKeys.splice(updatedNearbyPostKeys.indexOf(key), 1);
            return {posts: updatedNearbyPostKeys};
        });
    };

    render() {
        const listItems = this.state.posts.map((postId) =>
            <PostNode postId={postId}/>
        );
        return (
            <div>
                <ul>{listItems}</ul>
            </div>
        );
    }

}

