import React from "react";
import classNames from "classnames";
import "./Button.css";

export default function Button(props) {
  return (
    <div
      className={classNames("Button", props.className, {
        FakeButton: props.fake,
        DisabledButton: props.disabled
      })}
    >
      {props.text}
    </div>
  );
}
