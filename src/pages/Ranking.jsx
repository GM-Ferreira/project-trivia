import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        Rankings
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   state: state.login
// });

export default connect()(Ranking);
