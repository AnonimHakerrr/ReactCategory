import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AuthUserActionType, IAuthUser} from "../../auth/types";
import http from "../../../http";
 

const DefaultHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
  //console.log("isAuth", isAuth);

  const onClickLogout = (e: any) => {
    e.preventDefault();
    delete http.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    dispatch({type:AuthUserActionType.LOGOUT_USER});
    navigate("/");
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Товари
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            {isAuth ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/profile">
                    {user?.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login"
                    onClick={onClickLogout}>
                    Вихід
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/register">
                    Реєстрація
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login">
                    Вхід
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DefaultHeader;