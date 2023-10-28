import { styled } from "styled-components";
import {
  Heading,
  AdminSearchContainer,
  Pagination,
  AdminNav,
} from "../../components";
import { userListTableHeader } from "../../utils/TableColumnMapping";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiNotePencil } from "react-icons/pi";
import { Link } from "react-router-dom";

// below data for demo only
const userData = [
  {
    id: "#Clover-001",
    image: "/favicon.ico",
    name: "Michael",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: "Burnaby,BC V5J 4K2",
    hireDate: "01/01/2015",
    status: "1:enable",
    role: "salesperson",
  },
  {
    id: "#Clover-002",
    image: "/favicon.ico",
    name: "Michael",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: "Burnaby,BC V5J 4K2",
    hireDate: "01/01/2015",
    status: "2:disable",
    role: "salesperson",
  },
  {
    id: "#Clover-003",
    image: "/favicon.ico",
    name: "Michael",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: "Burnaby,BC V5J 4K2",
    hireDate: "01/01/2015",
    status: "2:disable",
    role: "administrator",
  },
  {
    id: "#Clover-004",
    image: "/favicon.ico",
    name: "Michael",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: "Burnaby,BC V5J 4K2",
    hireDate: "01/01/2015",
    status: "2:disable",
    role: "administrator",
  },
  {
    id: "#Clover-005",
    image: "/favicon.ico",
    name: "Michael",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: "Burnaby,BC V5J 4K2",
    hireDate: "01/01/2015",
    status: "2:disable",
    role: "salesperson",
  },
  {
    id: "#Clover-006",
    image: "/favicon.ico",
    name: "Michael",
    email: "m@goopter.com",
    phone: "000-111-2222",
    address: "Burnaby,BC V5J 4K2",
    hireDate: "01/01/2015",
    status: "1:enable",
    role: "salesperson",
  },
];
const UserManagement = () => {
  return (
    <Wrapper className="dashboard-container">
      <AdminNav />
      <Heading heading="User Lists" />
      <AdminSearchContainer
        link="/admin/user_management/create_user"
        text="New User"
      />
      <div>
        <table className="table striped table-hover">
          <thead>
            <tr
              className="center-cell"
              style={{ borderStyle: "none !important" }}
            >
              {userListTableHeader.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {userData.map((user, index) => {
              return (
                <tr key={index} className="center-cell">
                  <td>{user.id} </td>
                  <td className="display">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="user-img"
                    />{" "}
                    {user.name}
                  </td>
                  <td>{user.email} </td>
                  <td>{user.phone} </td>
                  <td>{user.address} </td>
                  <td>{user.hireDate} </td>
                  <td>{user.status} </td>
                  <td>
                    <span
                      className="role"
                      data-status={user.role}
                      style={{
                        color:
                          user.role.toLowerCase() === "administrator"
                            ? "#A30D11"
                            : "",
                        backgroundColor:
                          user.role.toLowerCase() === "administrator"
                            ? "#FBE7E8"
                            : "",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="display">
                    <button className="updateBtn">
                      <Link
                        to={`/admin/user_management/update_user/${user.id.substring(
                          1,
                          user.id.length
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

      <Pagination data={userData} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @media (max-width: 576px) {
    .display {
      display: block;
    }
  }
`;
export default UserManagement;
