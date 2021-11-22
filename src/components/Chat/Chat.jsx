import React, { Component } from "react";
import axios from "axios";

import io from "socket.io-client";
let socket = ""; // global variable that holds connection to socket server

class Chat extends Component {
  state = {
    allMessages: [],
    isLoading: true,
    currentMessage: "",
  };

  componentDidMount() {
    // TODO Step 1.4. Check with Server/DB if messages exist for this chat BE "/chat/messages/chatId"
    axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/messages/${this.props.match.params.chatId}`)
    .then( (response) => this.setState({ allMessages:response.data, isLoading: false }))
    .catch( (err) => console.log(err));

    // TODO Step 2.2. Opens Socket. On.
    console.log(process.env.REACT_APP_SOCKET_SERVER_URL)
    socket = io(`${process.env.REACT_APP_SOCKET_SERVER_URL}`)

    socket.emit("join_chat", this.props.match.params.chatId)

    socket.on("receive_message", (newMessage) => {
      this.setState({ allMessages: [...this.state.allMessages, newMessage] })
    })

  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendMessage = () => {
    // TODO Step 2.3. Emits messages on socket.
    let newMessage = {
      chatId: this.props.match.params.chatId,
      input: this.state.currentMessage,
      sender: this.props.user
    }

    socket.emit("send_message", newMessage);

    this.setState({ currentMessage: "" })

  };

  render() {
    const { allMessages, isLoading, currentMessage } = this.state;

    return (
      <div>
        <h3>You're in the Chat Page </h3>

        <div className="chatContainer">

          {/* TO SHOW ALL CHAT MESSAGES */}
          <div className="messages">
            {isLoading && <h3>...loading</h3>}
            {!isLoading && allMessages.map((eachMessage) => {
              return (
                <div key={eachMessage._id} className="messageContainer">
                    <p>{eachMessage.sender.username}: {eachMessage.input}</p>
                </div>
              );
            })}
          </div>

          {/* TO ADD NEW MESSAGES */}
          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              name="currentMessage"
              value={currentMessage}
              onChange={this.handleChange}
            />
            <button onClick={this.sendMessage}>Send</button>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Chat;
