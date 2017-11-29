import React, { Component } from 'react';
import { Message, Segment } from 'semantic-ui-react';

class ErrorPage extends Component {
  render() {
    // this.props.failure can be one of:
    // * 'unsupported' - no support from browser
    // * 'blocked' - notifications blocked in browser
    // * 'server' - app server error subscription post error
    // * 'token' - invalid/non-existent use of token
    if (this.props.failure) {
      return (
        <Segment inverted baseic style={{marginTop: '7em' }}>
          <Message negative>
            <Message.Header>
              Oh my!
            </Message.Header>
            <p>
              {this.props.failure === 'unsupported' && `seems like your browser doesnt support push notifications`}
              {this.props.failure === 'blocked' && `you blocked push notifications, will you enable it for me please?`}
              {this.props.failure === 'server' && `this is embarrassing! something's wrong with our server`}
              {this.props.failure === 'token' && `tsk tsk, you need to start this thing with the bazz CLI tool`}
            </p>
        </Message>
      </Segment>
      );
    }
  }
}

export default ErrorPage;