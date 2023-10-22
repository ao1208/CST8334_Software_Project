import styled from "styled-components";
import {
  SalesNav,
  SalesSearch,
  SalesTable,
  Pagination,
} from "../../components";
import { sales_payout_data } from "../../utils/TestData";
import { payoutColumnMappings } from "../../utils/TableColumnMapping";

const SalesCommission = () => {
  // I am using test data for demo, real data need to import

  // totalCommission and totalPayout need to calculate
  const totalCommission = 70.1;
  const totalPayout = 50.02;

  return (
    <Wrapper className="dashboard-container">
      <SalesNav />
      <SalesSearch heading="Commission Payout" />
      <SalesTable
        columnMappings={payoutColumnMappings}
        data={sales_payout_data}
      />
      <div className="total">
        <div>
          <p className="holder"></p>
          <p>
            Commission_Subtotal <span>$ {totalCommission}</span>
          </p>
        </div>
        <div>
          <p className="holder"></p>
          <p>
            Payout_Subtotal <span>- $ {totalPayout}</span>
          </p>
        </div>
      </div>
      <Pagination data={sales_payout_data} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3 {
    color: #ffffff;
    background-color: #1d1e42;
    padding: 1rem;
    margin-top: 2rem;
    text-transform: capitalize;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .total {
    color: #000000;
    background-color: #fafaf5;
    border: 1px solid #f0f0ec;
  }

  .total div {
    display: grid;
    grid-template-columns: auto auto;
    border: 1px solid #f0f0ec;
  }

  .total p {
    font-size: 1rem;
    margin: 1rem 5rem;
    text-align: left;
  }

  .total span {
    margin-left: 1rem;
  }

  .search-container {
    display: flex;
    gap: 1rem;
  }

  @media (max-width: 576px) {
    .holder {
      display: none;
    }

    .total p {
      font-size: 0.75rem;
      margin: 0.75rem;
    }
  }
`;
export default SalesCommission;
