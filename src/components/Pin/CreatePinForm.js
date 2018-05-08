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
} from 'material-ui';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import { createPin, convertCategoryArrayToObject } from '../../business/Pin';
import { CATEGORIES } from '../../constants/categories';
import CompoundSlider from '../MaterialComponents/CompoundSlider';
import type { AuthUserType, LocationType } from '../../business/Types';
import AlertDialog from '../MaterialComponents/AlertDialog';
import { formStyles } from '../../style/styles';

type State = {
  title: string,
  radius: number,
  categories: string[],
  invalidSubmit: boolean,
  sentToDB: boolean,
  dialogIsActive: boolean,
};

export type Props = {
  classes: any,
  authUser: AuthUserType,
  position: LocationType,
};

class CreatePinForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      radius: 10,
      categories: [],
      invalidSubmit: false,
      sentToDB: false,
      dialogIsActive: true,
    };
  }

  handleSubmit = (event: any) => {
    if (this.state.categories.length > 0) {
      this.setState({ invalidSubmit: false, dialogIsActive: false });
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
        () => { this.setState({ sentToDB: true }); },
        (error) => { console.log('error:'); console.log(error); },
      );
      if (event) { event.preventDefault(); }
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
    const savedAlert = this.state.sentToDB ? (<AlertDialog infoText="Pin" />) : null;

    return (
      <div>
        {savedAlert}
        <Dialog
          open={this.state.dialogIsActive}
          onClose={() => this.setState({ dialogIsActive: false })}
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
                      defaultValue={5}
                      onUpdate={this.handleChange('radius')}
                      onChange={() => {}}
                      className={classes.slider}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </Grid>
          </form>

          <DialogActions>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => this.setState({ dialogIsActive: false })}
            >
              <Button
                color="secondary"
                variant="raised"
                className={classes.buttonCancel}
                onClick={() => this.setState({ dialogIsActive: false })}
              >Cancel
              </Button>
              <Button
                id="Save"
                color="primary"
                variant="raised"
                className={classes.buttonSave}
                onClick={this.handleSubmit}
              >Save
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(formStyles)(CreatePinForm);
