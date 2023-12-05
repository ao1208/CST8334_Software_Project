import { styled } from "styled-components";
import { VscCalendar } from "react-icons/vsc";

const FormRow = ({ type, labelName, name, value, onChange, placeholder }) => {
  return (
    <Wrapper>
      {type === "file" ? (
        <>
          <label htmlFor={name}>{labelName}</label>
          <input
            id="image"
            name={name}
            type="file"
            accept="image/*"
            onChange={onChange}
            className="image"
          />
        </>
      ) : type === "date" ? (
        <div className="date">
          {labelName && <label htmlFor={name}>{labelName}</label>}
          <VscCalendar className="calendar-icon" />
          <input
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={onChange}
          />
        </div>
      ) : type === "radio" ? (
        <>
          <label htmlFor="role">Role</label>
          <div className="role-container">
            <div>
              <input
                type="radio"
                id="administrator"
                name="role"
                checked={value == 1}
                value="1"
                onChange={onChange}
              />
              <label htmlFor="administrator">Administrator</label>
            </div>
            <div>
              {" "}
              <div>
                <input
                  type="radio"
                  id="salesperson"
                  name="role"
                  checked={value == 2}
                  value="2"
                  onChange={onChange}
                />
                <label htmlFor="salesperson">Salesperson</label>
              </div>
            </div>
          </div>
        </>
      ) : type === "select" ? (
        <>
          <label htmlFor="role">status</label>
          <div className="status-container">
            <select name="status" id="status" value={value} onChange={onChange}>
              <option value="1">1 Enable</option>
              <option value="2">2 Disable</option>
            </select>

            <p>
              This dropdown menu has: <span>1 Enable</span>
              <span>2 Disable</span>
            </p>
          </div>
        </>
      ) : (
        <>
          {labelName && <label htmlFor={name}>{labelName}</label>}
          <input
            type="search"
            name={name}
            value={value}
            id={name}
            placeholder={placeholder ? placeholder : ""}
            // placeholder={`Enter ${labelName || name}`}
            onChange={onChange}
          />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  label {
    display: block;
    color: #1c1c1c;
    font-size: 1.25rem;
    font-weight: 500;
    text-transform: capitalize;
  }

  input,
  select {
    width: 100%;
    height: 40px;
    border: 1px solid #858585;
    border-radius: 0.5rem;
  }

  .image {
    border: none;
    border-radius: 0;
  }
  .role-container div {
    display: flex;
    align-items: center;
  }

  .role-container label {
    display: inline;
    color: #6c757d;
  }

  .role-container input {
    width: 20px;
    height: 40px;
    margin-right: 1rem;
  }

  .status-container p {
    color: #ee0004;
    margin-top: 0.5rem;
    span {
      margin-right: 0.5rem;
    }
  }

  input[type="search"]::placeholder {
    text-indent: 0.75rem;
  }

  [type="search"] {
    outline-offset: 0;
    padding-left: 1rem;
  }

  input[type="radio"]:checked + label {
    color: #1f9254;
  }

  input[type="radio"]:checked {
    accent-color: #1f9254 !important;
  }

  @media (max-width: 576px) {
    label {
      font-size: 1rem;
    }
  }
`;

export default FormRow;
