import { useEffect, useState } from "react";
import { API_DATA_LIMIT, API_URL, sendRequest } from "../utils/Api";
import { formatDate, formatTime } from "../utils/Utilities";
import TableComponent from "../components/table/TableComponent";
import TablePagination from "../components/table/TablePagination";
import ModalContainer from "../components/forms/ModalContainer";
import NewProduct from "../components/forms/NewProduct";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [modalShown, setmodalShown] = useState({
    shown: false,
    component: null,
  });

  const closeModal = async (shouldNotFetch = true) => {
    setmodalShown({ shown: false, component: null });
    if (!shouldNotFetch) {
      setLoading(true);
      await fetchTableData(0);
      setLoading(false);
    }
  };

  const openModal = (component) => {
    if (!component) {
      return;
    }
    setmodalShown({ shown: true, component });
  };

  const changePage = async (newPage) => {
    if (newPage !== data.currentPage) {
      setLoading(true);
      await fetchTableData(newPage);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchTableData(0);
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchTableData = async (page) => {
    let response = await sendRequest(API_URL + `/products/all`, "GET");
    setData(response?.data?.data);
    return response;
  };

  const transformData = (data) => {
    return data.map((item) => {
      return {
        code: item?.code,
        name: item?.name,
        type: item?.type,
        price: item?.price,
        quantity: item?.quantity,
      // actions:  {<button>Add To Card</button>}

      };
    });
  };

  const tableHeaders = [
    "Code",
    "name",
    "productType",
    "price",
    "quantity",
    "actions"

  ];

  return (
    <>
      <h2>
    Dashboard
      </h2>
      <TableComponent
        headers={tableHeaders}
        data={transformData(data)}
        loading={loading}
      />
      <TablePagination
        pages={pages}
        active={currentPage}
        changePage={changePage}
        loading={loading}
      ></TablePagination>
 
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};
