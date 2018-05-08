// @flow

import React from 'react';
import { List, Typography, withStyles } from 'material-ui';
import PinListEntry from './PinListEntry';
import type { AuthUserType, PinType } from '../../business/Types';
import { styles } from '../../style/styles';

type Props = {
  authUser: AuthUserType,
  pins: PinType[],
// eslint-disable-next-line react/no-unused-prop-types
  onSelect: (PinType) => void,
  classes: any,
};


const ListPins = (props: Props) => {
  const listItems = props.pins.map(pin => (
    <PinListEntry
      pinData={pin}
      onListEntryClick={() => { props.onSelect(pin); }}
      authUser={props.authUser}
      key={pin.pinId}
    />
  ));
  return (
    <div>
      <List component="nav">
        {props.pins.length > 0 ?
          listItems
          : <Typography variant="caption" className={props.classes.typographyEmptyList}>
              There are currently no Pins available.
            </Typography>}
      </List>

    </div>
  );
};

export default withStyles(styles)(ListPins);
