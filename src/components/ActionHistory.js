import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../state'

export class ActionHistory extends Component {
  static propTypes = {
    stateHistory: PropTypes.arrayOf(
      PropTypes.shape({
        action: PropTypes.shape({
          type: PropTypes.string.isRequired,
        }),
        diffs: PropTypes.object.isRequired,
      })
    ),
    revertState: PropTypes.func.isRequired,
  }

  static defaultProps = {
    stateHistory: [],
  }

  getActionsDescriptions = (objs) =>
    objs.map(({ action, index }) => (
      <div
        key={action.type + index}
        className="row d-flex btn-group"
      >
        <div
          className="col-8 btn border-1"
          style={{
            border: '1px solid rgb(200, 200, 200)',
            fontSize: '0.8rem',
          }}
        >
        {action.type}
        </div>
        <button
          className="col-4 btn btn-secondary"
          onClick={() => this.props.revertState(index)}
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
          this.props.stateHistory
            .map((obj, index) => ({ ...obj, index }))
            .filter((obj) => obj.undoable)
        )}
      </div>
    )
  }
}


export default connect(
  (state) => ({ ...state }),
  (dispatch) => bindActionCreators(actions, dispatch),
)(ActionHistory)
