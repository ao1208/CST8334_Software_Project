import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { admin_nav_links } from "../utils/Links";
import styled from "styled-components";
import { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  return (
    <Wrapper>
      <aside className={isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}>
        <div className="sidebar-header">
          <button
            type="button"
            className="close-btn"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <FaTimes />
          </button>
        </div>
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
      </aside>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  .sidebar-header {
    display: grid;
    justify-content: flex-start;
    grid-template-columns: 1fr;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: #426b1f;
    transition: var(--transition);
    cursor: pointer;
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: #426b1f;
  }

  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: #426b1f;
  }
  .active-link {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background-color: #426b1f;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scaleX(1);
    transition: transform 0.2s ease;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }

  @media screen and (min-width: 768px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;
