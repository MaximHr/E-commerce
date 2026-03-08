import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import LogIn from "./pages/LogIn";
import "./styles/index.css";
import "./styles/style.css";
import Home from "./pages/Home";
import AccessDenied from "./pages/AccessDenied";
import Admin from "./components/Admin";
import Collections from "./pages/Collections";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Members from "./pages/Members";
import ForgottenPassword from "./pages/ForgottenPassword";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<LogIn />} />
      <Route path="" element={<LogIn />} />
      <Route path="forgotten-password" element={<ForgottenPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path="admin" element={<Admin />}>
          <Route path="home" element={<Home />} />
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products/:slug" element={<UpdateProduct />} />
          <Route path="collections" element={<Collections />} />
          <Route path="orders" element={<Orders />} />
          <Route path="members" element={<Members />} />
        </Route>
      </Route>

      <Route path="access-denied" element={<AccessDenied />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);
