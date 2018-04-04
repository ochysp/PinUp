// @flow

import React from 'react'
import {db} from '../backend/firebase/index';
import {PostNode} from "./Post/PostNode";
import CreatePostForm from "./Post/TESTING_CreatePost";


type DbHandle = {
    detach: () => {},
}

type State = {
    posts: number[],
    dbHandle: ?DbHandle,
}

type Props = {
    authUser: { uid: string },
}


export default class MyPosts extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            posts: [],
            dbHandle: null
        };
    }

    componentDidMount() {
        this.setState({
            dbHandle: db.onOwnPosts(
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
            const updatedNearbyPostKeys = prevState.posts.slice();
            updatedNearbyPostKeys.push(key);
            return {posts: updatedNearbyPostKeys};
        });
    };

    keyLeft = (key: number) => {
        this.setState((prevState) => {
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
                <h1>My Posts</h1>
                <div>
                    <ul>{listItems}</ul>
                </div>
                <CreatePostForm authUser={this.props.authUser}/>
            </div>
        );
    }

}
