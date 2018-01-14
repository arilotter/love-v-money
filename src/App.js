import React, { Component } from "react";
import { Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
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
export default class App extends Component {
  state = {
    me: null,
    strangers: null
  };
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
      .then(json => this.setState(json));
  }
  componentWillUpdate(nextProps, nextState) {
    const me = this.state.me;
    if (
      me &&
      (me.pickPosition !== nextState.me.pickPosition ||
        me.why !== nextState.me.why)
    ) {
      fetch("/api/people", {
        method: "put",
        body: JSON.stringify({
          ...nextState.me,
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
        <Route
          exact
          path="/"
          render={props => {
            return <Introduction {...props} strangers={this.state.strangers} />;
          }}
        />
        <Route
          path="/intro"
          render={props => {
            return <Introduction {...props} strangers={this.state.strangers} />;
          }}
        />
        <Route
          path="/form"
          render={props => {
            return <Form {...props} submit={me => this.setState({ me })} />;
          }}
        />
        <Route
          path="/graph/"
          render={props => {
            return (
              <GraphLayout
                {...props}
                me={this.state.me}
                strangers={this.state.strangers}
                setWhy={why => this.setState({ me: { ...this.state.me, why } })}
                setPosition={(x, y) =>
                  this.setState({
                    me: { ...this.state.me, pickPosition: [x, y] }
                  })
                }
              />
            );
          }}
        />
      </AnimatedSwitch>
    );
  }
}
