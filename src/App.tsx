import React from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryListPage from './components/category/list/CategoryListPage';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/containers/default/DefaultLayout';
import CategoryCreatPage from './components/category/create/CategoryCreatePage';
 import CategoryEditForm from './components/category/edit/CategoryUpdateListPage';
 function App() {

  return (
 <>
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          
          <Route index element={<CategoryListPage />} />
          <Route path="category/create" element={<CategoryCreatPage />} />
          <Route path="category/edit/:id" element={<CategoryEditForm />} />
                  </Route>
      </Routes>
      </>
 
  );
}

export default App;
