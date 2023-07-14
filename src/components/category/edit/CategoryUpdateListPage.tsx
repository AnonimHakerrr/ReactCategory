import axios from 'axios';
import { ICategoryUdateErrror, ICategoryUpdateListPage,ICategoryUpdateItemPage } from "./types";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { APP_ENV } from '../../../env';
import classNames from 'classnames';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

 


const CategoryEditForm= ()=>{
  const { id } = useParams();
  const [dto, setDto] = useState<ICategoryUpdateListPage>({
    id:0,
    name: "",
    description: "",
    photo: null
  });
 
 console.log("Id :",id);
  useEffect(() => {
    axios.get (`${APP_ENV.BASE_URL}api/category/${id}`)
      .then(resp => {
        console.log("Сервак дав дані", resp); setDto(resp.data.result);
      });
    console.log("F D A");
  }, []);

  console.log("Dto ",dto);
  const navigator = useNavigate();
  
  const [error, setErrors] = useState<ICategoryUdateErrror>({
    name: "",
    description: "",
  });
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDto({ ...dto, [e.target.name]: e.target.value });
  }
  const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setDto({ ...dto, photo: e.target.files[0] });
    }
  }
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${APP_ENV.BASE_URL}api/category/${dto.id}`, dto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(response => {
        console.log('User updated');
        // оновити інформацію про користувача
        navigator("/admin");
      })
      .catch(error => {
        console.log('Error updating user');
        const errors = error.response.data as ICategoryUdateErrror;
        setErrors(errors);
        console.log("Server error ", errors);
      });
  };


 
    return (
      <>
        <h1 className="text-center">Редагування категорію</h1>
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
            }
 
export default CategoryEditForm;