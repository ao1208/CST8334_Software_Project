import { styled } from "styled-components";
import { Heading, SalesSearch, Pagination, AdminNav } from "../../components";
import { salesPerformanceTableHeader } from "../../utils/TableColumnMapping";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
const data = [
  {
    pDate: "2023/05",
    salesId: "#Clover-001",
    salesName: "Michael",
    commissionPercent: "50%",
    merchantNo: "21314525",
    merchantName: "Goopter",
    visaGross: 9026.61,
    visaTXN: 23.23,
    masterGross: 0,
    masterTXN: 0,
    commission: 21.23,
  },
  {
    pDate: "2023/05",
    salesId: "#Clover-001",
    salesName: "Michael",
    commissionPercent: "50%",
    merchantNo: "21314525",
    merchantName: "Goopter",
    visaGross: 9026.61,
    visaTXN: 23.23,
    masterGross: 7729.34,
    masterTXN: 12.34,
    commission: 21.23,
  },
  ,
  {
    pDate: "2023/05",
    salesId: "#Clover-001",
    salesName: "Michael",
    commissionPercent: "50%",
    merchantNo: "21314525",
    merchantName: "Goopter",
    visaGross: 9026.61,
    visaTXN: 23.23,
    masterGross: 7729.34,
    masterTXN: 12.34,
    commission: 21.23,
  },
  ,
  {
    pDate: "2023/05",
    salesId: "#Clover-001",
    salesName: "Michael",
    commissionPercent: "50%",
    merchantNo: "21314525",
    merchantName: "Goopter",
    visaGross: 9026.61,
    visaTXN: 23.23,
    masterGross: 7729.34,
    masterTXN: 12.34,
    commission: 21.23,
  },
];
const SalesPerformance = ({apiUrl}) => {

    const [data, setPerformanceData] = useState([]);

    useEffect(() => {
        // Fetch sales performance data from the Laravel API
        let url = 'http://127.0.0.1:8000/api/performance';
        if (apiUrl) {
            url = {apiUrl}
        }
        axios.get(url)
            .then((response) => {
                setPerformanceData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching sales performances data:', error);
            });
    }, []);

  return (
    <Wrapper className="dashboard-container">
      <AdminNav />
      <Heading heading="sales performance" />
      <div className="filter">
        <SalesSearch />
        <div className="report">
          <Link to="/admin/sales_performance_report">
            <button
              className="report-btn"
              onClick={() => {
                window.alert("function haven't implement");
              }}
            >
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
                  <td>{item.pdate} </td>
                  <td>{item.sales_id}</td>
                  <td>{item.user_first_name + ' ' + item.user_last_name} </td>
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

      <Pagination data={data} />
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
