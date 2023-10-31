import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { admin_nav_links } from "../utils/Links";
const AdminNav = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <h1>sales Management system</h1>

      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {admin_nav_links.map((item) => {
            if (item.children) {
              return (
                <li className="nav-item dropdown" key={item.id}>
                  <a
                    className={`nav-link dropdown-toggle ${
                      item.children.some(
                        (subItem) => subItem.path === location.pathname
                      )
                        ? "active-link"
                        : ""
                    }`}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {item.text}
                  </a>
                  <ul className="dropdown-menu">
                    {item.children.map((subItem) => (
                      <li key={subItem.id}>
                        <a
                          className="dropdown-item underline"
                          href={subItem.path}
                        >
                          {subItem.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            } else {
              return (
                <li className="nav-item" key={item.id}>
                  <a
                    className={`nav-link underline ${
                      location.pathname === item.path ? "active-link" : ""
                    }`}
                    aria-current="page"
                    href={item.path}
                  >
                    {item.text}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </nav>

      <button className="logout">
        <Link to="/">Logout</Link>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2.5rem 0;

  h1 {
    color: #426b1f;
    text-transform: capitalize;
  }

  .nav-item {
    margin: 0 0.5rem;
  }

  .active-link {
    color: #ffffff !important;
    background-color: #426b1f;
    border: 1px solid #426b1f;
    border-radius: 0.5rem !important;
  }

  .logout {
    height: 40px;
    background-color: #624de3;
    padding: 0 1rem;
    border: 1px solid #624de3;
    border-radius: 0.25rem;
    margin-left: 1rem;
  }

  .logout a {
    color: #ffffff;
  }

  a {
    position: relative;
    color: #000000;
    text-decoration: none;
    letter-spacing: 1px;
    font-size: 1rem;
    font-weight: 500;
  }
  .underline::after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background-color: #426b1f;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .underline:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 820px) {
    display: grid;

    .navbar-nav {
      width: 100%;
      flex-direction: row;
    }

    .logout {
      position: absolute;
      top: 3rem;
      right: 9rem;
    }
  }

  @media (max-width: 576px) {
    display: grid;

    .navbar-nav {
      display: grid;
      grid-template-columns: auto auto;
    }

    .logout {
      width: 30%;
      padding: 0;
      margin-left: 0.5rem;
      position: relative;
      top: 0;
      right: 0;
    }
  }
`;
export default AdminNav;
