import React, { Component } from "react";
import ContentEditable from "react-simple-contenteditable";
import classNames from "classnames";
import "./NaturalInput.css";

export default class NaturalInput extends Component {
  size = 0;
  state = {
    text: "",
    valid: false
  };

  handleChange = (event, text) => {
    const valid = this.props.isValidInput(text);
    this.setState({ text, valid });
    this.props.onChange(text, valid);
  };
  render() {
    return (
      <span className="NaturalInputContainer">
        <ContentEditable
          onKeyDown={event => {
            if ((event.keyCode || event.charCode) === 13) {
              if (this.props.onEnterPressed) this.props.onEnterPressed();
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          }}
          className={classNames(this.props.className, {
            FormInputInvalid: this.state.valid
          })}
          html={this.state.text}
          tagName="span"
          onChange={this.handleChange}
          placeholder={this.props.default}
          contentEditable="plaintext-only"
        />
      </span>
    );
  }
}
