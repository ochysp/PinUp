// @flow

import React from 'react';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';

type Props = {
  drawer: boolean,
  handleSetPin: any,
  handleSetPost: any,
};

type State = {
  drawer: boolean,
};

class SelectionDrawer extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      drawer: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ drawer: nextProps.drawer });
  }

  render() {
    return (
      <div>
        <Drawer
          anchor="bottom"
          open={this.state.drawer}
          onClose={() => this.setState({ drawer: false })}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.setState({ drawer: false })}
            onKeyDown={() => this.setState({ drawer: false })}
          >
            <Button onClick={this.props.handleSetPin}>Create a Pin</Button>
            <Button onClick={this.props.handleSetPost}>Create a Post</Button>

          </div>
        </Drawer>

      </div>
    );
  }
}

export default SelectionDrawer;

