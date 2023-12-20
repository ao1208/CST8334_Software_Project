import {useState} from "react";
import axios from "axios";
import {BiSearch} from "react-icons/bi";
import FormRow from "../../components/FormRow";
import {Link} from "react-router-dom";
import {styled} from "styled-components";
import API_BASE_URL from "../../utils/apiConfig";

const initialUserMapping = {
    merchant_id: "",
    SCP_number: "",
    DBA_name: "",
    date_open: "",
    date_closed: "",
    sales_id: "",
    commission_percentage: "",
};

const MappingCreateUser = () => {

    const [currentUserMapping, setCurrentUserMapping] = useState(initialUserMapping);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setCurrentUserMapping((prevMapping) => ({
            ...prevMapping,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const checkUnique = await axios.get(`${API_BASE_URL}/checkUnique`, {
                params: {
                    merchant_id: currentUserMapping.merchant_id,
                    SCP_number: currentUserMapping.SCP_number
                }
            });

            if (checkUnique.data.isUnique) {
                // If data is unique, proceed to submit
                const response = await axios.post(
                    `${API_BASE_URL}/merchant`,
                    currentUserMapping,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.status >= 200 && response.status < 300) {
                    console.log('Success:', response.data);
                    window.location = '/admin/mapping_management';
                } else {
                    throw new Error(`Server responded with status ${response.status}`);
                }
            } else {
                // Data is not unique, show an alert with the conflicting field
                const conflictField = checkUnique.data.conflictField;
                window.alert(`${conflictField.toUpperCase()} should be unique.`);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle errors as before
        }
    };
    return (
        <Wrapper className="dashboard-container">
            <h1> Mapping Management - Create</h1>
            <form onSubmit={handleSubmit}>
                <div className="merchant-group">
                    <div className="search">
                        <BiSearch className="search-icon" />
                        <FormRow
                            labelName="merchant number"
                            name="merchant_id"
                            // placeholder="search ..."
                            value={currentUserMapping ? currentUserMapping.merchant_id : null}
                            onChange={handleChange}
                        />
                    </div>
                    <FormRow
                        labelName="SCP number"
                        name="SCP_number"
                        value={currentUserMapping ? currentUserMapping.SCP_number : null}
                        onChange={handleChange}
                    />

                    <FormRow
                        labelName="merchant name"
                        name="DBA_name"
                        value={currentUserMapping ? currentUserMapping.DBA_name : null}
                        onChange={handleChange}
                    />
                    {/* empty div for placeholder */}
                    <div className="holder"></div>
                    <FormRow
                        type="date"
                        labelName="date open"
                        name="date_open"
                        value={currentUserMapping ? currentUserMapping.date_open : null}
                        onChange={handleChange}
                    />
                    <FormRow
                        type="date"
                        labelName="date closed"
                        name="date_closed"
                        value={currentUserMapping ? currentUserMapping.date_closed : null}
                        onChange={handleChange}
                    />
                </div>
                <div className="sales-group">
                    <div className="search">
                        <BiSearch className="search-icon" />
                        <FormRow
                            labelName="sales ID"
                            name="sales_id"
                            placeholder="search ..."
                            value={currentUserMapping ? currentUserMapping.sales_id : null}
                            onChange={handleChange}
                        />
                    </div>
                    <FormRow
                        labelName="commission percentage"
                        name="commission_percentage"
                        value={currentUserMapping ? currentUserMapping.commission_percentage : null}
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
                        disabled={currentUserMapping === initialUserMapping}
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

export default MappingCreateUser;
