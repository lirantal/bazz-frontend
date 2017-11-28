import React, { Component } from 'react'

class ErrorPage extends Component {
  render() {
    // this.props.failure can be one of:
    // * 'unsupported' - no support from browser
    // * 'blocked' - notifications blocked in browser
    // * 'server' - app server error subscription post error
    // * 'token' - invalid/non-existent use of token
    if (this.props.failure) {
      return (
        <div>
          <p>
            error: unable to run because of: {this.props.failure}
          </p>
        </div>
      );
    }
  }
}

export default ErrorPage;