import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // Validation
  const [validation, setValidation] = useState({ name: '', email: '', password: '' });

  // Middleware
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, []);

  const registerHandler = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);

    await axios.post(apiUrl+'/api/auth/register', formData).then(() => {
      navigate('/login');
    }).catch((error) => {
      setValidation(error.response.data);
    });
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <form onSubmit={registerHandler}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mb-4 mx-4">
                <div className="card-body p-4">
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <div className="input-group">
                    <span className="input-group-text">
                      <svg className="icon">
                        <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-user"></use>
                      </svg>
                    </span>
                    <input className="form-control" type="text" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    {
                      validation.name && (
                        <small className="text-danger">
                          {validation.name[0]}
                        </small>
                      )
                    }
                  </div>
                  <div className="input-group">
                    <span className="input-group-text">
                      <svg className="icon">
                        <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-envelope-open"></use>
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
                    <input className="form-control" type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    {
                      validation.password && (
                        <small className="text-danger">
                          {validation.password[0]}
                        </small>
                      )
                    }
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-text">
                      <svg className="icon">
                        <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-lock-locked"></use>
                      </svg>
                    </span>
                    <input className="form-control" type="password" placeholder="Repeat password" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                  </div>
                  <button className="btn btn-block btn-success" type="submit">Create Account</button>
                  <Link to={"/login"} className="btn btn-block btn-primary m-2">Have Account</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
