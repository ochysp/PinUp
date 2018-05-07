/* eslint-disable no-console,no-alert */
// @flow

import React from 'react';
import {
  Checkbox,
  FormControl, FormHelperText,
  Input,
  InputLabel,
  ListItemText,
  Select,
  Typography,
} from 'material-ui';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { createPin, convertCategoryArrayToObject } from '../../business/Pin';
import { CATEGORIES } from '../../constants/categories';
import CompoundSlider from '../MaterialComponents/CompoundSlider';
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
  radius: number,
  categories: string[],
  invalidSubmit: boolean,
};

export type Props = {
  classes: any,
  authUser: AuthUserType,
  position: LocationType
};

class CreatePinForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      radius: 10,
      categories: [],
      invalidSubmit: false,
    };
  }

  handleSubmit = (event: any) => {
    if (this.state.categories.length > 0) {
      this.setState({ invalidSubmit: false });
      createPin(
        {
          userId: this.props.authUser.uid,
          title: this.state.title,
          area: {
            location: {
              latitude: parseFloat(this.props.position.latitude),
              longitude: parseFloat(this.props.position.longitude),
            },
            radius: parseFloat(this.state.radius),
          },
          categories: convertCategoryArrayToObject(this.state.categories),
        },
        () => { alert('Pin saved!'); },
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
          Edit Pin
        </Typography>
        <CardContent>
          <form className={classes.container} noValidate autoComplete="off">

            <TextField
              id="title"
              label="Title"
              onChange={this.handleChange('title')}
              helperText="Rapperswil"
              margin="normal"
              className={classes.textField}
            />
            <br />


            <FormControl
              className={classes.formControl}
              error={this.state.invalidSubmit && this.state.categories.length === 0}
            >
              <InputLabel htmlFor="select-multiple-checkbox">Category</InputLabel>
              <Select
                multiple
                value={this.state.categories}
                onChange={this.handleChange('categories')}
                input={<Input id="select-categories" />}
                renderValue={selected => selected.map(category => (category.name)).join(', ')}
              >
                {Object.entries(CATEGORIES).map(category => (

                  <MenuItem key={category[0]} value={category[0]}>
                    <Checkbox
                      checked={this.state.categories.indexOf(category[0]) > -1}
                    />
                    <ListItemText primary={category[1]} />
                  </MenuItem>
                ))}
              </Select>
              { this.state.invalidSubmit
                && this.state.categories.length === 0
                && (<FormHelperText>Requires one or more</FormHelperText>)}
            </FormControl>
            <br />

            <div>
              <p>Set Search-Radius</p>
              <CompoundSlider
                min={0.1}
                max={20}
                step={0.1}
                value={this.state.radius}
                defaultValue={10}
                onUpdate={this.handleChange('radius')}
                onChange={() => {}}
              />
              <p>
                <span>Current set Radius </span>
                <span>{`${this.state.radius}km`}</span>
              </p>
            </div>
          </form>

        </CardContent>

        <CardActions>
          <Button
            id="Save"
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
