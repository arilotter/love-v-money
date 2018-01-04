import React from "react";
import "./TripleLayout.css";
import Icons from "../Icons";
import Button from "../Button";
import classNames from "classnames";


export default function TripleLayout(props) {
  return (
    <div className={classNames("TripleLayoutContainer", props.className)}>
      <Icons icons={props.icons} />
      <div
        className={classNames("TripleLayoutText", {
          TripleLayoutFancy: props.fancy
        })}
      >
        {props.children}
      </div>
      {props.buttonText ? (
        <Button
          onClick={() => {
            if (!props.disabled) props.onButtonClick();
          }}
          text={props.buttonText}
          disabled={props.buttonDisabled}
        />
      ) : (
        <Button fake />
      )}
    </div>
  );
}
