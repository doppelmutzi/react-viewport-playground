import React from "react";
import PropTypes from "prop-types";

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

  isVisible(callback) {
    const domNode = this.myRef.current;
    const isVisible = isElementVerticallyInViewport(
      domNode,
      this.props.percentInViewport
    );
    callback(this.props.name, isVisible);
  }

  onVisibilityChanged(callback) {
    const domNode = this.myRef.current;
    const isVisible = isElementVerticallyInViewport(
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
        <div>{this.props.name}</div>
        <div>at least this has to be in viewport</div>
      </li>
    );
  }
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  onRef: PropTypes.func.isRequired
};

export const isElementVerticallyInViewport = (element, percentInViewport) => {
  const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  const { height, bottom, top } = element.getBoundingClientRect();
  const isElementAboveViewport = bottom <= 0;
  if (isElementAboveViewport) {
    return false;
  }
  const isElementBelowViewport = top >= viewportHeight;
  if (isElementBelowViewport) {
    return false;
  }
  // element is (partly) inside viewport
  const thresholdPxInViewport = height * percentInViewport;
  const pxAboveViewport = top < 0 ? top * -1 : 0;
  const pxBelowViewport = bottom > viewportHeight ? bottom - viewportHeight : 0;
  const pxInViewport = height - pxAboveViewport - pxBelowViewport;
  return pxInViewport >= thresholdPxInViewport;
};

export default Item;
