import styled from "styled-components";
import {TbArrowNarrowDown, TbArrowNarrowUp} from "react-icons/tb";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import { formatNumber } from "../utils/FormatNumber";
import {useEffect, useState} from "react";
import axios from "axios";

const CommissionChart = ({ dateRange, salesPerson}) => {

    const [total, setTotal] = useState(0);
    const [increaseRate, setIncreaseRate] = useState(0);

    // Fetch total balance data from the Laravel API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/dashboard-total-balance')
            .then((response) => {
                setTotal(response.data.total);
                setIncreaseRate(response.data.increaseRate);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        console.log(increaseRate);
    }, []); // Trigger the effect only once on component mount

    const [lastYearData, setLastYearData] = useState([]);
    const [thisYearData, setThisYearData] = useState([]);

    // Fetch monthly commission data from the Laravel API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/dashboard-monthly-commission')
            .then((response) => {
                const first12Records = response.data.slice(0, 12);
                const remainRecords = response.data.slice(12);

                setLastYearData(first12Records);
                setThisYearData(remainRecords);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Trigger the effect only once on component mount

    // Combine last year and this year data
    const combinedData = lastYearData.map((entry, index) => ({
        month: entry.month.slice(5,7),
        last: entry.month_amount,
        this: thisYearData[index].month_amount,
    }));

    // State variable for transaction table data
    const [tableData, setTableData] = useState([]);

    // Fetch transaction data from the Laravel API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/dashboard-transaction')
            .then((response) => {
                // Transform the object into an array of objects
                const transformedData = Object.entries(response.data).map(([name, values]) => ({
                    name,
                    ...values,
                }));
                setTableData(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Trigger the effect only once on component mount

    // Handle changes in the selected date range or salesperson
    const handleDateORSalespersonChange = async () => {
        try {
            // Build the URLs with optional parameters
            let url_total_balance = `http://127.0.0.1:8000/api/dashboard-total-balance`;
            let url_monthly_commission = `http://127.0.0.1:8000/api/dashboard-monthly-commission`;
            let url_transaction = `http://127.0.0.1:8000/api/dashboard-transaction`;

            if (dateRange) { url_transaction += `?date-range=${dateRange}`; }
            if (salesPerson) { // If dateRange is also present, add '&' before sales-person
                url_total_balance += `?sales-person=${salesPerson}`;
                url_monthly_commission += `?sales-person=${salesPerson}`;
                url_transaction += dateRange ? `&sales-person=${salesPerson}` : `?sales-person=${salesPerson}`;
            }

            // Fetch total balance data
            const response_total_balance = await axios.get(url_total_balance);
            setTotal(response_total_balance.data.total);
            setIncreaseRate(response_total_balance.data.increaseRate);
            // Fetch monthly commission chart data
            const response_monthly_commission = await axios.get(url_monthly_commission);
            const first12Records = response_monthly_commission.data.slice(0, 12);
            const remainRecords = response_monthly_commission.data.slice(12);
            setLastYearData(first12Records);
            setThisYearData(remainRecords);
            // Fetch transaction table data
            const response_transaction = await axios.get(url_transaction);
            if (response_transaction.data !== null) {
                const transformedData = Object.entries(response_transaction.data).map(([name, values]) => ({
                    name,
                    ...values,
                }));
                setTableData(transformedData);
            } else {
                // Handle the case where response.data is null
                console.error('Received null data from the server.');
            }
        }catch (error) {
            console.error('Error:', error);
        }
    }
    // Trigger the handleDateORSalespersonChange effect on changes in date range or salesperson
    useEffect(() => {
        handleDateORSalespersonChange();
    }, [dateRange, salesPerson]); // Trigger the effect when date-range or sales-person values change

  return (
    <Wrapper>
      <div className="heading">
        <div>
          {" "}
          <h4>Commission Balance in Total</h4>
          <p>Accumulated up until the most recent</p>
        </div>
        <div className="total">
          <h4>CAD {formatNumber(total)}</h4>
          <p>
            {" "}
            <span style={{ color: increaseRate < 0 ? '#ff0000' : '#149d52' }}>
              {increaseRate < 0 ? <TbArrowNarrowDown /> : <TbArrowNarrowUp />}
              {increaseRate.toFixed(2)} %
            </span>{" "}
            vs last month
          </p>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={{ stroke: "#E2E7E7" }} />
            <YAxis allowDecimals={false} axisLine={{ stroke: "#E2E7E7" }} />
            <Bar dataKey="this" fill="#5A6ACF" barSize={15}>
              {thisYearData.map((entry, index) => (
                <Cell key={index} fill="#5A6ACF" />
              ))}
            </Bar>
            <Bar dataKey="last" fill="#000000" barSize={15}>
              {lastYearData.map((entry, index) => (
                <Cell key={index} fill="#E6E8EC" />
              ))}
            </Bar>
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>

        <p className="bottom">
          <span>
            {" "}
            <span className="circle"></span>
              This Year
          </span>{" "}
          <span>
            {" "}
            <span
              className="circle"
              style={{ backgroundColor: "#D8D9DB" }}
            ></span>
              Last Year
          </span>
        </p>
      </div>
      <div className="transaction-wrapper">
        <table className="table table-hover">
          <thead>
            <tr className="center-cell">
              <th scope="col"></th>
              <th scope="col">Transaction Volume</th>
              <th scope="col">Transaction Fee</th>
              <th scope="col">Commission</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => {
              return (
                <tr key={index} className="center-cell">
                  <td className="category">{item.name} </td>
                  <td>{formatNumber(item.transactionVolume)} </td>
                  <td>{formatNumber(item.transactionFee)} </td>
                  <td>{formatNumber(item.commission)} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  border: 1px solid #e6e8ec;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.18);

  .heading {
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: #000000;
    padding: 3rem 2rem;
    text-align: left;
  }

  h4 {
    letter-spacing: 1px;
  }

  .total {
    text-align: center;

    p {
      color: #737b8b;
    }
    span {
      color: #149d52;
      font-weight: 500;

      svg {
        font-size: 1.5rem;
      }
    }
  }

  .chart-wrapper p {
    text-align: center;
    margin: 2.5rem 0;
  }

  .bottom span {
    color: #121212;
    margin-right: 2rem;

    .circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #5a6acf;
      margin-right: 0.75rem;
    }
  }

  .transaction-wrapper th {
    font-size: 1.25rem;
    background-color: #dadadc;
  }

  .category {
    font-size: 1.25rem;
  }

  .transaction-wrapper tbody tr:nth-child(even) * {
    background-color: #f3f3f3 !important;
  }
  @media (max-width: 820px) {
    tr {
      height: 80px;
      grid-template-columns: auto auto auto auto;
    }
  }
  @media (max-width: 576px) {
    tr {
      height: 60px;
    }

    .heading {
      grid-template-columns: 1fr;
      padding: 3rem 2rem 1rem;
    }

    .total {
      margin-top: 1rem;
    }
    .chart-wrapper {
      width: 360px;
    }
    .transaction-wrapper {
      width: 100%;
    }
    .chart-wrapper p {
      margin: 1.5rem 0;
    }

    .bottom span {
      margin-right: 1rem;
    }

    .transaction-wrapper,
    .transaction-wrapper th,
    .category,
    .bottom span {
      font-size: 0.75rem;
    }
  }
`;
export default CommissionChart;
