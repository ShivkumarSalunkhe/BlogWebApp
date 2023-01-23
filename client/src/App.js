import './App.css';
import Login from './Components/Accounts/Login';
import Home from './Components/Home/Home';
import DataProvider from './Context/DataProvider';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header';
import { useState } from 'react';
import CreatePost from './Components/Create/CreatePost';
import { ToastContextProvider } from './Context/ToastContext';


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
    </>
    : <Navigate replace to='/login' />
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
    <ToastContextProvider>
      <BrowserRouter>
        <div className="App" >
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/' element={<Home />} />
            </Route>
            
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/create' element={<CreatePost />} />
            </Route>
            
          </Routes>
        </div>
      </BrowserRouter>
      </ToastContextProvider>
    </DataProvider>
    

  );
}

export default App;
