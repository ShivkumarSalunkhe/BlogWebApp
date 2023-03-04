import "./App.css";
import Login from "./Components/Accounts/Login";
import Home from "./Components/Home/Home";
import DataProvider from "./Context/DataProvider";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import { useState } from "react";
import CreatePost from "./Components/Create/CreatePost";
import { ToastContextProvider } from "./Context/ToastContext";
import DetailsView from "./Components/Details/DetailsView";
import Update from "./Components/Create/Update";
import About from "./Components/about/About";
import Contact from "./Components/contact/Contact";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <ToastContextProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route
                path="/login"
                element={<Login isUserAuthenticated={isUserAuthenticated} />}
              />

              <Route
                path="/"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/" element={<Home />} />
              </Route>

              <Route
                path="/create"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/create" element={<CreatePost />} />
              </Route>

              <Route
                path="/details/:id"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/details/:id" element={<DetailsView />} />
              </Route>

              <Route
                path="/update/:id"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/update/:id" element={<Update />} />
              </Route>

              <Route
                path="/about"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/about" element={<About />} />
              </Route>

              <Route
                path="/contact"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/contact" element={<Contact />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </ToastContextProvider>
    </DataProvider>
  );
}

export default App;
