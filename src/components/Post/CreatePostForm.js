/* eslint-disable no-console,no-alert */
// @flow

import React from 'react';
import { FormControl, FormHelperText, Input, InputLabel, Select } from 'material-ui';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { savePost } from '../../business/Post';
import { CATEGORIES } from '../../constants/categories';
import type { AuthUserType, LocationType, PostType } from '../../business/Types';
import ConfirmationAlertDialog from '../FormComponents/ConfirmationAlertDialog';
import { formStyle } from '../../style/styles';

type State = {
  title: string,
  category: string,
  invalidSubmit: boolean,
  sentToDB: boolean,
  dialogIsActive: boolean,
};

type Props = {
  classes: any,
  authUser: AuthUserType,
  position: LocationType,
  editablePost?: PostType,
};

class CreatePostForm extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.editablePost) {
      return ({
        title: nextProps.editablePost.title,
        category: nextProps.editablePost.category,
      });
    }
    return {};
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      invalidSubmit: false,
      sentToDB: false,
      dialogIsActive: true,
    };
  }

  handleSubmit = (event: any) => {
    if (this.state.title !== '' && this.state.category !== '') {
      this.setState({ invalidSubmit: false, dialogIsActive: false });
      event.preventDefault();

      const post = {
        userId: this.props.authUser.uid,
        title: this.state.title,
        category: this.state.category,
      };
      if (this.props.editablePost) {
        post.postId = this.props.editablePost.postId;
      } else {
        post.location = {
          latitude: parseFloat(this.props.position.latitude),
          longitude: parseFloat(this.props.position.longitude),
        };
      }
      savePost(
        post,
        () => { this.setState({ sentToDB: true }); },
        (error) => { console.log('error:'); console.log(error); },
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
    const savedAlert = this.state.sentToDB ? (<ConfirmationAlertDialog infoText="Post" />) : null;

    return (
      <div>
        {savedAlert}
        <Dialog
          open={this.state.dialogIsActive}
          onClose={() => this.setState({ dialogIsActive: false })}
          aria-labelledby="form-dialog-title"
        >
          <form className={classes.container} noValidate autoComplete="off">
            <Grid container spacing={36} className={classes.grid}>
              <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>

              <DialogContent>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    id="title"
                    onChange={this.handleChange('title')}
                    helperText={this.state.invalidSubmit && this.state.title === '' ? 'Requires a Title' : ''}
                    error={this.state.invalidSubmit && this.state.title === ''}
                    value={this.state.title}
                    className={classes.titleField}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    className={classes.formControl}
                    error={this.state.invalidSubmit && this.state.category === ''}
                  >
                    <InputLabel htmlFor="select-category">Category</InputLabel>
                    <Select
                      value={this.state.category}
                      onChange={this.handleChange('category')}
                      input={<Input name="category" id="select-category" />}
                      className={classes.categoryField}
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
                </Grid>
              </DialogContent>
            </Grid>
          </form>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={() => this.setState({ dialogIsActive: false })}
          >
            <DialogActions>
              <Button
                color="secondary"
                variant="raised"
                className={classes.buttonCancel}
                onClick={() => this.setState({ dialogIsActive: false })}
              >Cancel
              </Button>
              <Button
                color="primary"
                variant="raised"
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

export default withStyles(formStyle)(CreatePostForm);
