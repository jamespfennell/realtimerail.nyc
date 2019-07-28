import React from 'react'
import axios from "axios";
import AnimateHeight from "react-animate-height";
import LoadingBar from "../shared/loadingbar/LoadingBar";
import ErrorMessage from "../shared/errormessage/ErrorMessage";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class LazyLoadingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.state["pageStatus"] = "LOADING";
    this.interval = null;
  }

  // These are the methods that subclasses must overload

  className() {
    return ""
  }

  pollTime() {
    return -1
  }

  initialState() {
    return {}
  };

  transiterUrl() {
    return ""
  };

  transiterErrorMessage(response) {
    return ""
  };

  getStateFromTransiterResponse(response) {
    return {}
  };

  header() {
    return <div/>;
  };

  body() {
    return <div/>
  };

  componentDidMount() {
    this.pollTransiter();
    if (this.pollTime() > 0) {
      this.interval = setInterval(this.pollTransiter, this.pollTime());
    }
  }

  componentWillUnmount() {
    if (this.interval != null) {
      clearInterval(this.interval);
    }
  }

  async pollTransiter() {
    await sleep(100);
    axios.get(this.transiterUrl())
      .then(this.handleHttpSuccess)
      .catch(this.handleHttpError)
  };

  handleHttpSuccess = (response) => {
    let state = this.getStateFromTransiterResponse(response.data);
    state["pageStatus"] = "LOADED";
    this.setState(state)
  };

  handleHttpError = (error) => {
    let errorMessage = "";
    if (error.response) {
      errorMessage = this.transiterErrorMessage(error.response)
    } else {
      errorMessage = "No internet"
    }
    this.setState({
      pageStatus: "ERROR",
      errorMessage: errorMessage
    });
  };

  render() {
    let elements = [];
    elements.push(<div key="header">{this.header()}</div>);

    if (this.state.pageStatus === "ERROR") {
      elements.push(<ErrorMessage>{this.state.errorMessage}</ErrorMessage>)
    } else if (this.state.pageStatus === "LOADING") {
      elements.push(<LoadingBar key="loadingBar "/>)
    }

    elements.push(
      <AnimateHeight
        animateOpacity={true}
        key="bodyContainer"
        height={this.state.pageStatus === "LOADED" ? "auto" : 0}
        duration={500}>
        {this.state.pageStatus === "LOADED" ? this.body() : ""}
      </AnimateHeight>
    );

    return (
      <div className={this.className()}>
        {elements}
      </div>
    )
  }

}

export default LazyLoadingPage
