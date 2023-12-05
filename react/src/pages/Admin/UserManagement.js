import {styled} from "styled-components";
import {
    Heading,
    UserSearchContainer,
    Pagination,
    AdminNav,
} from "../../components";
import {userListTableHeader} from "../../utils/TableColumnMapping";
import {RiDeleteBinLine} from "react-icons/ri";
import {PiNotePencil} from "react-icons/pi";
import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UserManagement = () => {

    const [userData, setUserData] = useState([]);
    const [apiUrl, setApiUrl] = useState('http://127.0.0.1:8000/api/user');

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(apiUrl);
                setUserData(response.data);
                if (response.data.length === 0) {
                    alert('No records found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchRecords();
    },[apiUrl]);

    const handleDelete = async (salesId) => {
        // Confirm with the user before proceeding with the delete
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/user/${salesId}`);
                if (response.status === 200) {
                    console.log('Record deleted successfully');
                }
            } catch (error) {
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 500 && error.response.data && error.response.data.message && error.response.data.message.includes('Integrity constraint violation')) {
                        window.alert('Cannot delete this user as it is being used in referenced merchant mapping table.');
                    } else if (statusCode === 500) {
                        window.alert('Server error occurred. Please try again later.');
                    } else if (statusCode === 400 || statusCode === 404) {
                        window.alert('Client error occurred. Please check your request.');
                    }
                } else {
                    console.error('Error deleting user', error);
                    window.alert('An error occurred while deleting the record. Please try again.');
                }
            }
        }
    };

    return (
        <Wrapper className="dashboard-container">
            <AdminNav/>
            <Heading heading="User Lists"/>
            <UserSearchContainer
                setApiUrl={setApiUrl}
                link="/admin/user_management/create_user"
                text="New User"
            />
            <div>
                <table className="table striped table-hover">
                    <thead>
                    <tr
                        className="center-cell"
                        style={{borderStyle: "none !important"}}
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
                                <td>{user.sales_id} </td>
                                <td className="display">
                                    {/*<img*/}
                                    {/*  src={user.image}*/}
                                    {/*  alt={user.name}*/}
                                    {/*  className="user-img"*/}
                                    {/*/>{" "}*/}
                                    {user.first_name + ' ' + user.last_name}
                                </td>
                                <td>{user.email} </td>
                                <td>{user.phone} </td>
                                <td>{user.address_street + ', ' + user.address_city + ', ' + user.address_province} </td>
                                <td>{user.hire_date} </td>
                                <td>
                                    {user.status === 1 ? (
                                    'Enable'
                                ) : (
                                    'Disable'
                                )}
                                </td>
                                <td>
                    <span
                        className="role"
                        data-status={user.role}
                        style={{
                            color:
                                user.role == 1
                                    ? "#A30D11"
                                    : "",
                            backgroundColor:
                                user.role == 1
                                    ? "#FBE7E8"
                                    : "",
                        }}

                    >
                        {user.role == 1 ? (
                            'Admin'
                        ) : (
                            'Sales'
                        )}
                    </span>
                                </td>
                                <td className="display">
                                    <button className="updateBtn">
                                        <Link
                                            to={`/admin/user_management/update_user/${user.sales_id}`}
                                        >
                                            {" "}
                                            <PiNotePencil/>
                                        </Link>
                                    </button>
                                    {/* delete function need to implement */}
                                    <button
                                        className="deleteBtn"
                                        onClick={() =>
                                            // window.alert("Function haven't implement yet")
                                            handleDelete(user.sales_id)
                                        }
                                    >
                                        <RiDeleteBinLine/>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <Pagination data={userData}/>
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
