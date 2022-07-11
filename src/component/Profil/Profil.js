import React, {useRef, useState} from "react";
import {useAuth} from '../../context/AuthContext'
import {Link} from 'react-router-dom'
import SignHeader from "../SignHeader/SignHeader";
import { auth } from "../../firebase";


function Profil() {
    const emailRef =useRef();
    const passwordRef =useRef();
    const passwordConfirmRef =useRef();
    const {currentUser,updatePassword,updateEmail} = useAuth();
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [message,setMessage]=useState('')
    
    //hook useFormik
    function handleSubmit(e) {
      e.preventDefault()
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Hasła nie są zgodne")
      }
      const promises = []
      setLoading(true)
      setError("")
      setMessage("")
      if(emailRef.current.value !== currentUser.email){
          promises.push(updateEmail(auth.currentUser,emailRef.current.value))
      }
      if(passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
      }
      Promise.all(promises)
      .then(()=> {
          setMessage("Dane zaktualizowane")
      })
      .catch(()=>{
          setError("Błąd w aktualizacji danych konta")
      })
      .finally(()=>{
          setLoading(false);
      })

    }
    return (
        <>
        <div>
        <SignHeader></SignHeader>
        <div className="w-full m-4 mt-36 flex  justify-center items-center">
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
        <h1>Zaktualizuj swoje dane</h1>
        {message && <div className=" bg-green-100  border-t-4 border-green-300 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"></div>
    <div>
      <p className="font-bold">{message}</p>
    </div>
  </div>
</div>} 
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        E-mail
      </label>
      <input  ref={emailRef} required defaultValue={currentUser.email} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="E-mail"/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Hasło
      </label>
      <input placeholder="Zostaw puste jeśli nie chcesz zmieniać hasła" ref={passwordRef} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Powtórz hasło
      </label>
      <input placeholder="Zostaw puste jeśli nie chcesz zmieniać hasła"  ref={passwordConfirmRef}  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="passwordConfirm" type="password"/>
    </div>
    <div className="flex items-center justify-center">
      <button disabled={loading} className="uppercase text-sm font-bold font-body 
        border-2 border-green-400 border-opacity-50 rounded-full py-3 px-5 tracking-wide hover:border-gray-300" type="submit">
        Aktualizuj
      </button>
    </div>
    {error && <div role="alert">
  <div className="bg-red-500 text-white text-center font-bold rounded-t px-4 py-2">
    Błąd
  </div>
  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>{error}</p>
  </div>
</div>} 
<div className="text-center text-gray-500 text-base">
 <Link to="/">Anuluj</Link>
  </div>
  </form>
  </div>
  </div>
  </>);
}



export default Profil;
