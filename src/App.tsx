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
 
 function App() {

  return (
 <>     
      <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path='login' element={<LoginPage/>}></Route>
          </Route>
          <Route path={"/admin"} element={<AdminLayout/>}>
            <Route index element={<AdminHomePage/>}/>
            <Route path={"category"}>
            <Route path={"category/edit/:id"} />
              <Route index element={<CategoryListPage />}/>
              <Route path="create" element={<CategoryCreatePage />} />
            </Route>
          </Route>
        </Routes>
      </>

  );
}

export default App;
