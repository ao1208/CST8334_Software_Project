import styled from "styled-components";

const Heading = ({ heading }) => {
  return (
    <Wrapper>
      <h3>{heading}</h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h3 {
    color: #ffffff;
    width: 100%;
    padding: 1rem;
    text-transform: capitalize;
    text-align: center;
    font-weight: 400;
    background-color: #1d1e42;
    letter-spacing: 1px;
  }
`;
export default Heading;
