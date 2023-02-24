import React from 'react'
import { useParams } from 'react-router-dom'

export default function Detail({animals}) {
  // 동물정보에서 url parameter로 전달한 동물 key(id)값 
  const params = useParams();
  console.log(params)

  // 동물 데이터에서 빼 써야 됨
  console.log('detail: ', animals)

  return (
    <div>
      <h1>상세페이지</h1>
      <p>동물: {params.id}</p>
      <img 
        src={animals[params.id].ty3Picture} 
        alt={animals[params.id].ty3Kind
      } />
    </div>
  )
}
