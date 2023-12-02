import styled from "styled-components";
import {BiSearch} from "react-icons/bi";
import {VscCalendar} from "react-icons/vsc";
import {useState} from "react";
import {dateRange} from "../utils/DateRange";

const AdminSalesSearch = ({setApiUrl}) => {
    // State variables to manage user inputs
    const [selectedDateRange, setSelectedDateRange] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [dateDisabled, setDateDisabled] = useState(true);
    // Handle changes in input fields
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "selectedDateRange") {
            if (value === "custom") {
                setDateDisabled(false);
            } else {
                setDateDisabled(true);
            }
            setSelectedDateRange(value);
        } else if (name === "startDate") {
            setStartDate(value);
        } else if (name === "endDate") {
            setEndDate(value);
        } else if (name === "keyword") {
            setKeyword(value);
        }
    };
    // Handle search button
    const handleSearch = () => {
        let url = 'http://127.0.0.1:8000/api/performance-search'
        if (selectedDateRange) {
            if (selectedDateRange.toLowerCase() !== "custom") {
                url += url.includes('?') ? `&date-range=${selectedDateRange}` : `?date-range=${selectedDateRange}`;
            }
        }
        if (startDate) {
            url += url.includes('?') ? `&startDate=${startDate}` : `?startDate=${startDate}`;
        }
        if (endDate) {
            url += url.includes('?') ? `&endDate=${endDate}` : `?endDate=${endDate}`;
        }
        if (keyword) {
            url += url.includes('?') ? `&keyword=${keyword}` : `?keyword=${keyword}`;
        }
        if (!selectedDateRange && !startDate && !endDate && !keyword) {
            setApiUrl('http://127.0.0.1:8000/api/performance');
        }
        setApiUrl(url);
    }

    return (
        <Wrapper>
            <div className="container">
                <select name="selectedDateRange" onChange={handleChange}>
                    <option value="" disabled selected>
                        Date Range
                    </option>
                    {dateRange.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}

                    <option value="custom">Custom Range</option>
                </select>
                <div className="date">
                    <VscCalendar className="calendar-icon"/>
                    <input
                        type="text"
                        name="startDate"
                        placeholder="Date From"
                        disabled={dateDisabled}
                        className={dateDisabled ? "" : "custom-range"}
                        onChange={handleChange}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                    />
                </div>
                <div className="date">
                    <VscCalendar className="calendar-icon"/>
                    <input
                        type="text"
                        name="endDate"
                        placeholder="Date To"
                        disabled={dateDisabled}
                        className={dateDisabled ? "" : "custom-range"}
                        onChange={handleChange}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                    />
                </div>

                <div className="search-container">
                    <BiSearch className="search-icon"/>
                    <input
                        type="search"
                        name="keyword"
                        placeholder="Search ..."
                        onChange={handleChange}
                    />
                </div>
                <button
                    name="submit"
                    className="search-btn"
                    onClick={handleSearch}
                >
                    search
                </button>
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.section`
  display: grid;
  text-align: center;

  h3 {
    color: #ffffff;
    background-color: #1d1e42;
    padding: 1rem;
    margin-top: 2rem;
    text-transform: capitalize;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .container {
    display: flex;
    margin-top: 1rem;
    margin-left: 0;
    padding: 0;
  }

  .container input,
  select {
    color: #858585;
    height: 35px;
    border: 1px solid #9e9e9e;
    border-radius: 0.5rem;
    margin-right: 1rem;
    padding: 0.5rem;
  }

  .search-container {
    display: flex;
    position: relative;
    align-items: center;
  }

  .custom-range,
  select {
    color: #1c1c1c;
    border-color: #858585;
  }

  .search-container input {
    width: 300px;
    padding-left: 2rem;
  }

  .date {
    position: relative;
  }

  .date input {
    padding-left: 2rem;
  }

  .calendar-icon {
    position: absolute;
    color: #aaaaaa;
    margin: 0.25rem;
    font-size: 1.5rem;
  }

  .search-icon {
    position: absolute;
    color: #9e9e9e;
    margin-left: 0.5rem;
    font-size: 1.5rem;
  }

  .search-btn {
    height: 35px;
    color: #ffffff;
    background-color: #426b1f;
    padding: 0 1.5rem;
    border: none;
    border-radius: 0.25rem;
    text-transform: capitalize;
  }

  @media (max-width: 820px) {
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      column-gap: 1rem;
      row-gap: 1rem;
    }

    .search-container {
      grid-column: span 2;
    }

    .search-btn,
    .container input,
    select {
      width: 100%;
      margin-right: 0;
    }
  }

  @media (max-width: 576px) {
    .container {
      display: flex;
      flex-direction: column;
    }
  }
`;
export default AdminSalesSearch;
