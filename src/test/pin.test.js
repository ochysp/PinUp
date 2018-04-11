import React from "react";
import { shallow, mount, render } from "enzyme";
let sinon = require("sinon");
let expect = require("chai").use(require("sinon-chai")).expect;


describe("Test Pin", function() {

    describe("#creatPin", function () {
        it('should create valid Pin', function () {

        });
        it('should request Client to fill out missing Input / Informations', function () {

        });
        it('should request Client to change Input to valid Values', function () {

        });
    });

    describe("#changePin",function () {
        it('should update Pin with new Information', function () {

        });
        it('should denie update and ask Client to add valid Input', function () {

        });
    });

    describe("#deletePin",function () {
        it('should be deleted after Request from Client', function () {

        });
        it('should get deleted after the "survival" Date', function () {
            //Might not that good testable due to "cleaning" function which might just runs once every 24h
        });
    });
});