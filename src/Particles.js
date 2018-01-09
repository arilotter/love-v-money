import React, { Component } from "react";
import IconCross from "./Icons/Cross.svg";
import IconDiamond from "./Icons/Diamond.svg";
import IconCircle from "./Icons/Circle.svg";
import IconCrossBlur from "./Icons/CrossBlur.svg";
import IconDiamondBlur from "./Icons/DiamondBlur.svg";
import IconCircleBlur from "./Icons/CircleBlur.svg";
import MiniCard from "./MiniCard";

export default class Particles extends Component {
  state = {
    imagesLoaded: 0,
    particles: []
  };
  imageLoaded = () => {
    const newImageCount = this.state.imagesLoaded + 1;
    this.setState({ imagesLoaded: newImageCount });
    if (newImageCount > 0) {
      this.doPaint();
    }
  };
  doPaint = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.state.particles.forEach(({ x, y, icon, speed }) => {
      let iconName = icon;
      if (speed < 0.5) {
        iconName += "Blur";
      }
      this.ctx.drawImage(
        this[iconName],
        x * this.canvas.width,
        y * document.body.scrollHeight -
          document.scrollingElement.scrollTop * speed
      );
    });
  };

  onResize = () => {
    if (!this.canvas) {
      return;
    }
    if (this.canvas.width !== window.innerWidth) {
      const numParticles = Math.round(window.innerWidth / 10);
      const particles = new Array(numParticles).fill(0).map(() => {
        let icon;
        const rand = Math.random();
        if (rand > 2 / 3) icon = "iconCross";
        else if (rand > 1 / 3) icon = "iconDiamond";
        else icon = "iconCircle";
        return {
          x:
            Math.random() > 0.5 ? Math.random() / 3 + 2 / 3 : Math.random() / 3,
          y: 1 - Math.pow(Math.random(), 1.5),
          speed:
            Math.random() > 0.5 ? Math.random() / 3 + 0.1 : Math.random() + 0.5,
          icon
        };
      });
      this.setState({
        particles,
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.doPaint();
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
    const cards = this.props.people
      ? this.props.people.map(p => {
          const [x, y] = p.pickPosition;
          const fixedX =
            (x > 0.5 ? 2 / 3 + 2 / 3 * (x - 0.5) : x * (2 / 3)) *
            this.state.width;
          return (
            <MiniCard
              age={p.age}
              gender={p.gender}
              occupation={p.occupation}
              style={{
                position: "absolute",
                left: fixedX + "px",
                top: y * this.state.height + "px"
              }}
            />
          );
        })
      : [];
    return (
      <div>
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
          ref={canvas => (this.canvas = canvas)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: -1
          }}
        />
      </div>
    );
  }
}
