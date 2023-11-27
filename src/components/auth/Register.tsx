import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // Validation
  const [validation, setValidation] = useState({ name: '', email: '', password:'' });

  // Middleware
  useEffect(() => {
    if(localStorage.getItem('token')){
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

    await axios.post('http://laravel.api.devel:8081/api/auth/register', formData).then(() => {
      navigate('/login');
    }).catch((error) => {
      setValidation(error.response.data);
    });
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          Register
        </div>
        <div className="card-body">
          <form onSubmit={registerHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control"/>
              {
                validation.name && (
                  <small className="text-danger">
                    {validation.name[0]}
                  </small>
                )
              }
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
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
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"/>
              {
                validation.password && (
                  <small className="text-danger">
                    {validation.password[0]}
                  </small>
                )
              }
            </div>
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">Password Confirmation</label>
              <input type="password" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            <Link to={"/"} className="btn btn-link"> Home</Link>
            <Link to={"/login"} className="btn btn-link"> Login</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
