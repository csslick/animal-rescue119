import React from 'react'

export default function Items({animals}) {
  console.log('Items = ', animals)
  return (
    <div className='item'>
      {
        animals.map((animal, key) => {
          return (
            <>
              <img src={animal.ty3Picture} alt={animal.ty3Kind} />
              <h2>구조정보</h2>
              <p>품종: {animal.ty3Kind}</p>
              <p>포획장소: {animal.ty3Place}</p>
              <p>진행상황: {animal.ty3Process}</p>
            </>
          )
        })
      }
    </div>
  )
}
