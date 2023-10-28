import styled from "styled-components";
import { SalesNav, SalesSearch, Pagination, Heading } from "../../components";
import { formatNumber } from "../../utils/FormatNumber";
import { performanceColumnMappings } from "../../utils/TableColumnMapping";

// I am using test data for demo, real data need to import
const data = [
  {
    pDate: "2023/02",
    salesID: "#Clover-003",
    salesName: "Ken",
    commission: "50%",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    visaCommission: 1.43,
    masterCommission: 0,
    totalCommission: 1.43,
  },
  {
    pDate: "2023/02",
    salesID: "#Clover-003",
    salesName: "Ken",
    commission: "50%",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    visaCommission: 1.43,
    masterCommission: 0,
    totalCommission: 1.43,
  },
  {
    pDate: "2023/02",
    salesID: "#Clover-003",
    salesName: "Ken",
    commission: "50%",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    visaCommission: 0,
    masterCommission: 0.42,
    totalCommission: 1.43,
  },
  {
    pDate: "2023/02",
    salesID: "#Clover-003",
    salesName: "Ken",
    commission: "50%",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    visaCommission: 0,
    masterCommission: 0.42,
    totalCommission: 1.43,
  },
];
const SalesPerformance = () => {
  return (
    <Wrapper className="dashboard-container">
      <SalesNav />
      <Heading heading="sales performance" />
      <SalesSearch />
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

      <div className="data-table">
        <table className="table striped table-hover">
          <thead>
            <tr className="vertical-center">
              {Object.keys(performanceColumnMappings).map((column) => (
                <th key={column}>{performanceColumnMappings[column]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr key={index} className="vertical-center">
                {Object.keys(record).map((column) => {
                  return (
                    <td key={column}>
                      {record[column] ? formatNumber(record[column]) : "$ --"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination data={data} />
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
    margin-top: 1rem;
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
