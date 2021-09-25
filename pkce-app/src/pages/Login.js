import { useAuth } from 'react-oauth2-pkce'
import './Login.css'

function Login() {
  const { authService } = useAuth();

  const login = async () => authService.authorize();

  return (
    <div className="container">
      <p className="caption">Not Logged in yet</p>
      <button onClick={login} className="btn">Login</button>
    </div>
  );
}

export default Login