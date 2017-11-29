import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';

class LoadingPage extends Component {
  render() {
    return (
      <Loader style={{marginTop: '2em'}} size='large' active inverted>fishing for browser support...</Loader>
    );
  }
}

export default LoadingPage;