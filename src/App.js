import React, { Component } from "react";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { gs } from "./react-global-state";
import Introduction from "./Introduction";
import Form from "./Form";
import GraphLayout from "./GraphLayout";

function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getGUID() {
  if (localStorage.getItem("guid") !== null) {
    return window.localStorage.guid;
  } else {
    window.localStorage.guid = generateGUID();
    return window.localStorage.guid;
  }
}
class App extends Component {
  componentWillMount() {
    // update info about other people and ourselves
    fetch("/api/people", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        guid: getGUID()
      })
    })
      .then(res => res.json())
      .then(this.props.setState);
  }
  componentWillUpdate(nextProps, nextState) {
    const me = this.props.state.me;
    if (
      me &&
      (me.pickPosition !== nextProps.state.me.pickPosition ||
        me.why !== nextProps.state.me.why)
    ) {
      fetch("/api/people", {
        method: "put",
        body: JSON.stringify({
          ...nextProps.state.me,
          guid: getGUID()
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }
  }

  render() {
    return (
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route exact path="/" component={Introduction} />
        <Route path="/intro" component={Introduction} />
        <Route path="/form" component={Form} />
        <Route path="/graph/" component={GraphLayout} />
      </AnimatedSwitch>
    );
  }
}

export default gs(App);
