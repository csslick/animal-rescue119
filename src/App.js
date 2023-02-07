import './App.css';
import { useState, useEffect } from 'react'
import Items from './components/Items'

function App() {
  const [animals, setAnimals] = useState([])
  const [totalCount, setTotalCount] = useState(0); // 총 글수
  const [pageNo, setPageNo] = useState(1);  // 페이지번호
  const [maxPages, setMaxPages] = useState(0); //

  const getAnimalData = () => {
    const API_KEY = `sXxYjidiN3t6GurP%2FlL532W8cmmt4qCl%2F%2BFF72uNIWACqGGmumk6enycmK39NmiGxpmGhhxqFXvWYu4zH8f3zg%3D%3D`;
    const API_URL = `https://apis.data.go.kr/6260000/BusanPetAnimalInfoService/getPetAnimalInfo?serviceKey=${API_KEY}&numOfRows=10&pageNo=${pageNo}&resultType=json`;    
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data.getPetAnimalInfo.body)
        const items = data.getPetAnimalInfo.body.items.item;
        // 데이터를 state에 저장
        setAnimals(items);
        // 전체글
        setTotalCount(data.getPetAnimalInfo.body.totalCount);
        // 마지막 페이지
        setMaxPages(Math.ceil(totalCount / 10))
      })
      .catch(() => {
        console.log('데이터 요청 에러')
      })
  }

  const nextPage = () => {
    if(pageNo < maxPages) setPageNo(pageNo + 1)
  }

  const prevPage = () => {
    if(pageNo > 0) setPageNo(pageNo - 1);
  }

  useEffect(() => {
    getAnimalData();
  }, [pageNo])

  console.log('animals = ', animals)
  console.log('totalCount = ', totalCount)
  console.log('maxPages = ', maxPages);

  return (
    <div className='App'>
      <h1>동물구조 현황(부산)</h1>
      <p>Page: {pageNo} / {maxPages}</p>
      <p>{totalCount}건 등록</p>
      <button onClick={prevPage}>이전 페이지</button>
      <button onClick={nextPage}>다음 페이지</button>
      {
        (animals.length > 0) ?  <Items animals={animals} /> : (<p>로딩중...</p>)
      }
      <button>다음 페이지</button>
    </div>
  );
}

export default App;
