import { styled } from "styled-components";
import { Heading, FormRow, Pagination, AdminNav } from "../../components";
import { dateRange } from "../../utils/DateRange";
import { dataManagementTableHeader } from "../../utils/TableColumnMapping";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import {useState} from "react";

const data = [
  {
    pdate: "2023/1",
    numOfMerchant: 6,
    userId: "goopter",
    importTime: "2023-03-01 09:00:00",
    deleteTime: "2023-03-24 09:00:00",
  },
  {
    pdate: "2023/1",
    numOfMerchant: 6,
    userId: "goopter",
    importTime: "2023-03-01 09:00:00",
  },
  {
    pdate: "2023/1",
    numOfMerchant: 6,
    userId: "goopter",
    importTime: "2023-03-01 09:00:00",
    deleteTime: "2023-03-24 09:00:00",
  },
  {
    pdate: "2023/1",
    numOfMerchant: 6,
    userId: "goopter",
    importTime: "2023-03-01 09:00:00",
  },
  {
    pdate: "2023/1",
    numOfMerchant: 6,
    userId: "goopter",
    importTime: "2023-03-01 09:00:00",
  },
  {
    pdate: "2023/1",
    numOfMerchant: 6,
    userId: "goopter",
    importTime: "2023-03-01 09:00:00",
  },
];
const DataManagement = () => {

    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "dateFrom") {
            setDateFrom(value);
        } else if (name === "dateTo") {
            setDateTo(value);
        }
    };

    const handleImportData = () => {
        const params = {
            dateFrom: {dateFrom},
            dateTo: {dateTo},
            // dateFrom: '2023-01-01',
            // dateTo: '2023-01-31'
        };

        console.log(params.dateFrom)
        console.log(params.dateTo)
        // Make a request to the Google Sheets API endpoint
        axios.get(`http://127.0.0.1:8000/api/google-spreadsheet-api?${params.dateFrom}&${params.dateTo}`)
            .then(response => {
                // Handle the response data as needed
                console.log('Data imported successfully:', response.data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error importing data:', error);
            });
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
            placeholder="Date From"
            onChange={handleChange}
          />
          <FormRow
            type="date"
            name="dateTo"
            placeholder="Date To"
            onChange={handleChange}
          />

          <button
            className="import-btn"
            onClick={handleImportData}
            // onClick={() => {
            //   // window.alert("function need to implement");
            //     handleImportData()
            // }}
          >
            import data
          </button>
        </div>
        <div className="date-range">
          <label htmlFor="date-range">display by: </label>
          <select name="date-range" id="date-range">
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
                  <td>{item.pdate} </td>
                  <td>{item.numOfMerchant}</td>
                  <td>{item.userId} </td>
                  <td>{item.importTime} </td>
                  <td>{item.deleteTime} </td>

                  <td>
                    {/* delete function need to implement */}
                    <button
                      disabled={item.deleteTime ? true : false}
                      style={{ color: item.deleteTime ? "#9e9e9e" : "" }}
                      className="deleteBtn"
                      onClick={() =>
                        window.alert("Function haven't implement yet")
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
