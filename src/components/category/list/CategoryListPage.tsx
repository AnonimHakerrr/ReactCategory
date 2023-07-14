import axios from "axios";
import {  useEffect, useState } from "react";
import { ICategoryItem } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryUpdateListPage } from "../edit/types";
import { ICategoryCraete } from "../create/types";
import CategoryEditForm from "../edit/CategoryUpdateListPage";
import http from "../../../http";
 

const CategoryListPage = () => {
  const [list, setList] = useState<ICategoryItem[]>([
    {
      id: 1,
      name: "SSD",
      photo: "",
      description: "Для швидких людей"
    }
  ]);
 
    function handleDelete  (props: ICategoryItem):void {
      http.delete(`${APP_ENV.BASE_URL}api/category/${props.id}`)
        .then(response => {
          console.log('category deleted');
          // оновити список користувачів
        })
        .catch(error => {
          console.log('Error deleting category');
        });
    };
 
  const viewData = list.map((category) => (
    
    <tr key={category.id}>
      <th scope="row">{category.id}</th>
      <td>
        {category.name}</td>
    
 <td> <img src={`${APP_ENV.BASE_URL}uploads/category/50_${category.photo}`} width={100} /> </td>
    
      <td>{category.description}</td>
      <td> <Link to={`/admin/category/edit/${category.id}`}   className="btn btn-danger">Редагувати</Link>
         <button  onClick={()=>handleDelete(category)}  className="btn btn-dark">
          Видалити
        </button></td>
         
    </tr>
  ));
  useEffect(() => {
    http.get(`${APP_ENV.BASE_URL}api/category`)
      .then(resp => {
        console.log("Сервак дав дані", resp); setList(resp.data.data);
      });
    console.log("F D A");
  }, []);
  console.log("log");


  return (
    <>
      <h1 className="text-center">Список категорій</h1>
      <Link to="/admin/category/create" className="btn btn-success">Додати</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Назва</th>
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

export default CategoryListPage;


