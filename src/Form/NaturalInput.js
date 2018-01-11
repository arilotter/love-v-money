import React, { Component } from "react";
import ContentEditable from "react-simple-contenteditable";
import textWidth from "text-width";
import classNames from "classnames";
import "./NaturalInput.css";

export default class NaturalInput extends Component {
  size = 0;
  state = {
    text: "",
    valid: false
  };

  resize = () => {
    if (
      (window.innerWidth <= 600 && this.size >= 600) ||
      (window.innerWidth >= 600 && this.size <= 600)
    ) {
      this.forceUpdate();
    }
    this.size = window.innerWidth;
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  handleChange = (event, text) => {
    const valid = this.props.isValidInput(text);
    this.setState({ text, valid });
    this.props.onChange(text, valid);
  };
  render() {
    const elem = document.querySelector(".TripleLayoutText");
    const defaultWidth = textWidth(this.props.default, {
      family: "Miller",
      size: elem ? getComputedStyle(elem).fontSize : "0"
    });
    const minWidth = this.state.text === "" ? defaultWidth : 0;
    return (
      <span
        className="NaturalInputContainer"
        style={{ minWidth: minWidth + "px" }}
      >
        <ContentEditable
          onKeyDown={event => {
            if ((event.keyCode || event.charCode) === 13) {
              if (this.props.onEnterPressed) this.props.onEnterPressed();
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          }}
          className={classNames("FormInput", this.props.className, {
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
