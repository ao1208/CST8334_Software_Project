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
import {useEffect, useState} from "react";
import axios from "axios";

const MappingManagement = () => {

    const [mappingData, setMappingData] = useState([]);

    useEffect(() => {
        // Fetch merchant data from the Laravel API
        axios.get('http://127.0.0.1:8000/api/merchant')
            .then((response) => {
                setMappingData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching merchant data:', error);
            });
    }, [mappingData]);

    const handleDelete = async (merchantId) => {
        // Confirm with the user before proceeding with the delete
        const shouldDelete = window.confirm("Are you sure you want to delete this merchant?");

        if (!shouldDelete) {
            return;
        }

        try {
            // Send a DELETE request to the server
            const response = await fetch(`http://127.0.0.1:8000/api/merchant/${merchantId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Optionally update the UI or trigger a reload of user data
                console.log('Merchant deleted successfully');
            } else {
                const errorData = await response.json();
                console.error(`Error deleting merchant: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error deleting merchant:', error);
        }
    };

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
                  <td>{item.merchant_id} </td>
                  <td>{item.SCP_number} </td>
                  <td>{item.DBA_name} </td>
                  <td>{item.sales_id} </td>
                  <td className="display">{item.first_name + ' ' + item.last_name}</td>
                  <td>{item.commission_percentage * 100} </td>
                  <td>{item.date_open} </td>
                  <td>
                    <span
                      className="status"
                      data-status={item.account_status}
                      style={{
                        color: item.account_status === "P" ? "#A30D11" : "",
                        backgroundColor: item.account_status === "P" ? "#FBE7E8" : "",
                      }}
                    >
                      {item.account_status}
                    </span>
                  </td>
                  <td className="display">
                    <button className="updateBtn">
                      <Link
                        to={`/admin/mapping_management/update/${item.merchant_id}`}
                      >
                        {" "}
                        <PiNotePencil />
                      </Link>
                    </button>
                    {/* delete function need to implement */}
                    <button
                      className="deleteBtn"
                      onClick={() =>
                        // window.alert("Function haven't implement yet")
                        handleDelete(item.merchant_id)
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
