import {
  SalesNav,
  SalesSearch,
  Pagination,
  FooterSummary,
  Heading,
} from "../../components";
import { styled } from "styled-components";
import { payoutColumnMappings } from "../../utils/TableColumnMapping";
import { formatNumber } from "../../utils/FormatNumber";

const sales_payout_data = [
  {
    date: "2023/05/01",
    salesID: "#Clover-001",
    salesName: "Michael",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "commission",
    value: 1.53,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
  {
    date: "2023/05/01",
    salesID: "#Clover-002",
    salesName: "Ken",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "payout",
    value: 34.2,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
  {
    date: "2023/05/01",
    salesID: "#Clover-003",
    salesName: "Sara",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "commission",
    value: 1.53,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
];
const SalesCommission = () => {
  // total commission and totalPayout need to calculate
  const totalCommission = 23.42;
  const totalPayout = 312.41;

  return (
    <Wrapper className="dashboard-container">
      <SalesNav />
      <Heading heading="Commission Payout" />
      <SalesSearch />
      <div className="data-table">
        <table className="table striped table-hover">
          <thead>
            <tr className="vertical-center">
              {Object.keys(payoutColumnMappings).map((column) => (
                <th key={column}>{payoutColumnMappings[column]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales_payout_data.map((item, index) => {
              return (
                <tr key={index} className="vertical-center">
                  <td>{item.date} </td>
                  <td>{item.salesID} </td>
                  <td>{item.salesName} </td>
                  <td>{item.merchantNo ? item.merchantNo : "--"} </td>
                  <td>{item.MerchantName ? item.MerchantName : "--"} </td>
                  <td>{item.type} </td>
                  <td
                    style={{
                      color: item.type === "payout" ? "#A30D11" : "",
                    }}
                  >
                    {item.value
                      ? item.type.toLowerCase() === "payout"
                        ? "-" + formatNumber(item.value)
                        : formatNumber(item.value)
                      : "$ --"}
                  </td>
                  <td
                    style={{
                      color:
                        item.type.toLowerCase() === "payout" ? "#A30D11" : "",
                    }}
                  >
                    {item.balance ? formatNumber(item.balance) : "$ --"}{" "}
                  </td>{" "}
                  <td>{item.comment} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FooterSummary
        totalCommission={totalCommission}
        totalPayout={totalPayout}
      />
      <Pagination data={sales_payout_data} />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  table {
    margin-bottom: 0;
  }
`;
export default SalesCommission;
