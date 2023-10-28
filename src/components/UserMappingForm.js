import { styled } from "styled-components";
import { useState } from "react";
import FormRow from "./FormRow";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
// below data for demo purpose
const initialUserMapping = {
  salesId: "",
  salesName: "",
  commission: "",
  merchantNo: "",
  SCPNo: "",
  merchantName: "",
  dateOpen: "",
  dateClosed: "",
  status: "",
};

const UserMappingForm = ({ formType, userMapping }) => {
  const [currentUserMapping, setCurrentUserMapping] = useState(
    userMapping || initialUserMapping
  );
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentUserMapping((prevMapping) => ({
      ...prevMapping,
      [name]: value,
    }));
  };
  return (
    <Wrapper className="dashboard-container">
      <h1> Mapping Management - {formType}</h1>

      <form action="">
        <div className="merchant-group">
          <div className="search">
            <BiSearch className="search-icon" />
            <FormRow
              labelName="merchant number"
              name="merchantNo"
              placeholder="search ..."
              value={currentUserMapping.merchantNo}
              onChange={handleChange}
            />
          </div>
          <FormRow
            labelName="SCP number"
            name="SCPNo"
            value={currentUserMapping.SCPNo}
            onChange={handleChange}
          />

          <FormRow
            labelName="merchant name"
            name="merchantName"
            value={currentUserMapping.merchantName}
            onChange={handleChange}
          />
          {/* empty div for placeholder */}
          <div className="holder"></div>
          <FormRow
            type="date"
            labelName="date open"
            name="dateOpen"
            value={currentUserMapping.dateOpen}
            onChange={handleChange}
          />
          <FormRow
            type="date"
            labelName="date closed"
            name="dateClosed"
            value={currentUserMapping.dateClosed}
            onChange={handleChange}
          />
        </div>
        <div className="sales-group">
          <div className="search">
            <BiSearch className="search-icon" />
            <FormRow
              labelName="sales ID"
              name="salesId"
              placeholder="search ..."
              value={currentUserMapping.salesId}
              onChange={handleChange}
            />
          </div>
          <FormRow
            labelName="commission percentage"
            name="commission"
            value={currentUserMapping.commission}
            onChange={handleChange}
          />
        </div>

        <div className="btn-container">
          <Link to="/admin/mapping_management">
            <button className="cancelBtn">cancel</button>
          </Link>
          {/* save function need to implement */}
          <button
            className={`saveBtn ${
              currentUserMapping === initialUserMapping ? "disable" : ""
            }`}
            disabled={currentUserMapping === initialUserMapping ? true : false}
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

  .merchant-group,
  .sales-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5em;
    row-gap: 1rem;
    margin: 3rem;
  }

  .search {
    width: 100%;
    position: relative;
  }

  .search input {
    padding-left: 2rem;
  }
  .search-icon {
    position: absolute;
    color: #9e9e9e;
    bottom: 0.5rem;
    margin-left: 0.5rem;
    font-size: 1.25rem;
  }

  .disable {
    color: #ffffff;
    background-color: #9e9e9e;
    border-color: #9e9e9e;
  }
  @media (max-width: 820px) {
    .btn-container {
      margin: 2rem;
    }
  }

  @media (max-width: 576px) {
    .holder {
      display: none;
    }

    .merchant-group,
    .sales-group {
      display: flex;
      flex-direction: column;
      margin: 1rem;
      column-gap: 0;
      row-gap: 0.75rem;
      margin-top: 2rem;
    }

    .btn-container {
      margin: 0;
      margin-top: 2rem;
    }
  }
`;
export default UserMappingForm;
