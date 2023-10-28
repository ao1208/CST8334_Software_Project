import styled from "styled-components";
import { TbArrowNarrowUp } from "react-icons/tb";
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

// all the data I am using below is for demo only, need to replace with the real data
const CommissionChart = () => {
  const total = 16500.0;
  const increaseRate = 2.1;

  const thisYearData = [
    { date: "01", count: 100 },
    { date: "02", count: 120 },
    { date: "03", count: 90 },
    { date: "04", count: 110 },
    { date: "05", count: 130 },
    { date: "06", count: 115 },
    { date: "07", count: 140 },
    { date: "08", count: 125 },
    { date: "09", count: 95 },
    { date: "10", count: 105 },
    { date: "11", count: 135 },
    { date: "12", count: 120 },
  ];

  const lastYearData = [
    { date: "01", count: 80 },
    { date: "02", count: 95 },
    { date: "03", count: 75 },
    { date: "04", count: 90 },
    { date: "05", count: 100 },
    { date: "06", count: 85 },
    { date: "07", count: 110 },
    { date: "08", count: 105 },
    { date: "09", count: 70 },
    { date: "10", count: 95 },
    { date: "11", count: 110 },
    { date: "12", count: 105 },
  ];

  const tableData = [
    {
      name: "VISA",
      transactionVolume: 237024.65,
      transactionFee: 520.23,
      commission: 228.8,
    },
    {
      name: "MASTER",
      transactionVolume: 131543.49,
      transactionFee: 220.23,
      commission: 104.75,
    },
    ,
    {
      name: "Total",
      transactionVolume: 368568.14,
      transactionFee: 742.41,
      commission: 333.55,
    },
  ];
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
            <span>
              <TbArrowNarrowUp />
              {increaseRate} %
            </span>{" "}
            vs last month
          </p>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={thisYearData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={{ stroke: "#E2E7E7" }} />
            <YAxis allowDecimals={false} axisLine={{ stroke: "#E2E7E7" }} />
            <Bar dataKey="count" fill="#5A6ACF" barSize={15}>
              {thisYearData.map((entry, index) => (
                <Cell key={index} fill="#5A6ACF" />
              ))}
            </Bar>
            <Bar dataKey="count" fill="#000000" barSize={15}>
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
            <span className="circle"></span>This Year
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
