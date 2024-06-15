import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const notifyGia = () =>
  toast.error(
    "Giá phải lớn hơn 500",
    {
      id: "gia",
    }
    //   {
    //   duration: 2000,
    //   position: "top-center",

    //   // Styling
    //   style: {},
    //   className: "",

    //   // Custom Icon
    //   icon: "❗",

    //   // Change colors of success/error/loading icon
    //   iconTheme: {
    //     primary: "#000",
    //     secondary: "#fff",
    //   },

    //   // Aria
    //   ariaProps: {
    //     role: "status",
    //     "aria-live": "polite",
    //   },
    // }
  );

const SanPham = () => {
  const [
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
  ] = useOutletContext();
  const handleAddClose = () => {
    setShowAddSp(false);
    setAddData(null);
  };
  const handleAddShow = () => {
    setShowAddSp(true);
    setAddData({
      masp: "",
      tensp: "",
      dvt: "",
      nuocsx: "",
      gia: "",
    });
  };
  const handleEditClose = () => {
    setShowEditSp(false);
    setEditData(null);
  };

  const handleEditShow = () => setShowEditSp(true);
  const handleDeleteClose = () => {
    setShowDeleteSp(false);
    setIdXoa(null);
  };

  const handleDeleteShow = () => setShowDeleteSp(true);
  const handleAddInputChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setAddData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    //console.log(value);
  };
  const handleEditInputChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setEditData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    //console.log(sanPhamAddData);
  };
  const themSanPham = () => {
    axios
      .post("http://127.0.0.1:8000/api/sanpham/", addData)
      .then((response) => {
        console.log("Response:", response.data);
        toast.success("Thêm thành công", { id: "addSuccess" });
        getAllSanPham();
        setAddData(null);
        setShowAddSp(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Thêm thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "addError",
        });
      });
  };
  const suaSanPham = (masp) => {
    axios
      .put(`http://127.0.0.1:8000/api/sanpham/${masp}/`, editData, config)
      .then(() => {
        //console.log("Response:", response.data);
        toast.success("Sửa thành công", { id: "editSuccess" });
        getAllSanPham();
        setShowEditSp(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Sửa thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "editError",
        });
      });
  };
  const xoaSanPham = (masp) => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/sanpham/${masp}/`,

        config
      )
      .then(() => {
        //console.log("Response:", response.data);
        toast.success("Xóa thành công", { id: "deleteSuccess" });
        getAllSanPham();
        setShowDeleteSp(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Xóa thất bại. Vui lòng thử lại", {
          id: "deleteError",
        });
      });
  };
  const handleAddClick = () => {
    for (const key in addData) {
      if (addData[key] === "") {
        toast.error("Vui lòng nhập đủ thông tin", { id: "addData" });
        return; // Return true as soon as a blank value is found
      }
    }
    if (addData.gia <= 500) {
      notifyGia();
      return;
    }
    themSanPham();
  };
  const handleEditClick = () => {
    for (const key in editData) {
      if (editData[key] === "") {
        toast.error("Vui lòng kiểm tra đủ thông tin", { id: "editData" });
        return; // Return true as soon as a blank value is found
      }
    }
    if (editData.gia <= 500) {
      notifyGia();
      return;
    }
    suaSanPham(editData.masp);
  };
  const handleDeleteClick = () => {
    xoaSanPham(idXoa);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  };
  const editSanPham = (masp, tensp, dvt, nuocsx, gia) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    //console.log(bearerToken);
    setEditData({
      masp: masp.trim(),
      tensp: tensp,
      dvt: dvt,
      nuocsx: nuocsx,
      gia: gia,
    });
    handleEditShow();
  };
  const deleteSanPham = (masp) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    setIdXoa(masp);
    //console.log(bearerToken);
    handleDeleteShow();
  };
  const searchSp = (value) => {
    if (!value) {
      getAllSanPham();
    }
    if (value) {
      if (
        //value.trim() === "" ||
        value.trim() === "<" ||
        value.trim() === "<=" ||
        value.trim() === ">" ||
        value.trim() === ">="
      ) {
        getAllSanPham();
        return;
      }
      axios
        .get(`http://127.0.0.1:8000/api/sanpham/?search=${value}`)
        .then((res) => {
          setSanPham(res.data);
          // getAllKhachHang();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <>
      <button
        className="px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={handleAddShow}
      >
        Thêm Sản Phẩm Mới
      </button>
      <label
        className="block mb-2 text-3xl font-bold text-white"
        htmlFor="searchSp"
      >
        Tìm kiếm
      </label>
      <div className="flex flex-row justify-center w-full ">
        <input
          className="w-1/4 px-3 py-2 mb-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="searchSp"
          type="text"
          placeholder="Nhập thông tin tìm kiếm"
          onChange={(event) => {
            event.preventDefault();
            setSearchString(event.target.value);
          }}
          value={searchString}
          // onChange={(event) => searchKh(event)}
        />
        <button
          className="px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => searchSp(searchString)}
        >
          Tìm kiếm
        </button>
      </div>
      {sanPham && sanPham.length > 0 ? (
        <div className="flex justify-center">
          <table className="border-collapse ">
            <thead>
              <tr className="text-center bg-green-900">
                <th className="px-4 py-2 ">Mã Sản Phẩm</th>
                <th className="px-4 py-2">Tên sản phẩm</th>
                <th className="px-4 py-2">Đơn vị tính</th>
                <th className="px-4 py-2">Nước sản xuất</th>
                <th className="px-4 py-2">Giá</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-left">
              {sanPham.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{row.masp}</td>
                  <td className="px-4 py-2">{row.tensp}</td>
                  <td className="px-4 py-2">{row.dvt}</td>
                  <td className="px-4 py-2">{row.nuocsx}</td>
                  <td className="px-4 py-2">{row.gia}</td>
                  <td className="flex px-4 py-2 space-x-2">
                    <button
                      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={() => {
                        editSanPham(
                          row.masp,
                          row.tensp,
                          row.dvt,
                          row.nuocsx,
                          row.gia
                        );
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      onClick={() => {
                        deleteSanPham(row.masp);
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {addData ? (
        <Modal
          show={showAddSp}
          onHide={handleAddClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm Sản Phẩm Mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              //method="post"
              className="max-w-md mx-auto mb-4 bg-white rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="masp"
                >
                  Mã Sản Phẩm
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="masp"
                  type="text"
                  placeholder="Nhập mã sản phẩm"
                  maxLength="4"
                  required
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="tensp"
                >
                  Tên Sản Phẩm
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="tensp"
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  required
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="dvt"
                >
                  Đơn vị tính
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="dvt"
                  name="dvt"
                  value={addData.dvt}
                  onChange={handleAddInputChange}
                  required
                >
                  <option value="" disabled>
                    Chọn đơn vị tính
                  </option>
                  <option value="CAY">CAY</option>
                  <option value="HOP">HOP</option>
                  <option value="CAI">CAI</option>
                  <option value="QUYEN">QUYEN</option>
                  <option value="CHUC">CHUC</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="nuocsx"
                >
                  Nước Sản Xuất
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="nuocsx"
                  type="text"
                  placeholder="Nhập nước sản xuất"
                  required
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="gia"
                >
                  Giá
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="gia"
                  type="number"
                  placeholder="Nhập giá tiền"
                  required
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleAddClose}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleAddClick}
                >
                  Thêm sản phẩm
                </button>
              </div>
            </form>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}

      {editData ? (
        <Modal
          show={showEditSp}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sửa Thông Tin Sản Phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              //method="post"
              className="max-w-md mx-auto mb-4 bg-white rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="tensp"
                >
                  Tên Sản Phẩm
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="tensp"
                  type="text"
                  value={editData.tensp}
                  placeholder="Nhập tên sản phẩm"
                  required
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="dvt"
                >
                  Đơn vị tính
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="dvt"
                  name="dvt"
                  value={editData.dvt}
                  onChange={handleEditInputChange}
                  required
                >
                  <option value="" disabled>
                    Chọn đơn vị tính
                  </option>
                  <option value="CAY">CAY</option>
                  <option value="HOP">HOP</option>
                  <option value="CAI">CAI</option>
                  <option value="QUYEN">QUYEN</option>
                  <option value="CHUC">CHUC</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="nuocsx"
                >
                  Nước Sản Xuất
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="nuocsx"
                  type="text"
                  placeholder="Nhập nước sản xuất"
                  value={editData.nuocsx}
                  required
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="gia"
                >
                  Giá
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="gia"
                  type="number"
                  placeholder="Nhập giá tiền"
                  required
                  onChange={handleEditInputChange}
                  value={editData.gia}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleEditClose}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleEditClick}
                >
                  Sửa thông tin
                </button>
              </div>
            </form>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
      {idXoa ? (
        <Modal
          show={showDeleteSp}
          onHide={handleDeleteClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xóa Sản Phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4 text-2xl font-bold text-center">
              Có chắc chắn muốn xóa?
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDeleteClose}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleDeleteClick}
              >
                Xóa Sản phẩm
              </button>
            </div>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
    </>
  );
};

export default SanPham;
