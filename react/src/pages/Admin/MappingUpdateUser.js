import { styled } from "styled-components";
import FormRow from "../../components/FormRow";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
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

const MappingUpdateUser = () => {

    const {merchantId} = useParams();
    const [currentUserMapping, setCurrentUserMapping] = useState(initialUserMapping);
    const [isFormModified, setIsFormModified] = useState(false);

    useEffect(() => {
        // Fetch merchant data from the Laravel API
        axios.get(`${API_BASE_URL}/merchant/${merchantId}`)
            .then(response => {
                setCurrentUserMapping(response.data); // Set the merchant data in state
            })
            .catch((error) => {
                console.error("Error fetching merchant data: ", error);
            });
    }, [merchantId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCurrentUserMapping((prevMapping) => ({
            ...prevMapping,
            [name]: value === "" ? null : value, // Convert empty values to null

        }));
        setIsFormModified(true);
    };

    // Update merchant data into DB through Laravel API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!isFormModified) {
                console.log('No changes made');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/merchant/${merchantId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentUserMapping),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Error: Resource not found.');
                } else {
                    const errorResponse = await response.text();
                    console.log("actual error :" + errorResponse);
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }
            } else {
                const data = await response.json();
                console.log('Success:', data);
                window.location = "/admin/mapping_management";
                setIsFormModified(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Wrapper className="dashboard-container">
            <h1> Mapping Management - Update</h1>
            <form onSubmit={handleSubmit}>
                <div className="merchant-group">
                    <div className="search">
                        <BiSearch className="search-icon" />
                        <FormRow
                            labelName="merchant number"
                            name="merchant_id"
                            // placeholder="search ..."
                            value={currentUserMapping ? currentUserMapping.merchant_id : null}
                            disabled
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
export default MappingUpdateUser;
