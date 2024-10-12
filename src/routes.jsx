import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import AllBooks from "./pages/allBooks/AllBooks";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";
import Aboutus from "./pages/about/aboutus";
import DetailPage from "./pages/detailPage.jsx/DetailPage";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { authActions } from "./store/auth/auth";
import Favourites from "./pages/profile/Favourites";
import OrderHistory from "./pages/profile/OrderHistory";
import Setting from "./pages/profile/Setting";
import ProtectedRoute from "./components/protectedRoute";
import AllOrder from "./pages/allOrders/AllOrder";
import AddBook from "./pages/addBook/AddBook";
import UpdateBook from './pages/updateBook/UpdateBook';

function RoutesFile() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    const avatar = Cookies.get("avatar"); 
    if (token) {
      dispatch(authActions.login());
       if (role) {
        dispatch(authActions.changeRole(role)); // Restore role from cookies
      }
      if (avatar) {
        dispatch(authActions.updateAvatar(avatar)); // Restore avatar from cookies
      }
    }
  }, []);

  const role = useSelector((state) => state.auth.role);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />}>
            {role === "user" ? (
              <Route index element={<Favourites />} />
            ) : (
              <Route index element={<AllOrder />} />
            )}
            <Route path="orderHistory" element={<OrderHistory />} />
            {role === 'admin' && 
            <Route path="addBook" element={<AddBook />} />
            }
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>
        <Route path="/getBook/:id" element={<DetailPage />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="*" element={<h2 className="h-screen text-center items-center flex justify-center">Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default RoutesFile;
