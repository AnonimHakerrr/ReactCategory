import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ILogin, ILoginResult} from "./types";
import * as yup from "yup";
import {useFormik} from "formik";
import classNames from "classnames";
 
import jwtDecode from "jwt-decode";
import {AuthUserActionType, IUser} from "../types";
import http from "../../../http";

const LoginPage = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const initValues: ILogin = {
        email: "",
        password: "",
    };
    const [message, setMessage] = useState<string>("");

    const createSchema = yup.object({
        email: yup
            .string()
            .required("Вкажіть пошту")
            .email("Пошта вказана не вірно"),
        password: yup.string().required("Вкажіть пароль"),
    });

    const onSubmitFormikData = async (values: ILogin) => {
        try {
            const result = await http.post<ILoginResult>("api/auth/login", values);
            const {access_token} = result.data;
            localStorage.token = access_token;
              const user = jwtDecode(access_token) as IUser;
              http.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
              dispatch({
                  type: AuthUserActionType.LOGIN_USER, payload: {
                      email: user.email,
                      name: user.name
                  }
              });
            navigator("/");
        } catch (error) {
            setMessage("Дані вказано не вірно");
        }
    };

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData,
    });
    const {values, errors, touched, handleSubmit, handleChange} = formik;

    return (
        <>
            <h1 className="text-center">Вхід</h1>
            {message && (
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            )}
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Пошта
                    </label>
                    <input
                        type="text"
                        className={classNames("form-control", {
                            "is-invalid": errors.email && touched.email,
                        })}
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Пароль
                    </label>
                    <input
                        type="password"
                        className={classNames("form-control", {
                            "is-invalid": errors.password && touched.password,
                        })}
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && touched.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Вхід
                </button>
            </form>
        </>
    );
};
export default LoginPage;