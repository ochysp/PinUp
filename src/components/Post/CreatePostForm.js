/* eslint-disable no-console,no-alert */
// @flow

import React from 'react';
import { FormControl, FormHelperText, Input, InputLabel, Select, Typography } from 'material-ui';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { createPost } from '../../business/Post';
import { CATEGORIES } from '../../constants/categories';
import type { AuthUserType, LocationType } from '../../business/Types';

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
  category: string,
  invalidSubmit: boolean
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
      category: '',
      invalidSubmit: false,
    };
  }

  handleSubmit = (event: any) => {
    if (this.state.title !== '' && this.state.category !== '') {
      this.setState({ invalidSubmit: false });
      event.preventDefault();
      createPost(
        {
          userId: this.props.authUser.uid,
          title: this.state.title,
          location: {
            latitude: parseFloat(this.props.position.latitude),
            longitude: parseFloat(this.props.position.longitude),
          },
          category: this.state.category,
        },
        () => { alert('Post saved!'); },
        (error) => { console.log('error:'); console.log(error); alert('An error occurred'); },
      );
      event.preventDefault();
    } else {
      this.setState({ invalidSubmit: true });
    }
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
        <Typography className={classes.title}>
          Edit Post
        </Typography>
        <CardContent>
          <form className={classes.container} noValidate autoComplete="off">

            <TextField
              label="Title"
              id="title"
              onChange={this.handleChange('title')}
              helperText={this.state.invalidSubmit && this.state.title === '' ? 'Requires a Title' : ''}
              error={this.state.invalidSubmit && this.state.title === ''}
              value={this.state.title}
              className={classes.textField}
            />
            <br />

            <FormControl
              className={classes.formControl}
              error={this.state.invalidSubmit && this.state.category === ''}
            >
              <InputLabel htmlFor="select-category">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange('category')}
                input={<Input name="category" id="select-category" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.entries(CATEGORIES).map(category => (
                  <MenuItem key={category[0]} value={category[0]}>
                    {category[1]}
                  </MenuItem>
                ))}

              </Select>
              { this.state.invalidSubmit
              && this.state.category !== ''
              && (<FormHelperText>Requires a category</FormHelperText>)}
            </FormControl>
            <br />
          </form>

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
