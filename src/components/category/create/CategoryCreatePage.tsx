import { ChangeEvent, FormEvent, useState } from "react";
import { ICategoryCraete, ICategoryCreateErrror } from "./types";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { APP_ENV } from "../../../env";
import classNames from "classnames";

const CategoryCreatePage = () => {
  const navigator = useNavigate();

  const [dto, setDto] = useState<ICategoryCraete>({
    name: "",
    description: "",
    photo: null
  });
  const [error, setErrors] = useState<ICategoryCreateErrror>({
    name: "",
    description: "",
  });


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDto({ ...dto, [e.target.name]: e.target.value });
  }



  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ name: "", description: "" });
    axios
      .post(`${APP_ENV.BASE_URL}api/category`, dto, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        navigator("/");
      })
      .catch((er) => {
        const errors = er.response.data as ICategoryCreateErrror;
        setErrors(errors);
        console.log("Server error ", errors);
      });
    //console.log("Submit data", dto);
  };
  const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setDto({ ...dto, photo: e.target.files[0] });
    }
  }
  return (
    <>
      <h1 className="text-center">Створити категорію</h1>
      <form className="  col-md-6 offset-md-3" onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Наза
          </label>
          <input

            type="text"
            className={classNames("form-control ", { "is-invalid": error.name })}
            id="name"
            name="name"
            value={dto.name}
            onChange={onChangeHandler}

          />{error.name && (
            <div className="invalid-feedback">{error.name}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">  Photo </label>
          <input type="file" className="form-control"   id="photo"name="photo" onChange={onImageChangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Опис
          </label>
          <input

            type="text"
            className={classNames("form-control ", { "is-invalid": error.description, })}

            id="description"
            name="description"
            value={dto.description}
            onChange={onChangeHandler}

          />{error.name && (
            <div className="invalid-feedback">{error.description}</div>
          )}
        </div>


        <button type="submit"  className="btn btn-primary">
          Додати
        </button>
      </form>

    </>

  );
};
export default CategoryCreatePage;