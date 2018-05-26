/* eslint-disable no-console,no-alert,no-throw-literal */
// @flow

import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CATEGORIES } from '../constants/categories';
import type { FormPostType } from '../business/Types';
import { formStyle } from '../style/styles';

type Props = {
  postData: FormPostType,
  invalidSubmit: boolean,
  onChange: (e: any) => void,
  classes: any,
}

const PostFormFields = (props: Props) => {
  const {
    classes, postData, onChange, invalidSubmit,
  } = props;
  return (
    <div className={classes.fieldContainer}>
      <TextField
        className={classes.field}
        label="Title"
        id="title"
        onChange={onChange('title')}
        helperText={invalidSubmit && postData.title === '' ? 'Requires a Title' : ''}
        error={invalidSubmit && postData.title === ''}
        value={postData.title}
      />

      <TextField
        label="Description"
        id="description"
        onChange={onChange('description')}
        multiline
        rowsMax="6"
        helperText={invalidSubmit && postData.description === '' ? 'Requires a description' : ''}
        error={invalidSubmit && postData.description === ''}
        value={postData.description}
        className={classes.field}
      />

      <FormControl
        className={classes.field}
        error={invalidSubmit && postData.category === ''}
      >
        <InputLabel htmlFor="select-category">Category</InputLabel>
        <Select
          value={postData.category}
          onChange={onChange('category')}
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
        { invalidSubmit
              && postData.category !== ''
              && (<FormHelperText>Requires a category</FormHelperText>)}
      </FormControl>

      <FormControlLabel
        className={classes.field}
        control={
          <Checkbox
            disabled={!!postData.postId}
            className={classes.checkbox}
            id="isEvent"
            checked={!!postData.event}
            onChange={onChange('isEvent')}
            value="This is an event"
          />
              }
        label="Users can sign up"
      />

    </div>
  );
};

export default withStyles(formStyle)(PostFormFields);
