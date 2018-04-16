/* eslint-disable import/prefer-default-export */
// @flow

import { db } from '../data/firebase/firebase';
import type { ConnectionType, KeyChangedCallback } from '../Types';

export const attachChildListener = (
  keyEntered: KeyChangedCallback,
  keyLeft: KeyChangedCallback,
  dbLocation: string,
): ConnectionType => {
  const ref = db.ref(dbLocation);

  ref.on('child_added', snapshot => keyEntered(snapshot.key));
  ref.on('child_removed', snapshot => keyLeft(snapshot.key));

  return {
    detach: () => {
      ref.off();
    },
  };
};
