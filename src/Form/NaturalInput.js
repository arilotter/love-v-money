import React, { Component } from "react";
import ContentEditable from "react-simple-contenteditable";
import textWidth from "text-width";
import classNames from "classnames";
import "./NaturalInput.css"

export default class NaturalInput extends Component {
  state = {
    text: this.props.default,
    valid: true
  };
  handleChange = (event, text) => {
    const valid = this.props.isValidInput(text);
    this.setState({ text, valid });
    this.props.onChange(text, valid);
  };
  render() {
    const defaultWidth = textWidth(this.props.default, {
      family: "Miller",
      size: "60px"
    });
    const minWidth = this.state.text === "" ? defaultWidth : 0;
    return (
      <span className="NaturalInputContainer" style={{ minWidth: minWidth + "px" }}>
        <ContentEditable
          className={classNames(this.props.className, {
            FormInputInvalid: this.state.valid
          })}
          html={this.state.text}
          tagName="span"
          onChange={this.handleChange}
          onFocus={() => {
            if (this.state.text === this.props.default) {
              this.setState({ text: "" });
            }
          }}
          onBlur={() => {
            if (this.state.text === "") {
              this.setState({ text: this.props.default });
            }
          }}
          contentEditable="plaintext-only"
        />
      </span>
    );
  }
}
