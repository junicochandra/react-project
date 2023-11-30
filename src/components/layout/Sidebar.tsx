interface SidebarProp {
  isHide: string;
}

export default function Sidebar({ isHide }: SidebarProp) {
  return (
    <div className={"sidebar sidebar-dark sidebar-fixed " + isHide} id="sidebar">
      <div className="sidebar-brand d-none d-md-flex">
        <svg className="sidebar-brand-full" width={118} height={46}>
          <use xlinkHref="src/assets/template/assets/brand/coreui.svg#full" />
        </svg>
        <svg className="sidebar-brand-narrow" width={46} height={46}>
          <use xlinkHref="src/assets/template/assets/brand/coreui.svg#signet" />
        </svg>
      </div>
      <ul className="sidebar-nav" data-coreui="navigation" data-simplebar>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">
            <svg className="nav-icon">
              <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-speedometer" />
            </svg>
            Dashboard
          </a>
        </li>
        <li className="nav-title">Master</li>
        <li className="nav-item">
          <a className="nav-link" href="/tag">
            <svg className="nav-icon">
              <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-check" />
            </svg>
            Tag
          </a>
        </li>
        <li className="nav-divider" />
        <li className="nav-title">Feature</li>
        <li className="nav-item">
          <a className="nav-link" href="/email">
            <svg className="nav-icon">
              <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-pencil" />
            </svg>
            Email
          </a>
        </li>
        <li className="nav-group">
          <a className="nav-link nav-group-toggle" href="#">
            <svg className="nav-icon">
              <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-user"></use>
            </svg>
            User
          </a>
          <ul className="nav-group-items">
            <li className="nav-item"><a className="nav-link" href="#"><span className="nav-icon"></span>Menu 1</a></li>
            <li className="nav-item"><a className="nav-link" href="#"><span className="nav-icon"></span>Menu 2</a></li>
          </ul>
        </li>
        <li className="nav-item mt-auto">
          <a className="nav-link" href="https://coreui.io/docs/templates/installation/" target="_blank">
            <svg className="nav-icon">
              <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-description" />
            </svg>
            Docs
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link nav-link-danger" href="https://coreui.io/pro/" target="_top">
            <svg className="nav-icon">
              <use xlinkHref="node_modules/@coreui/icons/sprites/free.svg#cil-layers" />
            </svg>
            Try CoreUI
            <div className="fw-semibold">PRO</div>
          </a>
        </li>
      </ul>
      <button className="sidebar-toggler" type="button" data-coreui-toggle="unfoldable" />
    </div>
  )
}