import { styled } from "styled-components";
import {
  Heading,
  AdminSearchContainer,
  Pagination,
  AdminNav,
} from "../../components";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiNotePencil } from "react-icons/pi";
import { Link } from "react-router-dom";
import { userMappingTableHeader } from "../../utils/TableColumnMapping";

// below data for demo purpose
const mappingData = [
  {
    salesId: "#Clover-001",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "1/24/2023",
    status: "O",
  },
  {
    salesId: "#Clover-002",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "21/24/2023",
    status: "P",
  },
  {
    salesId: "#Clover-003",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "21/24/2023",
    status: "O",
  },
  {
    salesId: "#Clover-004",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "21/24/2023",
    status: "O",
  },
  {
    salesId: "#Clover-005",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "21/24/2023",
    status: "P",
  },
  {
    salesId: "#Clover-006",
    salesName: "Michael",
    commission: "50%",
    merchantNo: "22535747431",
    SCPNo: "356456",
    merchantName: "Goopter",
    dateOpen: "1/24/2023",
    status: "O",
  },
];

const MappingManagement = () => {
  return (
    <Wrapper className="dashboard-container">
      <AdminNav />
      <Heading heading="salesperson and merchant mapping management" />
      <AdminSearchContainer
        link="/admin/mapping_management/create"
        text="Add"
      />

      <div>
        <table className="table striped table-hover">
          <thead>
            <tr style={{ borderStyle: "none !important" }}>
              {userMappingTableHeader.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {mappingData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.salesId} </td>
                  <td className="display">{item.salesName}</td>
                  <td>{item.commission} </td>
                  <td>{item.merchantNo} </td>
                  <td>{item.SCPNo} </td>
                  <td>{item.merchantName} </td>
                  <td>{item.dateOpen} </td>
                  <td>
                    <span
                      className="status"
                      data-status={item.status}
                      style={{
                        color: item.status === "P" ? "#A30D11" : "",
                        backgroundColor: item.status === "P" ? "#FBE7E8" : "",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="display">
                    <button className="updateBtn">
                      <Link
                        to={`/admin/mapping_management/update/${item.salesId.substring(
                          1,
                          item.salesId.length
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

      <Pagination data={mappingData} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .status {
    display: inline-flex;
    width: 32px;
    height: 32px;
    padding: 0;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  @media (max-width: 576px) {
    .display {
      display: block;
    }

    .status {
      width: 25px;
      height: 25px;
    }
  }
`;
export default MappingManagement;
