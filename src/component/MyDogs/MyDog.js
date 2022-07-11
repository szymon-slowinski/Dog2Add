import React from 'react'

function MyDog({dog}) {
    /*properties of dog:
    -age
    -breadofdog
    -caption
    -height
    -home
    -name
    -sex
    -timestamp
    -user
    -photo
    */
  return (
      <div className='p-5'>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
  {dog.photo && (
    <img className="w-full" src={dog.photo} alt="Zdjecie pieska"></img>
  )}
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{dog.name}</div>
    <p className="text-gray-700 text-base">
      {dog.caption}
      </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 
    rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{dog.breadofdog}</span>
    <span className="inline-block bg-gray-200 
    rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{dog.age}</span>
    <span className="inline-block bg-gray-200 
    rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{dog.sex}</span>
    <span className="inline-block bg-gray-200 
    rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{dog.height}</span>
    <span className="inline-block bg-gray-200 
    rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{dog.home}</span>
  </div>

</div>
      </div>
    )
}

export default MyDog
