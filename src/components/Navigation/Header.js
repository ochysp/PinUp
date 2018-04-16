// @flow

import React from 'react';
import MenuBar from './MenuBar';

type Props = {
  authUser: ?any
};

const Header = (props: Props) => {
  if (props.authUser) {
    return <MenuBar />;
  }
  return null;
};

export default Header;
