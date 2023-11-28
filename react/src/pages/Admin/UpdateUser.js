import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from 'axios';
import FormRow from "../../components/FormRow";
import {styled} from "styled-components";

const initialUser = {
    id: "",
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
    created_at: "",
    updated_at: ""
};

const UpdateUser = () => {

    const {userId} = useParams();
    const [currentUser, setCurrentUser] = useState(initialUser);

    useEffect(() => {
        // Fetch user data from the Laravel API
        axios.get(`http://127.0.0.1:8000/api/user/${userId}`)
            .then(response => {
                setCurrentUser(response.data); // Set the user data in state
            })
            .catch((error) => {
                console.error("Error fetching user data: ", error);
            });
    }, [userId]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCurrentUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentUser),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.  Status: ${response.status}');
            }
            const data = await response.json();
            console.log('Success:', data);

            window.location = "/admin/user_management";

        } catch (error) {
            console.error('Error:', error);
            window.alert(error);
        }

    };

    // function need to implement
    const handleFileUpload = (e) => {
        const file = e.target.files[0]; //
        if (file) {
            console.log("Selected file:", file);
        }
    };

    return (
        <Wrapper className="dashboard-container">
            <h1>User Management - Update</h1>

            <form onSubmit={handleSubmit}>
                {/*<form action="http://127.0.0.1:8000/api/user" className="form" method='POST'>*/}
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
                        disabled
                    />
                    <button
                        className="verifyBtn"
                        style={{backgroundColor: currentUser ? "#9E9E9E" : ""}}
                        disabled={!!currentUser}
                        onClick={() => window.alert("Function need to implement")}
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
                    value={currentUser ? currentUser.role : null}
                    onChange={handleChange}
                />
                <div className="btn-container">
                    <Link to="/admin/user_management">
                        <button className="cancelBtn">cancel</button>
                    </Link>

                    {/* save function need to implement */}
                    <button
                        className="saveBtn"
                        // onClick={() =>
                        //     // window.alert("Function need to implement")
                        // }
                    >
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

export default UpdateUser;
