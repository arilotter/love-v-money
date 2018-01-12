import React, { Component } from "react";
import ReactResizeDetector from "react-resize-detector";
import Transition from "react-motion-ui-pack";
import Icons from "../Icons";
import Card from "./Card";
import "./Graph.css";
import createRafLoop from "raf-loop";
import classNames from "classnames";
import hexToRgba from "hex-to-rgba";

const CIRCLE_SIZE = 10;

export default class Graph extends Component {
  cursorAlpha = 0;
  state = {
    mouseIn: false,
    hover: false
  };
  onClick = e => {
    const rect = e.target.getBoundingClientRect();
    if (!this.props.pickPosition) {
      const money = (e.pageX - rect.left) / this.w;
      const love = 1 - (e.pageY - rect.top) / this.w;
      this.props.onPick(money, love);
    } else if (this.state.hover) {
      this.onMouseMove(e);
      this.props.setHighlighted(this.state.hover);
    } else {
      this.props.setHighlighted(null);
    }
  };

  onMouseMove = e => {
    const rect = e.target.getBoundingClientRect();
    this.x = e.pageX - rect.left;
    this.y = e.pageY - rect.top;
    if (this.props.pickPosition) {
      const closest = (this.props.people || [])
        .map(person => {
          const [x, y] = person.pickPosition;
          const dx = x - this.x / this.w;
          const dy = y - (1 - this.y / this.w);
          return { person, dist: dx * dx + dy * dy };
        })
        .sort((a, b) => a.dist - b.dist)
        .shift();
      if (closest && Math.sqrt(closest.dist) * this.w < CIRCLE_SIZE * 2) {
        this.setState({ hover: closest.person });
      } else {
        this.setState({ hover: false });
      }
    }
  };

  onResize = width => {
    this.w = width;
    if (!this.canvas) {
      return;
    }
    this.canvas.width = (width - 4) * window.devicePixelRatio;
    this.canvas.height = (width - 4) * window.devicePixelRatio;
    this.canvas.style.width = width - 4 + "px";
    this.canvas.style.height = width - 4 + "px";
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };

  onPaint = delta_time => {
    if (this.props.pickPosition) {
      this.cursorAlpha = 1;
    } else if (this.state.mouseIn && this.cursorAlpha < 1) {
      this.cursorAlpha += delta_time / 200;
    } else if (!this.state.mouseIn && this.cursorAlpha > 0) {
      this.cursorAlpha -= delta_time / 200;
    }
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    drawGrid(ctx, this.w);

    ctx.strokeStyle = "#3c3c3c";
    if (this.props.people) {
      this.props.people.forEach(({ pickPosition, gender }) => {
        const [x, y] = pickPosition;
        const blur =
          (this.state.hover &&
            this.state.hover.pickPosition[0] === x &&
            this.state.hover.pickPosition[1] === y) ||
          (this.props.highlighted &&
            this.props.highlighted.pickPosition[0] === x &&
            this.props.highlighted.pickPosition[1] === y);
        getRenderFunction(gender, blur)(
          ctx,
          x * this.w,
          (1 - y) * this.w,
          CIRCLE_SIZE
        );
      });
    }
    ctx.strokeStyle = `rgba(250,58,56, ${this.cursorAlpha})`;
    const renderCursor = getRenderFunction(this.props.gender);
    if (!this.props.pickPosition) {
      renderCursor(ctx, this.x, this.y, 14);
    } else {
      const [x, y] = this.props.pickPosition;
      renderCursor(ctx, x * this.w, (1 - y) * this.w, CIRCLE_SIZE);
    }
  };

  componentDidMount() {
    this.ctx = this.canvas.getContext("2d");
    this.raf_loop = createRafLoop(this.onPaint).start();
    this.resizeListener = this.onResize;
    setImmediate(() => this.onResize(this.w));
  }

  componentWillUnmount() {
    this.raf_loop.stop();
  }

  render() {
    let card = false;
    if (this.state.hover) {
      const x = this.state.hover.pickPosition[0];
      const rightSide = x > 0.5;
      const side = rightSide ? "right" : "left";
      const xOffset = (rightSide ? 1 - x : x) * this.w;
      card = (
        <Card
          key="card"
          gender={this.state.hover.gender}
          age={this.state.hover.age}
          occupation={this.state.hover.occupation}
          small
          style={{
            position: "absolute",
            [side]: xOffset + "px",
            top: (1 - this.state.hover.pickPosition[1]) * this.w - 70 + "px"
          }}
        />
      );
    }
    return (
      <div className="DoubleContainer">
        <div className="GraphContainer">
          <Icons icon="heart" className="GraphYLabel" />
          <div
            className={classNames("Graph", {
              GraphHover: this.state.hover
            })}
            onMouseEnter={() => this.setState({ mouseIn: true })}
            onMouseLeave={() => this.setState({ mouseIn: false, hover: false })}
          >
            <ReactResizeDetector handleWidth onResize={this.onResize} />
            <canvas
              className="GraphCanvas"
              ref={canvas => {
                this.canvas = canvas;
              }}
              onMouseMove={this.onMouseMove}
              onClick={this.onClick}
            />
            <Transition
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
              component={false}
            >
              {card}
            </Transition>
          </div>
          <Icons icon="money" className="GraphXLabel" />
        </div>
      </div>
    );
  }
}

function drawRing(ctx, x, y, width) {
  ctx.beginPath();
  ctx.lineWidth = width / 3;
  ctx.arc(x, y, width, 0, Math.PI * 2);
  ctx.stroke();
}

function drawCross(ctx, x, y, width) {
  ctx.beginPath();
  ctx.lineWidth = width / 3;
  width *= 1.5;
  ctx.moveTo(x - width / 2, y - width / 2);
  ctx.lineTo(x + width / 2, y + width / 2);
  ctx.moveTo(x + width / 2, y - width / 2);
  ctx.lineTo(x - width / 2, y + width / 2);
  ctx.stroke();
}

function drawDiamond(ctx, x, y, width) {
  ctx.beginPath();
  ctx.lineWidth = width / 3;
  width *= 2;
  ctx.moveTo(x, y - width / 2);
  ctx.lineTo(x - width / 2, y);
  ctx.lineTo(x, y + width / 2);
  ctx.lineTo(x + width / 2, y);
  ctx.lineTo(x - 1, y - width / 2 - 1);
  ctx.stroke();
}

function drawGrid(ctx, w) {
  const t = w / 3;
  ctx.setLineDash([2, 2]);
  ctx.strokeStyle = "#dedede";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(t, 0);
  ctx.lineTo(t, w);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(2 * t, 0);
  ctx.lineTo(2 * t, w);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, t);
  ctx.lineTo(w, t);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 2 * t);
  ctx.lineTo(w, 2 * t);
  ctx.stroke();
  ctx.setLineDash([]);
}

function getRenderFunction(gender, blur) {
  if (blur) {
    const unblurredFunction = getRenderFunction(gender);
    return (ctx, x, y, width) => {
      const origStrokeStyle = ctx.strokeStyle;
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = hexToRgba(origStrokeStyle, (5 - i) / 5);
        unblurredFunction(ctx, x, y, width + i);
      }
      ctx.strokeStyle = origStrokeStyle;
    };
  }
  if (gender === "female") {
    return drawRing;
  } else if (gender === "male") {
    return drawDiamond;
  } else {
    return drawCross;
  }
}
