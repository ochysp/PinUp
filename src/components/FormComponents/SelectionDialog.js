// @flow

import React from 'react';
import Button from '@material-ui/core/Button';
import { Typography, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { dialogStyles } from '../../style/styles';


type Props = {
  classes: any,
  dialogIsActive: boolean,
  handleSelectPin: any,
  handleSelectPost: any,
  onClose: () => void,
};

type State = {
  dialogIsActive: boolean,
};

class SelectionDialog extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      dialogIsActive: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ dialogIsActive: nextProps.dialogIsActive });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          open={this.state.dialogIsActive}
          onClose={() => {
            this.props.onClose();
            this.setState({ dialogIsActive: false });
          }}
        >

          <DialogTitle id="alert-dialog-title">I want to...</DialogTitle>

          <div className={classes.dialogContentContainer}>

            <DialogActions className={classes.dialogActions}>
              <Button onClick={this.props.handleSelectPin} className={classes.dialogButton} color="primary" variant="outlined">Find</Button>
              <Button onClick={this.props.handleSelectPost} className={classes.dialogButton} color="secondary" variant="outlined">Host</Button>
            </DialogActions>

            <Typography>...an event at this location!</Typography>

          </div>

          <div
            tabIndex={0}
            role="button"
            onClick={() => this.setState({ dialogIsActive: false })}
            onKeyDown={() => this.setState({ dialogIsActive: false })}
          />

        </Dialog>
      </div>

    );
  }
}

export default withStyles(dialogStyles)(SelectionDialog);

