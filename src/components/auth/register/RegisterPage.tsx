import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRegister, IRegisterResult } from "./types";
import * as yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import http from "../../../http";

const LoginPage = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const initValues: IRegister = {
    name:"",
    surname:"",
    image:null,
    tel:0,
    email: "",
    password: "",
    password_confirmation :""
  };
  const [message, setMessage] = useState<string>("");

  const createSchema = yup.object({
    name: yup.string().required("Вкажіть ім'я"),
    surname: yup.string().required("Вкажіть призвище"),
    tel: yup.string().required("Вкажіть телефон")
    ,
    email: yup
      .string()
      .required("Вкажіть поту")
      .email("Пошта вказана не вірно"),
    password: yup.string().required("Вкажіть пароль"),
  });

  const onSubmitFormikData = async (values: IRegister) => {
    try {
      const result = await http.post<IRegisterResult>("api/auth/login", values);
      console.log("Success", result);
      
    } catch (error) {
      setMessage("Дані вказано не вірно");
    }
  };
  
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: createSchema,
    onSubmit: onSubmitFormikData,
  });
  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <>
      <h1 className="text-center">Реєстраці</h1>
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Ім'я
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": errors.name && touched.name,
            })}
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && touched.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="surname" className="form-label">
            Призвище
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": errors.surname && touched.surname,
            })}
            id="surname"
            name="surname"
            value={values.surname}
            onChange={handleChange}
          />
          {errors.surname && touched.surname && (
            <div className="invalid-feedback">{errors.surname}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="tel" className="form-label">
            Номер
          </label> 
        
          <input
          
            type="tel"
            className={classNames("form-control", {
              "is-invalid": errors.tel && touched.tel,
            })}
            id="tel"
            name="tel"
            value={"+38"+values.tel}
            onChange={handleChange}
          />  
          {errors.tel && touched.tel && (
            <div className="invalid-feedback">{errors.tel}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Фото
          </label>
          <input
            type="file"
            className={classNames("form-control", {
              "is-invalid": errors.image && touched.image,
            })}
            id="image"
            name="image"
        value={values.image?.type}
            onChange={handleChange}
          />
          {errors.image && touched.image && (
            <div className="invalid-feedback">{errors.image}</div>
          )}
        </div>
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
        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className={classNames("form-control", {
              "is-invalid": errors.password_confirmation && touched.password_confirmation,
            })}
            id="password"
            name="password"
            value={values.password_confirmation}
            onChange={handleChange}
          />
          {errors.password_confirmation && touched.password_confirmation && (
            <div className="invalid-feedback">{errors.password_confirmation}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Реєстраці
        </button>
      </form>
    </>
  );
};
export default LoginPage;