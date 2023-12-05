import {
    SalesNav,
    SalesSearch,
    Pagination,
    FooterSummary,
    Heading, SalesPayoutSearch,
} from "../../components";
import { styled } from "styled-components";
import { payoutColumnMappings } from "../../utils/TableColumnMapping";
import { formatNumber } from "../../utils/FormatNumber";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const sales_payout_data = [
  {
    date: "2023/05/01",
    salesID: "#Clover-001",
    salesName: "Michael",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "commission",
    value: 1.53,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
  {
    date: "2023/05/01",
    salesID: "#Clover-002",
    salesName: "Ken",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "payout",
    value: 34.2,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
  {
    date: "2023/05/01",
    salesID: "#Clover-003",
    salesName: "Sara",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "commission",
    value: 1.53,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
];
const SalesCommission = () => {
    const [userId, setUserId] = useState(null);
    const [data, setData] = useState([]);
    const [apiUrl, setApiUrl] = useState("");
    const [totalCommission, setTotalCommission] = useState(0);
    const [totalPayout, setTotalPayout] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [numOfPages, setNumOfPages] = useState(1);

    useEffect(() => {
        // Retrieve the user ID from the cookie
        const storedUserId = Cookies.get('userId');
        setUserId(storedUserId);
        setApiUrl(`http://127.0.0.1:8000/api/payout-search/${userId}`);
    }, [userId]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(apiUrl);
                setTotalCommission(response.data[0].subtotalCommission);
                setTotalPayout(response.data[1].subtotalPayout);
                setData(response.data[2].data);
                setItemsPerPage(response.data[2].per_page);
                setNumOfPages(response.data[2].last_page);
                // if (response.data[2].data.length === 0) {
                //     alert('No records found.');
                // }
            } catch (error) {
                console.error('Network error:', error.message);
            }
        };
        fetchRecords();
    }, [apiUrl]);

    // Callback function for handling page changes
    const handlePageChange = (newPage) => {
        const url = new URL(apiUrl);

        // Update the 'page' parameter
        url.searchParams.set('page', newPage);

        // Remove duplicate 'page' parameters
        const updatedUrl = removeDuplicatePageParams(url);

        setApiUrl(updatedUrl);

        console.log("Page changed to:", newPage);
    };

    const removeDuplicatePageParams = (url) => {
        const urlSearchParams = new URLSearchParams(url.search);
        const uniqueParams = new Map();

        // Iterate over existing parameters and keep the last occurrence of each
        urlSearchParams.forEach((value, key) => {
            uniqueParams.set(key, value);
        });

        // Update the URL with the unique parameters
        const updatedUrl = `${url.origin}${url.pathname}?${[...uniqueParams.entries()].map(([key, value]) => `${key}=${value}`).join('&')}`;

        return new URL(updatedUrl);
    };

  return (
    <Wrapper className="dashboard-container">
      <SalesNav />
      <Heading heading="Commission Payout" />
      <SalesPayoutSearch setApiUrl={setApiUrl} userId={userId}/>
      <div className="data-table">
        <table className="table striped table-hover">
          <thead>
            <tr className="vertical-center">
              {Object.keys(payoutColumnMappings).map((column) => (
                <th key={column}>{payoutColumnMappings[column]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} className="vertical-center">
                  <td>{item.date} </td>
                  <td>{item.sales_id} </td>
                  <td>{item.first_name + ' ' + item.last_name} </td>
                  <td>{item.merchant_id ? item.merchant_id : "--"} </td>
                  <td>{item.DBA_name ? item.DBA_name : "--"} </td>
                  <td>{item.type} </td>
                  <td
                    style={{
                      color: item.type.toLowerCase() === "payout" ? "#A30D11" : "",
                    }}
                  >
                    {item.amount
                      ? item.type.toLowerCase() === "payout"
                        ? "-" + formatNumber(item.amount)
                        : formatNumber(item.amount)
                      : "$ --"}
                  </td>
                  <td>
                    {item.balance ? formatNumber(item.balance) : "$ --"}{" "}
                  </td>{" "}
                  <td>{item.comment} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FooterSummary
        totalCommission={totalCommission}
        totalPayout={totalPayout}
      />
        <Pagination
            data={data}
            itemsPerPage={itemsPerPage}
            numOfPages={numOfPages}
            onPageChange={handlePageChange} />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  table {
    margin-bottom: 0;
  }
`;
export default SalesCommission;
