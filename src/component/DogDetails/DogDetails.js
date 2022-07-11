import React from 'react'
import luna from '../../assets/img/luna.jpeg'
import SignHeader from '../SignHeader/SignHeader'
import {useParams} from "react-router-dom"

function DogDetails(dogs){
    //const id = dogs.match.params.id
    const {id}=useParams()
    
    const dog = {
      name: 'Luna',
      age:'Dorosły',
      breadofdog:'Mieszaniec',
      caption:'Waga ok 30 kg. Luna jest łagodna, nieśmiała i uparta, ale za to uwielbia dzieci, szczególnie małe. Ma spokojny charakter.',
      height:'Średni',
      home:'Giżycko',
      sex:'Samica',
      user:'adam@testowy.pl',
      photo: luna
  }
  
   return (
      <> 
      <div className='w-screen fixed top-0  z-50'>
    <SignHeader/>
      </div>
      <div className=' bg-gradient bg-gradient-to-br from-gray-50 h-screen w-screen  flex  items-center justify-center'>
         <div className='box-wrapper mt-14  w-3/4 h-4/5 p-6'>
            <div className='card w-full h-full rounded-2xl bg-gradient bg-gradient-to-br from-gray-50 to-green-50 flex flex-wrap shadow-2xl '>
                <div className='left w-1/2  rounded-2xl transform scale-105 bg-gradient bg-gradient-to-tl from-white shadow-xl'>
                <img src={luna} alt="luna" className="  h-auto w-auto absolute bottom-28 left-32  rounded-t-lg " layout="fixed" ></img>
                </div>
                <div className='right w-1/2 bg-gradient bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl'>
                <div className=' dog-details flex-col items-center justify-center p-6'>
                    <h1 className=' p-5 font-serif text-center font-bold text-4xl text-gray-700'>{dog.name}</h1>
                    <p className=' p-5 text-2xl'>
                        {dog.caption}
                    </p>
                <div className=" text-center text-lg px-6 pt-10 pb-2">
        <span className="inline-block bg-gray-200 
        rounded-full px-3 py-1  font-semibold text-gray-700 mr-2 mb-2">{dog.breadofdog}</span>
        <span className="inline-block bg-gray-200 
        rounded-full px-3 py-1  font-semibold text-gray-700 mr-2 mb-2">{dog.age}</span>
        <span className="inline-block bg-gray-200 
        rounded-full px-3 py-1  font-semibold text-gray-700 mr-2 mb-2">{dog.sex}</span>
        <span className="inline-block bg-gray-200 
        rounded-full px-3 py-1  font-semibold text-gray-700 mr-2 mb-2">{dog.height}</span>
        <span className="inline-block bg-gray-200 
        rounded-full px-3 py-1  font-semibold text-gray-700 mr-2 mb-2">{dog.home}</span>
                </div>
                <div className='flex items-center justify-center pt-14'>
                <button className='uppercase text-xl font-bold cursor-pointer 
        border-2 border-green-400 border-opacity-50 rounded-full py-3 px-5 tracking-wide hover:border-gray-300'>Adoptuj</button>
                </div>
                </div>
                </div>  
            </div>
         </div> 
      </div>
      </>
  )
   }
   



export default DogDetails
