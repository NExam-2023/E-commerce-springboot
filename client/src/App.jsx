import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { CustomerRoute,AdminRoute, PublicRoute } from "./utils/Route";
import { Logout } from "./pages/Logout";
import { ToastContainer } from "react-toastify";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { SignUp } from "./pages/Signup";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<PublicRoute element={SignUp} />} />
          <Route
            path="/login"
            exact
            element={<PublicRoute element={Login} />}
          />
          <Route
            path="/signup"
            exact
            element={<PublicRoute element={SignUp} />}
          />
          <Route
            path="/dashboard"
            exact
            element={<CustomerRoute element={Dashboard} />}
          />
       
          <Route
            path="/products"
            exact
            element={<AdminRoute element={Products} />}
          />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
