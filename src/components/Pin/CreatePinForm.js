// @flow

import React from "react";
import { doCreatePin } from "../../business/Pin";
import { CATEGORIES } from "../../constants/categories";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Slider from "material-ui/Slider";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";

type State = {
  title: string,
  radius: number,
  values: []
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
      radius: 500,
      values: []
    };
  }

  handleMenuItemChange = (event, index, values) => this.setState({ values });

  selectionRenderer = values => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return CATEGORIES[values[0]].name;
      default:
        return `Filter contains ${values.length} categories`;
    }
  };

  menuItems(persons) {
    return persons.map(person => (
      <MenuItem
        key={person.value}
        insetChildren={true}
        checked={this.state.values.indexOf(person.value) > -1}
        value={person.value}
        primaryText={person.name}
      />
    ));
  }

  handleTextFieldInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

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
            name={"title"}
            onChange={this.handleTextFieldInputChange}
            hintText={"Rapperswil"}
            floatingLabelText="Title"
            value={this.state.title}
          />

          <br />
          <SelectField
            multiple={true}
            hintText="Select category filter"
            value={this.state.values}
            onChange={this.handleMenuItemChange}
            selectionRenderer={this.selectionRenderer}
          >
            {this.menuItems(CATEGORIES)}
          </SelectField>
          <br />
          <br />
          <div>
            <p>Set Search-Radius</p>
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
