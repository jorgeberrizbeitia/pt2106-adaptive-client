import axios from "axios";
import React, { Component } from "react";

class Users extends Component {
  state = {
    users: null,
    isLoading: true,
  };

  // ! On first load, show all users
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users`)
      .then((response) => {
        this.setState({ users: response.data, isLoading: false });
      })
      .catch((err) => console.log(err));
  }

  // TODO Step 1.3. handleClickChat should contact the DB which will check if a chat already exists and the chatId
  handleClickChat = (user2Id) => {
    // 1. add the click event and pass the id of the user

    // 2. call BE /chat/create that will check if chat exists or not. Send user2Id.
    axios.post(`${process.env.REACT_APP_SERVER_URL}/chat/create`, {userId: user2Id}, { withCredentials: true })
    .then( (response) => this.props.history.push(`/chat/${response.data._id}`))
    .catch( (err) => console.log(err));
    // 3. use id received to redirect user to FE /chat/chatId. This FE routes displays Chat Component.
  };

  render() {
    const { users, isLoading } = this.state;

    return (
      <div>
        <h1>Users</h1>
        <hr />

        {isLoading ? (
          <h1>...is loading</h1>
        ) : (
          users.map((eachUser) => {
            return (
              <div key={eachUser._id}>
                <p>
                  <b>Name:</b> {eachUser.username}
                </p>
                <button onClick={() => this.handleClickChat(eachUser._id)}>
                  Chat with {eachUser.username}
                </button>
                <hr />
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default Users;
