import {styled} from "styled-components";
import {
    AdminNav, AdminPayoutSearch,
    FooterSummary,
    Heading,
    SalesSearch,
} from "../../components";
import {Link} from "react-router-dom";
import {
    commissionPayoutTableHeader,
    payoutColumnMappings,
    salesPerformanceTableHeader
} from "../../utils/TableColumnMapping";
import {formatNumber} from "../../utils/FormatNumber";
import {RiDeleteBinLine} from "react-icons/ri";
import {PiNotePencil} from "react-icons/pi";
import {Pagination} from "../../components";
import React, {useState, useEffect} from "react";
import axios from "axios";
import API_BASE_URL from "../../utils/apiConfig";


const CommissionPayout = () => {

    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [apiUrl, setApiUrl] = useState(`${API_BASE_URL}/payout`);
    const [totalCommission, setTotalCommission] = useState(0);
    const [totalPayout, setTotalPayout] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [numOfPages, setNumOfPages] = useState(1);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(apiUrl);
                console.log('Response:', response);
                setTotalCommission(response.data[0].subtotalCommission);
                setTotalPayout(response.data[1].subtotalPayout);
                setData(response.data[2].data);
                setItemsPerPage(response.data[2].per_page);
                setNumOfPages(response.data[2].last_page);
                if (response.data[2].data.length === 0) {
                    alert('No records found.');
                }
            } catch (error) {
                console.error('Network error:', error.message);
            }
        };

        fetchRecords();

        if (deleted) {
            fetchRecords();
            setDeleted(false);
        }
    }, [deleted, apiUrl]);

    const handleDelete = async (recordId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/payout/${recordId}`);
                console.log('Record deleted successfully', response.data);
                setDeleted(true);
            } catch (error) {
                console.error('Error deleting record', error);
            }
        }
    };

    // Callback function for handling page changes
    const handlePageChange = (newPage) => {
        const url = new URL(apiUrl);

        // Update the 'page' parameter
        url.searchParams.set('page', newPage);

        // Remove duplicate 'page' parameters
        const updatedUrl = removeDuplicatePageParams(url);

        setApiUrl(updatedUrl);

        console.log("Page changed to:", newPage);
    };

    const removeDuplicatePageParams = (url) => {
        const urlSearchParams = new URLSearchParams(url.search);
        const uniqueParams = new Map();

        // Iterate over existing parameters and keep the last occurrence of each
        urlSearchParams.forEach((value, key) => {
            uniqueParams.set(key, value);
        });

        // Update the URL with the unique parameters
        const updatedUrl = `${url.origin}${url.pathname}?${[...uniqueParams.entries()].map(([key, value]) => `${key}=${value}`).join('&')}`;

        return new URL(updatedUrl);
    };

    return (

        <Wrapper className="dashboard-container">
            <AdminNav/>
            <Heading heading="commission payout"/>
            <div className="filter">
                <AdminPayoutSearch setApiUrl={setApiUrl}/>
                <div className="payout">
                    <Link to="/admin/sales_payout/create">
                        <button
                            className="payout-btn "

                        >

                            + pay out
                        </button>
                    </Link>
                </div>
            </div>

            <div className="data-table">
                <table className="table striped table-hover">
                    <thead>
                    {/*<tr className="vertical-center">*/}
                    {/*    {Object.keys(payoutColumnMappings).map((column) => (*/}
                    {/*        <th key={column}>{payoutColumnMappings[column]}</th>*/}
                    {/*    ))}*/}
                    {/*    <td><strong>action</strong></td>*/}
                    {/*</tr>*/}
                    <tr style={{borderStyle: "none !important"}}>
                        {commissionPayoutTableHeader.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => {
                        const isCommission = item.type === "Commission";

                        return (
                            <tr key={index} className="vertical-center">
                                <td>{item.date} </td>
                                <td>{item.sales_id} </td>
                                <td>{item.first_name + ' ' + item.last_name} </td>
                                <td>{item.merchant_id ? item.merchant_id : "--"} </td>
                                <td>{item && item.DBA_name ? item.DBA_name : "--"}</td>
                                <td>{item.type} </td>
                                <td
                                    style={{
                                        color: item.type.toLowerCase() === "payout" ? "#A30D11" : "",
                                    }}
                                >
                                    {item.amount
                                        ? item.type.toLowerCase() === "payout"
                                            ? "-" + formatNumber(item.amount)
                                            : formatNumber(item.amount)
                                        : "$ --"}
                                </td>
                                <td>
                                    {item.balance ? formatNumber(item.balance) : "$ --"}{" "}
                                </td>
                                {" "}
                                <td>{item.comment} </td>
                                <td className="display">
                                    {!isCommission && ( // Conditionally render buttons if not a commission type
                                        <>
                                            <button className="updateBtn">
                                                <Link
                                                    className="action"
                                                    to={`/admin/sales_payout/update/${item.id}`}
                                                >
                                                    {" "}
                                                    <PiNotePencil/>
                                                </Link>
                                            </button>
                                            <button
                                                className="deleteBtn"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <RiDeleteBinLine/>
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <FooterSummary
                totalCommission={totalCommission}
                totalPayout={totalPayout}
            />
            <Pagination
                data={data}
                itemsPerPage={itemsPerPage}
                numOfPages={numOfPages}
                onPageChange={handlePageChange}/>
        </Wrapper>

    );
};

const Wrapper = styled.section`
    .filter {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 1rem;
    }

    .data-table {
        width: 100%;
        margin-bottom: 0;
    }

    table {
        margin-bottom: 0;
    }

    .payout-btn {
        color: #ffffff;
        height: 35px;
        padding: 0 1rem;
        text-transform: capitalize;
        background-color: #624de3;
        border: 1px solid #624de3;
        border-radius: 0.25rem;
    }

    @media (max-width: 820px) {
        .filter {
            display: grid;
            justify-content: inherit;
        }

        .payout {
            display: flex;
            justify-content: flex-end;
            grid-row: 1;
            margin: 0.75rem 0;
        }

        .payout-btn {
            width: 120px;
            justify-self: end;
        }

        tr {
            height: 180px;
        }
    }

    @media (max-width: 576px) {
        .display {
            display: block;
        }
    }
`;

// export default CommissionPayout;
export default CommissionPayout;
