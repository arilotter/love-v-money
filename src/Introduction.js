import React, { Component } from "react";
import TripleLayout from "./TripleLayout";
import Highlight from "./Highlight";
import Particles from "./Particles";
import onScrollStop from "./scrollstop";
import Snap from "./kinetic-scroll";
import "./Introduction.css";

const SCROLL_TIMEOUT = 120;
class ScrollSnap extends Component {
  doSnap = () => {
    const scrollPosition = document.scrollingElement.scrollTop;
    const childHeight = window.innerHeight;
    const destinationHeight =
      Math.round(scrollPosition / childHeight) * childHeight;
    if (scrollPosition % childHeight !== 0) {
      console.log(
        `at ${scrollPosition}, trying to scroll to ${destinationHeight}`
      );
      window.scrollTo(0, destinationHeight);
    }
  };
  componentDidMount() {
    this.removeListener = onScrollStop(SCROLL_TIMEOUT, this.doSnap);
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    return <div className={this.props.className}>{this.props.children}</div>;
  }
}

export default class Introduction extends Component {
  render() {
    return (
      <React.Fragment>
        <Particles />
        <Snap className="Introduction">
          <TripleLayout icons={["heart"]} className="IntroductionSection">
            some people<br />pursue a <Highlight>passion</Highlight>
          </TripleLayout>
          <TripleLayout icons={["money"]} className="IntroductionSection">
            others are<br />motivated by<br />
            <Highlight>money</Highlight>
          </TripleLayout>
          <TripleLayout
            icons={["heart", "money"]}
            className="IntroductionSection"
          >
            most strive<br />for some <Highlight>mix</Highlight>
            <br />of the two.
          </TripleLayout>
          <TripleLayout
            className="IntroductionSection"
            icons={["heart", "money", "questionMark"]}
            buttonText="Start"
            onButtonClick={() => console.log("TODO go to next state")}
          >
            <Highlight>plot</Highlight> where you<br />find yourself
          </TripleLayout>
        </Snap>
      </React.Fragment>
    );
  }
}
