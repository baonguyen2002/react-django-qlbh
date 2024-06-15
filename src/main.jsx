import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./error.page.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SanPham from "./sanpham";
import KhachHang from "./khachhang";
import HoaDon from "./hoadon";
import NhanVien from "./nhanvien";
import CTHD from "./cthd";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/san-pham",
        element: <SanPham />,
      },
      {
        path: "/khach-hang",
        element: <KhachHang />,
      },
      {
        path: "/nhan-vien",
        element: <NhanVien />,
      },
      {
        path: "/hoa-don",
        element: <HoaDon />,
      },
      {
        path: "/cthd",
        element: <CTHD />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
