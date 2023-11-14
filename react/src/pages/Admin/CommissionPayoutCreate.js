import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import FormRow from "../../components/FormRow";
import {styled} from "styled-components";

const initialRecord = {
    salesID: "",
    date: "",
    firstName: "",
    lastName: "",
    currentBalance: "",
    payout: "",
    balanceAfterPayout: "",
    comment: "",
};

const CommissionPayoutCreate = () => {

    const [currentRecord, setCurrentRecord] = useState(initialRecord);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setCurrentRecord((prevRecord) => ({
            ...prevRecord,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/payout',
                setCurrentRecord, // pass the data directly
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
                window.location = '/admin/sales_payout';
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
            <h1>commission payout - Update</h1>
            {/* form action need to implement */}
            <form onSubmit={handleSubmit}>
                <FormRow
                    labelName="sales ID"
                    name="sales_id"
                    value={currentRecord ? currentRecord.sales_id : null}
                    onChange={handleChange}
                />
                <FormRow
                    type="date"
                    labelName="date"
                    name="date"
                    value={currentRecord ? currentRecord.date : null}
                    onChange={handleChange}
                />
                {/*<FormRow*/}
                {/*    labelName="first name"*/}
                {/*    name="first_name"*/}
                {/*    value={currentRecord ? currentRecord.first_name : null}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}
                {/*<FormRow*/}
                {/*    labelName="last name"*/}
                {/*    name="last_name"*/}
                {/*    value={currentRecord ? currentRecord.last_name : null}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}
                {/*<FormRow*/}
                {/*    labelName="current balance"*/}
                {/*    name="balance"*/}
                {/*    value={currentRecord ? currentRecord.balance : null}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}
                <FormRow
                    labelName="pay out"
                    name="amount"
                    value={currentRecord ? currentRecord.amount : null}
                    onChange={handleChange}
                />
                {/*<FormRow*/}
                {/*    labelName="balance after payout"*/}
                {/*    name="balanceAfterPayout"*/}
                {/*    value={currentRecord ? currentRecord.balanceAfterPayout : null}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}

                <div className="comment">
                    <FormRow
                        labelName="comment"
                        name="comment"
                        value={currentRecord ? currentRecord.comment : null}
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
                            currentRecord === initialRecord ? "disable" : ""
                        }`}
                        disabled={currentRecord === initialRecord}
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



export default CommissionPayoutCreate;
