import React, { Component } from 'react'
import { subscribePush, sendSubscription, requestNotificationPermission } from '../helpers/pushApi'
import { getToken } from '../helpers/util'
import logo from '../logo.svg';

class SubscribePage extends Component {
  /**
   * Handle user subscription flow, composed of:
   * - granted permission to browser notifications
   * - get subscription from push server
   * - send subscription to application server 
   */
  subscribe = async (e) => {
    e.preventDefault();

    try {
      await requestNotificationPermission();
    } catch (error) {
      return this.props.onSubscribe({
        failure: 'blocked'
      });
    }
    
    let subscription
    try {
      subscription = await subscribePush();
    } catch (error) {
      if (typeof error === 'object' && error.allowed === false) {
        return this.props.onSubscribe({
          failure: error.reason
        });
      }
    }

    try {
      await sendSubscription(subscription, getToken())
      return this.props.onSubscribe({
        subscription
      });
    } catch (error) {
      return this.props.onSubscribe({
        failure: 'server'
      });
    }

  }

  render() {
    return (
      <div> 
        <button onClick={this.subscribe}>
          Subscribe
        </button>
      </div>
    );
  }
}

export default SubscribePage;