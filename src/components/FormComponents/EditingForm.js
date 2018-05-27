/* eslint-disable no-console,no-alert,no-throw-literal */
// @flow

import React from 'react';
import { Button, Divider, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { savePost } from '../../business/Post';
import type { FormPinType, FormPostType } from '../../business/Types';
import ConfirmationAlertDialog from './ConfirmationAlertDialog';
import { formStyle } from '../../style/styles';
import PostFormFields from '../Post/PostFormFields';
import PinFormFields from '../Pin/PinFormFields';
import {
  convertCategoryArrayToObject,
  convertCategoryObjectToArray,
  savePin,
} from '../../business/Pin';

type State = {
  invalidSubmit: boolean,
  sentToDB: boolean,
};

type Props = {
  variant: "pin" | "post",
  data: FormPostType | FormPinType,
  onDataChange: (FormPostType | FormPostType) => void,
  onDone: () => void,
  classes: any,
  className?: any,
};

class EditingForm extends React.Component<Props, State> {
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

  isDataValid(): boolean {
    switch (this.props.variant) {
      case 'post':
        return (
          this.props.data.title !== ''
          && this.props.data.category !== ''
          && this.props.data.description !== ''
        );
      case 'pin':
        return (convertCategoryObjectToArray(this.props.data.categories).length > 0);
      default:
        throw 'not implemented';
    }
  }

  handleSubmit = (event: any) => {
    if (event) { event.preventDefault(); }

    if (this.isDataValid()) {
      switch (this.props.variant) {
        case 'post':
          savePost(
            this.props.data,
            () => { this.setState({ sentToDB: true }); },
            (error) => { console.log('error:'); console.log(error); },
          );
          break;
        case 'pin':
          savePin(
            this.props.data,
            () => { this.setState({ sentToDB: true }); },
            (error) => { console.log('error:'); console.log(error); },
          );
          break;
        default:
          throw 'not implemented';
      }
      this.setState({ invalidSubmit: false });
      this.handleClose();
      return;
    }
    this.setState({ invalidSubmit: true });
  };

  handleChange = name => (event) => {
    const newData = Object.assign({}, this.props.data);
    const changedValue = event.target.value;

    switch (this.props.variant) {
      case 'post':
        switch (name) {
          case 'isEvent':
            if (event.target.checked) {
              newData.event = { participants: {}, date: Date.now() };
              break;
            }
            delete newData.event;
            break;
          default:
            newData[name] = changedValue;
        }
        break;

      case 'pin':
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
        break;

      default:
        throw 'not implemented';
    }
    this.props.onDataChange(newData);
  };

  render() {
    const { classes, data } = this.props;
    const savedAlert = this.state.sentToDB ? (<ConfirmationAlertDialog infoText="Post" />) : null;

    let formFields;
    let saveButtonColor;
    let pinPost;
    switch (this.props.variant) {
      case 'post':
        formFields = (
          <PostFormFields
            postData={data}
            invalidSubmit={this.state.invalidSubmit}
            onChange={this.handleChange}
          />);
        saveButtonColor = 'secondary';
        pinPost = 'Post';
        break;
      case 'pin':
        formFields = (
          <PinFormFields
            pinData={data}
            invalidSubmit={this.state.invalidSubmit}
            onChange={this.handleChange}
          />);
        saveButtonColor = 'primary';
        pinPost = 'Pin';
        break;
      default:
        throw 'not implemented';
    }

    return (
      <div className={this.props.className}>
        {savedAlert}
        <Paper
          aria-labelledby="form-dialog-title"
          className={classes.formRoot}
        >
          <form noValidate autoComplete="off">
            <Typography variant="title" id="form-dialog-title">Edit {pinPost}</Typography>

            {formFields}

          </form>

          <div className={classes.buttonContainer}>
            <Divider />

            <Button
              id="Save"
              color={saveButtonColor}
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

export default withStyles(formStyle)(EditingForm);
