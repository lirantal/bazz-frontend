import React, { Component } from 'react';

import { subscribePush, sendSubscription, requestNotificationPermission } from '../helpers/pushApi';
import { getToken } from '../helpers/util';

import { Label, Button, Container, Header } from 'semantic-ui-react';

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
      <Container textAlign='center' style={{marginTop: '6em'}}>
          <Label basic size='medium' pointing='below'>
            You need to hit the button 
            so I can send you a notification
            when it's time.
          </Label>
        <Container>
          <Button
            positive
            size='massive'
            onClick={this.subscribe}
            style={{marginTop: '1em'}}
          >
            Notify me!
          </Button>
        </Container>
        <Container style={{marginTop: '6em'}} >
          <Header inverted as='h5' size='mini'>
            the browser will prompt you to
            enable notifications
          </Header> 
        </Container>
      </Container>
    );
  }
}

export default SubscribePage;