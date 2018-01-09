import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { gs } from "../react-global-state";
import Icons from "../Icons";
import Button from "../Button";
import Graph from "./Graph";
import Card from "./Card";
import ShareOverlay from "../ShareOverlay";
import AboutOverlay from "../AboutOverlay";
import "./GraphLayout.css";

const SOCIAL_TEXT =
  "Some people work for love. Others for money. Find out where you fit. http://lovevmoney.com";

function Blurb(props) {
  return <div className="GraphLayoutBlurb">{props.children}</div>;
}

class GraphLayout extends Component {
  state = {
    elaborating: false,
    about: false,
    selectedPerson: false
  };
  render() {
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
                gender={this.state.selectedPerson.gender}
                age={this.state.selectedPerson.age}
                occupation={this.state.selectedPerson.occupation}
                years={this.state.selectedPerson.years}
                why={this.state.selectedPerson.why}
              />
            )}
            <div className="GraphLayoutAbout">
              <span
                className="GraphLayoutAboutLink"
                onClick={() => this.setState({ about: true })}
              >
                About this project
              </span>
              <a
                href={
                  "https://twitter.com/intent/tweet?text=" +
                  encodeURIComponent(SOCIAL_TEXT)
                }
                target="_blank"
                rel="noopener"
              >
                <Icons icon="twitter" className="GraphLayoutAboutIcon" />
              </a>
              <a
                href={
                  "http://www.facebook.com/share.php?u=" +
                  encodeURIComponent(SOCIAL_TEXT)
                }
                target="_blank"
                rel="noopener"
              >
                <Icons icon="facebook" className="GraphLayoutAboutIcon" />
              </a>
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
              people={this.props.state.people}
              gender={this.props.state.gender}
              setHighlighted={selectedPerson => {
                this.setState({ selectedPerson });
              }}
              highlighted={this.state.selectedPerson}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default gs(GraphLayout);
