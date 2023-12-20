import {Link} from "react-router-dom";
import {useState,useEffect } from "react";
import axios from "axios";
import FormRow from "../../components/FormRow";
import {styled} from "styled-components";
import debounce from 'lodash/debounce';
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

const CommissionPayoutCreate = () => {
    const [currentRecord, setCurrentRecord] = useState(initialRecord);
    const [salesIdInput, setSalesIdInput] = useState('');
    const [currentBalance, setCurrentBalance] = useState();
    const debouncedHandleSalesId = debounce(async (salesId) => {
        await handleSalesId(salesId);
        await handleCurrentBalance(salesId);

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
                    firstName,
                    lastName,
                }));

                console.log('User exists.');
                console.log('First Name:', firstName);
                console.log('Last Name:', lastName);

            } else {
                setCurrentRecord((prevRecord) => ({
                    ...prevRecord,
                    firstName: '',
                    lastName: '',
                }));
                console.log('User does not exist.');

            }
        } catch (error) {
            console.error('Error checking sales ID existence:', error);
            console.log('Response data:', error.response.data);
        }
    };

    const handleCurrentBalance = async (salesId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/balance/${salesId}`);
            setCurrentBalance(response.data.currentBalance);
        } catch (error) {
            console.error('Error fetching current balance:', error);
        }
    }

    useEffect(() => {
        if (salesIdInput) {
            const timeoutId = setTimeout(() => {
                handleSalesId(salesIdInput);
                handleCurrentBalance(salesIdInput);
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [salesIdInput]);


    const handleChange = async (e) => {
        const { name, value } = e.target;

        setCurrentRecord((prevRecord) => ({
            ...prevRecord,
            [name]: value,

        }));
        if (name === 'sales_id') {
            setSalesIdInput(value);
            debouncedHandleSalesId(value);
        }
        if (name === 'balanceAfterPayout') {
            return;
        }
        if (name === 'amount') {
            const payout = parseFloat(value);
            if (!isNaN(currentBalance) && !isNaN(payout)) {
                const balanceAfterPayout = currentBalance - payout;
                const formattedBalance = balanceAfterPayout % 1 === 0 ? balanceAfterPayout : balanceAfterPayout.toFixed(2);
                setCurrentRecord((prevRecord) => ({
                    ...prevRecord,
                    amount: value,
                    balanceAfterPayout: formattedBalance.toString(),
                }));
            } else {
                setCurrentRecord((prevRecord) => ({
                    ...prevRecord,
                    amount: value,
                    balanceAfterPayout: '',
                }));
            }
        } else {
            setCurrentRecord((prevRecord) => ({
                ...prevRecord,
                [name]: value,

            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const updatedRecord = {
                ...currentRecord,
                balance: currentRecord.balanceAfterPayout,
            };

            const response = await axios.post(
                `${API_BASE_URL}/payout`,
                updatedRecord,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status >= 200 && response.status < 300) {
                console.log('Success:', response.data);
                window.location = '/admin/sales_payout';
            } else {
                throw new Error(`Server responded with status ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <Wrapper className="dashboard-container">
            <h1>commission payout - Create</h1>

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
                    value={currentRecord ? currentRecord.firstName : null}
                    onChange={handleChange}
                    readOnly={true}
                    disabled={true}
                />
                <FormRow
                    labelName="last name"
                    name="last_name"
                    value={currentRecord ? currentRecord.lastName : null}
                    onChange={handleChange}
                    readOnly={true}
                    disabled={true}
                />
                <FormRow
                    labelName="current balance"
                    name="balance"
                    value={currentBalance !== null ? currentBalance : ''}
                    readOnly
                    disabled
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
                    readOnly={true}
                    disabled={true}
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
                            currentRecord === initialRecord ? "disable" : ""
                        }`}
                        disabled={currentRecord === initialRecord}
                        onClick={handleSubmit}
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
