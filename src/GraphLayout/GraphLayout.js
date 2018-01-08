import React, { Component } from "react";
import { gs } from "../react-global-state";
import Icons from "../Icons";
import Button from "../Button";
import Graph from "./Graph";
import ShareOverlay from "../ShareOverlay";
import AboutOverlay from "../AboutOverlay";
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

class GraphLayout extends Component {
  state = {
    elaborating: false,
    about: false
  };
  render() {
    // states: picking, telluswhy, card
    let leftColumnContents;
    if (!this.props.state.pickPosition) {
      leftColumnContents = (
        <Blurb>
          Plot where you find yourself or lorem ipsum hover to explore other
          people’s choices.
        </Blurb>
      );
    } else if (!this.props.state.why) {
      leftColumnContents = (
        <div>
          <Blurb>Lorem ipsum about explaining why you did/chose it.</Blurb>
          <Button
            className="GraphLayoutButton"
            text="Tell us why"
            onClick={() => {
              this.setState({ elaborating: true });
            }}
          />
        </div>
      );
    }
    const about = this.state.about ? (
      <AboutOverlay onClosed={() => this.setState({ about: false })} />
    ) : null;
    return (
      <React.Fragment>
        {about}
        <ShareOverlay
          open={this.state.elaborating}
          onClose={() => this.setState({ elaborating: false })}
          onDone={why => {
            this.props.setState({ why });
            this.setState({ elaborating: false });
          }}
        />
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
                gender={this.props.selectedPerson.gender}
                age={this.props.selectedPerson.age}
                occupation={this.props.selectedPerson.occupation}
                years={this.props.selectedPerson.years}
                why={this.props.selectedPerson.why}
              />
            )}
            <div className="GraphLayoutAbout">
              <span
                className="GraphLayoutAboutLink"
                onClick={() => this.setState({ about: true })}
              >
                About this project
              </span>
              <Icons icon="twitter" className="GraphLayoutAboutIcon" />
              <Icons icon="facebook" className="GraphLayoutAboutIcon" />
            </div>
          </div>
          <div className="GraphLayoutRightColumn">
            <Graph
              onPick={(money, love) =>
                this.props.setState({
                  pickPosition: [money, love]
                })
              }
              pickPosition={this.props.state.pickPosition}
              people={DUMMY_DATA}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default gs(GraphLayout);
