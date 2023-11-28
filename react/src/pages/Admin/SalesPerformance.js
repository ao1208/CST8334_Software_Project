import { styled } from "styled-components";
import { Heading, SalesSearch, Pagination, AdminNav } from "../../components";
import { salesPerformanceTableHeader } from "../../utils/TableColumnMapping";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const SalesPerformance = () => {

    const [data, setPerformanceData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [numOfPages, setNumOfPages] = useState(1);
    const [apiUrl, setApiUrl] = useState('http://127.0.0.1:8000/api/performance');

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(apiUrl);
                console.log(response.data.data);
                setPerformanceData(response.data.data);
                setItemsPerPage(response.data.per_page);
                setNumOfPages(response.data.last_page);
                if (response.data.data.length === 0) {
                    alert('No records found.');
                }
            } catch (error) {
                console.error('Error fetching sales performances data:', error);
            }
        };
        fetchRecords();
    },[apiUrl]);

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
      <AdminNav />
      <Heading heading="sales performance" />
      <div className="filter">
        <SalesSearch setApiUrl={setApiUrl}/>
        <div className="report">
          <Link to="/admin/sales_performance_report">
            <button className="report-btn">
              report
            </button>
          </Link>
        </div>
      </div>

      <div className="data-table">
        <table className="table striped table-hover">
          <thead>
            <tr style={{ borderStyle: "none !important" }}>
              {salesPerformanceTableHeader.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.pdate.substring(0, 7).replace('-','/')} </td>
                  <td>{item.sales_id}</td>
                  <td>{item.first_name + ' ' + item.last_name} </td>
                  <td>{item.commission_percentage * 100} </td>
                  <td>{item.merchant_id} </td>
                  <td>{item.DBA_name} </td>
                  <td>$ {item.visa_gross_volume ? item.visa_gross_volume.toLocaleString() : "--"}</td>
                  <td>$ {item.visa_transaction_fee ? item.visa_transaction_fee.toLocaleString() : "--"}</td>
                  <td>$ {item.master_gross_volume ? item.master_gross_volume.toLocaleString() : "--"}</td>
                  <td>$ {item.master_transaction_fee ? item.master_transaction_fee.toLocaleString() : "--"}</td>
                  <td>$ {item.total_commission ? item.total_commission.toLocaleString() : "--"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
          data={data}
          itemsPerPage={itemsPerPage}
          numOfPages={numOfPages}
          onPageChange={handlePageChange} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .filter {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
  }

  .report-btn {
    color: #ffffff;
    height: 35px;
    padding: 0 1rem;
    text-transform: capitalize;
    background-color: #426b1f;
    border: 1px solid #426b1f;
    border-radius: 0.25rem;
  }

  @media (max-width: 820px) {
    .filter {
      display: grid;
      justify-content: inherit;
    }
    .report {
      display: flex;
      justify-content: flex-end;
      grid-row: 1;
      margin: 0.75rem 0;
    }
    .report-btn {
      width: 120px;
      justify-self: end;
    }

    tr {
      height: 180px;
    }
  }
`;
export default SalesPerformance;
