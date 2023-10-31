import styled from "styled-components";
import { formatNumber } from "../utils/FormatNumber";
const FooterSummary = ({ totalCommission, totalPayout }) => {
  return (
    <Wrapper>
      <div className="total">
        <div>
          <p className="holder"></p>
          <p>
            Commission_Subtotal <span> {formatNumber(totalCommission)}</span>
          </p>
        </div>
        <div>
          <p className="holder"></p>
          <p>
            Payout_Subtotal <span>- {formatNumber(totalPayout)}</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .total {
    color: #000000;
    background-color: #fafaf5;
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
export default FooterSummary;
