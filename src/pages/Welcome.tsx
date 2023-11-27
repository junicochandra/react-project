import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="container mt-5">
      <h1>Welcome</h1>
      <Link to={"/login"} className="btn btn-primary me-2"> Login</Link>
      <Link to={"/register"} className="btn btn-primary"> Register</Link>
    </div>
  )
}
