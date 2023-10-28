import { styled } from "styled-components";
import { VscCalendar } from "react-icons/vsc";

const SelectDate = ({ labelName, name }) => {
  return (
    <Wrapper>
      <label>{labelName}</label>
      <VscCalendar className="calendar-icon" />

      <input
        type="text"
        name={name}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  label {
    display: block;
    text-transform: capitalize;
  }

  input {
    padding-left: 2rem;
  }

  .calendar-icon {
    position: absolute;
    color: #aaaaaa;
    margin: 0.25rem;
    font-size: 1.5rem;
  }
`;

export default SelectDate;
