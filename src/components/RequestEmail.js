import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
const RequestEmail = ({ setRequestSuccess, setEmail }) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <Wrapper>
      <div className="login-container">
        <h2>forgot password</h2>
        <p>
          Provide your account email for which you want to resent your password
        </p>
        {/* verify email need to implement, 
        if email not verify successfully, setIsError to true. 

        if email verify successfully, setRequestSuccess to true, setIsError to false, and setEmail to user email. */}
        <form action="#">
          <div className="email-container">
            {" "}
            <label
              htmlFor="email"
              style={{ color: isError ? "#ee0004" : "#1a1a1a" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onMouseEnter={() => setIsMouseEnter(true)}
              style={{ borderColor: isError ? "#ee0004" : null }}
            />
            {isError && (
              <span className="error-sign">
                <span>!</span>
              </span>
            )}
            {isMouseEnter && <p>Please enter your registered email</p>}
            {isError && (
              <p className="error">
                Invalid email. Please enter your registered email
              </p>
            )}
          </div>
          {/* request code verification link need to implement */}
          <button
            type="submit"
            className="request-btn"
            onClick={() => setIsMouseEnter(false)}
          >
            {" "}
            next
          </button>
          <Link to="/" className="cancel-link">
            cancel
          </Link>
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
    padding: 3rem 0;
  }

  .email-container {
    margin-left: 4rem;
    margin-bottom: 5rem;
  }

  .email-container p {
    color: #595959;
    margin-left: 0;
    margin-top: 0.25rem;
  }

  label {
    display: block;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.25rem;
  }

  input {
    width: 80%;
    height: 35px;
    border: 1px solid #e6e6e6;
    border-radius: 0.25rem;
  }

  input:hover {
    border-color: #543fd3;
  }

  .error {
    color: #ee0004;
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
  .request-btn {
    width: 25%;
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

  .cancel-link {
    color: #331e82;
    margin: 1.5rem 0;
    letter-spacing: 1px;
    text-transform: capitalize;
    text-decoration: none;
    font-size: 1.25rem;
    text-align: center;
  }

  @media (max-width: 576px) {
    .email-container {
      margin-left: 2rem;
      margin-bottom: 2.5rem;
    }

    .request-btn {
      width: 40%;
    }

    form {
      padding: 1.5rem 0;
    }
  }
`;

export default RequestEmail;
