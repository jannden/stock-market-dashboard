/* eslint-disable no-unused-vars */
import React from "react";
import "@testing-library/jest-dom";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import LogIn from "./LogIn";
import store from "../store";

describe("Test login form", () => {
  let wrapper;

  it("shows correct value in the EMAIL field", () => {
    wrapper = mount(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    wrapper.find("input[type='email']").simulate("change", {
      target: { name: "email", value: "jest@example.com" },
    });
    expect(wrapper.find("input[type='email']").prop("value")).toEqual(
      "jest@example.com"
    );
  });

  it("show correct value in the PASSWORD field", () => {
    wrapper = mount(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    wrapper.find("input[type='password']").simulate("change", {
      target: { name: "password", value: "abc123" },
    });
    expect(wrapper.find("input[type='password']").prop("value")).toEqual(
      "abc123"
    );
  });
});
