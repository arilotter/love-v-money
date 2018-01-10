import React from "react";
import { gs } from "../react-global-state";
import TripleLayout from "../TripleLayout";
import Highlight from "../Highlight";
import Particles from "./Particles";
import "./Introduction.css";

function Introduction({ history, state }) {
  return (
    <React.Fragment>
      <div className="Introduction">
        <Particles people={state.people} />
        <TripleLayout icons={["heart"]} className="IntroductionSection">
          some people<br />pursue a <Highlight>passion</Highlight>
        </TripleLayout>
        <TripleLayout icons={["money"]} className="IntroductionSection">
          others are<br />motivated by<br />
          the <Highlight>money</Highlight>
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
          onButtonClick={() => history.push("/form")}
        >
          <Highlight>plot</Highlight> where you<br />find yourself
        </TripleLayout>
      </div>
    </React.Fragment>
  );
}
export default gs(Introduction);
