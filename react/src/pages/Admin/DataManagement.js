import { styled } from "styled-components";
import { Heading, FormRow, Pagination, AdminNav } from "../../components";
import { dateRange } from "../../utils/DateRange";
import { dataManagementTableHeader } from "../../utils/TableColumnMapping";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const DataManagement = () => {

    const [data, setData] = useState([]);

    // Fetch data from the Laravel API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/data')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Trigger the effect only once on component mount

    // State variables for date range input values
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    // Handle changes in the date range input values
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "dateFrom") {
            setDateFrom(value);
        } else if (name === "dateTo") {
            setDateTo(value);
        }
    };

    // // Optional: Give default dateFrom and dateTo values for the last month
    // useEffect(() => {
    //     // Get the current date
    //     const currentDate = new Date();
    //
    //     // Calculate the first day of the last month
    //     const firstDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    //
    //     // Calculate the last day of the last month
    //     const lastDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    //
    //     // Format the dates to the desired string format (YYYY-MM-DD)
    //     const formattedFirstDay = formatDate(firstDayLastMonth);
    //     const formattedLastDay = formatDate(lastDayLastMonth);
    //
    //     // Set the default values for dateFrom and dateTo as the first and last day of the last month
    //     setDateFrom(formattedFirstDay);
    //     setDateTo(formattedLastDay);
    // }, []); // Empty dependency array ensures that this effect runs only once on component mount
    //
    // // Function to format a date to the string format (YYYY-MM-DD)
    // const formatDate = (date) => {
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    //     const day = date.getDate().toString().padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // };

    const [selectedDateRange, setSelectedDateRange] = useState('This year');

    // Fetch data based on the selected date range from Laravel API
    const handleDateRangeChange = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/data-search?date-range=${selectedDateRange}`);
            setData(response.data);
            if (response.data.length === 0) {
                alert('No records found.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // Trigger the effect when date-range values change
    useEffect(() => {
        handleDateRangeChange();
    }, [selectedDateRange]); // Trigger the effect when date-range values change

    // Handle import functionality
    const handleImport = () => {
        // Make a request to the Google Sheets API endpoint
        axios.get(`http://127.0.0.1:8000/api/google-spreadsheet-api?dateFrom=${dateFrom}&dateTo=${dateTo}`)
            .then(response => {
                // Handle the response data as needed
                console.log('Data imported successfully:', response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error importing data:', error);
            });
    };
    // Handle delete functionality
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/data/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.  Status: ${response.status}');
            }
            const data = await response.json();
            console.log('Success:', data);

        } catch (error) {
            console.error('Error:', error);
            window.alert(error);
        }
    };
    // Handle delete confirmation
    const handleDeleteConfirmation = (itemId, pdate) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete ${pdate.slice(0,7)}?`);

        if (isConfirmed) {
            // User confirmed, proceed with the delete operation
            handleDelete(itemId);
        } else {
            // User canceled the delete operation
            console.log("Delete canceled");
        }
    };

  return (
    <Wrapper className="dashboard-container">
      <AdminNav />
      <Heading heading="data management" />
      <div className="filter">
        <div className="date">
          <FormRow
            type="date"
            name="dateFrom"
            value={dateFrom}
            placeholder="Date From"
            onChange={handleChange}
          />
          <FormRow
            type="date"
            name="dateTo"
            value={dateTo}
            placeholder="Date To"
            onChange={handleChange}
          />

          <button
            className="import-btn"
            onClick={handleImport}
          >
            import data
          </button>
        </div>
        <div className="date-range">
          <label htmlFor="date-range">display by: </label>
          <select name="date-range" id="date-range" value={selectedDateRange} onChange={(e) => setSelectedDateRange(e.target.value)}>
            {dateRange.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="data-table">
        <table className="table striped table-hover">
          <thead>
            <tr style={{ borderStyle: "none !important" }}>
              {dataManagementTableHeader.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.pdate.substring(0, 7).replace('-','/')} </td>
                  <td>{item.number_of_merchant}</td>
                  <td>{item.first_name + ' ' + item.last_name} </td>
                  <td>{DateTimeFormatter({ datetime: item.created_at })}</td>
                  <td>{DateTimeFormatter({ datetime: item.deleted_datetime })}</td>

                  <td>
                    <button
                      disabled={item.deleted_datetime ? true : false}
                      style={{ color: item.deleted_datetime ? "#9e9e9e" : "" }}
                      className="deleteBtn"
                      onClick={() =>
                          handleDeleteConfirmation(item.id, item.pdate)
                      }
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination data={data} />
    </Wrapper>
  );
};

const DateTimeFormatter = ({ datetime }) => {
    const formatDateTime = (datetime) => {
        if (!datetime) {
            return ""; // or return a default value
        }

        const dateObject = new Date(datetime);
        const formattedDateTime = dateObject.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        // Custom formatting to match "YYYY/MM/DD HH:MM:SS"
        const formattedDate = dateObject.getFullYear() +
            '/' + (dateObject.getMonth() + 1).toString().padStart(2, '0') +
            '/' + dateObject.getDate().toString().padStart(2, '0');

        const formattedTime = dateObject.getHours().toString().padStart(2, '0') +
            ':' + dateObject.getMinutes().toString().padStart(2, '0') +
            ':' + dateObject.getSeconds().toString().padStart(2, '0');

        return `${formattedDate} ${formattedTime}`;
    };

    // Ensure datetime is a string before attempting to create a Date object
    if (typeof datetime === 'string') {
        datetime = new Date(datetime); // Convert the string to a Date object
    }

    return <span>{formatDateTime(datetime)}</span>;
};

const Wrapper = styled.section`
  .filter {
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
    margin-top: 1rem;
  }

  .date {
    display: flex;
    column-gap: 1rem;
  }

  .import-btn {
    color: #ffffff;
    padding: 0.5rem 1rem;
    text-transform: capitalize;
    border: 1px solid #624de3;
    border-radius: 0.5rem;
    background-color: #624de3;
  }

  .date-range label {
    color: #000000;
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }

  .date-range select {
    color: #858585;
    height: 80%;
    border-color: #9e9e9e;
    border-radius: 5px;
    margin-right: 0.5rem;
  }

  .disable {
    color: #9e9e9e;
  }

  @media (max-width: 820px) {
    .date {
      row-gap: 0.5rem;
    }

    .filter input {
      width: 130px;
    }
    .import-btn {
      color: #ffffff;
      padding: 0 0.5rem;
    }

    .date-range {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      label {
        font-size: 1rem;
      }

      select {
        width: 130px;
        margin-right: 0;
      }
    }

    tr,
    td {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }

    .data-table {
      margin-top: 1.5rem;
    }

    .data-table td {
      align-content: center;
      vertical-align: middle;
    }
  }

  @media (max-width: 576px) {
    .filter {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 0.75rem;
    }

    .date {
      flex-direction: column;
      row-gap: 0.75rem;
      grid-row: 2;
      input {
        width: 100%;
      }
      .import-btn {
        padding: 0.5rem;
      }
    }

    .date-range {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-row: 1;
      height: 50px;
      select {
        width: 100%;
        margin-right: 0;
      }
    }
  }
`;
export default DataManagement;
