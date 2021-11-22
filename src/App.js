import { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

import Navbar from './components/Navbar';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Products from './components/Payment/Products';
import Users from './components/Chat/Users';
import Chat from './components/Chat/Chat';

import authService from './services/auth-service';

class App extends Component {
  state = {
    isLoggedIn: null,
    user: null,
  };

  setUser = (user, loggedInStatus) => {
    this.setState({
      user,
      isLoggedIn: loggedInStatus,
    });
  };

  getUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((response) => {
          this.setState({
            user: response.data.user || null,
            isLoggedIn: true,
          });
        })
        .catch((error) => {
          this.setState({
            isLoggedIn: false,
          });
        });
    }
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { user, isLoggedIn } = this.state;
    return (
      <div>
        <Navbar isLoggedIn={isLoggedIn} user={user} setUser={this.setUser} />
        <Switch>
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setUser={this.setUser} />}
          />

          {/* payments with stripe.js */}
          <Route
            exact
            path="/products"
            render={(props) => <Products {...props}/>}
          />

          {/* chat with socket.io */}
          <Route
            exact
            path="/users"
            render={(props) => <Users {...props}/>}
          />
          <Route
            exact
            path="/chat/:chatId"
            render={(props) => <Chat {...props} user={user}/>}
          />

        </Switch>
      </div>
    );
  }
}

export default App;