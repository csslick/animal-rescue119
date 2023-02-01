import './App.css';
import { useState, useEffect } from 'react'
import Items from './components/Items'

function App() {
  const API_KEY = `sXxYjidiN3t6GurP%2FlL532W8cmmt4qCl%2F%2BFF72uNIWACqGGmumk6enycmK39NmiGxpmGhhxqFXvWYu4zH8f3zg%3D%3D`;
  const API_URL = `http://apis.data.go.kr/6260000/BusanPetAnimalInfoService/getPetAnimalInfo?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&resultType=json`;
  const [animals, setAnimals] = useState([])

  const getAnimalData = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data.getPetAnimalInfo.body.items)
        const items = data.getPetAnimalInfo.body.items.item;
        // 데이터를 state에 저장
        setAnimals(items);
      })
      .catch(() => {
        console.log('데이터 요청 에러')
      })
  }

  useEffect(() => {
    getAnimalData();
  }, [])

  console.log('animals = ', animals)
  return (
    <div className='App'>
      <h1>동물구조 현황(부산)</h1>
      {
        (animals.length > 0) ?  <Items animals={animals} /> : (<p>'로딩중...'</p>)
      }
    </div>
  );
}

export default App;
