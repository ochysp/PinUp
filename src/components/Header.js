// @flow

import React from 'react'
import MenuBar from "./MenuBar";


type Props = {
    authUser: ?any,
}

export const Header = (props: Props) => {
    if (!!props.authUser) {
        return <MenuBar/>
    } else {
        return null;
    }
};
