// @flow

import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import { formStyle } from '../../style/styles';


type Props = {
  classes: any,
  dialogIsActive: boolean,
  handleSetPin: any,
  handleSetPost: any,
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
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.setState({ dialogIsActive: false })}
            onKeyDown={() => this.setState({ dialogIsActive: false })}
          >
            <DialogActions>
              <Button onClick={this.props.handleSetPin} className={classes.buttonPin} variant="raised">Create a Pin</Button>
              <Button onClick={this.props.handleSetPost} className={classes.buttonPost} variant="raised">Create a Post</Button>
            </DialogActions>
          </div>
        </Dialog>

      </div>
    );
  }
}

export default withStyles(formStyle)(SelectionDialog);

