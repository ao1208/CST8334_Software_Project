import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FormRow from "../../components/FormRow";
import {styled} from "styled-components";
import axios from "axios";

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
const CommissionPayoutUpdate = () => {
  const { recordId } = useParams();
  const [currentRecord, setCurrentRecord] = useState(initialRecord);

  useEffect(() => {
        // Fetch payout data from the Laravel API
        axios.get(`http://127.0.0.1:8000/api/payout/${recordId}`)
            .then(response => {
                setCurrentRecord(response.data); // Set the payout data in state
            })
            .catch((error) => {
                console.error("Error fetching payout data: ", error);
            });
  }, [recordId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCurrentRecord((prevRecord) => ({
            ...prevRecord,
            [name]: value,
        }));
    };

    // Update payout data into DB through Laravel API
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/payout/${recordId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(setCurrentRecord),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok. Status: ${response.status}');
            }
            const data = await response.json();
            console.log('Success:', data);

            window.location = "/admin/sales_payout";

        } catch (error) {
            console.error('Error:', error);
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
                <FormRow
                    labelName="first name"
                    name="first_name"
                    value={currentRecord ? currentRecord.first_name : null}
                    onChange={handleChange}
                />
                <FormRow
                    labelName="last name"
                    name="last_name"
                    value={currentRecord ? currentRecord.last_name : null}
                    onChange={handleChange}
                />
                <FormRow
                    labelName="current balance"
                    name="balance"
                    value={currentRecord ? currentRecord.balance : null}
                    onChange={handleChange}
                />
                <FormRow
                    labelName="pay out"
                    name="amount"
                    value={currentRecord ? currentRecord.amount : null}
                    onChange={handleChange}
                />
                <FormRow
                    labelName="balance after payout"
                    name="balanceAfterPayout"
                    value={currentRecord ? currentRecord.balanceAfterPayout : null}
                    onChange={handleChange}
                />

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

export default CommissionPayoutUpdate;
