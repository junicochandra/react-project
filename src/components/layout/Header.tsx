import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user } = AuthService();
  const navigate = useNavigate();

  // token
  const token = localStorage.getItem('token');

  const logoutHandler = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post('http://laravel.api.devel:8081/api/auth/logout').then(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
  }

  return (
    <header className="header header-sticky mb-4">
      <div className="container-fluid">
        <button className="header-toggler px-md-0 me-md-3" type="button" onClick={onToggleSidebar}>
          <svg className="icon icon-lg">
            <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-menu"></use>
          </svg>
        </button>
        <a className="header-brand d-md-none" href="#">
          <svg width={118} height={46}>
            <use xlinkHref="assets/brand/coreui.svg#full" />
          </svg>
        </a>
        <ul className="header-nav d-none d-md-flex">
          {/* Menu Header */}
        </ul>
        <ul className="header-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <svg className="icon icon-lg">
                <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-bell" />
              </svg>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <svg className="icon icon-lg">
                <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-list-rich" />
              </svg>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <svg className="icon icon-lg">
                <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-envelope-open" />
              </svg>
            </a>
          </li>
        </ul>
        <ul className="header-nav ms-3">
          <li className="nav-item dropdown"><a className="nav-link py-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <div className="avatar avatar-md"><img className="avatar-img" src="src/assets/template/assets/img/avatars/8.jpg" alt="user@email.com" />
            </div>
          </a>
            <div className="dropdown-menu dropdown-menu-end pt-0">
              <div className="dropdown-header bg-light py-2">
                <div className="fw-semibold">{user.email}</div>
              </div>
              <a className="dropdown-item" href="#">
                <svg className="icon me-2">
                  <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-user" />
                </svg> Profile
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#" onClick={logoutHandler}>
                <svg className="icon me-2">
                  <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-account-logout" />
                </svg> Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
      {/* Breadcrumb */}
      <div className="header-divider" />
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb my-0 ms-2">
            <li className="breadcrumb-item">
              <a href="/dashboard" className="text-decoration-none">Home</a>
            </li>
            <li className="breadcrumb-item">
              <span>Dashboard</span>
            </li>
          </ol>
        </nav>
      </div>
      {/* End Breadcrumb */}
    </header>
  )
}