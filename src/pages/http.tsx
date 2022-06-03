import React from 'react'
import axios from "axios";

/**
 * HttpData is the type of the httpData prop in components created using withHttpData.
 * 
 * An instance of the type has three possible states depending on the status of the HTTP request:
 * - Request in progress: both response and error are null.
 * - Request succeeded: response is non-null, error is null.
 * - Request failed: response is null, error is non-null.
 * 
 * The poll field can be invoked to perform the request again.
 */
export type HttpData<T> = {
  response: T | null;
  error: string | null;
  poll: () => void;
}

/**
 * withHttpData is a higher-order component [0] use to create components that depend on data from HTTP endpoints.
 * 
 * The input component to the HOC must have a httpData prop which accepts a value of type `HttpData`. The component
 * uses this prop to access data from the endpoint.
 * 
 * The component that is returned from the HOC must be provided with at least the httpUrl prop, which specifies the URL of the
 * endpoint to fetch. The prop httpPollInterval may optionally be provided; this specifies how often (in milliseconds) to
 * perform a HTTP request to the endpoint again.
 * 
 * Any other props on the input component are passed through.
 * 
 * [0] https://reactjs.org/docs/higher-order-components.html
*/
export function withHttpData<T>(Component: React.ComponentType<any>, deserializer: (object: any) => T) {
  return class extends React.Component<any> {
    state: State<T>;
    timer: NodeJS.Timer | null;

    constructor(props: any) {
      super(props);
      this.state = {
        response: null,
        error: null,
      }
      this.timer = null;
    }

    componentDidMount() {
      window.addEventListener("focus", this.startPolling);
      window.addEventListener("blur", this.stopPolling);
      this.startPolling()
    }

    componentWillUnmount() {
      window.removeEventListener("focus", this.startPolling);
      window.removeEventListener("blur", this.stopPolling);
      this.stopPolling()
    }

    startPolling = () => {
      this.stopPolling();
      this.poll();
      if (this.props.httpPollInternal !== null) {
        this.timer = setInterval(() => this.poll(), this.props.httpPollInterval);
      }
    };

    stopPolling = () => {
      if (this.timer != null) {
        clearInterval(this.timer);
      }
    };

    async poll() {
      if (this.state.error !== null) {
        this.setState({
          response: null,
          message: null
        })
      }
      await sleep(0);
      axios.get(this.props.httpUrl)
        .then(this.handleHttpSuccess)
        .catch(this.handleHttpError)
    };

    handleHttpSuccess = (response: any) => {
      this.setState({
        response: deserializer(response.data),
        message: null,
      })
    };

    handleHttpError = (error: any) => {
      if (this.state.response !== null) {
        return
      }
      let message = "";
      if (error.response) {
        message = "TODO: grab error from transiter" //this.transitermessage(error.response)
      } else {
        message = "no internet connection"
      }
      this.setState({
        response: null,
        message: message,
      });
    };

    render() {
      const { httpUrl, httpPollInterval, ...passThroughProps } = this.props;
      return <Component httpData={{
        response: this.state.response,
        error: this.state.error,
        poll: () => {
          this.poll()
        },
      }} {...passThroughProps} />;
    }
  };
}

type State<T> = {
  response: T | null;
  error: string | null;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default withHttpData
