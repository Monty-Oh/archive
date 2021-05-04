import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import "./Pages.scss";

const Pages = ({ page, howManyPages, changePage }) => {
  const [pageList, setPageList] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  useEffect(() => {
    if (howManyPages !== 0) {
      let nextPageList = [];
      let next_start = 0,
        next_end = 0;

      // 페이지의 총 길이가 5페이지 이전일 때
      if (howManyPages <= 5) {
        for (let i = 1; i <= howManyPages; i++) nextPageList.push(i);

        // 현재 페이지가 3 이하일 때
      } else if (page <= 3) {
        nextPageList = [1, 2, 3, 4, 5];
        next_end = howManyPages;

        // 끝에 다다랐을 때
      } else if (page >= howManyPages - 2) {
        nextPageList = [
          howManyPages - 4,
          howManyPages - 3,
          howManyPages - 2,
          howManyPages - 1,
          howManyPages,
        ];
        next_start = 1;

        // 그냥 보통 일 때
      } else {
        nextPageList = [page - 2, page - 1, page, page + 1, page + 2];
        next_start = 1;
        next_end = howManyPages;
      }
      setStart(next_start);
      setEnd(next_end);
      setPageList(nextPageList);
    }
  }, [page, howManyPages]);
  return (
    <div className="Pages">
      <table>
        <tbody>
          <tr>
            {start !== 0 && (
              <td className="pointer" onClick={() => changePage(1)}>
                {start}
              </td>
            )}
            {start !== 0 && (
              <td>
                <button className="LeftRightButton" onClick={() => {
                  (page - 5) < 1 ? changePage(1) : changePage(page - 5);
                }}>
                  <MdKeyboardArrowLeft />
                </button>
              </td>
              )}
            {/* {start !== 0 && <td className="threePoint">···</td>} */}
            {pageList.map((value, index) => (
              <td
                className={value === page ? "page" : "pointer"}
                key={index}
                onClick={() => changePage(value)}
              >
                {value}
              </td>
            ))}
            {end !== 0 && (
              <td>
                <button className="LeftRightButton" onClick={() => {
                  (page + 5 > howManyPages) ? changePage(howManyPages) : changePage(page + 5);
                }}>
                  <MdKeyboardArrowRight />
                </button>
              </td>
              )}
            {end !== 0 && (
              <td className="pointer" onClick={() => changePage(howManyPages)}>
                {end}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Pages;
