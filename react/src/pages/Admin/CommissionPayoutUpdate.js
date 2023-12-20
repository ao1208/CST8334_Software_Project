import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FormRow from "../../components/FormRow";
import {styled} from "styled-components";
import axios from "axios";
import debounce from 'lodash/debounce';
import {formatNumber} from "../../utils/FormatNumber";
import API_BASE_URL from "../../utils/apiConfig";

const initialRecord = {
    salesID: "",
    merchantid: "",
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
    const [salesIdInput, setSalesIdInput] = useState('');
    const [currentBalance, setCurrentBalance] = useState(0);
    const [payout, setPayout] = useState(0);
    const [balanceAfterPayout, setBalanceAfterPayout] = useState(0);
    const debouncedHandleSalesId = debounce(async (salesId) => {
        await handleSalesId(salesId);
    }, 500);
    const handleSalesId = async (salesId) => {

        try {
            const userDetailsResponse = await axios.get(`${API_BASE_URL}/user/${salesId}`);
            const userData = userDetailsResponse.data;
            console.log("path" , userDetailsResponse);
            console.log("data",userData);
            console.log("sales id", salesId)

            if (userData && userData.first_name && userData.last_name) {
                const { first_name: firstName, last_name: lastName } = userData;

                setCurrentRecord((prevRecord) => ({
                    ...prevRecord,
                    first_name: firstName,
                    last_name: lastName,
                }));

                console.log('User exists.');
                console.log('First Name:', firstName);
                console.log('Last Name:', lastName);

            } else {
                setCurrentRecord((prevRecord) => ({
                    ...prevRecord,
                    first_name: '',
                    last_name: '',
                }));
                console.log('User does not exist.');

            }
        } catch (error) {
            console.error('Error checking sales ID existence:', error);
            console.log('Response data:', error.response.data);

        }
    };
    useEffect(() => {
        if (salesIdInput) {
            const timeoutId = setTimeout(() => {
                handleSalesId(salesIdInput);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
        if (payout) {
            const timeoutId = setTimeout(() => {
                setBalanceAfterPayout((currentBalance - payout).toFixed(2));
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [salesIdInput, payout]);

    useEffect(() => {

        axios.get(`${API_BASE_URL}/payout/${recordId}`)
            .then(response => {
                console.log("record id is " + recordId);
                setCurrentRecord(response.data);
                setCurrentBalance(response.data.balance + response.data.amount);
                setBalanceAfterPayout(response.data.balance);
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
        if (name === 'sales_id') {
            setSalesIdInput(value);
            debouncedHandleSalesId(value);
        }
        if (name === 'amount') {
            setPayout(value);
            if(isNaN(payout)){
                alert('Please enter a valid payout!');
            }else{
                const newBalanceAfterPayout = (currentBalance - payout).toFixed(2);
                setBalanceAfterPayout(newBalanceAfterPayout);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { id: recordId, balanceAfterPayout, balance } = currentRecord;

            // Validate if amount is greater than balance
            if (payout > currentBalance) {
                alert('Payout cannot be greater than the current balance.');
                return;
            }

            let requestBody = { ...currentRecord };

            if (typeof balanceAfterPayout !== 'undefined' && balanceAfterPayout !== null && balanceAfterPayout !== '') {
                requestBody = {
                    ...requestBody,
                    balance: balanceAfterPayout,
                };
            } else {
                requestBody = {
                    ...requestBody,
                    balance: balance,
                };
            }

            console.log('Request Body:', JSON.stringify(requestBody));
            const response = await fetch(`${API_BASE_URL}/payout/${recordId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to update record');
            }

            const updatedRecordId = recordId;
            console.log('recordId after the update:', updatedRecordId);
            window.location = '/admin/sales_payout';
        } catch (error) {
            console.error('Error occurred:', error.message || error);
        }
    };

    return (
        <Wrapper className="dashboard-container">
            <h1>commission payout - Update</h1>
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
                    value={currentBalance ? currentBalance: null}
                />
                <FormRow
                    labelName="pay out"
                    name="amount"
                    value={currentRecord ? currentRecord.amount : null}
                    onChange={handleChange}
                    validate
                />
                <FormRow
                    labelName="balance after payout"
                    name="balanceAfterPayout"
                    value={balanceAfterPayout ? balanceAfterPayout : null}
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
                    <button
                        className={`saveBtn ${
                            JSON.stringify(currentRecord) === JSON.stringify(initialRecord) ? "disable" : ""
                        }`}
                        onClick={
                            JSON.stringify(currentRecord) === JSON.stringify(initialRecord)
                                ? null
                                : handleSubmit
                        }
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
