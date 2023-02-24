import './App.css';
import { useState, useEffect, useRef } from 'react'
// router 관련 모듈 추가
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Animals from './pages/Animals';
import Detail from './pages/Detail';

function App() {

  const [animals, setAnimals] = useState([]) // 동물 데이터
  const [totalCount, setTotalCount] = useState(0); // 총 글수
  const [pageNo, setPageNo] = useState(1);  // 페이지번호
  const [maxPages, setMaxPages] = useState(0); // 마지막 페이지
  const [rows, setRows] = useState(10); // 화면당 글수
  const [search, setSearch] = useState(''); // 검색 입력값

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
    <BrowserRouter>
      <nav>
        <Link to='/'>홈</Link>
        <Link to='/animals'>동물정보</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route 
          path='/animals' 
          element={
          <Animals
            animals={animals} 
            totalCount={totalCount}
            pageNo={pageNo}
            setPageNo={setPageNo}
            maxPages={maxPages}
            rows={rows}
            search={search}
            setSearch={setSearch}
            prevPage={prevPage}
            nextPage={nextPage}
          />
          } 
          />
        <Route 
          path='/detail/:id' 
          element={<Detail animals={animals} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
