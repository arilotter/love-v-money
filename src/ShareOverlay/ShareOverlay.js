import React, { Component } from "react";
import TripleLayout from "../TripleLayout";
import "./ShareOverlay.css";

export default class ShareOverlay extends Component {
  state = {
    text: ""
  };
  handleChange = event => {
    this.setState({ text: event.target.value });
  };
  render() {
    return this.props.open ? (
      <React.Fragment>
        <div className="ShareOverlayCloseButton" onClick={this.props.onClose} />
        <TripleLayout
          className="ShareOverlay"
          icons={["heart", "money", "questionMark"]}
          buttonText="share"
          onButtonClick={() => {
            this.props.onDone(this.state.text);
          }}
          buttonDisabled={this.state.text.length === 0}
        >
          <textarea
            className="ShareOverlayTextArea"
            value={this.state.text}
            onChange={this.handleChange}
            maxLength={140}
            style={{
              height: this.state.text.split("\n").length * 80 + "px"
            }}
            placeholder="Tell us why you do what you do..."
          />
        </TripleLayout>
      </React.Fragment>
    ) : null;
  }
}
