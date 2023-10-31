import styled from "styled-components";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
const Pagination = ({ data }) => {
  // pagination function need to implement here !!!
  //   how many pages need to show on the screen, go to corresponding page
  //    after click the corresponding button
  const numOfPages = data.length / 2;
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  const page = 1;
  const prev = () => {};
  const next = () => {};
  return (
    <Wrapper>
      {numOfPages >= 1 && (
        <div className="pageBtn-container">
          <button className="prev-btn" onClick={prev}>
            <HiChevronDoubleLeft /> prev
          </button>
          <div className="btn-container">
            {pages.map((pageNumber) => {
              return (
                <button
                  key={pageNumber}
                  type="button"
                  className={pageNumber === page ? "pageBtn active" : "pageBtn"}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <button className="next-btn" onClick={next}>
            next
            <HiChevronDoubleRight />
          </button>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .pageBtn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    margin-top: 3rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .btn-container {
    color: #000000;
    font-size: 1.25rem;
    background: transparent;
  }

  .pageBtn {
    width: 50px;
    height: 40px;
    background: #e0e0e0;
    border-color: transparent;
    font-weight: 500;
    margin: 0 0.5rem;
    transition: var(--transition);
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .active,
  .pageBtn:hover {
    background: #624de3;
    color: #ffffff;
  }
  .prev-btn,
  .next-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    color: #9e9e9e;
    font-weight: 500;
    font-size: 1.25rem;
    background: transparent;
    border: none;
    text-transform: capitalize;
    letter-spacing: 1px;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .prev-btn:hover,
  .next-btn:hover {
    color: #624de3;
  }

  @media (max-width: 576px) {
    .prev-btn,
    .next-btn,
    .btn-container {
      font-size: 0.75rem;
    }
    .prev-btn,
    .next-btn,
    .pageBtn {
      width: 35px;
      height: 35px;
    }

    .prev-btn,
    .next-btn {
      svg {
        display: none;
      }
    }

    .pageBtn-container {
      height: 3rem;
      margin-top: 1.5rem;
    }
  }
`;
export default Pagination;
