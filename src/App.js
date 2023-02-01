import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const API_KEY = `sXxYjidiN3t6GurP%2FlL532W8cmmt4qCl%2F%2BFF72uNIWACqGGmumk6enycmK39NmiGxpmGhhxqFXvWYu4zH8f3zg%3D%3D`;
  const API_URL = `http://apis.data.go.kr/6260000/BusanPetAnimalInfoService/getPetAnimalInfo?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&resultType=json`;

  const getAnimalData = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data.getPetAnimalInfo.body.items)
        const items = data.getPetAnimalInfo.body.items;
      })
  }

  useEffect(() => {
    getAnimalData();
  }, [])


  return (
    <h1>부산시 동물구조 현황</h1>
  );
}

export default App;
