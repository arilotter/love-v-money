import React from "react";
import Highlight from "../Highlight";
import Icons from "../Icons";
import "./AboutOverlay.css";

export default function AboutOverlay(props) {
  return (
    <div className="AboutOverlayContainer">
      <div className="AboutOverlayCloseButton" onClick={props.onClosed} />
      <div className="AboutOverlayBigLeft">
        <Icons icons={["heart", "money", "questionMark"]} />
        <Highlight>Love V Money</Highlight> is the first digital initiative from
        the Museum of Contemporary Work.
      </div>
      <div className="AboutOverlaySmallRight">
        It was originally produced in a physical environment using post-it notes
        in summer 2017. This site was created with the generous support of:<br />
        <Highlight>Serene Wong</Highlight> / Design Role<br />
        <Highlight>Ari Lotter</Highlight> / Developer<br />
        <Highlight>Mike Dobell</Highlight> / Production<br />
        <Highlight>Sean Hazell</Highlight> / Creator<br />
        (Some Friends from <Highlight>Jam3</Highlight>)
      </div>
      <div className="AboutOverlayBigLeft">
        The <Highlight>Museum of Contemporary Work</Highlight> is a pop-up
        exhibit exploring the recent past, present and future of work through
        physical objects.
      </div>
      <div className="AboutOverlaySmallRight">
        <p>
          The artifacts displayed, both real and fictional, connect themes like
          identity, inequity, meaning and motivation. Some have all but
          disappeared from the workplace. Others are re-emerging as souvenirs.
          Some are tools. Others are inspirational tokens. Each is a symbol of
          the invisible forces at work in our work.{" "}
          <Highlight>
            They tell stories of how our daily labours are changing; and how
            they are changing us.
          </Highlight>
        </p>
        <p>
          The exhibit first showed in a hidden space in downtown Toronto, Canada
          in the summer of 2017. It is{" "}
          <a
            href="http://todesignoffsite.com/event/museum-contemporary-work/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Highlight>showing again January 15-21, 2018</Highlight>
          </a>, as part of the Toronto Design Offsite Festival. It was conceived
          by Sean Hazell and is produced and curated with the help of Stephanie
          Wan, Derek Last and Julie Do. You can find an interview{" "}
          <a
            href="http://stimulantonline.ca/2017/06/12/a-history-of-work-in-objects/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Highlight>here</Highlight>
          </a>{" "}
          on the origins of the concept.
        </p>
        <p>
          For more information contact:{" "}
          <Highlight>sean@hazellcompany.com</Highlight>
          <span className="AboutOverlayFooterSpacer" />
        </p>
      </div>
    </div>
  );
}
