import { styled } from "styled-components";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
const UserSearchContainer = ({ setApiUrl, link, text }) => {
    const [search, setSearch] = useState("");

    const handleSubmit = () => {
        let url = 'http://127.0.0.1:8000/api/user-search';

        if (search) {
            url += `?keyword=${search}`;
        }else {
            setApiUrl('http://127.0.0.1:8000/api/user'); // Set the default URL if searchTerm is empty
            return;
        }
        setApiUrl(url);
    };

    return (
        <Wrapper>
            <div className="searchContainer">
                <div className="search-wrapper">
                    <FiSearch className="search-icon" />
                    <input type="text"
                           name="search"
                           placeholder="Search..."
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                    />

                    <button className="searchBtn" onClick={handleSubmit}>Search</button>
                </div>
                <div className="btn-container">
                    <button className="addBtn">
                        <Link to={link}>+ {text}</Link>
                    </button>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.article`
  .searchContainer {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    /* margin-top: 0.5rem; */
  }

  .searchContainer .search-wrapper {
    position: relative;
  }

  .search-icon {
    position: absolute;
    color: #9e9e9e;
    font-size: 1.25rem;
    top: 0.75rem;
    margin-left: 0.25rem;
  }

  .searchContainer input {
    padding: 0.25rem 1rem;
    width: 300px;
    height: 40px;
    border: 1px solid #9e9e9e;
    border-radius: 0.5rem;
    padding-left: 2rem;
  }
  .searchBtn,
  .addBtn {
    color: #ffffff;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    background-color: #426b1f;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .addBtn {
    background-color: #624de3;
    a {
      color: #ffffff;
      text-transform: capitalize;
      text-decoration: none;
    }
  }

  @media (max-width: 576px) {
    .searchContainer {
      display: grid;
      grid-template-columns: 1fr;
      width: 100%;
    }
    .searchContainer .search-wrapper {
      display: flex;
      width: 100%;

      input {
        width: 100%;
      }
    }
    .searchBtn {
      margin-left: 1rem;
      padding: 0.25rem 0.5rem;
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
      grid-row: 1;
      margin-bottom: 0.75rem;
    }
    .addBtn {
      width: 80px;
      justify-self: end;
      padding: 0.5rem 0;
      font-size: 1rem;
    }

    .search-icon {
      top: 0.5rem;
    }
  }
`;
export default UserSearchContainer;
