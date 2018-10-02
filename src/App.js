import React, { Component } from "react";
import "./App.css";
import Item from "./Item";

class App extends Component {
  state = {
    directionVertical: true,
    percentVisible: undefined
  };

  constructor(props) {
    super(props);
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

  // read initial value from CSS
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

  // pitfall with this. state is undefined with handleRadioChange(event) {}
  // https://stackoverflow.com/a/50111979
  handleRadioChange = event => {
    const { value: radioVal } = event.target;
    const isVerticalDirection = radioVal === "vertical" ? true : false;
    this.setState(prevState => {
      return {
        directionVertical: isVerticalDirection
      };
    });
  };

  handleInputChange = event => {
    const { value: inputVal } = event.target;
    this.setState(prevState => {
      return {
        percentVisible: inputVal
      };
    });
    // write back value to CSS
    document.documentElement.style.setProperty("--item-visible", inputVal);
  };

  render() {
    const percentInViewport = this.state.percentVisible;
    const style = {
      display: this.state.directionVertical ? "flex" : "block"
    };
    return (
      <div className="App" style={style}>
        <form>
          <h3>direction</h3>
          <fieldset>
            <input
              checked={this.state.directionVertical}
              type="radio"
              name="chooseone"
              value="vertical"
              onChange={this.handleRadioChange}
            />
            <label htmlFor="vertical">vertical</label>
          </fieldset>
          <fieldset>
            <input
              checked={!this.state.directionVertical}
              type="radio"
              name="chooseone"
              value="horizontal"
              onChange={this.handleRadioChange}
            />
            <label htmlFor="horizontal">horizontal</label>
          </fieldset>
          <h3>visability</h3>
          <input
            type="number"
            min="0"
            max="1"
            step="0.05"
            placeholder={this.state.percentVisible}
            onChange={this.handleInputChange}
          />
        </form>
        <ul
          ref={this.ulRef}
          className={this.state.directionVertical ? "vertical" : "horizontal"}
        >
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
      </div>
    );
  }
}

export default App;
