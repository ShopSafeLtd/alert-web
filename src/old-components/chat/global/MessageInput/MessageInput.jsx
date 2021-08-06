import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

class MessageInput extends Component {
  render() {
    let { ref, ...rest } = this.props;
    return <TextareaAutosize ref={newRef => (ref = newRef)} {...rest} />;
  }
}

export default MessageInput;
