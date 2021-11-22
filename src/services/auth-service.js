import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
      withCredentials: true,
    });
  }

  signup = (username, password) => {
    return this.service.post(
      '/signup',
      { username, password },
      { withCredentials: true }
    );
  };

  login = (username, password) => {
    return this.service.post('/login', { username, password });
  };

  logout = () => {
    return this.service.post('/logout');
  };

  loggedin = () => {
    return this.service.get('/loggedin', { withCredentials: true });
  };
}

const authService = new AuthService();
export default authService;