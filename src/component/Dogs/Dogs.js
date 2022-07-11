import React from 'react'
import Dog from '../Dog/Dog';

export const Dogs = ({dogs}) => {
    return dogs.map((dog)=> (
        <Dog key={dog.id} dog={dog}/> 
    )) 
}
