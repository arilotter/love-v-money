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

class Form extends Component {
  constructor() {
    super();
    this.state = {
      formFull: false,
      data: {
        age: false,
        gender: "",
        occupation: false,
        years: false
      }
    };
  }

  onEnterPressed = () => {
    if (this.state.formFull) {
      this.submit();
    }
  };

  submit = () => {
    this.props.submit(this.state.data);
    this.props.history.push("/graph");
  };

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
        onEnterPressed={this.onEnterPressed}
      />
    );
    const gender = (
      <NaturalInput
        className="FormInput"
        type="number"
        default="gender"
        isValidInput={() => true}
        onChange={this.updateForm("gender")}
        onEnterPressed={this.onEnterPressed}
      />
    );
    const occupation = (
      <NaturalInput
        className="FormInput"
        type="number"
        default="occupation"
        isValidInput={isNotEmpty}
        onChange={this.updateForm("occupation")}
        onEnterPressed={this.onEnterPressed}
      />
    );
    const years = (
      <NaturalInput
        className="FormInput"
        type="number"
        default="#"
        isValidInput={isNumber}
        onChange={this.updateForm("years")}
        onEnterPressed={this.onEnterPressed}
      />
    );
    return (
      <div className="Form">
        <TripleLayout
          fancy
          icons={["heart", "money", "questionMark"]}
          buttonText={"plot myself"}
          buttonDisabled={!this.state.formFull}
          onButtonClick={this.submit}
        >
          I am{" "}
          {this.state.data.age && this.state.data.age.startsWith("8")
            ? "an"
            : "a"}{" "}
          {age} y/o {gender}
          <br />
          {occupation} <br /> working for {years} years.
        </TripleLayout>
      </div>
    );
  }
}

export default Form;
