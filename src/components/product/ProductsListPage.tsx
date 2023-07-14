import axios from "axios";
import { Link } from "react-router-dom";
import http from "../../http";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../env";
import { IProductsItem } from "./types";



const ProductListPage = () => {
  const [list, setList] = useState<IProductsItem[]>([
    {
      id: 1,
      category_id: 20,
      name: "SSD",
      price: 12,
      category:undefined,
      product_images:[],
      description: "Для швидких людей"
    }
  ]);
  useEffect(() => {
    http.get(`${APP_ENV.BASE_URL}api/products`)
      .then(resp => {
        console.log("Сервак дав дані", resp); setList(resp.data);
      });
     
    console.log("F D A");
  }, []);
  function handleDelete  (props: IProductsItem):void {
    http.delete(`${APP_ENV.BASE_URL}api/products/${props.id}`)
      .then(response => {
        console.log('products deleted');
        // оновити список користувачів
      })
      .catch(error => {
        console.log('Error deleting products');
      });
  };

  const viewData = list.map((products) => (

    <tr key={products.id}>
      <th scope="row">{products.id}</th>
      <td>{products.category?.name}</td>
      <td>{products.name}</td>
      <td>{products.price}</td>
      <td>
          {products.product_images.map(img=>(
            <img key={img.id} src={`${APP_ENV.BASE_URL}uploads/products/${img.name}`} width={75}  />
          ))}
      </td>
      <td>{products.description}</td>
      <td>
        <Link to={`/admin/products/edit/${products.id}`} className="btn btn-danger">Редагувати</Link>
        <button onClick={() => handleDelete(products)} className="btn btn-dark"> Видалити </button>
      </td>

    </tr>
  ));

 

  return (
    <>
      <h1 className="text-center">Список продуктів</h1>
      <Link to="/admin/products/create" className="btn btn-success">Додати</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Category_Id</th>
            <th scope="col">Назва</th>
            <th scope="col">Ціна</th>
            <th scope="col">Фото</th>
            <th scope="col">Опис</th>
          </tr>
        </thead>
        <tbody>
          {viewData}
        </tbody>
      </table>
      <nav aria-label=" Page navigation example ">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only"> </span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only"> </span>
            </a>
          </li>
        </ul>
      </nav>
    </>

  );
}

export default ProductListPage;


