import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  // Call the callback with the finalized input values
  handleFormSubmit({ email, password }) {
    // Log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    // Do existence check.
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    /* handleSubmit comes from redux-form & the two fields come from the declaration at bottom. */

    const { handleSubmit, fields: { email, password } } = this.props;

    /* Hook up redux-form to the individual inputs & the onSubmit form using its provided handleSubmit,
    then provide our own callback. */
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  // Error message comes from the root reducer's auth state, which in turn comes from authReducer.
  return { errorMessage: state.auth.error };
}

// redux-form is like "connect" just the arguments are shifted over by 1.
export default reduxForm(
  {
    form: 'signin',
    fields: ['email', 'password']
  },
  mapStateToProps,
  actions
)(Signin);
