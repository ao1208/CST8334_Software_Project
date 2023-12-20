import { styled } from "styled-components";
import {
    Heading,
    MerchantSearchContainer,
    Pagination,
    AdminNav,
} from "../../components";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiNotePencil } from "react-icons/pi";
import { Link } from "react-router-dom";
import { userMappingTableHeader } from "../../utils/TableColumnMapping";
import {useEffect, useState} from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/apiConfig";

const MappingManagement = () => {

    const [mappingData, setMappingData] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [apiUrl, setApiUrl] = useState(`${API_BASE_URL}/merchant`);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(apiUrl);
                setMappingData(response.data);
                if (response.data.length === 0) {
                    alert('No records found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchRecords();
        if (deleted) {
            fetchRecords();
            setDeleted(false);
        }
    },[deleted,apiUrl]);


    const handleDelete = async (merchantId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');

        if (confirmDelete) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/merchant/${merchantId}`);
                if (response.status === 200) {
                    console.log('Record deleted successfully');
                    setDeleted(true);
                }
            } catch (error) {
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 500 && error.response.data && error.response.data.message && error.response.data.message.includes('Integrity constraint violation')) {
                        window.alert('Cannot delete this record as it is being used in payout.');
                    } else if (statusCode === 500) {
                        window.alert('Server error occurred. Please try again later.');
                    } else if (statusCode === 400 || statusCode === 404) {
                        window.alert('Client error occurred. Please check your request.');
                    }
                } else {
                    console.error('Error deleting Merchant', error);
                    window.alert('An error occurred while deleting the record. Please try again.');
                }
            }
        }
    };
    return (
        <Wrapper className="dashboard-container">
            <AdminNav />
            <Heading heading="salesperson and merchant mapping management" />
            <MerchantSearchContainer
                setApiUrl={setApiUrl}
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
