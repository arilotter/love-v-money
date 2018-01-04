import React, { Component } from "react";
import ReactResizeDetector from "react-resize-detector";
import Icons from "../Icons";
import "./Graph.css";
import createRafLoop from "raf-loop";

export default class Graph extends Component {
  onClick = e => {
    if (!this.props.pickPosition) {
      const money = this.x / this.w;
      const love = 1 - this.y / this.w;
      this.props.onPick(money, love);
    }
  };

  onMouseMove = e => {
    const rect = e.target.getBoundingClientRect();
    this.x = e.pageX - rect.left;
    this.y = e.pageY - rect.top;
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
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    drawGrid(ctx, this.w);
    ctx.strokeStyle = "#fa3a38";
    if (!this.props.pickPosition) {
      drawRing(ctx, this.x, this.y, 14);
    } else {
      const [x, y] = this.props.pickPosition;
      drawRing(ctx, x * this.w, (1 - y) * this.w, 10);
    }
    ctx.strokeStyle = "#3c3c3c";
    this.props.people.forEach(({ coords, type }) => {
      const [x, y] = coords;
      const renderFn = {
        ring: drawRing,
        diamond: drawDiamond,
        cross: drawCross
      }[type];
      renderFn(ctx, x * this.w, (1 - y) * this.w, 10);
    });
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
    return (
      <div className="GraphPositioningContainer">
        <div className="GraphContainer">
          <Icons icon="heart" className="GraphYLabel" />
          <div className="Graph">
            <ReactResizeDetector handleWidth onResize={this.onResize} />
            <canvas
              className="GraphCanvas"
              ref={canvas => {
                this.canvas = canvas;
              }}
              onMouseMove={this.onMouseMove}
              onClick={this.onClick}
            />
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
