import React from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryListPage from './components/category/list/CategoryListPage';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/containers/default/DefaultLayout';
import CategoryCreatPage from './components/category/create/CategoryCreatePage';
 import CategoryEditForm from './components/category/edit/CategoryUpdateListPage';
import LoginPage from './components/auth/login/LoginPage';
import RegisterPage from './components/auth/register/RegisterPage';
import HomePage from './components/home/HomePage';
import CategoryCreatePage from './components/category/create/CategoryCreatePage';
import AdminHomePage from './components/containers/admin/home/AdminHomePage';
import AdminLayout from './components/containers/admin/container/AdminLayout';
import ProductListPage from './components/product/ProductsListPage';
import Loader from './components/comman/loader/Loader';
import ProductCreatePage from './components/product/create/ProductCreatePage';
 
 function App() {

  return (
 <>     

<Loader/>

      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginPage />}></Route>
        </Route>
        <Route path={"/admin"} element={<AdminLayout />}>
           <Route index element={<AdminHomePage />} />
          <Route path={"products"} element={<ProductListPage />} />
          <Route path={"products/create"} element={<ProductCreatePage/>}/>
          <Route path={"category"} >
            <Route index element={<CategoryListPage />} />
            <Route path={"edit/:id"} element={<CategoryEditForm />} />
            <Route path={"create"} element={<CategoryCreatPage />} />
          </Route>
        </Route>
      </Routes>
    </>

  );
}

export default App;
