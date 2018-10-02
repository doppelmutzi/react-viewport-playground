import React from "react";
import PropTypes from "prop-types";
import { isElementVerticallyInViewport } from "./viewport";
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

export default Item;
