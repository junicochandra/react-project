import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  // Middleware
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/dashboard');
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();   

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    await axios.post('http://laravel.api.devel:8081/api/auth/login', formData).then((response) => {
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    }).catch((error) => {
      setValidation(error.response.data);
    });
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          Login
        </div>
        <div className="card-body">
          {
            validation.error && (
              <div className="alert alert-danger" role="alert">{validation.error}</div>
            )
          }

          <form onSubmit={loginHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"/>
              {
                validation.email && (
                  <small className="text-danger">
                    {validation.email[0]}
                  </small>
                )
              }
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="form-control"/>
              {
                validation.password && (
                  <small className="text-danger">
                    {validation.password[0]}
                  </small>
                )
              }
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to={"/"} className="btn btn-link"> Home</Link>
            <Link to={"/register"} className="btn btn-link"> Register</Link>
          </form>
        </div>
      </div>
    </div>
  )
}