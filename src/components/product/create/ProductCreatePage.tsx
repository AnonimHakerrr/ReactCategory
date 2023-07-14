import { ChangeEvent, FormEvent, useState } from "react";
import { ICreateProductsItem, IProductsItemError } from "./types";
import http from "../../../http";
import { APP_ENV } from "../../../env";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const ProductCreatePage=()=>{
 
    const navigator = useNavigate();
      const [error, setErrors] = useState<IProductsItemError>({
  
        category_id: undefined ,
        name: "",
        price: undefined,
        description: ""
      });
      const [dto, setDto] = useState<ICreateProductsItem>({
  
        category_id: 0,
        name: "",
        price: 0,
        product_images:[],
        description: "0"
      });
      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDto({ ...dto, [e.target.name]: e.target.value });
      }
      const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
          setErrors({
              category_id: 0,
              name: "",
              price: 0,
              description: "0"
});
        http
          .post(`${APP_ENV.BASE_URL}api/products`, dto, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            navigator("/admin");
          })
          .catch((er) => {
            const errors = er.response.data as IProductsItemError;
            setErrors(errors);
            console.log("Server error ", errors);
          });
        //console.log("Submit data", dto);
      };
       
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
              <label htmlFor="name" className="form-label">
                Id категорії
              </label>
              <input
    
                type="number"
                className={classNames("form-control ", { "is-invalid": error.category_id })}
                id="category_id"
                name="category_id"
                value={dto.category_id}
                onChange={onChangeHandler}
    
              />{error.category_id && (
                <div className="invalid-feedback">{error.category_id}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Ціна
              </label>
              <input
    
                type="number"
                className={classNames("form-control ", { "is-invalid": error.price })}
                id="price"
                name="price"
                value={dto.price}
                onChange={onChangeHandler}
    
              />{error.price && (
                <div className="invalid-feedback">{error.price}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="images" className="form-label">  Photo </label>
              <input type="file" className="form-control" id="images" name="images"   />
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
    
    
            <button type="submit" className="btn btn-primary">
              Додати
            </button>
          </form>
    
        </>
    
      );
 
}
export default ProductCreatePage;