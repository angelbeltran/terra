import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../state'

export class ActionHistory extends Component {
  static propTypes = {
    history: PropTypes.arrayOf(
      PropTypes.shape({
        action: PropTypes.shape({
          type: PropTypes.string.isRequired,
        }),
        state: PropTypes.object.isRequired,
      })
    ).isRequired,
    revertState: PropTypes.func.isRequired,
  }

  getActionsDescriptions = (actions) =>
    actions.map((action, index) => (
      <div
        key={action.type + index}
        className="row d-flex btn-group"
        onClick={() => this.props.revertState(index)}
      >
        <div
          className="col-8"
          style={{
            border: '1px solid rgb(200, 200, 200)',
            borderRadius: '5px',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
            fontSize: '0.8rem',
          }}
        >
        {action.type}
        </div>
        <button
          className="col-4 btn btn-secondary"
        >
          X
        </button>
      </div>
    ))

  render() {
    return (
      <div className="container-fluid">
        <h5>Actions taken</h5>
        <hr />
        {this.getActionsDescriptions(
          this.props.history.map(({ action }) => action)
        )}
      </div>
    )
  }
}


export default connect(
  (state) => ({ ...state }),
  (dispatch) => bindActionCreators(actions, dispatch),
)(ActionHistory)
