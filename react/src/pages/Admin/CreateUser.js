import {useState} from "react";
import FormRow from "../../components/FormRow";
import {Link} from "react-router-dom";
import {styled} from "styled-components";
import axios from "axios";

const initialUser = {
    sales_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_street: "",
    address_city: "",
    address_province: "",
    address_country: "",
    address_postal_code: "",
    hire_date: "",
    status: "",
    role: "",
};

const CreateUser = () => {

    const [currentUser, setCurrentUser] = useState(initialUser);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCurrentUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
    // TODO: function need to implement
    const handleFileUpload = (e) => {
        const file = e.target.files[0]; //
        if (file) {
            console.log("Selected file:", file);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/user',
                currentUser, // pass the data directly
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Check if the response status is in the range 200-299
            if (response.status >= 200 && response.status < 300) {
                console.log('Success:', response.data);
                // Redirect after successful save
                window.location = '/admin/user_management';
            } else {
                // Handle non-successful response
                throw new Error(`Server responded with status ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                // The request was made and the server responded with a non-2xx status code
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received. Request details:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
            }
            window.alert(error.message);
        }
    };

    return (
        <Wrapper className="dashboard-container">
            <h1>User Management - Create</h1>
                <form onSubmit={handleSubmit}>
                {/*<div className="img-container">*/}
                {/*  {user ? (*/}
                {/*    <img src={currentUser.image} alt="user-profile" className="img" />*/}
                {/*  ) : (*/}
                {/*    <FormRow*/}
                {/*      type="file"*/}
                {/*      labelName="Profile"*/}
                {/*      name="image"*/}
                {/*      value={currentUser.image}*/}
                {/*      onChange={handleFileUpload}*/}
                {/*    />*/}
                {/*  )}*/}
                {/*</div>*/}
                <div className="id-container">
                    {" "}
                    <FormRow
                        labelName="sales ID"
                        name="sales_id"
                        value={currentUser ? currentUser.sales_id : null}
                        onChange={handleChange}
                    />
                    <button
                        className="verifyBtn"
                        style={{backgroundColor: currentUser ? "#624DE3" : "#9E9E9E"}}
                        disabled={!!currentUser}
                        onClick={() =>
                            window.alert("Function need to implement")
                        }
                    >
                        verify ID
                    </button>
                </div>

                <FormRow
                    labelName="first name"
                    name="first_name"
                    value={currentUser ? currentUser.first_name : null}
                    onChange={handleChange}
                />
                <FormRow
                    labelName="last name"
                    name="last_name"
                    value={currentUser ? currentUser.last_name : null}
                    onChange={handleChange}
                />

                <FormRow
                    labelName="email"
                    name="email"
                    value={currentUser ? currentUser.email : null}
                    onChange={handleChange}
                />
                <FormRow
                    labelName="phone"
                    name="phone"
                    value={currentUser ? currentUser.phone : null}
                    onChange={handleChange}
                />
                <div className="address-group">
                    <FormRow
                        labelName="address"
                        name="address_street"
                        placeholder="street"
                        value={currentUser ? currentUser.address_street : null}
                        onChange={handleChange}
                    />
                    <FormRow
                        name="address_city"
                        placeholder="city"
                        value={currentUser ? currentUser.address_city : null}
                        onChange={handleChange}
                    />
                    <FormRow
                        name="address_province"
                        placeholder="province"
                        value={currentUser ? currentUser.address_province : null}
                        onChange={handleChange}
                    />
                    <FormRow
                        name="address_country"
                        placeholder="country"
                        value={currentUser ? currentUser.address_country : null}
                        onChange={handleChange}
                    />
                    <FormRow
                        name="address_postal_code"
                        placeholder="postal code"
                        value={currentUser ? currentUser.address_postal_code : null}
                        onChange={handleChange}
                    />
                </div>
                <FormRow
                    type="date"
                    labelName="hire date"
                    name="hire_date"
                    value={currentUser ? currentUser.hire_date : null}
                    onChange={handleChange}
                />
                <FormRow
                    type="select"
                    labelName="status"
                    name="status"
                    value={currentUser ? currentUser.status : null}
                    onChange={handleChange}
                />
                <FormRow
                    type="radio"
                    name="role"
                    value={currentUser ? currentUser.role : 2}
                    onChange={handleChange}
                />
                <div className="btn-container">
                    <Link to="/admin/user_management">
                        <button className="cancelBtn">cancel</button>
                    </Link>
                    <button className="saveBtn">
                        save
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    position: relative;

    .img-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-row: 1;
        grid-column: 2;
    }

    .img {
        width: 100px;
        height: 100px;
        justify-self: end;
        border-radius: 0.5rem;
    }

    h1 {
        color: #000000;
        text-transform: capitalize;
        margin: 1.5rem 0;
    }

    .form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 5em;
        row-gap: 1rem;
        margin: 3rem;
    }

    .id-container {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: end;
        grid-row: 1;
        grid-column: 1;
    }

    .verifyBtn {
        width: 100px;
        height: 40px;
        color: #ffffff;
        font-size: 1.25rem;
        margin-left: 1rem;
        text-transform: capitalize;
        border: 1px solid transparent;
        border-radius: 0.5rem;
        background-color: #624de3;
    }

    .address-group {
        display: flex;
        min-width: 100%;
        align-items: flex-end;
        gap: 1rem;
        grid-column: span 2;
    }

    .address-group > * {
        flex: 1;
    }

    .address-group input[type="search"] {
        width: 100% !important;
    }

    @media (max-width: 820px) {
        .form {
            column-gap: 2rem;
            row-gap: 0.75rem;
        }
    }
    @media (max-width: 576px) {
        .form {
            display: flex;
            flex-direction: column;
            margin: 1rem;
            column-gap: 0;
            row-gap: 0.75rem;
        }

        .img {
            grid-row: 1;
            justify-self: start;
        }

        .verifyBtn {
            width: 80px;
            height: 40px;
            font-size: 1rem;
        }

        .address-group {
            flex-direction: column;
            align-items: initial;
        }
    }
`;

export default CreateUser;
