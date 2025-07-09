import React from "react"
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProducts";
import DetailProduct from "./pages/DetailProduct";
import ProductsList from "./pages/ProductsList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ChooseProfile from "./pages/ChooseProfile";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import AddToCart from "./pages/AddToCart";
import MainLayout from "./layout/MainLayout";
import SidebarContext from "./context/SidebarContext";
import About from "./pages/About";
import MarchantProductsList from "./pages/MarchantProductList";
import ProtectedRoute from "./ProtectedRouted";



const Routing = (props) => {
    return (
        <div>
            <SidebarContext>

                <BrowserRouter>

                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route path="/" index element={<Home />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/add-product" element={<AddProduct />} />
                                <Route path="/edit-product/:id" element={<EditProduct />} />
                                <Route path="/marchant-product-list" element={<MarchantProductsList />} />
                                <Route path="/delete-product" element={<DeleteProduct />} />
                                <Route path="/add-to-cart" element={<AddToCart />} />

                            </Route>
                            <Route path="/detail-product/:id" element={<DetailProduct />} />
                            <Route path="/product-list" element={<ProductsList />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/choose-profile" element={<ChooseProfile />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/*" element={<PageNotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </SidebarContext>
        </div>
    )
};
export default Routing