import React, { Component } from "react";
import ReactDOM from "react-dom";

const TIME_CONSTANT = 325;
function eventY(e) {
  // touch event
  if (e.targetTouches && e.targetTouches.length >= 1) {
    return e.targetTouches[0].clientY;
  }

  // mouse event
  return e.clientY;
}

export default class Snap extends Component {
  state = {
    offset: 0,
    timestamp: Date.now(),
    pressed: false,
    min: 0,
    amplitude: 0
  };

  scroll = y => {
    this.setState({
      offset: y > this.state.max ? this.state.max : y < this.state.min ? this.state.min : y
    });
  };

  tick = () => {
    const elapsed = Date.now() - this.state.timestamp;
    const v = 1000 * (this.state.offset - this.state.frame) / (1 + elapsed);
    const velocity = 0.8 * v + 0.2 * this.state.velocity;

    this.setState({
      timestamp: Date.now(),
      frame: this.state.offset,
      velocity
    });
  };

  autoScroll = () => {
    if (this.state.amplitude) {
      const elapsed = Date.now() - this.state.timestamp;
      const delta = -this.state.amplitude * Math.exp(-elapsed / TIME_CONSTANT);
      if (Math.abs(delta) > 5) {
        this.scroll(this.state.target + delta);
        requestAnimationFrame(this.autoScroll);
      } else {
        this.scroll(this.state.target);
      }
    }
  };

  tap = e => {
    clearInterval(this.state.ticker);
    this.setState({
      pressed: true,
      reference: eventY(e),
      velocity: 0,
      amplitude: 0,
      frame: this.state.offset,
      timestamp: Date.now(),
      ticker: setInterval(this.tick, 100)
    });
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  drag = e => {
    if (this.state.pressed) {
      const y = eventY(e);

      const distance = this.state.reference - y;
      if (Math.abs(distance) > 2) {
        this.setState({ reference: y });
        this.scroll(this.state.offset + distance);
      }
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  release = e => {
    clearInterval(this.state.ticker);
    let target = this.state.offset;
    // dampen if velocity is too high
    if (Math.abs(this.velocity) > 10) {
      target = this.state.offset + 0.8 * this.state.velocity;
    }
    // snap to nearest multiple
    target = Math.round(this.state.target / this.state.snap) * this.state.snap;
    this.setState({
      pressed: false,
      target,
      amplitude: target - this.state.offset,
      timestamp: Date.now()
    });
    requestAnimationFrame(this.autoScroll);

    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  componentDidMount() {
    const firstChildDOMNode = ReactDOM.findDOMNode(this[`item-0`]);
    const snap = parseInt(getComputedStyle(firstChildDOMNode).height, 10);
    const max =
      parseInt(getComputedStyle(this.container).height, 10) -
      window.innerHeight;
    this.setState({
      snap,
      max
    });
  }
  render() {
    return (
      <div
        onTouchStart={this.tap}
        onTouchMove={this.drag}
        onTouchEnd={this.release}
        onMouseDown={this.tap}
        onMouseMove={this.drag}
        onMouseUp={this.release}
        ref={container => (this.container = container)}
        style={{
          transform: "translateY(" + -this.state.offset + "px)"
        }}
      >
        {React.Children.map(this.props.children, (child, index) => {
          return <div ref={r => (this[`item-${index}`] = r)}>{child}</div>;
        })}
      </div>
    );
  }
}
