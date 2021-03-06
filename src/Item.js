import React from "react";
import PropTypes from "prop-types";
import {
  isElementVerticallyInViewport,
  isElementHorizontallyInViewport
} from "./viewport";
class Item extends React.Component {
  state = { visible: false };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  isVisible(callback, isVerticalDirection = true) {
    const domNode = this.myRef.current;
    const isElementInViewport = isVerticalDirection
      ? isElementVerticallyInViewport
      : isElementHorizontallyInViewport;
    const isVisible = isElementInViewport(
      domNode,
      this.props.percentInViewport
    );
    callback(this.props.name, isVisible);
  }

  onVisibilityChanged(callback, isVerticalDirection = true) {
    const domNode = this.myRef.current;
    const isElementInViewport = isVerticalDirection
      ? isElementVerticallyInViewport
      : isElementHorizontallyInViewport;
    const isVisible = isElementInViewport(
      domNode,
      this.props.percentInViewport
    );
    if (this.state.visible !== isVisible) {
      this.setState(prevState => {
        return { visible: !prevState.visible };
      });
      callback(this.props.name, isVisible);
    }
  }

  render() {
    return (
      <li ref={this.myRef}>
        <div>
          <p>{this.props.name}</p>
        </div>
        <div>
          <p>at least this has to be in viewport</p>
        </div>
      </li>
    );
  }
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  onRef: PropTypes.func.isRequired
};

export default Item;
