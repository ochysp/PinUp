/* eslint-disable no-console,no-alert */
// @flow

import React from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { savePost } from '../../business/Post';
import { CATEGORIES } from '../../constants/categories';
import type { FormPostType } from '../../business/Types';
import ConfirmationAlertDialog from '../FormComponents/ConfirmationAlertDialog';
import { formStyle } from '../../style/styles';

type State = {
  invalidSubmit: boolean,
  sentToDB: boolean,
};

type Props = {
  postData: FormPostType,
  onPostDataChange: (FormPostType) => void,
  onDone: () => void,
  classes: any,
  className?: any,
};

class CreatePostForm extends React.Component<Props, State> {
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
    if (this.props.postData.title !== '' && this.props.postData.category !== '' && this.props.postData.description !== '') {
      if (event) { event.preventDefault(); }
      savePost(
        this.props.postData,
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
    const newData = Object.assign({}, this.props.postData);
    switch (name) {
      case 'isEvent':
        if (event.target.checked) {
          newData.event = { participants: {}, date: Date.now() };
          break;
        }
        delete newData.event;
        break;
      default:
        newData[name] = event.target.value;
    }
    this.props.onPostDataChange(newData);
  };

  render() {
    const { classes, postData } = this.props;
    const savedAlert = this.state.sentToDB ? (<ConfirmationAlertDialog infoText="Post" />) : null;

    return (
      <div className={this.props.className}>
        {savedAlert}
        <Paper
          aria-labelledby="form-dialog-title"
          className={classes.formRoot}
        >
          <form noValidate autoComplete="off">
            <Typography variant="title" id="form-dialog-title">Edit Post</Typography>

            <div className={classes.fieldContainer}>
              <TextField
                className={classes.field}
                label="Title"
                id="title"
                onChange={this.handleChange('title')}
                helperText={this.state.invalidSubmit && postData.title === '' ? 'Requires a Title' : ''}
                error={this.state.invalidSubmit && postData.title === ''}
                value={postData.title}
              />

              <TextField
                label="Description"
                id="description"
                onChange={this.handleChange('description')}
                helperText={this.state.invalidSubmit && postData.description === '' ? 'Requires a description' : ''}
                error={this.state.invalidSubmit && postData.description === ''}
                value={postData.description}
                className={classes.field}
              />

              <FormControl
                className={classes.field}
                error={this.state.invalidSubmit && postData.category === ''}
              >
                <InputLabel htmlFor="select-category">Category</InputLabel>
                <Select
                  value={postData.category}
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
                    onChange={this.handleChange('isEvent')}
                    value="This is an event"
                  />
                  }
                label="Users can sign up"
              />

            </div>
          </form>

          <div className={classes.buttonContainer}>
            <Divider />

            <Button
              id="Save"
              color="secondary"
              className={classes.button}
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

export default withStyles(formStyle)(CreatePostForm);
