import styled from "styled-components";
import {
  SalesNav,
  SalesSearch,
  SalesTable,
  Pagination,
} from "../../components";
import { sales_performance_data } from "../../utils/TestData";
import { performanceColumnMappings } from "../../utils/TableColumnMapping";
const SalesPerformance = () => {
  // I am using test data for demo, real data need to import
  return (
    <Wrapper className="dashboard-container">
      <SalesNav />
      <SalesSearch heading="sales performance" />
      <div className="heading">
        {" "}
        <div>
          <h5>account balance</h5>{" "}
          <p>
            $ <span>20.10</span>{" "}
          </p>
        </div>
        <div>
          <h5>commission</h5>{" "}
          <p>
            $ <span>70.10</span>
          </p>
        </div>
        <div>
          <h5>payout</h5>{" "}
          <p className="payout">
            -$ <span>50.00</span>
          </p>
        </div>
      </div>
      <SalesTable
        columnMappings={performanceColumnMappings}
        data={sales_performance_data}
      />
      <Pagination data={sales_performance_data} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .heading {
    display: flex;
    color: #000000;
    justify-content: space-evenly;
    align-items: center;
    padding: 1.5rem 0 1rem 0;
    margin: 1rem 0;
    background-color: #f6f6f6;
    border: 2px solid #e6e6e6;
  }

  .heading h5 {
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .heading p {
    font-size: 1.25rem;
    font-style: italic;
    text-align: center;
  }

  .heading span {
    text-decoration: underline;
  }
  .payout {
    color: #ff0000;
  }

  @media (max-width: 820px) {
    .heading h5,
    .heading p {
      font-size: 1rem;
    }
  }

  @media (max-width: 576px) {
    .heading h5,
    .heading p {
      font-size: 0.75rem;
    }
  }
`;
export default SalesPerformance;
