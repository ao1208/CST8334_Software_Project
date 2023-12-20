import styled from "styled-components";
import {SalesNav, Pagination, Heading, SalesSearch} from "../../components";
import {formatNumber} from "../../utils/FormatNumber";
import {performanceColumnMappings} from "../../utils/TableColumnMapping";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import API_BASE_URL from "../../utils/apiConfig";

const SalesPerformance = () => {
    const [userId, setUserId] = useState(null);
    const [accountBalance, setAccountBalance] = useState(0);
    const [commission, setCommission] = useState(0);
    const [payout, setPayout] = useState(0);
    const [data, setPerformanceData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [numOfPages, setNumOfPages] = useState(1);
    const [apiUrl, setApiUrl] = useState("");

    useEffect(() => {
        // Retrieve the user ID from the cookie
        const storedUserId = Cookies.get('userId');
        setUserId(storedUserId);
        setApiUrl(`${API_BASE_URL}/sales-performance/${userId}`);
    }, [userId]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(apiUrl);
                setCommission(response.data[0].commission);
                if (response.data[1]){
                    setPayout(response.data[1].payout);
                }else{
                    setPayout(0);
                }
                setAccountBalance(response.data[2].balance);
                setPerformanceData(response.data[3].data);
                setItemsPerPage(response.data[3].per_page);
                setNumOfPages(response.data[3].last_page);
            } catch (error) {
                console.error('Error fetching sales performances data:', error);
            }
        };
        fetchRecords();
    }, [apiUrl]);

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
            <SalesNav/>
            <Heading heading="sales performance"/>
            <SalesSearch setApiUrl={setApiUrl} userId={userId}/>
            <div className="heading">
                {" "}
                <div>
                    <h5>account balance</h5>{" "}
                    <p>
                        $ <span>{accountBalance}</span>{" "}
                    </p>
                </div>
                <div>
                    <h5>commission</h5>{" "}
                    <p>
                        $ <span>{commission}</span>
                    </p>
                </div>
                <div>
                    <h5>payout</h5>{" "}
                    <p className="payout">
                        $ <span>{payout}</span>
                    </p>
                </div>
            </div>

            <div className="data-table">
                <table className="table striped table-hover">
                    <thead>
                    <tr className="vertical-center">
                        {Object.keys(performanceColumnMappings).map((column) => (
                            <th key={column}>{performanceColumnMappings[column]}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((record, index) => {
                        return (
                            <tr key={index}>
                                <td>{record.pdate.substring(0, 7).replace('-', '/')} </td>
                                <td>{record.sales_id}</td>
                                <td>{record.first_name + ' ' + record.last_name} </td>
                                <td>{record.commission_percentage * 100} </td>
                                <td>{record.merchant_id} </td>
                                <td>{record.DBA_name} </td>
                                <td>$ {record.visa_commission ? record.visa_commission.toLocaleString() : "--"}</td>
                                <td>$ {record.master_commission ? record.master_commission.toLocaleString() : "--"}</td>
                                <td>$ {record.total_commission ? record.total_commission.toLocaleString() : "--"}</td>
                            </tr>
                        );
                        // <tr key={index} className="vertical-center">
                        //   {Object.keys(record).map((column) => {
                        //     return (
                        //       <td key={column}>
                        //         {record[column] ? formatNumber(record[column]) : "$ --"}
                        //       </td>
                        //     );
                        //   })}
                        // </tr>
                    })}
                    </tbody>
                </table>
            </div>
            <Pagination
                data={data}
                itemsPerPage={itemsPerPage}
                numOfPages={numOfPages}
                onPageChange={handlePageChange} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .heading {
        display: flex;
        color: #000000;
        justify-content: space-evenly;
        align-items: center;
        padding: 1.5rem 0 1rem 0;
        margin-top: 1rem;
        background-color: #f6f6f6;
        border: 2px solid #e6e6e6;
    }

    .heading h5 {
        font-weight: 400;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .heading p {
        font-size: 1.25rem;
        font-style: italic;
        text-align: center;
    }

    .heading span {
        text-decoration: underline;
    }

    .payout {
        color: #ff0000;
    }

    @media (max-width: 820px) {
        .heading h5,
        .heading p {
            font-size: 1rem;
        }
    }

    @media (max-width: 576px) {
        .heading h5,
        .heading p {
            font-size: 0.75rem;
        }
    }
`;
export default SalesPerformance;
