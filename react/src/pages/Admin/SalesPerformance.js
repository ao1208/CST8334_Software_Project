import { styled } from "styled-components";
import { Heading, SalesSearch, Pagination, AdminNav } from "../../components";
import { salesPerformanceTableHeader } from "../../utils/TableColumnMapping";
import { Link } from "react-router-dom";
const data = [
  {
    pDate: "2023/05",
    salesId: "#Clover-001",
    salesName: "Michael",
    commissionPercent: "50%",
    merchantNo: "21314525",
    merchantName: "Goopter",
    visaGross: 9026.61,
    visaTXN: 23.23,
    masterGross: 0,
    masterTXN: 0,
    commission: 21.23,
  },
  {
    pDate: "2023/05",
    salesId: "#Clover-001",
    salesName: "Michael",
    commissionPercent: "50%",
    merchantNo: "21314525",
    merchantName: "Goopter",
    visaGross: 9026.61,
    visaTXN: 23.23,
    masterGross: 7729.34,
    masterTXN: 12.34,
    commission: 21.23,
  },
  ,
  {
    pDate: "2023/05",
    salesId: "#Clover-001",
    salesName: "Michael",
    commissionPercent: "50%",
    merchantNo: "21314525",
    merchantName: "Goopter",
    visaGross: 9026.61,
    visaTXN: 23.23,
    masterGross: 7729.34,
    masterTXN: 12.34,
    commission: 21.23,
  },
  ,
  {
    pDate: "2023/05",
    salesId: "#Clover-001",
    salesName: "Michael",
    commissionPercent: "50%",
    merchantNo: "21314525",
    merchantName: "Goopter",
    visaGross: 9026.61,
    visaTXN: 23.23,
    masterGross: 7729.34,
    masterTXN: 12.34,
    commission: 21.23,
  },
];
const SalesPerformance = () => {
  return (
    <Wrapper className="dashboard-container">
      <AdminNav />
      <Heading heading="sales performance" />
      <div className="filter">
        <SalesSearch />
        <div className="report">
          <Link to="/admin/sales_performance_report">
            <button
              className="report-btn"
              onClick={() => {
                window.alert("function haven't implement");
              }}
            >
              report
            </button>
          </Link>
        </div>
      </div>

      <div className="data-table">
        <table className="table striped table-hover">
          <thead>
            <tr style={{ borderStyle: "none !important" }}>
              {salesPerformanceTableHeader.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.pDate} </td>
                  <td>{item.salesId}</td>
                  <td>{item.salesName} </td>
                  <td>{item.commissionPercent} </td>
                  <td>{item.merchantNo} </td>
                  <td>{item.merchantName} </td>
                  <td>$ {item.visaGross ? item.visaGross : "--"}</td>
                  <td>$ {item.visaTXN ? item.visaTXN : "--"}</td>
                  <td>$ {item.masterGross ? item.masterGross : "--"}</td>
                  <td>$ {item.masterTXN ? item.masterTXN : "--"}</td>
                  <td>$ {item.commission ? item.commission : "--"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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

  .report-btn {
    color: #ffffff;
    height: 35px;
    padding: 0 1rem;
    text-transform: capitalize;
    background-color: #426b1f;
    border: 1px solid #426b1f;
    border-radius: 0.25rem;
  }

  @media (max-width: 820px) {
    .filter {
      display: grid;
      justify-content: inherit;
    }
    .report {
      display: flex;
      justify-content: flex-end;
      grid-row: 1;
      margin: 0.75rem 0;
    }
    .report-btn {
      width: 120px;
      justify-self: end;
    }

    tr {
      height: 180px;
    }
  }
`;
export default SalesPerformance;
