import React, { Component } from "react";
import IconCross from "../Icons/Cross.svg";
import IconDiamond from "../Icons/Diamond.svg";
import IconCircle from "../Icons/Circle.svg";
import IconCrossBlur from "../Icons/CrossBlur.svg";
import IconDiamondBlur from "../Icons/DiamondBlur.svg";
import IconCircleBlur from "../Icons/CircleBlur.svg";
import MiniCard from "../MiniCard";

const CARD_Y = [1 / 6, 5 / 6, 7 / 6, 11 / 6, 13 / 6, 17 / 6, 19 / 6, 23 / 6];

export default class Particles extends Component {
  state = {
    imagesLoaded: 0,
    particles: [],
    width: 0,
    height: 0,
    cards: []
  };
  imageLoaded = () => {
    const newImageCount = this.state.imagesLoaded + 1;
    this.setState({ imagesLoaded: newImageCount });
    if (newImageCount > 0) {
      this.doPaint();
    }
  };
  doPaint = () => {
    this.ctx.clearRect(0, 0, this.state.width, this.state.height);

    const gapSize = this.state.width > 900 ? 760 : 300;
    const sideSize = (this.state.width - gapSize) / 2;
    this.state.particles.forEach(({ x, y, icon, speed }) => {
      let iconName = icon;
      if (speed < 0.5 || this.state.width < 400) {
        iconName += "Blur";
      }
      let scaledX;
      if (this.state.width < 400) {
        scaledX = x * (this.state.width - 32);
      } else if (x > 0.5) {
        scaledX = sideSize + gapSize + x * sideSize;
      } else {
        scaledX = x * sideSize;
      }

      this.ctx.drawImage(
        this[iconName],
        scaledX,
        y * document.body.scrollHeight -
          document.scrollingElement.scrollTop * speed
      );
    });
  };

  onResize = () => {
    let state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    if (state.width !== this.state.width) {
      const numParticles = Math.round(state.width / 20);
      const particles = new Array(numParticles).fill(0).map(() => {
        let icon;
        const rand = Math.random();
        if (rand > 2 / 3) icon = "iconCross";
        else if (rand > 1 / 3) icon = "iconDiamond";
        else icon = "iconCircle";
        return {
          x: Math.random(),
          y: Math.random(),
          speed:
            Math.random() > 0.5 ? Math.random() / 3 + 0.1 : Math.random() + 0.5,
          icon
        };
      });
      const gapSize = state.width > 900 ? 760 : 300;
      const sideSize = (state.width - gapSize) / 2;
      const cards = CARD_Y.map((y, index) => {
        // weight even to the left and odd to the right
        // for a more even side distribution
        const rand = Math.random() * 0.6 + 0.2 + (index % 2 === 0 ? 0.2 : -0.2);
        const fixedX =
          rand > 0.5
            ? sideSize + gapSize + rand / 2 * (sideSize - 200)
            : rand * sideSize;
        const fixedY = y * state.height;
        return [fixedX, fixedY];
      });
      state = { ...state, cards, particles };
    }
    this.setState(state, () => this.doPaint());
  };

  componentDidMount() {
    this.ctx = this.canvas.getContext("2d");
    document.addEventListener("scroll", this.doPaint);
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.doPaint);
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    const shouldRenderCards = this.state.width > 600 && this.props.people;
    const cards = shouldRenderCards
      ? this.props.people.slice(0, CARD_Y.length).map((p, index) => {
          const [x, y] = this.state.cards[index];
          return (
            <MiniCard
              key={Math.round(Math.random() * 10000)}
              age={p.age}
              gender={p.gender}
              occupation={p.occupation}
              style={{
                position: "absolute",
                left: x + "px",
                top: y + "px"
              }}
            />
          );
        })
      : [];
    return (
      <div className="Particles">
        <img
          alt=""
          ref={iconCross => (this.iconCross = iconCross)}
          src={IconCross}
          style={{ display: "none" }}
          onLoad={this.imageLoaded}
        />
        <img
          alt=""
          ref={iconDiamond => (this.iconDiamond = iconDiamond)}
          src={IconDiamond}
          style={{ display: "none" }}
          onLoad={this.imageLoaded}
        />
        <img
          alt=""
          ref={iconCircle => (this.iconCircle = iconCircle)}
          src={IconCircle}
          style={{ display: "none" }}
          onLoad={this.imageLoaded}
        />
        <img
          alt=""
          ref={iconCrossBlur => (this.iconCrossBlur = iconCrossBlur)}
          src={IconCrossBlur}
          style={{ display: "none" }}
          onLoad={this.imageLoaded}
        />
        <img
          alt=""
          ref={iconDiamondBlur => (this.iconDiamondBlur = iconDiamondBlur)}
          src={IconDiamondBlur}
          style={{ display: "none" }}
          onLoad={this.imageLoaded}
        />
        <img
          alt=""
          ref={iconCircleBlur => (this.iconCircleBlur = iconCircleBlur)}
          src={IconCircleBlur}
          style={{ display: "none" }}
          onLoad={this.imageLoaded}
        />
        {cards}
        <canvas
          ref={canvas => {
            this.canvas = canvas;
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: -1
          }}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }
}
