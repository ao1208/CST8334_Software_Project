import { styled } from "styled-components";
import FormRow from "./FormRow";
import { Link } from "react-router-dom";
import { useState } from "react";
const initialUserData = {
  id: "",
  image: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: {
    street: "",
    city: "",
    province: "",
    country: "",
    postal: "",
  },
  hireDate: "",
  status: "",
  role: "",
};
const UserManagementForm = ({ formType, user }) => {
  const [currentUser, setCurrentUser] = useState(user || initialUserData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [name.slice(8)]: value,
        },
      }));
    } else {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
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
      <h1>User Management - {formType}</h1>

      <form action="#" className="form">
        <div className="img-container">
          {user ? (
            <img src={currentUser.image} alt="user-profile" className="img" />
          ) : (
            <FormRow
              type="file"
              labelName="Profile"
              name="image"
              value={currentUser.image}
              onChange={handleFileUpload}
            />
          )}
        </div>
        <div className="id-container">
          {" "}
          <FormRow
            labelName="sales ID"
            name="id"
            value={currentUser.id}
            onChange={handleChange}
          />
          <button
            className="verifyBtn"
            style={{ backgroundColor: user ? "#9E9E9E" : "" }}
            disabled={user ? true : false}
            onClick={() => window.alert("Function need to implement")}
          >
            verify ID
          </button>
        </div>

        <FormRow
          labelName="first name"
          name="firstName"
          value={currentUser.firstName}
          onChange={handleChange}
        />
        <FormRow
          labelName="last name"
          name="lastName"
          value={currentUser.lastName}
          onChange={handleChange}
        />

        <FormRow
          labelName="email"
          name="email"
          value={currentUser.email}
          onChange={handleChange}
        />
        <FormRow
          labelName="phone"
          name="phone"
          value={currentUser.phone}
          onChange={handleChange}
        />
        <div className="address-group">
          <FormRow
            labelName="address"
            name="address.street"
            placeholder="street"
            value={currentUser.address.street}
            onChange={handleChange}
          />
          <FormRow
            name="address.city"
            placeholder="city"
            value={currentUser.address.city}
            onChange={handleChange}
          />
          <FormRow
            name="address.province"
            placeholder="province"
            value={currentUser.address.province}
            onChange={handleChange}
          />
          <FormRow
            name="address.country"
            placeholder="country"
            value={currentUser.address.country}
            onChange={handleChange}
          />
          <FormRow
            name="address.postal"
            placeholder="postal code"
            value={currentUser.address.postal}
            onChange={handleChange}
          />
        </div>
        <FormRow
          type="date"
          labelName="hire date"
          name="hireDate"
          value={currentUser.hireDate}
          onChange={handleChange}
        />
        <FormRow
          type="select"
          labelName="status"
          name="status"
          value={currentUser.status}
          onChange={handleChange}
        />
        <FormRow
          type="radio"
          name="role"
          value={currentUser.role}
          onChange={handleChange}
        />

        <div className="btn-container">
          <Link to="/admin/user_management">
            <button className="cancelBtn">cancel</button>
          </Link>

          {/* save function need to implement */}
          <button
            className="saveBtn"
            onClick={() => window.alert("Function need to implement")}
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

export default UserManagementForm;
