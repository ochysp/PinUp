/* eslint-disable no-console,no-alert */
// @flow

import React from 'react';
import {
  Checkbox, FormControl, FormHelperText, Input, InputLabel, ListItemText, Select, TextField,
  MenuItem, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { savePin, convertCategoryArrayToObject, convertCategoryObjectToArray } from '../../business/Pin';
import { CATEGORIES } from '../../constants/categories';
import CompoundSlider from '../FormComponents/CompoundSlider';
import type { AuthUserType, LocationType, PinType } from '../../business/Types';
import ConfirmationAlertDialog from '../FormComponents/ConfirmationAlertDialog';
import { formStyle } from '../../style/styles';

type State = {
  title: string,
  radius: number,
  categories: string[],
  invalidSubmit: boolean,
  sentToDB: boolean,
};

export type Props = {
  classes: any,
  authUser: AuthUserType,
  position: LocationType,
  editablePin?: PinType,
  onDone: () => void,
};

class CreatePinForm extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.editablePin) {
      return ({
        title: nextProps.editablePin.title,
        categories: convertCategoryObjectToArray(nextProps.editablePin.categories),
        radius: nextProps.editablePin.area.radius,
      });
    }
    return {};
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      radius: 5,
      categories: [],
      invalidSubmit: false,
      sentToDB: false,
    };
  }

  handleClose = () => {
    if (this.props.onDone) {
      this.props.onDone();
    }
  };

  handleSubmit = (event: any) => {
    if (this.state.categories.length > 0) {
      if (event) { event.preventDefault(); }

      const pin: PinType = {
        userId: this.props.authUser.uid,
        title: this.state.title,
        area: {
          radius: parseFloat(this.state.radius),
        },
        categories: convertCategoryArrayToObject(this.state.categories),
      };

      if (this.props.editablePin) {
        pin.pinId = this.props.editablePin.pinId;
        pin.area.location = this.props.editablePin.area.location;
      } else {
        pin.area.location = {
          latitude: parseFloat(this.props.position.latitude),
          longitude: parseFloat(this.props.position.longitude),
        };
      }

      savePin(
        pin,
        () => { this.setState({ sentToDB: true }); },
        (error) => { console.log('error:'); console.log(error); },
      );

      this.setState({ invalidSubmit: false });
      this.handleClose();
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
    const savedAlert = this.state.sentToDB ? (<ConfirmationAlertDialog infoText="Pin" />) : null;

    return (
      <div>
        {savedAlert}
        <Dialog
          open
          onClose={this.handleClose}
        >
          <form className={classes.container} noValidate autoComplete="off">
            <Grid container spacing={36} className={classes.grid}>
              <DialogTitle id="form-dialog-title">Edit Pin</DialogTitle>

              <DialogContent>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    label="Title"
                    onChange={this.handleChange('title')}
                    margin="normal"
                    className={classes.titleField}
                    value={this.state.title}
                  />

                  <Grid item xs={12}>
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
                        renderValue={selected => selected.map(category => (CATEGORIES[category])).join(', ')}
                        className={classes.categoryField}
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
                  </Grid>

                  <Grid item xs={12}>
                    <p>Set Search-Radius</p>
                    <p>
                      <span>Current set Radius </span>
                      <span>{`${this.state.radius}km`}</span>
                    </p>
                    <CompoundSlider
                      min={0.1}
                      max={10}
                      step={0.1}
                      value={this.state.radius}
                      defaultValue={this.state.radius}
                      onUpdate={this.handleChange('radius')}
                      onChange={() => {}}
                      className={classes.slider}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </Grid>
          </form>

          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.handleClose}
          >
            <DialogActions>
              <Button
                className={classes.buttonCancel}
                onClick={this.handleClose}
              >Cancel
              </Button>
              <Button
                id="Save"
                color="primary"
                className={classes.buttonSave}
                onClick={this.handleSubmit}
              >Save
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(formStyle)(CreatePinForm);
