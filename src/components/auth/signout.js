import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// Whenever user clicks on the sign out link they will see this component.
class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}

export default connect(null, actions)(Signout);
