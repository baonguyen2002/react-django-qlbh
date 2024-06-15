import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const NhanVien = () => {
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
    setShowAddNv(false);
    setAddData(null);
  };
  const handleAddShow = () => {
    //console.log(khachHang);
    setShowAddNv(true);
    setAddData({
      manv: "",
      hoten: "",
      sodt: "",
      ngvl: "",
    });
  };
  const handleEditClose = () => {
    setShowEditNv(false);
    setEditData(null);
  };

  const handleEditShow = () => setShowEditNv(true);
  const handleDeleteClose = () => {
    setShowDeleteNv(false);
    setIdXoa(null);
  };

  const handleDeleteShow = () => setShowDeleteNv(true);
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

  const themNhanVien = () => {
    axios
      .post("http://127.0.0.1:8000/api/nhanvien/", newAddData)
      .then((response) => {
        console.log("Response:", response.data);
        toast.success("Thêm thành công", { id: "addSuccess" });
        getAllNhanVien();
        setAddData(null);
        setShowAddNv(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Thêm thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "addError",
        });
      });
  };
  const suaNhanVen = (manv) => {
    axios
      .put(`http://127.0.0.1:8000/api/nhanvien/${manv}/`, newAddData, config)
      .then(() => {
        //console.log("Response:", response.data);
        toast.success("Sửa thành công", { id: "editSuccess" });
        getAllNhanVien();
        setShowEditNv(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Sửa thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "editError",
        });
      });
  };
  const xoaNhanVien = (manv) => {
    axios
      .delete(`http://127.0.0.1:8000/api/nhanvien/${manv}/`, config)
      .then(() => {
        //console.log("Response:", response.data);
        toast.success("Xóa thành công", { id: "deleteSuccess" });
        getAllNhanVien();
        setShowDeleteNv(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Xóa thất bại. Vui lòng kiểm tra lại", {
          id: "deleteError",
        });
      });
  };
  let newAddData;
  const changeDateToMatchAPI = async () => {
    let dateVl = addData.ngvl;
    //console.log(dateVl);
    newAddData = {
      manv: addData.manv,
      hoten: addData.hoten,
      sodt: addData.sodt,
      ngvl: `${dateVl}T00:00:00+07:00`,
    };
    console.log(newAddData);
  };
  const changeDateToMatchAPIEdit = async () => {
    let dateVl = editData.ngvl;
    console.log(dateVl);
    newAddData = {
      manv: editData.manv,
      hoten: editData.hoten,
      sodt: editData.sodt,
      ngvl: `${dateVl}T00:00:00+07:00`,
    };
    console.log(newAddData);
  };
  const DMYToYMD = (dateString) => {
    const dateList = dateString.split("-");
    return `${dateList[2]}-${dateList[1]}-${dateList[0]}`;
  };
  const handleAddClick = async () => {
    for (const key in addData) {
      if (addData[key] === "") {
        toast.error("Vui lòng nhập đủ thông tin", { id: "addData" });
        return; // Return true as soon as a blank value is found
      }
    }
    changeDateToMatchAPI();
    themNhanVien();
  };
  const handleEditClick = () => {
    for (const key in editData) {
      if (editData[key] === "") {
        toast.error("Vui lòng kiểm tra đủ thông tin", { id: "editData" });
        return; // Return true as soon as a blank value is found
      }
    }
    changeDateToMatchAPIEdit();
    suaNhanVen(newAddData.manv);
  };
  const handleDeleteClick = () => {
    xoaNhanVien(idXoa);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  };
  const editNhanVien = (manv, hoten, sodt, ngvl) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    //console.log(ngsinh);
    setEditData({
      manv: manv,
      hoten: hoten,
      sodt: sodt,
      ngvl: ngvl,
    });
    handleEditShow();
  };
  const deleteKhachHang = (manv) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    //console.log(bearerToken);
    setIdXoa(manv);
    //console.log(bearerToken);
    handleDeleteShow();
  };

  const convertedDate = (dateString) => {
    // Parse the date string
    const date = new Date(dateString);

    // Extract the day, month, and year
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const searchNv = (value) => {
    if (!value) {
      getAllNhanVien();
    }
    if (value) {
      if (
        //value.trim() === "" ||
        value.trim() === "<" ||
        value.trim() === "<=" ||
        value.trim() === ">" ||
        value.trim() === ">="
      ) {
        getAllNhanVien();
        return;
      }
      axios
        .get(`http://127.0.0.1:8000/api/nhanvien/?search=${value}`)
        .then((res) => {
          setNhanVien(res.data);
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
        Thêm Nhân Viên Mới
      </button>
      <label
        className="block mb-2 text-3xl font-bold text-white"
        htmlFor="searchNv"
      >
        Tìm kiếm
      </label>
      <div className="flex flex-row justify-center w-full ">
        <input
          className="w-1/4 px-3 py-2 mb-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="searchNv"
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
          onClick={() => searchNv(searchString)}
        >
          Tìm kiếm
        </button>
      </div>
      {nhanVien && nhanVien.length > 0 ? (
        <div className="flex justify-center">
          <table className="border-collapse ">
            <thead>
              <tr className="text-center bg-green-900">
                <th className="px-4 py-2 ">Mã Nhân Viên</th>
                <th className="px-4 py-2">Họ Và Tên</th>
                <th className="px-4 py-2">Số điện thoại</th>
                <th className="px-4 py-2">Ngày Vào Làm</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-left">
              {nhanVien.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{row.manv}</td>
                  <td className="px-4 py-2">{row.hoten}</td>
                  <td className="px-4 py-2">{row.sodt}</td>
                  <td className="px-4 py-2">{convertedDate(row.ngvl)}</td>
                  <td className="flex px-4 py-2 space-x-2">
                    <button
                      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={() => {
                        editNhanVien(
                          row.manv,
                          row.hoten,
                          row.sodt,
                          DMYToYMD(convertedDate(row.ngvl))
                        );
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      onClick={() => {
                        deleteKhachHang(row.manv);
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
          show={showAddNv}
          onHide={handleAddClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm Nhân Viên Mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              //method="post"
              className="max-w-md mx-auto mb-4 bg-white rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="manv"
                >
                  Mã Nhân Viên
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="manv"
                  type="text"
                  maxLength="4"
                  placeholder="Nhập mã nhân viên"
                  required
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="hoten"
                >
                  Họ Và Tên
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="hoten"
                  type="text"
                  placeholder="Nhập họ và tên"
                  required
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="sodt"
                >
                  Số Điện Thoại
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="sodt"
                  type="number"
                  placeholder="Nhập số điện thoại"
                  required
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="ngvl"
                >
                  Ngày Bắt Đầu Làm Việc
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="ngvl"
                  type="date"
                  //placeholder="Nhập số điện thoại"
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
                  Thêm Nhân Viên
                </button>
              </div>
            </form>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
      {editData ? (
        <Modal
          show={showEditNv}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sửa Thông Tin Nhân Viên</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              //method="post"
              className="max-w-md mx-auto mb-4 bg-white rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="hoten"
                >
                  Họ Và Tên
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="hoten"
                  type="text"
                  value={editData.hoten}
                  placeholder="Nhập họ và tên"
                  required
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="sodt"
                >
                  Số Điện Thoại
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="sodt"
                  type="number"
                  value={editData.sodt}
                  placeholder="Nhập số điện thoại"
                  required
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="ngvl"
                >
                  Ngày Bắt Đầu Làm Việc
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="ngvl"
                  type="date"
                  //placeholder="Nhập số điện thoại"
                  value={editData.ngvl}
                  required
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
                  Sửa Thông Tin
                </button>
              </div>
            </form>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
      {idXoa ? (
        <Modal
          show={showDeleteNv}
          onHide={handleDeleteClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xóa Nhân Viên</Modal.Title>
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
                Xóa Nhân Viên
              </button>
            </div>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
    </>
  );
};
export default NhanVien;
