import { Link, useMatch, useResolvedPath } from "react-router-dom"

const Navigation = () =>{
  function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        SFC
      </Link>
      <ul>
        <CustomLink to="/feedback">Feedback</CustomLink>
        <CustomLink to="/booking">Booking</CustomLink>
        <CustomLink to="/addAdmin">Admin</CustomLink>
        <CustomLink to="/parkGuideRegister">Park Guide</CustomLink>
        <CustomLink to="/visitorRegister">Visitor</CustomLink>
      </ul>

      <div className="nav-login">
          <Link to="/login" className="login-button">Login</Link>
      </div>
    </nav>
  )
}


export default Navigation;