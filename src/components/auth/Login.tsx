import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation
  const [validation, setValidation] = useState({ error: '', email: '', password: '' });

  // Middleware
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, []);

  const loginHandler = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    await axios.post(apiUrl+'/api/auth/login', formData).then((response) => {
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    }).catch((error) => {
      setValidation(error.response.data);
    });
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <form onSubmit={loginHandler}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card-group d-block d-md-flex row">
                <div className="card col-md-7 p-4 mb-0">
                  <div className="card-body">
                    <h1>Login</h1>
                    {
                      validation.error && (
                        <div className="alert alert-danger" role="alert">{validation.error}</div>
                      )
                    }
                    <p className="text-body-secondary">Sign In to your account</p>
                    <div className="input-group">
                      <span className="input-group-text">
                        <svg className="icon">
                          <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-user"></use>
                        </svg>
                      </span>
                      <input className="form-control" type="text" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                      {
                        validation.email && (
                          <small className="text-danger">
                            {validation.email[0]}
                          </small>
                        )
                      }
                    </div>
                    <div className="input-group">
                      <span className="input-group-text">
                        <svg className="icon">
                          <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-lock-locked"></use>
                        </svg>
                      </span>
                      <input className="form-control" type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-group">
                      {
                        validation.password && (
                          <small className="text-danger">
                            {validation.password[0]}
                          </small>
                        )
                      }
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <button className="btn btn-primary px-4" type="submit">Login</button>
                      </div>
                      <div className="col-6 text-end">
                        <Link to={"/"} className="btn btn-link px-0" type="button">Forgot Password?</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card col-md-5 text-white bg-primary py-5">
                  <div className="card-body text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <Link to={"/register"} className="btn btn-lg btn-outline-light mt-3" type="button">Register Now!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}