import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const HoaDon = () => {
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
    setShowAddHd(false);
    setAddData(null);
  };
  const handleAddShow = () => {
    //console.log(khachHang);
    setShowAddHd(true);
    setAddData({
      sohd: "",
      nghd: today2,
      trigia: 0,
      makh: -1,
      manv: "",
    });
  };
  const handleEditClose = () => {
    setShowEditHd(false);
    setEditData(null);
  };

  const handleEditShow = () => setShowEditHd(true);
  const handleDeleteClose = () => {
    setShowDeleteHd(false);
    setIdXoa(null);
  };

  const handleDeleteShow = () => setShowDeleteHd(true);
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

  const themHoaDon = () => {
    axios
      .post("http://127.0.0.1:8000/api/hoadon/", newAddData)
      .then((response) => {
        console.log("Response:", response.data);
        toast.success("Thêm thành công", { id: "addSuccess" });
        getAllHoaDon();
        setAddData(null);
        setShowAddHd(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Thêm thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "addError",
        });
      });
  };
  const suaHoaDon = (sohd) => {
    axios
      .put(`http://127.0.0.1:8000/api/hoadon/${sohd}/`, newAddData, config)
      .then(() => {
        //console.log("Response:", response.data);
        toast.success("Sửa thành công", { id: "editSuccess" });
        getAllHoaDon();
        setShowEditHd(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Sửa thất bại. Vui lòng kiểm tra lại thông tin", {
          id: "editError",
        });
      });
  };
  const xoaHoaDon = (sohd) => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/hoadon/${sohd}/`,

        config
      )
      .then(() => {
        //console.log("Response:", response.data);
        toast.success("Xóa thành công", { id: "deleteSuccess" });
        getAllHoaDon();
        setShowDeleteHd(false);
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
    //let dateSinh = addData.ngsinh;
    let dateHd = DMYToYMD(addData.nghd);
    //console.log(dateSinh);
    console.log(dateHd);
    newAddData = {
      sohd: addData.sohd,
      nghd: `${dateHd}T00:00:00+07:00`,
      trigia: addData.trigia,
      makh: addData.makh,
      manv: addData.manv,
    };
    console.log(newAddData);
  };
  const changeDateToMatchAPIEdit = async () => {
    //let dateSinh = editData.ngsinh;
    let dateHd = DMYToYMD(editData.nghd);
    // console.log(dateSinh);
    // console.log(dateDk);
    newAddData = {
      sohd: editData.sohd,
      nghd: `${dateHd}T00:00:00+07:00`,
      trigia: editData.trigia,
      makh: editData.makh,
      manv: editData.manv,
    };
    console.log(newAddData);
  };
  const DMYToYMD = (dateString) => {
    const dateList = dateString.split("-");
    return `${dateList[2]}-${dateList[1]}-${dateList[0]}`;
  };
  const handleAddClick = async () => {
    for (const key in addData) {
      if (addData[key] === "" && key !== "makh") {
        toast.error("Vui lòng nhập đủ thông tin", { id: "addData" });
        return; // Return true as soon as a blank value is found
      }
    }
    if (addData.sohd <= 0) {
      toast.error("Số hóa đơn phải lớn hơn 0", { id: "soHoaDon" });
      return;
    }
    changeDateToMatchAPI();
    themHoaDon();
  };
  const handleEditClick = () => {
    for (const key in editData) {
      if (editData[key] === "" && key != "makh") {
        toast.error("Vui lòng kiểm tra đủ thông tin", { id: "editData" });
        return; // Return true as soon as a blank value is found
      }
    }
    changeDateToMatchAPIEdit();
    suaHoaDon(newAddData.sohd);
  };
  const handleDeleteClick = () => {
    xoaHoaDon(idXoa);
  };

  const editHoaDon = (sohd, nghd, trigia, makh, manv) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    console.log(nghd);
    setEditData({
      sohd: sohd,
      nghd: nghd,
      trigia: trigia,
      makh: makh,
      manv: manv,
    });
    handleEditShow();
  };
  const deleteHoaDon = (sohd) => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    setIdXoa(sohd);
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
  const config = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  };
  const tinhTriGiaHoaDonw = () => {
    if (!bearerToken) {
      setLogInShow(true);
      return;
    }
    axios
      .patch("http://127.0.0.1:8000/api/tinh-tri-gia-hd/", null, config)
      .then(() => {
        getAllHoaDon();
        toast.success("Cập nhật trị giá hóa đơn thành công", {
          id: "priceUpdateSuccess",
        });
      })
      .catch((err) => {
        toast.error("Cập nhật trị giá hóa đơn không thành công", {
          id: "priceUpdateErr",
        });
        console.error(err);
      });
  };

  const searchHd = (value) => {
    if (!value) {
      getAllHoaDon();
    }
    if (value) {
      if (
        //value.trim() === "" ||
        value.trim() === "<" ||
        value.trim() === "<=" ||
        value.trim() === ">" ||
        value.trim() === ">="
      ) {
        getAllHoaDon();
        return;
      }
      axios
        .get(`http://127.0.0.1:8000/api/hoadon/?search=${value}`)
        .then((res) => {
          setHoaDon(res.data);
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
          Thêm Hóa Đơn Mới
        </button>
        <button
          className="px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={tinhTriGiaHoaDonw}
        >
          Cập Nhật Trị Giá Hóa Đơn
        </button>
      </div>
      <label
        className="block mb-2 text-3xl font-bold text-white"
        htmlFor="searchHd"
      >
        Tìm kiếm
      </label>
      <div className="flex flex-row justify-center w-full ">
        <input
          className="w-1/4 px-3 py-2 mb-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="searchHd"
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
          onClick={() => searchHd(searchString)}
        >
          Tìm kiếm
        </button>
      </div>

      {hoaDon && hoaDon.length > 0 ? (
        <div className="flex justify-center">
          <table className="border-collapse ">
            <thead>
              <tr className="text-center bg-green-900">
                <th className="px-4 py-2 ">Số Hóa Đơn</th>
                <th className="px-4 py-2">Ngày In Hóa Đơn</th>
                <th className="px-4 py-2">Trị Giá</th>
                <th className="px-4 py-2">Mã Khách Hàng</th>
                <th className="px-4 py-2">Mã Nhân Viên</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-left">
              {hoaDon.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{row.sohd}</td>
                  <td className="px-4 py-2">{convertedDate(row.nghd)}</td>
                  <td className="px-4 py-2">{row.trigia}</td>
                  <td className="px-4 py-2">{row.makh}</td>
                  <td className="px-4 py-2">{row.manv}</td>
                  <td className="flex px-4 py-2 space-x-2">
                    <button
                      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={() => {
                        editHoaDon(
                          row.sohd,
                          convertedDate(row.nghd),
                          row.trigia,
                          row.makh,
                          row.manv
                        );
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      onClick={() => {
                        deleteHoaDon(row.sohd);
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
          show={showAddHd}
          onHide={handleAddClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm Hóa Đơn Mới</Modal.Title>
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
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="sohd"
                  type="number"
                  placeholder="Nhập số hóa đơn"
                  required
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="nghd"
                >
                  Ngày In Hóa Đơn
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="nghd"
                  type="date"
                  value={today}
                  //placeholder="Nhập số điện thoại"
                  required
                  disabled
                  onChange={handleAddInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="makh"
                >
                  Mã Khách Hàng
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="makh"
                  name="makh"
                  onChange={handleAddInputChange}
                  value={addData.makh}
                >
                  <option value="-1" disabled>
                    Chọn khách hàng
                  </option>
                  <option value="">Không phải thành viên</option>
                  {khachHang.map((option, index) => (
                    <option key={index} value={option.makh}>
                      {option.makh}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="manv"
                >
                  Mã Nhân Viên
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="manv"
                  name="manv"
                  onChange={handleAddInputChange}
                  value={addData.manv}
                  required
                >
                  <option value="" disabled>
                    Chọn Nhân Viên
                  </option>
                  {nhanVien.map((option, index) => (
                    <option key={index} value={option.manv}>
                      {option.manv}
                    </option>
                  ))}
                </select>
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
                  Thêm Hóa Đơn
                </button>
              </div>
            </form>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
      {editData ? (
        <Modal
          show={showEditHd}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sửa Thông Tin Hóa Đơn</Modal.Title>
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
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="makh"
                  name="makh"
                  onChange={handleEditInputChange}
                  value={editData.makh ? editData.makh : ""}
                >
                  <option value="-1" disabled>
                    Chọn khách hàng
                  </option>
                  <option value="">Không phải thành viên</option>
                  {khachHang.map((option, index) => (
                    <option key={index} value={option.makh}>
                      {option.makh}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="manv"
                >
                  Mã Nhân Viên
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="manv"
                  name="manv"
                  onChange={handleEditInputChange}
                  required
                  value={editData.manv}
                >
                  <option value="" disabled>
                    Chọn Nhân Viên
                  </option>
                  {nhanVien.map((option, index) => (
                    <option key={index} value={option.manv}>
                      {option.manv}
                    </option>
                  ))}
                </select>
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
                  Sửa Hóa Đơn
                </button>
              </div>
            </form>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
      {idXoa ? (
        <Modal
          show={showDeleteHd}
          onHide={handleDeleteClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xóa Hóa Đơn</Modal.Title>
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
                Xóa Hóa Đơn
              </button>
            </div>
          </Modal.Body>
          <Toaster />
        </Modal>
      ) : null}
    </>
  );
};

export default HoaDon;
