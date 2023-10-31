import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { sales_nav_links } from "../utils/Links";

const SalesNav = () => {
  const location = useLocation();
  return (
    <Wrapper>
      <div>
        <h1>sales Management system</h1>
      </div>
      <div className="nav-links">
        <nav>
          {sales_nav_links.map((link) => {
            const { id, text, path } = link;
            return (
              <button
                key={id}
                className={`link ${
                  location.pathname === path ? "active-link" : ""
                }`}
              >
                <Link
                  to={path}
                  style={{ color: location.pathname === path ? "#FFFFFF" : "" }}
                >
                  {text}
                </Link>
              </button>
            );
          })}
        </nav>
        <button className="logout">
          <Link to="/">Logout</Link>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;

  .nav-links {
    display: flex;
    justify-content: space-evenly;
    justify-content: center;
    align-items: center;
  }

  .link {
    padding: 0.5rem;
    background-color: transparent;
    border: none;
    border-radius: 0.25rem;
    margin-right: 1rem;
  }

  .active-link {
    background-color: #426b1f;
  }
  .logout {
    background-color: #624de3;
    padding: 0.25rem 1.25rem;
    border: 1px solid #624de3;
    border-radius: 0.25rem;
    margin-left: 1rem;
  }

  .logout a {
    color: #ffffff;
  }

  h1 {
    color: #426b1f;
    text-transform: capitalize;
  }

  a {
    color: #000000;
    text-decoration: none;
    letter-spacing: 1px;
    font-size: 1rem;
    font-weight: 500;
  }
  @media (max-width: 820px) {
    h1 {
      font-size: 1.75rem;
    }
  }
  @media (max-width: 576px) {
    display: grid;
    .nav-links {
      margin-top: 1rem;
    }
  }
`;
export default SalesNav;
