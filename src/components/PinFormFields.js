/* eslint-disable no-console,no-alert */
// @flow

import React from 'react';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { convertCategoryObjectToArray } from '../business/Pin';
import { CATEGORIES } from '../constants/categories';
import CompoundSlider from './FormComponents/CompoundSlider';
import type { FormPinType } from '../business/Types';
import { formStyle } from '../style/styles';

export type Props = {
  pinData: FormPinType,
  invalidSubmit: boolean,
  onChange: (e: any) => void,
  classes: any,
};

const PinFormField = (props: Props) => {
  const {
    pinData, onChange, classes, invalidSubmit,
  } = props;

  return (
    <div className={classes.fieldContainer}>
      <TextField
        className={classes.field}
        id="title"
        label="Title"
        onChange={onChange('title')}
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
          onChange={onChange('categories')}
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
        { invalidSubmit
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
          onUpdate={onChange('radius')}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};


export default withStyles(formStyle)(PinFormField);

