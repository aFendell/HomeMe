import React, { Component } from "react";

export class Button extends Component {
  render() {
    return <button type="button" className="order-guests-btn left-left" onClick={this.props.action}>{this.props.title}</button>;
  }
}
