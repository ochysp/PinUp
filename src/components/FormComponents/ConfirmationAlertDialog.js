// @flow

import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';

type Props = {
  infoText: string,
}

type State = {
  open: boolean,
}

class ConfirmationAlertDialog extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.infoText} Saved</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your {this.props.infoText} has been saved to the data base.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmationAlertDialog;
