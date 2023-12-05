import styled from "styled-components";
import { TopSales, CommissionChart, AdminNav } from "../../components";
import { dateRange } from "../../utils/DateRange";
import {useEffect, useState} from "react";
import axios from "axios";

const Dashboard = () => {

    const [salesperson, setSalesperson] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [selectedSalesperson, setSelectedSalesperson] = useState('');

    // Fetch user list data from the Laravel API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/dashboard-salesperson-list')
            .then((response) => {
                setSalesperson(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Trigger the effect only once on component mount

    // Handle changes in the selected date range
    const handleDateRangeChange = (event) => {
        setSelectedDateRange(event.target.value);
    };

    // Handle changes in the selected salesperson
    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(event.target.value);
    };

  return (
    <Wrapper className="dashboard-container">
      <AdminNav />
      <div className="header">
        <h2>Dashboard</h2>
        <div>
          <select name="date-range" id="date-range" onChange={handleDateRangeChange} value={selectedDateRange}>
            <option value="" disabled selected>
              Date Range
            </option>
            {dateRange.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select name="sales-person" id="sales-person" onChange={handleSalespersonChange} value={selectedSalesperson}>
            <option value="" disabled selected>
              Salesperson
            </option>
              {Object.entries(salesperson).map(([key, value]) => (
                  <option key={key} value={key}>
                      {value}
                  </option>
              ))}
          </select>
        </div>
      </div>
      <div className="chart-container">
        <CommissionChart dateRange={selectedDateRange} salesPerson={selectedSalesperson}/>
        <TopSales dateRange={selectedDateRange}/>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .header {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;

    h2 {
      color: #1f384c;
    }

    select {
      width: 130px;
      height: 40px;
      color: #5a6acf;
      padding-left: 0.5rem;
      margin-right: 0.5rem;
      font-weight: 500;
      background-color: #fbfcfe;
      border: 1px solid #dde4f0;
      border-radius: 0.25rem;
    }
  }
  .chart-container {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    margin-top: 2rem;
  }
  @media (max-width: 576px) {
    h2 {
      font-size: 1.5rem;
    }
    .header select {
      width: 100px;
      height: 40px;
      font-size: 0.75rem;
    }
  }

  @media (max-width: 820px) {
    .chart-container {
      grid-template-columns: 1fr;
    }
  }
`;
export default Dashboard;
