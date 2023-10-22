import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { VscCalendar } from "react-icons/vsc";
import { useState } from "react";

const SalesSearch = ({ heading }) => {
  const [selectPeriod, setSelectPeriod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  // filter and search function need to implement
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // Update the state based on the input field's name
    if (name === "selectPeriod") {
      setSelectPeriod(value);
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    } else if (name === "search") {
      setSearch(value);
    }
  };
  return (
    <Wrapper>
      <h3>{heading}</h3>
      <div className="container">
        <select name="selectPeriod" onChange={handleChange}>
          <option value="This Month">This Month</option>
          <option value="Last Three Months">Last Three Months</option>
          <option value="Last Half Year">Last Half Year</option>
          <option value="This Year">This Year</option>
          <option value="This Year">Last Year</option>
        </select>
        <div className="date">
          <VscCalendar className="calendar-icon" />
          <input
            type="text"
            name="startDate"
            placeholder="Date From"
            onChange={handleChange}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <div className="date">
          <VscCalendar className="calendar-icon" />
          <input
            type="text"
            name="endDate"
            placeholder="Date To"
            onChange={handleChange}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>

        <div className="search-container">
          <BiSearch className="search-icon" />
          <input
            type="search"
            name="search"
            placeholder="Search ..."
            onChange={handleChange}
          />
        </div>
        <button name="submit" className="search-btn">
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
    color: #9e9e9e;
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
      row-gap: 1rem;
    }

    .search-btn,
    .container input,
    select {
      width: 100%;
      margin-right: 0;
    }
  }
`;
export default SalesSearch;
