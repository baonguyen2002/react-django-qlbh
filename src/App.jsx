import "./App.css";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { SiDjango } from "react-icons/si";
import "bootstrap/dist/css/bootstrap.min.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineLogin } from "react-icons/md";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  const [searchString, setSearchString] = useState("");
  const [bearerToken, setBearerToken] = useState(null);
  const [addData, setAddData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddSp, setShowAddSp] = useState(false);
  const [showEditSp, setShowEditSp] = useState(false);
  const [showDeleteSp, setShowDeleteSp] = useState(false);
  const [sanPham, setSanPham] = useState(null);
  const [showAddKh, setShowAddKh] = useState(false);
  const [showEditKh, setShowEditKh] = useState(false);
  const [showDeleteKh, setShowDeleteKh] = useState(false);
  const [showAddNv, setShowAddNv] = useState(false);
  const [showEditNv, setShowEditNv] = useState(false);
  const [showDeleteNv, setShowDeleteNv] = useState(false);
  const [showAddHd, setShowAddHd] = useState(false);
  const [showEditHd, setShowEditHd] = useState(false);
  const [showDeleteHd, setShowDeleteHd] = useState(false);
  const [showAddCt, setShowAddCt] = useState(false);
  const [showEditCt, setShowEditCt] = useState(false);
  const [showDeleteCt, setShowDeleteCt] = useState(false);
  const [nhanVien, setNhanVien] = useState(null);
  const [hoaDon, setHoaDon] = useState(null);
  const [cthd, setCthd] = useState(null);
  const [khachHang, setKhachHang] = useState(null);
  const [logInShow, setLogInShow] = useState(false);
  const handleClose = () => setLogInShow(false);
  const handleShow = () => setLogInShow(true);
  const [idXoa, setIdXoa] = useState(null);
  //const [bearerTokenChanged, setBearerTokenChanged] = useState(false);
  useEffect(() => {
    const storedToken = window.sessionStorage.getItem("bearerToken");
    if (storedToken && typeof storedToken === "string") {
      try {
        const parsedToken = JSON.parse(storedToken);
        setBearerToken(parsedToken);
      } catch (error) {
        console.error(
          "Error parsing bearer token from session storage:",
          error
        );
        // Handle the error, e.g., set a default value for bearerToken
        setBearerToken(null);
      }
    } else {
      setBearerToken(null);
    }
  }, []);

  useEffect(() => {
    console.log(searchString);
  }, [searchString]);
  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setLogInData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const getAllSanPham = () => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/sanpham/")
      .then((response) => {
        setSanPham(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sanpham:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getAllKhachHang = () => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/khachhang/")
      .then((response) => {
        setKhachHang(response.data);
      })
      .catch((error) => {
        console.error("Error fetching khachhang:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getAllNhanVien = () => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/nhanvien/")
      .then((response) => {
        setNhanVien(response.data);
      })
      .catch((error) => {
        console.error("Error fetching nhanvien:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getAllHoaDon = () => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/hoadon/")
      .then((response) => {
        setHoaDon(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hoadon:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getAllCthd = () => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/cthd/")
      .then((response) => {
        setCthd(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cthd:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getAllSanPham();
    getAllKhachHang();
    getAllNhanVien();
    getAllHoaDon();
    getAllCthd();
  }, []);
  const logInDjangoSuperUser = async () => {
    axios
      .post("http://127.0.0.1:8000/api/token/", logInData)
      .then((response) => {
        setBearerToken(response.data.access);
        window.sessionStorage.setItem(
          "bearerToken",
          JSON.stringify(response.data.access)
        );
        toast.success("Đăng nhập thành công", { id: "logInSuccess" });
        // setBearerTokenChanged((prev) => {
        //   return !prev;
        // });
        setLogInShow(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Đăng nhập thất bại", { id: "logInError" });
      });
  };
  const handleLogInClick = () => {
    logInDjangoSuperUser();
  };
  const handleLogOutClick = () => {
    sessionStorage.removeItem("bearerToken");
    setBearerToken(null);
  };
  return (
    <>
      <Toaster />
      <div className="fixed top-0 left-0 w-screen h-screen overflow-x-auto overflow-y-auto bg-gray-900">
        <div className="grid items-center justify-between w-full grid-cols-3 ">
          <div></div>
          <h1 className="text-3xl font-bold text-center text-white my-9">
            Quản Lý Bán Hàng
          </h1>
          <div className="flex justify-center">
            {bearerToken ? (
              <button
                onClick={handleLogOutClick}
                className="flex items-center justify-center px-4 py-2 font-bold text-white transition-colors duration-300 bg-red-500 rounded hover:bg-amber-700"
              >
                <p className="mr-2">Đăng xuất</p>
                <MdOutlineLogin />
              </button>
            ) : (
              <button
                onClick={handleShow}
                className="flex items-center justify-center px-4 py-2 font-bold text-black transition-colors duration-300 bg-green-500 rounded hover:bg-yellow-700 hover:text-white"
              >
                <p className="mr-2">Đăng nhập</p>
                <SiDjango />
              </button>
            )}
          </div>
        </div>

        <PropagateLoader
          color={"fuchsia"}
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />

        <div className="flex items-center justify-center gap-4 my-10 text-white">
          <Link
            to="/san-pham"
            className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700"
          >
            Sản Phẩm
          </Link>
          <Link
            to="/khach-hang"
            className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700"
          >
            Khách hàng
          </Link>
          <Link
            to="/nhan-vien"
            className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700"
          >
            Nhân Viên
          </Link>
          <Link
            to="/hoa-don"
            className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700"
          >
            Hóa Đơn
          </Link>
          <Link
            to="/cthd"
            className="px-4 py-2 font-bold text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700"
          >
            Chi Tiết Hóa Đơn
          </Link>
        </div>

        {isLoading ? null : (
          <div className="text-white ">
            <Outlet
              context={[
                setHoaDon,
                getAllCthd,
                cthd,
                showAddCt,
                setShowAddCt,
                showEditCt,
                setShowEditCt,
                showDeleteCt,
                setShowDeleteCt,
                showAddHd,
                setShowAddHd,
                showEditHd,
                setShowEditHd,
                showDeleteHd,
                setShowDeleteHd,
                hoaDon,
                showAddSp,
                setShowAddSp,
                showEditSp,
                setShowEditSp,
                showDeleteSp,
                setShowDeleteSp,
                sanPham,
                setSanPham,
                showAddKh,
                setShowAddKh,
                showEditKh,
                setShowEditKh,
                showDeleteKh,
                setShowDeleteKh,
                khachHang,
                setKhachHang,
                showAddNv,
                setShowAddNv,
                showEditNv,
                setShowEditNv,
                showDeleteNv,
                setShowDeleteNv,
                nhanVien,
                setNhanVien,
                addData,
                setAddData,
                getAllSanPham,
                getAllKhachHang,
                getAllNhanVien,
                bearerToken,
                setLogInShow,
                editData,
                setEditData,
                idXoa,
                setIdXoa,
                getAllHoaDon,
                searchString,
                setSearchString,
                setCthd,
              ]}
            />
          </div>
        )}
      </div>
      <Modal
        show={logInShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="max-w-md mx-auto mb-4 bg-white rounded"
            onSubmit={handleLogInClick}
          >
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="username"
              >
                Tên Superuser Django
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Nhập tên superuser"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleClose}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  handleLogInClick();
                }}
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
