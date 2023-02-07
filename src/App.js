import './App.css';
import { useState, useEffect } from 'react'
import Items from './components/Items'

function App() {
  const [animals, setAnimals] = useState([]) // 동물 데이터
  const [totalCount, setTotalCount] = useState(0); // 총 글수
  const [pageNo, setPageNo] = useState(1);  // 페이지번호
  const [maxPages, setMaxPages] = useState(0); // 마지막 페이지
  const [rows, setRows] = useState(10); // 화면당 글수

  const getAnimalData = () => {
    const API_KEY = `sXxYjidiN3t6GurP%2FlL532W8cmmt4qCl%2F%2BFF72uNIWACqGGmumk6enycmK39NmiGxpmGhhxqFXvWYu4zH8f3zg%3D%3D`;
    const API_URL = `https://apis.data.go.kr/6260000/BusanPetAnimalInfoService/getPetAnimalInfo?serviceKey=${API_KEY}&numOfRows=${rows}&pageNo=${pageNo}&resultType=json`;    
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
        console.log('데이터 요청 에러')
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
  }, [pageNo, totalCount])

  console.log('animals = ', animals)
  console.log('totalCount = ', totalCount)
  console.log('maxPages = ', maxPages);

  return (
    <div className='App'>
      <h1>동물구조 현황(부산)</h1>
      {/* 페이징 */}
      <p>Page: {pageNo} / {maxPages}</p>
      <p>{totalCount}건 등록</p>
      <button onClick={prevPage}>이전 페이지</button>
      <button onClick={nextPage}>다음 페이지</button>
      {
        (animals.length > 0) ?  <Items animals={animals} /> : (<p>로딩중...</p>)
      }
      {/* 페이징 */}
      <p>Page: {pageNo} / {maxPages}</p>
      <p>{totalCount}건 등록</p>
      <button onClick={prevPage}>이전 페이지</button>
      <button onClick={nextPage}>다음 페이지</button>
    </div>
  );
}

export default App;
