import './App.css';
import { useState, useEffect, useRef } from 'react'
import Items from './components/Items'

function App() {
  const [animals, setAnimals] = useState([]) // 동물 데이터
  const [totalCount, setTotalCount] = useState(0); // 총 글수
  const [pageNo, setPageNo] = useState(1);  // 페이지번호
  const [maxPages, setMaxPages] = useState(0); // 마지막 페이지
  const [rows, setRows] = useState(10); // 화면당 글수
  const [search, setSearch] = useState(''); // 검색어
  const inputRef = useRef(); // 검색창 요소의 위치 참조

  // 페이지당 요청
  const getAnimalData = () => {
    const API_KEY = `sXxYjidiN3t6GurP%2FlL532W8cmmt4qCl%2F%2BFF72uNIWACqGGmumk6enycmK39NmiGxpmGhhxqFXvWYu4zH8f3zg%3D%3D`;
    const API_URL = `https://apis.data.go.kr/6260000/BusanPetAnimalInfoService/getPetAnimalInfo?serviceKey=${API_KEY}&numOfRows=${rows}&pageNo=${pageNo}&resultType=json${search}`;    
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data.getPetAnimalInfo.body)
        const items = data.getPetAnimalInfo.body.items.item;
        // 데이터를 state에 저장
        setAnimals(items);
        // 전체글
        setTotalCount(data.getPetAnimalInfo.body.totalCount);
        // 마지막 페이지(총게시물 / 행수)
        setMaxPages(Math.ceil(totalCount / rows))
      })
      .catch(() => {
        console.log('데이터 요청 에러');
        // setSearch('')
        setAnimals([])
      })
  }

  // 이전 페이지
  const nextPage = () => {
    if(pageNo < maxPages) setPageNo(pageNo + 1)
  }

  // 다음 페이지
  const prevPage = () => {
    if(pageNo > 1) setPageNo(pageNo - 1);
  }

  useEffect(() => {
    getAnimalData();

  }, [pageNo, totalCount, search])

  console.log('animals = ', animals)
  console.log('totalCount = ', totalCount)
  console.log('maxPages = ', maxPages);

  return (
    <div className='App'>
      <h1>동물구조 현황(부산)</h1>
      <form onSubmit={ (e) => {
        e.preventDefault();
        // 입력창에 입력된 값 참조(ref={inputRef})
        let val = inputRef.current.value; // input 값
        console.log(val)
        if(val == '') {
          setSearch(val);  // 아무 입력입 없을 때
        } else {
          setSearch(`&sj=${val}`); // 입력값이 있으면
        }  
        setPageNo(1)
      }}>
        <input 
          onInput={ (e) => {
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
        (animals.length > 0) ?  <Items animals={animals} /> : (<p>자료가 없습니다.</p>)
      }
      {/* 페이징 */}
      <p>Page: {pageNo} / {maxPages}</p>
      <p>{totalCount}건 등록</p>
      <a href="#" onClick={prevPage}>이전 페이지</a>
      <span> | </span>
      <a href="#" onClick={nextPage}>다음 페이지</a>
    </div>
  );
}

export default App;
