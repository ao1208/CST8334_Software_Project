import { styled } from "styled-components";
import { Heading, FormRow, AdminNav } from "../../components";
import { useState } from "react";
import {
  monthReportTableHeader,
  salespersonReportTableHeader,
} from "../../utils/TableColumnMapping";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { formatNumber } from "../../utils/FormatNumber";
const dataByMonthly = [
  {
    pDate: "2023/05",
    salesId: "",
    salesName: "",
    visaGross: 21453552,
    visaTXN: 24.41,
    masterGross: 341425,
    masterTXN: 31.25,
    balance: "",
    commission: 335.43,
    payout: "",
    details: [
      {
        pDate: "2023/05",
        salesId: "#Clover-003",
        salesName: "Michael",
        visaGross: 253552,
        visaTXN: 2441,
        masterGross: 21425,
        masterTXN: 31.25,
        balance: "",
        commission: 242.52,
        payout: "",
      },
      {
        pDate: "2023/05",
        salesId: "#Clover-001",
        salesName: "Michael",
        visaGross: 253552,
        visaTXN: 2441,
        masterGross: 21425,
        masterTXN: 31.25,
        balance: "",
        commission: 242.52,
        payout: "",
      },
      {
        pDate: "2023/05",
        salesId: "#Clover-001",
        salesName: "Michael",
        visaGross: 253552,
        visaTXN: 2441,
        masterGross: 21425,
        masterTXN: 31.25,
        balance: "",
        commission: 242.52,
        payout: "",
      },
    ],
  },
  {
    pDate: "2023/04",
    salesId: "",
    salesName: "",
    visaGross: 21453552,
    visaTXN: 24.41,
    masterGross: 341425,
    masterTXN: 31.25,
    balance: "",
    commission: 335.43,
    payout: "",
    details: [
      {
        pDate: "2023/05",
        salesId: "#Clover-001",
        salesName: "Michael",
        visaGross: 253552,
        visaTXN: 2441,
        masterGross: 21425,
        masterTXN: 31.25,
        balance: "",
        commission: 242.52,
        payout: "",
      },
      {
        pDate: "2023/05",
        salesId: "#Clover-001",
        salesName: "Michael",
        visaGross: 253552,
        visaTXN: 2441,
        masterGross: 21425,
        masterTXN: 31.25,
        balance: "",
        commission: 242.52,
        payout: "",
      },
      {
        pDate: "2023/05",
        salesId: "#Clover-001",
        salesName: "Michael",
        visaGross: 253552,
        visaTXN: 2441,
        masterGross: 21425,
        masterTXN: 31.25,
        balance: "",
        commission: 242.52,
        payout: "",
      },
    ],
  },
  {
    pDate: "2023/03",
    salesId: "",
    salesName: "",
    visaGross: 21453552,
    visaTXN: 24.41,
    masterGross: 341425,
    masterTXN: 31.25,
    balance: "",
    commission: 534.42,
    payout: "",
    details: [
      {
        pDate: "2023/05",
        salesId: "#Clover-001",
        salesName: "Michael",
        visaGross: 253552,
        visaTXN: 2441,
        masterGross: 21425,
        masterTXN: 31.25,
        balance: "",
        commission: 242.52,
        payout: "",
      },
      {
        pDate: "2023/05",
        salesId: "#Clover-001",
        salesName: "Michael",
        visaGross: 253552,
        visaTXN: 2441,
        masterGross: 21425,
        masterTXN: 31.25,
        balance: "",
        commission: 242.52,
        payout: "",
      },
      {
        pDate: "2023/05",
        salesId: "#Clover-001",
        salesName: "Michael",
        visaGross: 253552,
        visaTXN: 2441,
        masterGross: 21425,
        masterTXN: 31.25,
        balance: "",
        commission: 242.52,
        payout: "",
      },
    ],
  },
];

