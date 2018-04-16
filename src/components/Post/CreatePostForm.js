// @flow

import React from "react";
import {doCreatePost} from '../../business/Post'
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";

type State = {
  title: string,
};

type Props = {
  authUser: { uid: string },
  position: { lat: number, lng: number }
};

export default class CreatePostForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    doCreatePost({
      authUser: this.props.authUser,
      title: this.state.title,
      latitude: parseFloat(this.props.position.lat),
      longitude: parseFloat(this.props.position.lng)
    });
    alert("Post sent to DB");
  };

  render() {
    return (
      <Card
        style={{
          width: "-moz-fit-content"
        }}
      >
        <CardTitle title="Create a post for testing" />
        <CardText>
          <TextField
            name={"title"}
            onChange={this.handleInputChange}
            hintText={"Eine Veranstaltung"}
            floatingLabelText="Title"
            value={this.state.title}
          />
          <br />
        </CardText>
        <CardActions>
          <FlatButton onClick={this.handleSubmit} label="Create" />
        </CardActions>
      </Card>
    );
  }
}
