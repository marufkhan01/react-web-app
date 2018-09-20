import React, { Component } from 'react'
import FlashMessage from './flashMessage'
import { connect } from 'react-redux'
import { deleteFlashMessage } from './flashMessageAction'

import './css/flash.css'

class FlashMessagesList extends Component {
  render() {
    // const messages = this.props.messages.map(message => (
    //   <FlashMessage
    //     key={message.id}
    //     message={message}
    //     deleteFlashMessage={this.props.deleteFlashMessage}
    //   />
    // ))
    // return <div className="flashmessage-container">{messages[0]}</div>
    return (null)
  }
}

// function mapStateToProps(state) {
//   return {
//     messages: state.flashMessages
//   }
// }

export default connect(null, { deleteFlashMessage })(
  FlashMessagesList
)
