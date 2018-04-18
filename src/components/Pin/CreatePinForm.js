// @flow

import React from 'react';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { doCreatePin } from '../../business/Pin';
import { CATEGORIES } from '../../constants/categories';
import { CategoryType } from '../../Types';
import CompoundSlider from '../MaterialComponents/CompoundSlider';
import type { LocationType } from '../../Types';

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
  radius: number,
  category: CategoryType
};

export type Props = {
  classes: any,
  authUser: { uid: string },
  position: LocationType
};

class CreatePinForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      radius: 0.5,
      category: null,
    };
  }

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
          title="Edit Pin"
        />
        <CardContent>
          <form className={classes.container} noValidate autoComplete="off">

            <TextField
              id="title"
              label="Title"
              onChange={this.handleChange('title')}
              hintText="Rapperswil"
              floatingLabelText="Title"
              margin="normal"
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
            <CompoundSlider />
            <div>
              <p>Set Search-Radius</p>
              <CompoundSlider
                min={0.1}
                max={20}
                step={0.1}
                value={this.state.radius}
                onUpdate={this.handleChange('radius')}
              />
              <p>
                <span>Current set Radius </span>
                <span>{`${this.state.radius}km`}</span>
                <br />
                <span>(Range from 1km to 50km)</span>
              </p>
            </div>
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

export default withStyles(styles)(CreatePinForm);
