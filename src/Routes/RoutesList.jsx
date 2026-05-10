import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

const Main = lazy(() => import("../pages/Main"));
const Product = lazy(() => import("../pages/Product"));
const Cart = lazy(() => import("../pages/Cart"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

function RoutesList() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default RoutesList;
