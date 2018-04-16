// @flow

import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { doCreatePin } from '../../business/Pin';

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
      title: '',
      radius: '',
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
          <TextField
            name="radius"
            onChange={this.handleInputChange}
            hintText="1"
            floatingLabelText="Radius in km"
            value={this.state.radius}
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
