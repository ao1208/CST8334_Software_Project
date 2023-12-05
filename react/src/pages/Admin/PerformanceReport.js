import {styled} from "styled-components";
import {Heading, FormRow, AdminNav} from "../../components";
import {useEffect, useState} from "react";
import {
    monthReportTableHeader,
    salespersonReportTableHeader,
} from "../../utils/TableColumnMapping";
import {BsChevronDown, BsChevronRight} from "react-icons/bs";
import {formatNumber} from "../../utils/FormatNumber";
import axios from 'axios';

const PerformanceReport = () => {
    const [selectedOption, setSelectedOption] = useState("month");
    const [expandedRows, setExpandedRows] = useState({});
    const [dataByMonthly, setDataByMonthly] = useState([]);
    const [dataBySalesperson, setDataBySalesperson] = useState([]);

    const toggleRow = (pDate) => {
        setExpandedRows({
            ...expandedRows,
            [pDate]: !expandedRows[pDate],
        });
    };

    // Fetch data from the Laravel API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/performance-report')
            .then((response) => {
                setDataByMonthly(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Trigger the effect only once on component mount

    const handleOptionChange = async (event)  => {
        let url = `http://127.0.0.1:8000/api/performance-report?option=${selectedOption}`;
        try {
            const response = await axios.get(url);
            if (selectedOption === "month") {
                setDataByMonthly(response.data);
            }
            if (selectedOption === "salesperson") {
                setDataBySalesperson(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // Trigger the effect when option values change
    useEffect(() => {
        handleOptionChange();
    }, [selectedOption]);

    // State variables for date range input values
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "dateFrom") {
            setDateFrom(value);
        } else if (name === "dateTo") {
            setDateTo(value);
        }
    };
    // Fetch data based on the selected date range from Laravel API
    const handleDateSearch = async () => {
        try {
            if (selectedOption === "month") {
                const response = await axios.get(`http://127.0.0.1:8000/api/performance-report-search?option=month&startDate=${dateFrom}&endDate=${dateTo}`);
                setDataByMonthly(response.data);
            }
            if (selectedOption === "salesperson") {
                const response = await axios.get(`http://127.0.0.1:8000/api/performance-report-search?option=salesperson&startDate=${dateFrom}&endDate=${dateTo}`);
                setDataBySalesperson(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Wrapper className="dashboard-container">
            <AdminNav/>
            <Heading heading="sales performance - report"/>
            <div className="filter">
                <div className="date-group">
                    <FormRow
                        type="date"
                        name="dateFrom"
                        value={dateFrom}
                        placeholder="Date From"
                        onChange={handleChange}
                    />
                    <FormRow
                        type="date"
                        name="dateTo"
                        value={dateTo}
                        placeholder="Date To"
                        onChange={handleChange}
                    />
                    <button
                        className="search-btn"
                        onClick={handleDateSearch}
                    >search
                    </button>
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
                        onChange={(event) => setSelectedOption(event.target.value)}
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
                        onChange={(event) => setSelectedOption(event.target.value)}
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
                        <tr style={{borderStyle: "none !important"}}>
                            {monthReportTableHeader.map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    ) : (
                        <tr style={{borderStyle: "none !important"}}>
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
                                                {item.pDate.substring(0, 7).replace('-','/')}{" "}
                                                {item.details && (
                                                    <button onClick={() => toggleRow(item.pDate)}>
                                                        {expandedRows[item.pDate] ? (
                                                            <BsChevronDown/>
                                                        ) : (
                                                            <BsChevronRight/>
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
                                                    <td>{detail.pDate.substring(0, 7).replace('-','/')}</td>
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
                                                            <BsChevronDown/>
                                                        ) : (
                                                            <BsChevronRight/>
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
