import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";
import {formatNumber} from "../utils/FormatNumber";
import API_BASE_URL from "../utils/apiConfig";

const TopSales = ({dateRange}) => {
    // State variables for top 10 sales and data date
    const [top10, setTop10] = useState([]);
    const [dataDate, setDataDate] = useState(null);

    // Fetch top sales data from the Laravel API
    useEffect(() => {
        axios.get(`${API_BASE_URL}/dashboard-top-sales`)
            .then((response) => {
                // Set data date and transform the object into an array of objects
                setDataDate(response.data.dataDate.date.substring(0, 7));
                const transformedData = Object.entries(response.data.performances).map(([name, values]) => ({
                    name,
                    ...values,
                }));
                setTop10(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Trigger the effect only once on component mount

    // Handle changes in the selected date range
    const handleDateRangeChange = async () => {

        try {
            // Fetch top sales data with the specified date range
            const response = await axios.get(`${API_BASE_URL}/dashboard-top-sales?date-range=${dateRange}`);
            const { performances, dataDate} = response.data;

            // Check if dataDate is not null before accessing its date property
            const formattedDataDate = dataDate && dataDate.date ? dataDate.date.substring(0, 7) : null;
            setDataDate(formattedDataDate);

            // Transform the object into an array of objects
            const transformedData = Object.entries(performances).map(([name, values]) => ({
                name,
                ...values,
            }));
            setTop10(transformedData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Trigger the handleDateRangeChange effect on changes in date range
    useEffect(() => {
        handleDateRangeChange();
    }, [dateRange]); // Trigger the effect when date-range values change

  return (
    <Wrapper>
      <h3>Top 10 Sales</h3>
      {/*<small>As of May 2023</small>*/}
      <small>As of {dataDate}</small>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Sales Name</th>
            <th scope="col">Performance</th>
          </tr>
        </thead>
        <tbody>
          {top10.map((salesperson, index) => {
            return (
              <tr key={index}>
                <td className="rank">{salesperson.rank}</td>
                <td>{salesperson.first_name}</td>
                <td>{formatNumber(salesperson.total_amount)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding: 2rem;
  border: 1px solid #e6e8ec;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  h3 {
    font-weight: 500;
  }

  td,
  th {
    color: #273240;
    padding: 1rem 1.25rem;
  }

  .rank,
  th {
    color: #000000;
  }
  @media (max-width: 820px) {
    tr {
      height: 80px;
    }
  }

  @media (max-width: 576px) {
    tr {
      height: 60px;
    }
  }
`;
export default TopSales;
