import { useAuth } from "../../provider/AuthProvider";
import Template from "../layout/Template";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Template>
      <div className="container-lg">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header"><strong>Dashboard</strong></div>
              <div className="card-body">
                <h1>Hi, "{user.name}"</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  )
}