import styled from "styled-components";

const TopSales = () => {
  // use fake data here, real data need to calculate and import
  const top10 = [
    { rank: "No.1", name: "Michael", performance: 2000.0 },
    { rank: "No.2", name: "Sarah", performance: 1800.5 },
    { rank: "No.3", name: "John", performance: 1750.25 },
    { rank: "No.4", name: "Emily", performance: 1600.75 },
    { rank: "No.5", name: "David", performance: 1500.0 },
    { rank: "No.6", name: "Sophia", performance: 1400.5 },
    { rank: "No.7", name: "James", performance: 1300.25 },
    { rank: "No.8", name: "Olivia", performance: 1250.75 },
    { rank: "No.9", name: "Daniel", performance: 1100.0 },
    { rank: "No.10", name: "Isabella", performance: 1050.5 },
  ];
  return (
    <Wrapper>
      <h3>Top 10 Sales</h3>
      <small>As of May 2023</small>
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
                <td>{salesperson.name}</td>
                <td>{salesperson.performance}</td>
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
