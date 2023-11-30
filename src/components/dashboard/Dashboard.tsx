import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Template from "../layout/Template";

export default function Dashboard() {
  const [user, setUser] = useState({ name: '' });
  const navigate = useNavigate();

  // token
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post('http://laravel.api.devel:8081/api/auth/me').then((response) => {
      setUser(response.data);
    });
  }

  // Middleware
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    fetchData();
  }, []);

  const logoutHandler = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post('http://laravel.api.devel:8081/api/auth/logout').then(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
  }

  return (
    <Template>
      <div className="container-lg">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header"><strong>Dashboard</strong></div>
              <div className="card-body">
                <h1>Hi, "{user.name}"</h1>
                <button onClick={logoutHandler} className="btn btn-danger">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  )
}
