// @flow

import React from 'react';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { doCreatePost } from '../../business/Post';
import { CATEGORIES } from '../../constants/categories';
import { CategoryType } from '../../Types';
import type { AuthUserType, LocationType } from '../../Types';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

type State = {
  title: string,
  longitude: string,
  latitude: string,
  category: CategoryType
};

type Props = {
  classes: any,
  authUser: AuthUserType,
  position: LocationType
};

class CreatePostForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      category: null,
    };
  }

  handleSubmit = (event: any) => {
    doCreatePost({
      userId: this.props.authUser.uid,
      title: this.state.title,
      location: {
        latitude: parseFloat(this.props.position.lat),
        longitude: parseFloat(this.props.position.lng),
      },
      radius: parseFloat(this.state.radius),
    });
    alert('Post sent to DB');
    event.preventDefault();
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card
        style={{
          width: '-moz-fit-content',
        }}
      >
        <CardMedia
          className={classes.media}
          title="Edit Post"
        />
        <CardContent>
          <TextField
            label="Title"
            id="title"
            onChange={this.handleChange('title')}
            hintText="Eine Veranstaltung"
            floatingLabelText="Title"
            value={this.state.title}
            className={classes.textField}
          />
          <br />

          <TextField
            id="select-category"
            select
            label="Category"
            className={classes.textField}
            onChange={this.handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {CATEGORIES.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br />
        </CardContent>

        <CardActions>
          <Button
            className={classes.button}
            onClick={this.handleSubmit}
          >Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CreatePostForm);
