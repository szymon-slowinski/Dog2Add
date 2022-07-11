import React from 'react'
import { Link } from 'react-router-dom'
import MyDog from '../MyDogs/MyDog'

export const MyDogs = ({dogs}) => {
    return dogs.map((dog)=> (
       <Link to={`/pies/ ` + dog.id}>
        <MyDog key={dog.id} dog={dog}/>
        </Link>
    )) 
}

