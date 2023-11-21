import {styled} from "styled-components";
import {
    Heading,
    AdminSearchContainer,
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

    useEffect(() => {
        // Fetch user data from the Laravel API
        axios.get('http://127.0.0.1:8000/api/user')
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [userData]);

    const handleDelete = async (salesId) => {
        // Confirm with the user before proceeding with the delete
        const shouldDelete = window.confirm("Are you sure you want to delete this user?");

        if (!shouldDelete) {
            return;
        }

        try {
            // Send a DELETE request to the server
            const response = await fetch(`http://127.0.0.1:8000/api/user/${salesId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Optionally update the UI or trigger a reload of user data
                console.log('User deleted successfully');
            } else {
                const errorData = await response.json();
                console.error(`Error deleting user: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Wrapper className="dashboard-container">
            <AdminNav/>
            <Heading heading="User Lists"/>
            <AdminSearchContainer
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
