import React from 'react';
import { shallow, mount, render } from 'enzyme';

const sum = require('../components/TESTING_Demo');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
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
