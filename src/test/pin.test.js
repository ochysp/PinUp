

// @flow

import React from "react";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { db } from "../backend/firebase";
import CreatePin from "../components/Pin/CreatePin";
import CreatePost from "../components/Post/TESTING_CreatePost";
import { shallow, mount, render } from 'enzyme';


//TODO Account erstellen / einloggen
//Test Account Mail: test_user@gmail.com PW: TestUser ist bereits erstellt


//TODO Pin Erstellungs Testfälle


/*
handleSubmit = (event: any) => {
    db.doCreatePin({
        authUser: this.props.authUser,
        title: this.state.title,
        latitude: parseFloat(this.props.lat),
        longitude: parseFloat(this.props.lng),
        radius: parseFloat(this.state.radius)
    });
    alert('Pin sent to DB');
    event.preventDefault();
};*/
//TODO Pin Abspeicherungs Testfälle
// 1) Auf Map nach Pin "suchen"

//TODO Pin Laden Testfälle
// 1) Erstellte Pins laden

// 2) Versuchen fremde Pins zu laden
