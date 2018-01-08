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
  if (localStorage.getItem('guid') !== null) {
    return window.localStorage.guid;
  } else {
    window.localStorage.guid = generateGUID();
    return window.localStorage.guid;
  }
}
class App extends Component {
  componentWillUpdate(nextProps, nextState) {
    const dataForBackend = {
      ...nextProps.state, 
      guid: getGUID()
    }
    console.log(dataForBackend);
  }

 render() {
  return (
    <React.Fragment>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route exact path="/" component={Introduction} />
        <Route path="/intro" component={Introduction} />
        <Route path="/form" component={Form} />
        <Route
          path="/graph/"
          render={() => {
            return <GraphLayout />;
          }}
        />
      </AnimatedSwitch>
    </React.Fragment>
  );
}
}

export default gs(App);

// selectedPerson: {
//     gender: "male",
//     age: 28,
//     occupation: "piano teacher",
//     years: 5005,
//     why: "I used to work at a bank, but always loved playing the piano. I decided to teach what I love to those who want to learn."
//   }
