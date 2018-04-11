import React from "react";
import { shallow, mount, render } from "enzyme";
let sinon = require("sinon");
let expect = require("chai").use(require("sinon-chai")).expect;
let Mock = require("mockfirebase");
let Firebase = Mock.MockFirebase;
let FirebaseSimpleLogin = Mock.MockFirebaseSimpleLogin;

//Tests the login functionality of firebase
describe("Test Pin creating", function() {
    let fb, callback, auth;

    beforeEach(function () {
        // we need our own callback to test the MockFirebaseSimpleLogin API
        // it's not usually necessary to do this since MockFirebaseSimpleLogin
        // already provides a spy method auth.callback (whether or not a callback is provided)
        callback = sinon.spy();
        fb = new Firebase().child("data");
        auth = new FirebaseSimpleLogin(fb, callback);
    });

    describe("#getmaches", function () {
        it('should contain certain Posts', function () {

        });
        it('should contain no matching Posts', function () {

        });
        it('should contain any Post that is in within Radius', function () {

        });
        it('should lose one Post during actual update', function () {

        });
    });
});