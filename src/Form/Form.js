import React, { Component } from "react";
import TripleLayout from "../TripleLayout";
import NaturalInput from "./NaturalInput";
import "./Form.css";

const MAX_AGE = 123; // no human has ever lived past 122

function isNotEmpty(input) {
  return input.length > 0;
}

function isNumber(input) {
  if (!isNotEmpty(input)) return false;
  const num = Math.floor(Number(input));
  return String(num) === input && num >= 0 && num < MAX_AGE;
}

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      formFull: false,
      data: {
        age: false,
        gender: false,
        occupation: false,
        years: false
      }
    };
  }

  updateForm = key => (text, valid) => {
    const data = {
      ...this.state.data,
      [key]: valid ? text : false
    };
    const formFull = Object.values(data).every(key => key !== false);
    this.setState({
      formFull,
      data
    });
  };
  render() {
    const age = (
      <NaturalInput
        className="FormInput"
        type="number"
        default="age"
        isValidInput={isNumber}
        onChange={this.updateForm("age")}
      />
    );
    const gender = (
      <NaturalInput
        className="FormInput"
        type="number"
        default="gender"
        isValidInput={isNotEmpty}
        onChange={this.updateForm("gender")}
      />
    );
    const occupation = (
      <NaturalInput
        className="FormInput"
        type="number"
        default="occupation"
        isValidInput={isNotEmpty}
        onChange={this.updateForm("occupation")}
      />
    );
    const years = (
      <NaturalInput
        className="FormInput"
        type="number"
        default="#"
        isValidInput={isNumber}
        onChange={this.updateForm("years")}
      />
    );
    return (
      <div>
        <TripleLayout
          fancy
          icons={["heart", "money", "questionMark"]}
          buttonText={"plot me"}
          buttonDisabled={!this.state.formFull}
        >
          I am a {age} y/o {gender}
          <br />
          {occupation} <br /> working for {years} years.
        </TripleLayout>
      </div>
    );
  }
}
