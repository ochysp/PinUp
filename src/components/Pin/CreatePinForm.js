/* eslint-disable no-console,no-alert */
// @flow

import React from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  convertCategoryArrayToObject,
  convertCategoryObjectToArray,
  savePin,
} from '../../business/Pin';
import { CATEGORIES } from '../../constants/categories';
import CompoundSlider from '../FormComponents/CompoundSlider';
import type { FormPinType } from '../../business/Types';
import ConfirmationAlertDialog from '../FormComponents/ConfirmationAlertDialog';
import { formStyle } from '../../style/styles';

type State = {
  invalidSubmit: boolean,
  sentToDB: boolean,
};

export type Props = {
  pinData: FormPinType,
  onPinDataChange: (FormPinType) => void,
  onDone: () => void,
// eslint-disable-next-line react/no-unused-prop-types
  className?: any,
  classes: any,
};

class CreatePinForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
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
    if (convertCategoryObjectToArray(this.props.pinData.categories).length > 0) {
      if (event) { event.preventDefault(); }
      savePin(
        this.props.pinData,
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
    const newData = Object.assign({}, this.props.pinData);
    const changedValue = event.target.value;
    switch (name) {
      case 'radius':
        newData.area.radius = changedValue;
        break;
      case 'categories':
        newData.categories = convertCategoryArrayToObject(changedValue);
        break;
      default:
        newData[name] = changedValue;
    }
    this.props.onPinDataChange(newData);
  };

  render() {
    const { classes, pinData } = this.props;
    const savedAlert = this.state.sentToDB ? (<ConfirmationAlertDialog infoText="Pin" />) : null;

    return (
      <div className={this.props.className}>
        {savedAlert}
        <Paper className={classes.formRoot}>
          <form noValidate autoComplete="off">
            <Typography variant="title" id="form-dialog-title">Edit Pin</Typography>

            <div className={classes.fieldContainer}>
              <TextField
                className={classes.field}
                id="title"
                label="Title"
                onChange={this.handleChange('title')}
                value={pinData.title}
              />

              <FormControl
                className={classes.field}
                error={pinData.invalidSubmit
                && convertCategoryObjectToArray(pinData.categories).length === 0}
              >
                <InputLabel htmlFor="select-multiple-checkbox">Categories</InputLabel>
                <Select
                  multiple
                  value={convertCategoryObjectToArray(pinData.categories)}
                  onChange={this.handleChange('categories')}
                  input={<Input id="select-categories" />}
                  renderValue={selected => selected.map(category => (CATEGORIES[category])).join(', ')}
                >
                  {Object.entries(CATEGORIES).map(category => (

                    <MenuItem key={category[0]} value={category[0]}>
                      <Checkbox
                        checked={convertCategoryObjectToArray(pinData.categories)
                          .indexOf(category[0]) > -1}
                      />
                      <ListItemText primary={category[1]} />
                    </MenuItem>
                ))}
                </Select>
                { this.state.invalidSubmit
                && convertCategoryObjectToArray(pinData.categories).length === 0
                && (<FormHelperText>Requires one or more</FormHelperText>)}
              </FormControl>

              <div className={classes.field}>
                <Typography variant="caption" className={classes.sliderHeader}>Search-Radius</Typography>
                <CompoundSlider
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={pinData.area.radius}
                  defaultValue={pinData.area.radius}
                  onUpdate={this.handleChange('radius')}
                  onChange={() => {}}
                />
              </div>
            </div>

          </form>

          <div className={classes.buttonContainer}>
            <Divider />

            <Button
              className={classes.button}
              id="Save"
              color="primary"
              onClick={this.handleSubmit}
            >Save
            </Button>

            <Button
              className={classes.button}
              onClick={this.handleClose}
            >Cancel
            </Button>

          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(formStyle)(CreatePinForm);

