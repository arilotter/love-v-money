import React, { Component } from "react";
import Icons from "../Icons";
import Button from "../Button";
import Graph from "./Graph";
import "./GraphLayout.css";

function Blurb(props) {
  return <div className="GraphLayoutBlurb">{props.children}</div>;
}

function Card(props) {
  return (
    <div className="GraphCard">
      <div className="GraphCardInfo">
        {props.gender}, {props.age} Y/O
      </div>
      <div className="GraphCardYears">
        I've been a {props.occupation} for {props.years} years
      </div>
      <div className="GraphCardWhy">{props.why}</div>
    </div>
  );
}

const DUMMY_DATA = new Array(20).fill(0).map(_ => {
  let type;
  if (Math.random() > 0.5) type = "diamond";
  else if (Math.random() > 0.5) type = "ring";
  else type = "cross";
  return {
    coords: [Math.random(), Math.random()],
    type
  };
});

export default class GraphLayou extends Component {
  state = {
    // selectedPerson: {
    //   gender: "male",
    //   age: 28,
    //   occupation: "piano teacher",
    //   years: 5005,
    //   why: "I used to work at a bank, but always loved playing the piano. I decided to teach what I love to those who want to learn."
    // }
  };
  onPick = (money, love) => {
    this.setState({ userPicked: true, pickPosition: [money, love] });
    // TODO send data + id to backend!
  };
  render() {
    // states: picking, telluswhy, card
    let leftColumnContents;
    if (!this.state.pickPosition) {
      leftColumnContents = (
        <Blurb>
          Plot where you find yourself or lorem ipsum hover to explore other
          people’s choices.
        </Blurb>
      );
    } else if (!this.state.elaboration) {
      leftColumnContents = (
        <div>
          <Blurb>Lorem ipsum about explaining why you did/chose it.</Blurb>
          <Button className="GraphLayoutButton" text="Tell us why" />
        </div>
      );
    }
    return (
      <div className="GraphLayoutContainer">
        <div className="GraphLayoutLeftColumn">
          <div className="GraphLayoutTitle">
            I work<br />for{" "}
            <Icons
              className="GraphLayoutTitleIcons"
              icons={["heart", "money", "questionMark"]}
            />
          </div>
          {leftColumnContents}
          {this.state.selectedPerson && (
            <Card
              gender={this.state.selectedPerson.gender}
              age={this.state.selectedPerson.age}
              occupation={this.state.selectedPerson.occupation}
              years={this.state.selectedPerson.years}
              why={this.state.selectedPerson.why}
            />
          )}
        </div>
        <div className="GraphLayoutRightColumn">
          <Graph
            onPick={this.onPick}
            pickPosition={this.state.pickPosition}
            people={DUMMY_DATA}
          />
        </div>
      </div>
    );
  }
}
