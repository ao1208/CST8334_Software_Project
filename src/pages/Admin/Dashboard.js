import styled from "styled-components";
import { TopSales, CommissionChart, AdminNav } from "../../components";
import { dateRange } from "../../utils/DateRange";

const Dashboard = () => {
  // below salesPerson for demo purpose, need to replace with the actual data.
  const salesPerson = ["Dave", "Linda", "Jenny", "Julie"];
  return (
    <Wrapper className="dashboard-container">
      <AdminNav />
      <div className="header">
        <h2>Dashboard</h2>
        <div>
          <select name="date-range" id="date-range">
            <option value="" disabled selected>
              Date Range
            </option>
            {dateRange.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select name="sales-person" id="sales-person">
            <option value="" disabled selected>
              Salesperson
            </option>
            {salesPerson.map((person) => {
              return (
                <option key={person} value={person}>
                  {person}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="chart-container">
        <CommissionChart />
        <TopSales />
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
