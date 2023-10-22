import styled from "styled-components";

const SalesTable = ({ columnMappings, data }) => {
  return (
    <Wrapper>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {Object.keys(columnMappings).map((column) => (
              <th key={column}>{columnMappings[column]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index}>
              {Object.keys(record).map((column) => {
                return (
                  <td key={column}>
                    {record[column] ? record[column] : "$ --"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 1rem;
  .table {
    width: 100%;
    margin-bottom: 0;
    min-height: 50vh;
  }
  @media (max-width: 820px) {
    tr,
    td {
      display: grid;
      grid-template-columns: auto auto auto auto auto;
    }
    .table {
      min-height: 0;
    }
  }

  @media (max-width: 576px) {
    tr,
    td {
      display: grid;
      font-size: 0.75rem;
      grid-template-columns: auto auto auto;
    }
  }
`;
export default SalesTable;
