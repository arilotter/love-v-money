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
        <div className="ShareOverlayCloseButton" onClick={this.props.onClosed}/>
        <TripleLayout
          className="ShareOverlay"
          icons={["heart", "money", "questionMark"]}
          buttonText="share"
          onButtonClick={() => console.log("TODO Share the contents;")}
        >
          <textarea
            className="ShareOverlayTextArea"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Share with us in&#x0a;140 characters or less:&#x0a;Why passion or money?&#x0a;(start typing...)"
          />
        </TripleLayout>
      </React.Fragment>
    ) : null;
  }
}
