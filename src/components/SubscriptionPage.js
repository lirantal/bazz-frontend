import React, { Component } from 'react'

class SubscriptionPage extends Component {
  render() {
    return (
      <div>
        <p>
          successfully subscribed
        </p>
        <p>
          your subscription endpoint:
          <p>
            {this.props.subscription.endpoint}
          </p>
        </p>
      </div>
    );
  }
}

export default SubscriptionPage;