const dataBySalesperson = [
  {
    salesId: "#Clover_001",
    salesName: "Michael",
    dateRange: "2023",
    visaGross: 21453552,
    visaTXN: 24.41,
    masterGross: 341425,
    masterTXN: 31.25,
    balance: "",
    commission: 3143.43,
    payout: "",
    details: [
      {
        salesId: "#Clover_001",
        salesName: "Michael",
        dateRange: "2023/01",
        visaGross: 21453552,
        visaTXN: 24.41,
        masterGross: 341425,
        masterTXN: 31.25,
        balance: 646.25,
        commission: 3143.43,
        payout: "",
      },
      {
        salesId: "#Clover_001",
        salesName: "Michael",
        dateRange: "2023/02",
        visaGross: 21453552,
        visaTXN: 24.41,
        masterGross: 341425,
        masterTXN: 31.25,
        balance: "",
        commission: 3143.43,
        payout: 42.52,
      },
      {
        salesId: "#Clover_001",
        salesName: "Michael",
        dateRange: "2023/03",
        visaGross: 21453552,
        visaTXN: 24.41,
        masterGross: 341425,
        masterTXN: 31.25,
        balance: "",
        commission: 3143.43,
        payout: "",
      },
    ],
  },
  {
    salesId: "#Clover_002",
    salesName: "Sara",
    dateRange: "2023",
    visaGross: 21453552,
    visaTXN: 24.41,
    masterGross: 341425,
    masterTXN: 31.25,
    balance: "",
    commission: 3143.43,
    payout: "",
    details: [
      {
        salesId: "#Clover_002",
        salesName: "Sara",
        dateRange: "2023/01",
        visaGross: 21453552,
        visaTXN: 24.41,
        masterGross: 341425,
        masterTXN: 31.25,
        balance: "",
        commission: 3143.43,
        payout: "",
      },
      {
        salesId: "#Clover_002",
        salesName: "Sara",
        dateRange: "2023/02",
        visaGross: 21453552,
        visaTXN: 24.41,
        masterGross: 341425,
        masterTXN: 31.25,
        balance: "",
        commission: 3143.43,
        payout: "",
      },
      {
        salesId: "#Clover_002",
        salesName: "Sara",
        dateRange: "2023/03",
        visaGross: 21453552,
        visaTXN: 24.41,
        masterGross: 341425,
        masterTXN: 31.25,
        balance: "",
        commission: 3143.43,
        payout: "",
      },
    ],
  },
  {
    salesId: "#Clover_003",
    salesName: "Ken",
    dateRange: "2023",
    visaGross: 21453552,
    visaTXN: 24.41,
    masterGross: 341425,
    masterTXN: 31.25,
    balance: 4134,
    commission: 3143.43,
    payout: "",
    details: [
      {
        salesId: "#Clover_003",
        salesName: "Ken",
        dateRange: "2023/01",
        visaGross: 21453552,
        visaTXN: 24.41,
        masterGross: 341425,
        masterTXN: 31.25,
        balance: 535,
        commission: 3143.43,
        payout: "",
      },
      {
        salesId: "#Clover_003",
        salesName: "Ken",
        dateRange: "2023/02",
        visaGross: 21453552,
        visaTXN: 24.41,
        masterGross: 341425,
        masterTXN: 31.25,
        balance: "",
        commission: 3143.43,
        payout: 42.52,
      },
      {
        salesId: "#Clover_003",
        salesName: "Ken",
        dateRange: "2023/03",
        visaGross: 21453552,
        visaTXN: 24.41,
        masterGross: 341425,
        masterTXN: 31.25,
        balance: "",
        commission: 3143.43,
        payout: "",
      },
    ],
  },
];
const PerformanceReport = () => {
  const [selectedOption, setSelectedOption] = useState("month");
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (pDate) => {
    setExpandedRows({
      ...expandedRows,
      [pDate]: !expandedRows[pDate],
    });
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChange = (e) => {};
  return (
    <Wrapper className="dashboard-container">
      <AdminNav />
      <Heading heading="sales performance - report" />
      <div className="filter">
        <div className="date-group">
          <FormRow
            type="date"
            name="dateFrom"
            placeholder="Date From"
            onChange={handleChange}
          />
          <FormRow
            type="date"
            name="dateTo"
            placeholder="Date To"
            onChange={handleChange}
          />
          <button className="search-btn">search</button>
        </div>
        <div className="button-group">
          <label htmlFor="groupBy" className="label">
            group by:
          </label>

          <input
            type="radio"
            id="groupMonth"
            name="groupBy"
            value="month"
            checked={selectedOption === "month"}
            onChange={handleOptionChange}
          />
          <label htmlFor="groupMonth" className="button-style">
            Month
          </label>
          <input
            type="radio"
            id="groupSalesperson"
            name="groupBy"
            value="salesperson"
            checked={selectedOption === "salesperson"}
            onChange={handleOptionChange}
          />
          <label htmlFor="groupSalesperson" className="button-style">
            Salesperson
          </label>
        </div>
      </div>

      <div className="report-table">
        <table className="table table-hover">
          <thead>
            {selectedOption === "month" ? (
              <tr style={{ borderStyle: "none !important" }}>
                {monthReportTableHeader.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            ) : (
              <tr style={{ borderStyle: "none !important" }}>
                {salespersonReportTableHeader.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {selectedOption === "month" ? (
              <>
                {dataByMonthly.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
                          {item.pDate}{" "}
                          {item.details && (
                            <button onClick={() => toggleRow(item.pDate)}>
                              {expandedRows[item.pDate] ? (
                                <BsChevronDown />
                              ) : (
                                <BsChevronRight />
                              )}
                            </button>
                          )}
                        </td>
                        <td>{item.salesId}</td>
                        <td>{item.salesName}</td>
                        <td>
                          {item.visaGross
                            ? formatNumber(item.visaGross)
                            : "$ --"}
                        </td>
                        <td>
                          {item.visaTXN ? formatNumber(item.visaTXN) : "$ --"}
                        </td>
                        <td>
                          {item.masterGross
                            ? formatNumber(item.masterGross)
                            : "$ --"}
                        </td>
                        <td>
                          {item.masterTXN
                            ? formatNumber(item.masterTXN)
                            : "$ --"}
                        </td>
                        <td>
                          {item.balance ? formatNumber(item.balance) : "$ --"}
                        </td>
                        <td>
                          {item.commission
                            ? formatNumber(item.commission)
                            : "$ --"}
                        </td>
                        <td>
                          {item.payout ? formatNumber(item.payout) : "$ --"}
                        </td>
                      </tr>
                      {item.details &&
                        expandedRows[item.pDate] &&
                        item.details.map((detail, index) => (
                          <tr key={index} className="details-row">
                            <td>{detail.pDate}</td>
                            <td>{detail.salesId}</td>
                            <td>{detail.salesName}</td>
                            <td>
                              {detail.visaGross
                                ? formatNumber(detail.visaGross)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.visaTXN
                                ? formatNumber(detail.visaTXN)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.masterGross
                                ? formatNumber(detail.masterGross)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.masterTXN
                                ? formatNumber(detail.masterTXN)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.balance
                                ? formatNumber(detail.balance)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.commission
                                ? formatNumber(detail.commission)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.payout
                                ? formatNumber(detail.payout)
                                : "$ --"}
                            </td>
                          </tr>
                        ))}{" "}
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {dataBySalesperson.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
                          {item.salesId}
                          {item.details && (
                            <button onClick={() => toggleRow(item.salesId)}>
                              {expandedRows[item.salesId] ? (
                                <BsChevronDown />
                              ) : (
                                <BsChevronRight />
                              )}
                            </button>
                          )}
                        </td>

                        <td>{item.salesName}</td>
                        <td>{item.dateRange}</td>
                        <td>
                          {item.visaGross
                            ? formatNumber(item.visaGross)
                            : "$ --"}
                        </td>
                        <td>
                          {item.visaTXN ? formatNumber(item.visaTXN) : "$ --"}
                        </td>
                        <td>
                          {item.masterGross
                            ? formatNumber(item.masterGross)
                            : "$ --"}
                        </td>
                        <td>
                          {item.masterTXN
                            ? formatNumber(item.masterTXN)
                            : "$ --"}
                        </td>
                        <td>
                          {item.balance ? formatNumber(item.balance) : "$ --"}
                        </td>
                        <td>
                          {item.commission
                            ? formatNumber(item.commission)
                            : "$ --"}
                        </td>
                        <td>
                          {item.payout ? formatNumber(item.payout) : "$ --"}
                        </td>
                      </tr>
                      {item.details &&
                        expandedRows[item.salesId] &&
                        item.details.map((detail, index) => (
                          <tr key={index} className="details-row">
                            <td>{detail.salesId}</td>
                            <td>{detail.salesName}</td>
                            <td>{detail.dateRange}</td>
                            <td>
                              {detail.visaGross
                                ? formatNumber(detail.visaGross)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.visaTXN
                                ? formatNumber(detail.visaTXN)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.masterGross
                                ? formatNumber(detail.masterGross)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.masterTXN
                                ? formatNumber(detail.masterTXN)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.balance
                                ? formatNumber(detail.balance)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.commission
                                ? formatNumber(detail.commission)
                                : "$ --"}
                            </td>
                            <td>
                              {detail.payout
                                ? formatNumber(detail.payout)
                                : "$ --"}
                            </td>
                          </tr>
                        ))}{" "}
                    </>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .filter {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .date-group {
    display: flex;
    column-gap: 1rem;
  }

  .search-btn {
    color: #ffffff;
    text-transform: capitalize;
    background-color: #426b1f;
    padding: 0 1rem;
    border: 1px solid #426b1f;
    border-radius: 0.5rem;
  }

  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
  }
  .label {
    color: #000000;
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }

  .button-style {
    display: inline-block;
    padding: 0.25rem 1rem;
    color: #9e9e9e;
    background-color: #fff;
    margin-right: 0.5rem;
    border: 1px solid #9e9e9e;
    border-radius: 1.25rem;
    transition: background-color 0.2s;
  }

  .report-table td {
    align-items: center;
    background-color: #f7f6fe;
  }
  .report-table .details-row td {
    background-color: #ffffff;
  }

  .button-group input[type="radio"] {
    display: none;
  }

  .button-group input[type="radio"]:checked + label {
    color: #ffffff;
    background-color: #624de3;
  }
  @media (max-width: 820px) {
    .date-group {
      column-gap: 0.5rem;
      input {
        width: 130px;
      }
      .search-btn {
        padding: 0 0.75rem;
      }
    }

    .label {
      font-size: 1rem;
    }

    .button-style {
      padding: 0.25rem 0.75rem;
    }

    tr {
      height: 180px;
    }
  }
  @media (max-width: 576px) {
    .filter {
      display: grid;
    }
    .date-group input {
      width: 100%;
    }
    .button-group {
      margin-top: 1rem;
      justify-content: flex-start;
      margin-top: 1.5rem;
    }
    tr,
    th {
      padding: 0;
      font-size: 0.75rem;
      grid-template-columns: auto auto auto auto;
    }
  }
`;
export default PerformanceReport;
