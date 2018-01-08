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
      onClick={props.disabled ? null : props.onClick}
    >
      {props.text}
    </div>
  );
}
