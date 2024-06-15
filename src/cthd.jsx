import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CTHD = () => {
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
    setShowAddCt(false);
    setAddData(null);
  };
  const handleAddShow = () => {
    setShowAddCt(true);
    setAddData({
      sohd: "",
      masp: "",
      sl: 0,
    });
  };
  const handleEditClose = () => {
    setShowEditCt(false);
    setEditData(null);
  };

  const handleEditShow = () => setShowEditCt(true);
  const handleDeleteClose = () => {
    setShowDeleteCt(false);
    setIdXoa(null);
  };

  const handleDeleteShow = () => setShowDeleteCt(true);
  const handleAddInputChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setAddData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(addData);
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
  const themCthd = () => {
    axios
      .post("http://127.0.0.1:8000/api/cthd/", addData)
      .then((response) => {
        console.log("Response:", response.data);
        toast.success("Thêm thành công", { id: "addSuccess" });
        getAllCthd();
        setAddData(null);
        setShowAddCt(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Thêm thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "addError",
        });
      });
  };
  const suaCthd = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/cthd/${id}/`, editData, config)
      .then(() => {
        //console.log("Response:", response.data);
        toast.success("Sửa thành công", { id: "editSuccess" });
        getAllCthd();
        setShowEditCt(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Sửa thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "editError",
        });
      });
  };
  const xoaCthd = (id) => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/cthd/${id}/`,

        config
      )
      .then(() => {
        //console.log("Response:", response.data);
        toast.success("Xóa thành công", { id: "deleteSuccess" });
        getAllCthd();
        setShowDeleteCt(false);
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
        console.log(key);
        return; // Return true as soon as a blank value is found
      }
    }
    if (addData.sl <= 0) {
      toast.error("Số lượng phải lớn hơn 0", { id: "sl" });
      return;
    }

    themCthd();
  };

  const handleEditClick = () => {
    for (const key in editData) {
      if (editData[key] === "") {
        toast.error("Vui lòng kiểm tra đủ thông tin", { id: "editData" });
        return; // Return true as soon as a blank value is found
      }
    }
    if (editData.sl <= 0) {
      toast.error("Số lượng phải lớn hơn 0", { id: "sl" });
      return;
    }

    suaCthd(editData.id);
  };
  const handleDeleteClick = () => {
    xoaCthd(idXoa);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  };

  const editCthd = (id, sohd, masp, sl) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    console.log(bearerToken);
    setEditData({
      id: id,
      sohd: sohd,
      masp: masp,
      sl: sl,
    });
    handleEditShow();
  };
  const deleteSanPham = (id) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    setIdXoa(id);
    //console.log(bearerToken);
    handleDeleteShow();
  };
  const searchCthd = (value) => {
    if (!value) {
      getAllCthd();
    }
    if (value) {
      if (
        //value.trim() === "" ||
        value.trim() === "<" ||
        value.trim() === "<=" ||
        value.trim() === ">" ||
        value.trim() === ">="
      ) {
        getAllCthd();
        return;
      }
      axios
        .get(`http://127.0.0.1:8000/api/hoadon/?search=${value}`)
        .then((res) => {
          setCthd(res.data);
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
        Thêm CTHD Mới
      </button>
      <label
        className="block mb-2 text-3xl font-bold text-white"
        htmlFor="searchCthd"
      >
        Tìm kiếm
      </label>
      <div className="flex flex-row justify-center w-full ">
        <input
          className="w-1/4 px-3 py-2 mb-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="searchCthd"
          type="text"
          placeholder="Nhập thông tin tìm kiếm"
          onChange={(event) => {
            event.preventDefault();
            setSearchString(event.target.value);
          }}
          // onChange={(event) => searchKh(event)}
          value={searchString}
        />
        <button
          className="px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => searchCthd(searchString)}
        >
          Tìm kiếm
        </button>
      </div>

      {cthd && cthd.length > 0 ? (
        <div className="flex justify-center">
          <table className="border-collapse ">
            <thead>
              <tr className="text-center bg-green-900">
                <th className="px-4 py-2 ">Số Hóa Đơn</th>
                <th className="px-4 py-2 ">Mã Sản Phẩm</th>
                <th className="px-4 py-2 ">Số Lượng</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-left">
              {cthd.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{row.sohd}</td>
                  <td className="px-4 py-2">{row.masp}</td>
                  <td className="px-4 py-2">{row.sl}</td>
                  <td className="flex px-4 py-2 space-x-2">
                    <button
                      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={() => {
                        editCthd(
                          parseInt(row.id),
                          row.sohd,
                          row.masp,
                          parseInt(row.sl)
                        );
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      onClick={() => {
                        deleteSanPham(row.id);
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
          show={showAddCt}
          onHide={handleAddClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm CTHD Mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              //method="post"
              className="max-w-md mx-auto mb-4 bg-white rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="sohd"
                >
                  Số Hóa Đơn
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="sohd"
                  name="sohd"
                  onChange={handleAddInputChange}
                  value={addData.sohd}
                  required
                >
                  <option value="" disabled>
                    Chọn số hóa đơn
                  </option>
                  {hoaDon.map((option, index) => (
                    <option key={index} value={option.sohd}>
                      {option.sohd}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="masp"
                >
                  Mã Sản Phẩm
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="masp"
                  name="masp"
                  onChange={handleAddInputChange}
                  required
                  value={addData.masp}
                >
                  <option value="" disabled>
                    Chọn mã sản phẩm
                  </option>
                  {sanPham.map((option, index) => (
                    <option key={index} value={option.masp}>
                      {option.masp}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="sl"
                >
                  Só Lượng
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="sl"
                  type="number"
                  placeholder="Nhập số lượng"
                  required
                  value={addData.sl}
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
                  Thêm CTHD
                </button>
              </div>
            </form>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
      {editData ? (
        <Modal
          show={showEditCt}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sửa Thông Tin CTHD</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              //method="post"
              className="max-w-md mx-auto mb-4 bg-white rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="sohd"
                >
                  Số Hóa Đơn
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="sohd"
                  name="sohd"
                  onChange={handleEditInputChange}
                  value={editData.sohd}
                  required
                >
                  <option value="" disabled>
                    Chọn số hóa đơn
                  </option>
                  {hoaDon.map((option, index) => (
                    <option key={index} value={option.sohd}>
                      {option.sohd}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="masp"
                >
                  Mã Sản Phẩm
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="masp"
                  name="masp"
                  onChange={handleEditInputChange}
                  required
                  value={editData.masp}
                >
                  <option value="" disabled>
                    Chọn mã sản phẩm
                  </option>
                  {sanPham.map((option, index) => (
                    <option key={index} value={option.masp}>
                      {option.masp}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="sl"
                >
                  Só Lượng
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="sl"
                  type="number"
                  placeholder="Nhập số lượng"
                  required
                  value={editData.sl}
                  onChange={handleEditInputChange}
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
          show={showDeleteCt}
          onHide={handleDeleteClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xóa CTHD</Modal.Title>
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
                Xóa CTHD
              </button>
            </div>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
    </>
  );
};

export default CTHD;
