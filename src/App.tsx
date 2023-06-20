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
 function App() {

  return (
 <>
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          
          <Route index element={<CategoryListPage />} />
          <Route path="category/create" element={<CategoryCreatPage />} />
          <Route path="category/edit/:id" element={<CategoryEditForm />} />
          <Route path="login" element={<LoginPage/>}/>
          <Route  path="register" element={<RegisterPage/>}/>
                  </Route>
      </Routes>
      </>
 
  );
}

export default App;
