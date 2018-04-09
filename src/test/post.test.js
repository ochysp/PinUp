import React from "react";
import { shallow, mount, render } from "enzyme";

const sum = require("../components/TESTING_Demo");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
//TODO Post Erstellungs Testfälle
// 1) Erstellen mit leeren Felder (sollte nicht möglich sein) Error expected

// 2) Erstellen mit ungültigen Werten

// 3) Erstellen mit gültigen Werten

//TODO Post Abspeicherungs Testfälle
// 1) Auf Map nach Post "suchen"

//TODO Post Laden Testfälle
// 1) Erstellte Post laden

// 2) Versuchen fremde Posts zu laden
