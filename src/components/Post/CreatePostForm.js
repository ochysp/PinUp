// @flow

import React from "react";
import { doCreatePost } from "../../business/Post";
import { CATEGORIES } from "../../constants/categories";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";

type State = {
  title: string,
  longitude: string,
  latitude: string,
  category: string
};

type Props = {
  authUser: { uid: string }
};

export default class CreatePostForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
      longitude: "8.815886",
      latitude: "47.223946",
      category: ""
    };
  }

  handleMenuItemChange = (event, index, category) =>
    this.setState({ category });

  menuItems(categories) {
    return categories.map(category => (
      <MenuItem
        key={category.value}
        insetChildren={true}
        checked={this.state.category === category}
        value={category.value}
        primaryText={category.name}
      />
    ));
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
    doCreatePost({
      userId: this.props.authUser.uid,
      title: this.state.title,
      location: {
        latitude: parseFloat(this.state.latitude),
        longitude: parseFloat(this.state.longitude),
      },
    });
    alert('Post sent to DB');
    event.preventDefault();
  };

  render() {
    return (
      <Card
        style={{
          width: '-moz-fit-content',
        }}
      >
        <CardTitle title="Create a post for testing" />
        <CardText>
          <TextField
            name="title"
            onChange={this.handleInputChange}
            hintText="Eine Veranstaltung"
            floatingLabelText="Title"
            value={this.state.title}
          />
          <br />
          <TextField
            name="latitude"
            onChange={this.handleInputChange}
            hintText="47.223946"
            floatingLabelText="Latitude"
            value={this.state.latitude}
          />
          <br />
          <TextField
            name="longitude"
            onChange={this.handleInputChange}
            hintText="8.815886"
            floatingLabelText="Longitude"
            value={this.state.longitude}
          />
          <br />
          <SelectField
            hintText="Select category of Post"
            value={this.state.category}
            onChange={this.handleMenuItemChange}
          >
            {this.menuItems(CATEGORIES)}
          </SelectField>
          <br />
        </CardText>
        <CardActions>
          <FlatButton onClick={this.handleSubmit} label="Create" />
        </CardActions>
      </Card>
    );
  }
}
