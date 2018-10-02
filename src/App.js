import React, { Component } from "react";
import "./App.css";
import Item from "./Item";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentVisible: undefined
    };
    this.children = [];
    this.ulRef = React.createRef();
  }

  componentDidMount() {
    const percentInViewport = this.retrievePercentVisible();
    this.setState(
      prevState => {
        return {
          percentVisible: percentInViewport
        };
      },
      () => {
        this.processInitialItemVisability();
        window.addEventListener("scroll", this.handleScroll);
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  processInitialItemVisability() {
    this.children.forEach(item => {
      item.isVisible((elementName, isVisible) => {
        console.log(
          `${elementName} is initially ${isVisible ? "visible" : "invisible"}`
        );
      });
    });
  }

  retrievePercentVisible() {
    const ul = this.ulRef.current;
    let compStyles = window.getComputedStyle(ul);
    const percentInViewport = compStyles.getPropertyValue("--item-visible");
    return percentInViewport;
  }

  handleScroll = event => {
    this.children.forEach(item => {
      if (!item) return;
      item.onVisibilityChanged((elementName, isVisible) => {
        console.log(
          `${elementName} has changed its visibility to ${
            isVisible ? "visible" : "invisible"
          }`
        );
      });
    });
  };

  onRef = item => {
    this.children.push(item);
  };

  render() {
    const percentInViewport = this.state.percentVisible;
    return (
      <ul className="App" ref={this.ulRef}>
        <Item
          name="E1"
          onRef={this.onRef}
          percentInViewport={percentInViewport}
        />
        <Item
          name="E2"
          onRef={this.onRef}
          percentInViewport={percentInViewport}
        />
        <Item
          name="E3"
          onRef={this.onRef}
          percentInViewport={percentInViewport}
        />
        <Item
          name="E4"
          onRef={this.onRef}
          percentInViewport={percentInViewport}
        />
        <Item
          name="E5"
          onRef={this.onRef}
          percentInViewport={percentInViewport}
        />
      </ul>
    );
  }
}

export default App;
