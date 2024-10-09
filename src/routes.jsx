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

function RoutesFile() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.login);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(authActions.login());
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
        <Route index element={<Favourites/>}/>
        <Route path="/profile/orderHistory" element={<OrderHistory/>}/>
        <Route path="/profile/setting" element={<Setting/>}/>
        </Route>
        <Route path="/getBook/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default RoutesFile;
