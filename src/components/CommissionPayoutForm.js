import { styled } from "styled-components";
import { useState } from "react";
import FormRow from "./FormRow";
import { Link } from "react-router-dom";

const initialUser = {
  salesID: "",
  date: "",
  firstName: "",
  lastName: "",
  currentBalance: "",
  payout: "",
  balanceAfterPayout: "",
  comment: "",
};
const CommissionPayoutForm = ({ formType, user }) => {
  const [currentUser, setCurrentUser] = useState(user || initialUser);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <Wrapper className="dashboard-container">
      <h1>commission payout - {formType}</h1>
      {/* form action need to implement */}
      <form action="">
        <FormRow
          labelName="sales ID"
          name="salesID"
          value={currentUser.salesID}
          onChange={handleChange}
        />
        <FormRow
          type="date"
          labelName="date"
          name="date"
          value={currentUser.date}
          onChange={handleChange}
        />
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
          labelName="current balance"
          name="currentBalance"
          value={currentUser.currentBalance}
          onChange={handleChange}
        />
        <FormRow
          labelName="pay out"
          name="payout"
          value={currentUser.payout}
          onChange={handleChange}
        />
        <FormRow
          labelName="balance after payout"
          name="balanceAfterPayout"
          value={currentUser.balanceAfterPayout}
          onChange={handleChange}
        />

        <div className="comment">
          <FormRow
            labelName="comment"
            name="comment"
            value={currentUser.comment}
            onChange={handleChange}
          />
        </div>

        <div className="btn-container">
          <Link to="/admin/sales_payout">
            <button className="cancelBtn">cancel</button>
          </Link>
          {/* save function need to implement */}
          <button
            className={`saveBtn ${
              currentUser === initialUser ? "disable" : ""
            }`}
            disabled={currentUser === initialUser ? true : false}
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
  h1 {
    color: #000000;
    text-transform: capitalize;
    margin: 1.5rem 0;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
    column-gap: 3rem;
  }

  form .comment {
    grid-column: span 2;
  }
  .disable {
    color: #ffffff;
    background-color: #9e9e9e;
    border-color: #9e9e9e;
  }
  @media (max-width: 576px) {
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;
export default CommissionPayoutForm;
