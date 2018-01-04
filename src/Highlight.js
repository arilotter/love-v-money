import React from "react";
import "./Highlight.css";
export default function Highlight(props) {
  return <span className="highlight">{props.children}</span>;
}
