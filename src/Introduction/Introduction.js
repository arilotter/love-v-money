import React from "react";
import TripleLayout from "../TripleLayout";
import Highlight from "../Highlight";
import Particles from "../Particles";
import MiniCard from "../MiniCard";
import Icons from "../Icons";
import "./Introduction.css";

export default function Introduction() {
  return (
    <React.Fragment>
      <Particles />
      <MiniCard age={24} gender="male" occupation="garbage collector"/>
      <div className="Introduction">
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
      </div>
    </React.Fragment>
  );
}
