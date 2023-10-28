import { styled } from "styled-components";
import {
  AdminNav,
  FooterSummary,
  Heading,
  SalesSearch,
} from "../../components";
import { Link } from "react-router-dom";
import { payoutColumnMappings } from "../../utils/TableColumnMapping";
import { formatNumber } from "../../utils/FormatNumber";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiNotePencil } from "react-icons/pi";
import { Pagination } from "../../components";

const data = [
  {
    date: "2023/05/01",
    salesID: "#Clover-001",
    salesName: "Ken",
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
    merchantNo: "",
    MerchantName: "",
    type: "commission",
    value: 0,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
  {
    date: "2023/05/01",
    salesID: "#Clover-003",
    salesName: "Ken",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "commission",
    value: 1.53,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
  {
    date: "2023/05/01",
    salesID: "#Clover-004",
    salesName: "Ken",
    merchantNo: "22134353141",
    MerchantName: "sincere gift shop",
    type: "pay out",
    value: 3.53,
    balance: 27.42,
    comment: "commission for Mar, 2023",
  },
];
const SalesPayout = () => {
  // total commission and totalPayout need to calculate
  const totalCommission = 23.42;
  const totalPayout = 312.41;
  return (
    <Wrapper className="dashboard-container">
      <AdminNav />
      <Heading heading="commission payout" />
      <div className="filter">
        <SalesSearch />
        <div className="payout">
          <Link to="/admin/sales_payout/create">
            <button
              className="payout-btn "
              onClick={() => {
                window.alert("function haven't implement");
              }}
            >
              + pay out
            </button>
          </Link>
        </div>
      </div>

      <div className="data-table">
        <table className="table striped table-hover">
          <thead>
            <tr className="vertical-center">
              {Object.keys(payoutColumnMappings).map((column) => (
                <th key={column}>{payoutColumnMappings[column]}</th>
              ))}
              <td>action</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
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
                      color:
                        item.type.toLowerCase() === "pay out" ? "#A30D11" : "",
                    }}
                  >
                    {item.value
                      ? item.type.toLowerCase() === "pay out"
                        ? "-" + formatNumber(item.value)
                        : formatNumber(item.value)
                      : "$ --"}
                  </td>
                  <td
                    style={{
                      color:
                        item.type.toLowerCase() === "pay out" ? "#A30D11" : "",
                    }}
                  >
                    {item.balance ? formatNumber(item.balance) : "$ --"}{" "}
                  </td>{" "}
                  <td>{item.comment} </td>
                  <td className="display">
                    <button className="updateBtn">
                      <Link
                        className="action"
                        to={`/admin/sales_payout/update/${item.salesID.substring(
                          1,
                          item.salesID.length
                        )}`}
                      >
                        {" "}
                        <PiNotePencil />
                      </Link>
                    </button>
                    {/* delete function need to implement */}
                    <button
                      className="deleteBtn"
                      onClick={() =>
                        window.alert("Function haven't implement yet")
                      }
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
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

      <Pagination data={data} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .filter {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
  }
  .data-table {
    width: 100%;
    margin-bottom: 0;
  }
  table {
    margin-bottom: 0;
  }
  .payout-btn {
    color: #ffffff;
    height: 35px;
    padding: 0 1rem;
    text-transform: capitalize;
    background-color: #624de3;
    border: 1px solid #624de3;
    border-radius: 0.25rem;
  }

  @media (max-width: 820px) {
    .filter {
      display: grid;
      justify-content: inherit;
    }
    .payout {
      display: flex;
      justify-content: flex-end;
      grid-row: 1;
      margin: 0.75rem 0;
    }
    .payout-btn {
      width: 120px;
      justify-self: end;
    }
    tr {
      height: 180px;
    }
  }

  @media (max-width: 576px) {
    .display {
      display: block;
    }
  }
`;

export default SalesPayout;
