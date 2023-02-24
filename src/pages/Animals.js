import { useRef } from 'react';
import Items from '../components/Items';

// App.js 에서 동물데이터와 state들을 가져옴
export default function Animals({
  animals, // 동물 데이터
  totalCount, 
  pageNo, 
  maxPages, 
  rows, 
  search, 
  setSearch,  // 검색어 입력
  setPageNo,  
  prevPage,
  nextPage
}) {
  const inputRef = useRef(); // 검색창 요소의 위치 참조

  return (
    <div className='App'>
      <h1>동물구조 현황(부산)</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        // 입력창에 입력된 값 참조
        let val = inputRef.current.value; // input 값
        console.log(val)
        if (val == '') {
          setSearch(val);  // 아무 입력 없을 때
        } else {
          setSearch(`&sj=${val}`); // 입력값이 있으면
        }
        setPageNo(1); // 첫 페이지
      }}>
        <input
          onInput={(e) => {
            console.log(e.target.value);
          }}
          ref={inputRef} type="search" name="s" placeholder='검색어 입력' />
        <button>검색</button>
      </form>
      {/* 페이징 */}
      <p>Page: {pageNo} / {maxPages}</p>
      <p>총 {totalCount}건 등록</p>
      <a href="#" onClick={prevPage}>이전 페이지</a>
      <span> | </span>
      <a href="#" onClick={nextPage}>다음 페이지</a>
      {
        (animals.length > 0) ? <Items animals={animals} /> : (<p>자료가 없습니다.</p>)
      }
      {/* 페이징 */}
      <p>Page: {pageNo} / {maxPages}</p>
      <p>{totalCount}건 등록</p>
      <a href="#" onClick={prevPage}>이전 페이지</a>
      <span> | </span>
      <a href="#" onClick={nextPage}>다음 페이지</a>
    </div>

  )
}
