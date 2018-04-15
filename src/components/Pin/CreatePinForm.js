// @flow

import React from "react";
import { doCreatePin } from "../../business/Pin";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import Slider from "material-ui/Slider";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";

type State = {
  title: string,
  radius: string
};

export type Props = {
  authUser: { uid: string },
  position: { lat: number, lng: number }
};

export default class CreatePinForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
      radius: 500
    };
  }

  handleInputChange = (event: any) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleSlider = (event, value) => {
    this.setState({ radius: value });
  };

  handleSubmit = (event: any) => {
    doCreatePin({
      userId: this.props.authUser.uid,
      title: this.state.title,
      area: {
        location: {
          latitude: parseFloat(this.props.position.lat),
          longitude: parseFloat(this.props.position.lng),
        },
        radius: parseFloat(this.state.radius),
      },
    });
    alert('Pin sent to DB');
    event.preventDefault();
  };

  render() {
    return (
      <Card
        style={{
          width: '-moz-fit-content',
        }}
      >
        <CardTitle title="Create a pin for testing" />
        <CardText>
          <TextField
            name="title"
            onChange={this.handleInputChange}
            hintText="Rapperswil"
            floatingLabelText="Title"
            value={this.state.title}
          />
          <br />
          <br />
          <div>
            <p>Set Radius</p>
            <Slider
              min={100}
              max={2000}
              step={100}
              value={this.state.radius}
              onChange={this.handleSlider}
            />
            <p>
              <span>{"Current set Radius "}</span>
              <span>{this.state.radius + "m"}</span>
              <br />
              <span>{"(Range from 100 to 2000m)"}</span>
            </p>
          </div>
        </CardText>
        <CardActions>
          <FlatButton onClick={this.handleSubmit} label="Create" />
        </CardActions>
      </Card>
    );
  }
}
