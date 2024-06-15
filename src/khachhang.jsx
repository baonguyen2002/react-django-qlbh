import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const KhachHang = () => {
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
    setShowAddKh(false);
    setAddData(null);
  };
  const handleAddShow = () => {
    setShowAddKh(true);
    setAddData({
      makh: "",
      hoten: "",
      dchi: "",
      sodt: "",
      ngsinh: "",
      ngdk: today2,
      doanhso: 0,
      loaikh: "CHUA XEP LOAI",
    });
  };
  const handleEditClose = () => {
    setShowEditKh(false);
    setEditData(null);
  };

  const handleEditShow = () => setShowEditKh(true);
  const handleDeleteClose = () => {
    setShowDeleteKh(false);
    setIdXoa(null);
  };

  const handleDeleteShow = () => setShowDeleteKh(true);
  const handleAddInputChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setAddData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleEditInputChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setEditData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const themKhachHang = () => {
    axios
      .post("http://127.0.0.1:8000/api/khachhang/", newAddData)
      .then(() => {
        toast.success("Thêm thành công", { id: "addSuccess" });
        getAllKhachHang();
        setAddData(null);
        setShowAddKh(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Thêm thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "addError",
        });
      });
  };
  const suaKhachHang = (makh) => {
    axios
      .put(`http://127.0.0.1:8000/api/khachhang/${makh}/`, newAddData, config)
      .then(() => {
        toast.success("Sửa thành công", { id: "editSuccess" });
        getAllKhachHang();
        setShowEditKh(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Sửa thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "editError",
        });
      });
  };
  const xoaKhachHang = (makh) => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/khachhang/${makh}/`,

        config
      )
      .then(() => {
        toast.success("Xóa thành công", { id: "deleteSuccess" });
        getAllKhachHang();
        setShowDeleteKh(false);
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
    let dateSinh = addData.ngsinh;
    let dateDk = DMYToYMD(addData.ngdk);
    newAddData = {
      makh: addData.makh,
      hoten: addData.hoten,
      dchi: addData.dchi,
      sodt: addData.sodt,
      ngsinh: `${dateSinh}T00:00:00+07:00`,
      ngdk: `${dateDk}T00:00:00+07:00`,
      doanhso: 0,
      loaikh: "CHUA XEP LOAI",
    };
  };
  const changeDateToMatchAPIEdit = async () => {
    let dateSinh = editData.ngsinh;
    let dateDk = DMYToYMD(editData.ngdk);
    newAddData = {
      makh: editData.makh,
      hoten: editData.hoten,
      dchi: editData.dchi,
      sodt: editData.sodt,
      ngsinh: `${dateSinh}T00:00:00+07:00`,
      ngdk: `${dateDk}T00:00:00+07:00`,
      doanhso: editData.doanhso,
      loaikh: editData.loaikh,
    };
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

    const dateDk = new Date(DMYToYMD(addData.ngdk)).toISOString().slice(0, 10);
    const dateSinh = new Date(addData.ngsinh).toISOString().slice(0, 10);

    if (dateDk < dateSinh) {
      toast.error("Ngày sinh không được lớn hơn ngày đăng ký", {
        id: "dateSinh",
      });
      return;
    }
    changeDateToMatchAPI();
    themKhachHang();
  };
  const handleEditClick = () => {
    for (const key in editData) {
      if (editData[key] === "") {
        toast.error("Vui lòng kiểm tra đủ thông tin", { id: "editData" });
        return; // Return true as soon as a blank value is found
      }
    }
    changeDateToMatchAPIEdit();
    suaKhachHang(newAddData.makh);
  };
  const handleDeleteClick = () => {
    xoaKhachHang(idXoa);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  };
  const editKhachHang = (
    makh,
    hoten,
    dchi,
    sodt,
    ngsinh,
    doanhso,
    ngdk,
    loaikh
  ) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    setEditData({
      makh: makh,
      hoten: hoten,
      dchi: dchi,
      sodt: sodt,
      doanhso: doanhso,
      ngsinh: ngsinh,
      ngdk: ngdk,
      loaikh: loaikh,
    });
    handleEditShow();
  };
  const deleteKhachHang = (masp) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    setIdXoa(masp);
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
  const getTodayDate = () => {
    const today = new Date();

    // Extract the day, month, and year
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based, so we add 1
    const year = today.getFullYear();

    // Format the date as "dd/mm/yyyy"
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };
  const getTodayDate2 = () => {
    const today = new Date();

    // Extract the day, month, and year
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based, so we add 1
    const year = today.getFullYear();

    // Format the date as "dd/mm/yyyy"
    return `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;
  };
  const today = getTodayDate();
  const today2 = getTodayDate2();
  const xepLoaiKhachHang = () => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    axios
      .patch("http://127.0.0.1:8000/api/set_loai_khachhang/", null, config)
      .then(() => {
        getAllKhachHang();
        getAllHoaDon();
        toast.success("Cập nhật xếp loại khách hàng thành công", {
          id: "priceUpdateSuccess",
        });
      })
      .catch((err) => {
        toast.error("Cập nhật xếp loại khách hàng không thành công", {
          id: "priceUpdateErr",
        });
        console.error(err);
      });
  };
  const searchKh = (value) => {
    if (!value) {
      getAllKhachHang();
    }
    if (value) {
      if (
        //value.trim() === "" ||
        value.trim() === "<" ||
        value.trim() === "<=" ||
        value.trim() === ">" ||
        value.trim() === ">="
      ) {
        getAllKhachHang();
        return;
      }
      axios
        .get(`http://127.0.0.1:8000/api/khachhang/?search=${value}`)
        .then((res) => {
          setKhachHang(res.data);
          // getAllKhachHang();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center w-full">
        <button
          className="px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={handleAddShow}
        >
          Thêm Khách Hàng Mới
        </button>

        <button
          className="px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={xepLoaiKhachHang}
        >
          Cập Nhật Xếp Loại Khách Hàng
        </button>
      </div>
      <label
        className="block mb-2 text-3xl font-bold text-white"
        htmlFor="searchKh"
      >
        Tìm kiếm
      </label>
      <div className="flex flex-row justify-center w-full ">
        <input
          className="w-1/4 px-3 py-2 mb-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="searchKh"
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
          onClick={() => searchKh(searchString)}
        >
          Tìm kiếm
        </button>
      </div>

      {khachHang && khachHang.length > 0 ? (
        <div className="flex justify-center">
          <table className="border-collapse ">
            <thead>
              <tr className="text-center bg-green-900">
                <th className="px-4 py-2 ">Mã Khách Hàng</th>
                <th className="px-4 py-2">Họ Và Tên</th>
                <th className="px-4 py-2">Địa Chỉ</th>
                <th className="px-4 py-2">Số điện thoại</th>
                <th className="px-4 py-2">Ngày sinh</th>
                <th className="px-4 py-2">Doanh Số</th>
                <th className="px-4 py-2">Ngày Đăng Ký</th>
                <th className="px-4 py-2">Xếp loại</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-left">
              {khachHang.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{row.makh}</td>
                  <td className="px-4 py-2">{row.hoten}</td>
                  <td className="px-4 py-2">{row.dchi}</td>
                  <td className="px-4 py-2">{row.sodt}</td>
                  <td className="px-4 py-2">{convertedDate(row.ngsinh)}</td>
                  <td className="px-4 py-2">{row.doanhso}</td>
                  <td className="px-4 py-2">{convertedDate(row.ngdk)}</td>
                  <td className="px-4 py-2">{row.loaikh}</td>
                  <td className="flex px-4 py-2 space-x-2">
                    <button
                      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={() => {
                        editKhachHang(
                          row.makh,
                          row.hoten,
                          row.dchi,
                          row.sodt,
                          DMYToYMD(convertedDate(row.ngsinh)),
                          row.doanhso,
                          convertedDate(row.ngdk),
                          row.loaikh
                        );
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      onClick={() => {
                        deleteKhachHang(row.makh);
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
          show={showAddKh}
          onHide={handleAddClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm Khách Hàng Mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              //method="post"
              className="max-w-md mx-auto mb-4 bg-white rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="makh"
                >
                  Mã Khách Hàng
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="makh"
                  type="text"
                  maxLength="4"
                  placeholder="Nhập mã khách hàng"
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
                  htmlFor="dchi"
                >
                  Địa Chỉ
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="dchi"
                  type="text"
                  placeholder="Nhập địa chỉ"
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
                  htmlFor="ngsinh"
                >
                  Ngày Sinh
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="ngsinh"
                  type="date"
                  //placeholder="Nhập số điện thoại"
                  required
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="ngdk"
                >
                  Ngày Đăng Ký
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="ngdk"
                  type="date"
                  value={today}
                  //placeholder="Nhập số điện thoại"
                  required
                  disabled
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
                  Thêm khách hàng
                </button>
              </div>
            </form>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
      {editData ? (
        <Modal
          show={showEditKh}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sửa Thông Tin Khách Hàng</Modal.Title>
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
                  htmlFor="dchi"
                >
                  Địa Chỉ
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="dchi"
                  type="text"
                  value={editData.dchi}
                  placeholder="Nhập địa chỉ"
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
                  htmlFor="ngsinh"
                >
                  Ngày Sinh
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="ngsinh"
                  type="date"
                  //placeholder="Nhập số điện thoại"
                  value={editData.ngsinh}
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
          show={showDeleteKh}
          onHide={handleDeleteClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xóa Khách Hàng</Modal.Title>
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
                Xóa Khách Hàng
              </button>
            </div>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
    </>
  );
};

export default KhachHang;
