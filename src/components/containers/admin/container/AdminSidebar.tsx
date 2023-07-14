import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import http from "../../../../http";
import { AuthUserActionType } from "../../../auth/types";


const AdminSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onClickLogout = (e: any) => {
        e.preventDefault();
        delete http.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({type:AuthUserActionType.LOGOUT_USER});
        navigate("/");
      }




    return (
        <>
            <div className="sidebar col-sm-4 col-md-3 col-lg-2 p-0">

                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page"
                               href="#">
                                <i className={"bi bi-house-fill"}></i>

                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="/admin/category">
                                <i className={"bi bi-file-earmark"}></i>
                                Category
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="/admin/products">
                                <i className={"bi bi-cart"}></i>
                                Products
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-people"}></i>
                                Customers
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-graph-up"}></i>
                                Reports
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-puzzle"}></i>
                                Integrations
                            </a>
                        </li>
                    </ul>

                    <hr className="my-3"/>

                    <ul className="nav flex-column mb-auto">
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-gear-wide-connected"}></i>
                                Settings
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-door-closed"}></i>
                                <Link className="nav-link" aria-current="page" to="/login"
                                    onClick={onClickLogout}>
                                    Sign out  
                                     </Link>
                            </a>
                        </li>
                    </ul>


                </div>
            </div>

        </>
    )
}

export default AdminSidebar;

function dispatch(arg0: { type: any; }) {
    throw new Error("Function not implemented.");
}
