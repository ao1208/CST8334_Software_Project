import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Verification = ({ setVerifySuccess, email }) => {
  const [invalidCodeError, setInvalidCodeError] = useState(false);
  const [timeExpiredError, setExpiredError] = useState(false);
  return (
    <Wrapper>
      <div className="login-container">
        <h2>code verification</h2>
        <p>Enter OTP (One tone password) sent to {email}</p>

        {/* verify code need to implement,
        
        if code not verify successfully, based on the error type, setInvalidCodeError or setExpiredError to true. 
        
        if code verify successfully, setVerifySuccess to true, setInvalidCodeError and setExpiredError back to false */}
        <form action="#">
          <div className="code-container">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                type="text"
                style={{
                  borderColor:
                    invalidCodeError || timeExpiredError ? "#ee0004" : null,
                }}
              />
            ))}
          </div>
          <div className="error">
            {timeExpiredError && (
              <p>OTP expired. Please generate a new OTP and try again!</p>
            )}
            {invalidCodeError && <p>Invalid OTP. Please try again!</p>}
            {!timeExpiredError && (
              <span
                style={{
                  width: !timeExpiredError && !invalidCodeError ? "100%" : null,
                }}
              >
                2:00 minutes
              </span>
            )}
          </div>
          {/* verify code function need to implement   */}
          <button type="submit" className="verify-btn">
            verify code
          </button>
          {/* resent code link function need to implement */}
          <button type="submit" className="resent-btn">
            {" "}
            resent
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  text-align: left;
  justify-content: center;
  height: 100vh;

  h2 {
    color: #010101;
    padding: 3rem 0 0 2rem;
    text-transform: uppercase;
  }

  p {
    margin-left: 2rem;
    color: #3d3d3d;
  }

  form {
    display: grid;
    align-items: center;
    text-align: left;
    padding: 3rem;
  }

  .code-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .error {
    display: flex;
    color: #ee0004;
    justify-content: space-between;
    margin-bottom: 5rem;
  }

  .error p {
    color: #ee0004;
    text-align: left;
    margin-left: 0;
    margin-top: 0.25rem;
  }

  .error span {
    color: #1a1a1a;
    text-align: right;
    margin-top: 0.25rem;
  }

  input {
    width: 70px;
    height: 50px;
    border: 1px solid #e6e6e6;
    border-radius: 0.25rem;
  }

  input:hover {
    border-color: #543fd3;
  }

  .error-sign {
    display: inline-block;
    width: 18px;
    height: 18px;
    color: #ffffff;
    text-align: center;
    border-radius: 50%;
    background-color: #ee0004;
    margin-left: 1rem;
  }

  .verify-btn {
    width: 30%;
    margin: auto;
    color: #ffffff;
    font-size: 1.25rem;
    text-transform: capitalize;
    letter-spacing: 1px;
    background-color: #331e82;
    padding: 0.5rem;
    border: 1px solid;
    border-radius: 0.25rem;
  }

  .resent-btn {
    color: #331e82;
    width: 25%;
    margin: auto;
    border: none;
    text-align: center;
    margin-top: 1rem;
    background-color: transparent;
    letter-spacing: 1px;
    text-transform: capitalize;
    text-decoration: none;
    font-size: 1.5rem;
  }

  @media (max-width: 576px) {
    .error {
      margin-bottom: 2.5rem;
    }

    input {
      width: 45px;
      height: 35px;
    }
    .verify-btn {
      width: 50%;
    }

    form {
      padding: 1.5rem;
    }
  }
`;

export default Verification;
