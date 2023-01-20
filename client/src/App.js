import './App.css';
import Login from './Components/Accounts/Login';
import Home from './Components/Home/Home';
import DataProvider from './Context/DataProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
      <Header/>
        <div className="App" >
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>

  );
}

export default App;
