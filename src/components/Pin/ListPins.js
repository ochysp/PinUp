// @flow

import React from 'react';
import { List } from 'material-ui';
import PinListEntry from './PinListEntry';
import type { AuthUserType, PinType } from '../../business/Types';

type Props = {
  authUser: AuthUserType,
  pins: PinType[],
  onSelect: (PinType) => void,
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
        {listItems}
      </List>

    </div>
  );
};

export default (ListPins);
