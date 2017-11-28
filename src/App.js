import React, { Component } from 'react';
import logo from './logo.svg';
import { getSubscription, sendSubscription, checkBrowerCapabilities } from './helpers/pushApi'
import { getToken } from './helpers/util'

import ErrorPage from './components/ErrorPage'
import LoadingPage from './components/LoadingPage'
import SubscribePage from './components/SubscribePage'
import SubscriptionPage from './components/SubscriptionPage'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  /**
   * Callback handler for the action when user subscribes
   */
  handleSubscribe = (data) => {
    if (data.failure) {
      return this.setPageError(data.failure)
    }

    if (data.subscription) {
      return this.setState({
        subscription: data.subscription,
        promptSubsubscription: undefined
      })
    }
  }

  setPageError = (failure) => {
    return this.setState({
      isLoading: false,
      failure: failure,
      promptSubsubscription: undefined,
      subscription: undefined
    })
  }

  /**
   * Begin browser detection and support for push subscription
   * that may already exist in the user's browser
   */
  async componentDidMount() {
    const token = getToken()
    if (!token) {
      return this.setPageError('token')
    }

    // per docs, the promise at `navigator.serviceWorker.ready`
    // never rejects and must resolve or run endlessly
    const capabilities = await checkBrowerCapabilities()
    if (capabilities.allowed === false) {
      return this.setPageError(capabilities.reason)
    }

    // subscription is an object with members of endpoint and keys
    const subscription = await getSubscription()
    
    // if we have a push subscription, we can register on the application server
    if (subscription) {
      try {
        await sendSubscription(subscription, getToken())
        return this.setState({
          isLoading: false,
          subscription: subscription,
          promptSubsubscription: undefined
        })
      } catch (error) {
        return this.setPageError('server')
      }
    } else {
      return this.setState({
        isLoading: false,
        runnable: true,
        promptSubsubscription: true
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The Bazz</h1>
        </header>

        <p className="App-intro">
          {this.state.isLoading === true && <LoadingPage />}
          {this.state.failure && <ErrorPage failure={this.state.failure} />}
          {this.state.subscription && <SubscriptionPage subscription={this.state.subscription} />}
          {this.state.promptSubsubscription === true && <SubscribePage onSubscribe={this.handleSubscribe} />}
        </p>
      </div>
    )
  }

}

export default App;
