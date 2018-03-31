// @flow

import React from 'react'
import {render} from 'react-dom'

import {db} from '../firebase';

import _ from 'lodash';


type State = {
    posts: PostT[],
}

type PostT = {
    title: string,
}

export default class MyPosts extends React.Component<{}, State> {
    constructor(props :any) {
        super(props);
        this.state = {
            posts: [],
        };
        db.getPosts(snapshot => {
            this.getData(snapshot.val());
        });
    }

    componentWillUnmount() {
        db.detachPosts();
    }

    getData(values: any) {
        let postsVal = values;
        let posts = _(postsVal)
            .keys()
            .map(postKey => {
                let cloned = _.clone(postsVal[postKey]);
                cloned.key = postKey;
                return cloned;
            })
            .value();
        this.setState({
            posts: posts
        });
    }

    render() {
        let postNodes = this.state.posts.map((post: PostT) => {
            return (
                <div className="card">
                    <div className="card-content">
                        <Post title={post.title}/>
                    </div>
                </div>
            )
        });
        return (
            <div>
                <h1>My Posts</h1>
                <div>
                    {postNodes}
                </div>
            </div>
        );
    }

}

type Props = {
    title: string,
}

const Post = (props: Props) => {
    return (
        <div>
            {props.title}
        </div>
    )
};