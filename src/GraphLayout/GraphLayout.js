import React, { Component } from "react";
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

export default class GraphLayout extends Component {
  state = {
    elaborating: false,
    about: false,
    selectedPerson: false
  };
  render() {
    const defaultBlurb = (
      <Blurb>
        {window.innerWidth > 600 ? "Hover" : "Click"} to explore other people's
        choices.
      </Blurb>
    );
    let leftColumnContents;
    if (!this.props.me) {
      // add back to form button?
      leftColumnContents = defaultBlurb;
    } else if (!this.props.me.pickPosition) {
      leftColumnContents = (
        <Blurb>
          Plot where you find yourself; then hover to explore other people's
          choices.
        </Blurb>
      );
    } else if (!this.props.me.why) {
      leftColumnContents = (
        <div>
          <Blurb>Tell us a few words about why you do what you do.</Blurb>
          <Button
            className="GraphLayoutButton"
            text="Tell us why"
            onClick={() => {
              this.setState({ elaborating: true });
            }}
          />
        </div>
      );
    } else {
      leftColumnContents = defaultBlurb;
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
            this.props.setWhy(why);
            this.setState({ elaborating: false });
          }}
        />
        <div className="GraphLayoutContainer">
          <div className="GraphLayoutLeftColumn">
            <div className="GraphLayoutTitle">
              I work for{" "}
              <Icons
                className="GraphLayoutTitleIcons"
                icons={["heart", "money", "questionMark"]}
              />
            </div>
            {this.state.selectedPerson ? (
              <Card
                gender={this.state.selectedPerson.gender}
                age={this.state.selectedPerson.age}
                occupation={this.state.selectedPerson.occupation}
                years={this.state.selectedPerson.years}
                why={this.state.selectedPerson.why}
              />
            ) : (
              leftColumnContents
            )}
          </div>
          <div className="GraphLayoutRightColumn">
            <Graph
              onPick={this.props.setPosition}
              me={this.props.me}
              people={this.props.strangers}
              setHighlighted={selectedPerson => {
                this.setState({ selectedPerson });
              }}
              highlighted={this.state.selectedPerson}
            />
          </div>
        </div>
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
              "https://www.facebook.com/share.php?u=" +
              encodeURIComponent(SOCIAL_TEXT)
            }
            target="_blank"
            rel="noopener"
          >
            <Icons icon="facebook" className="GraphLayoutAboutIcon" />
          </a>
        </div>
      </React.Fragment>
    );
  }
}
