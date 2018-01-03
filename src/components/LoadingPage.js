import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loader } from 'semantic-ui-react';

class LoadingPage extends Component {
  render() {
    return (
      <Loader style={{ marginTop: '2em' }} size='large' active={this.props.isLoading} inverted>fishing for browser support...</Loader>
    );
  }
}

LoadingPage.propTypes = {
  isLoading: PropTypes.bool
};

export default LoadingPage;