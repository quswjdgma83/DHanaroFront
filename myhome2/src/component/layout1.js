import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { NavLink } from "react-router-dom";

function Layout1() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">Logo</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/board/list">
                  게시판
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet /> {/* 하위 컴포넌트 출력 위치 */}
      <footer>저작권은 황혬숙에게 있음</footer>
    </div>
  );
}

export default Layout1;
