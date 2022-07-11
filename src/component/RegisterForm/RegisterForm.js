import React, {useRef, useState} from "react";
import {useAuth} from '../../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

//MVC
//TODO formik
function RegisterForm() {
    const emailRef =useRef();
    const passwordRef =useRef();
    const passwordConfirmRef =useRef();
    const {signup} = useAuth();
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory();
    
    async function handleSubmit(e) {
      e.preventDefault()
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Hasła nie są zgodne")
      }
      try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        addDoc(collection(db,'users'),{
          name:'',
          email:emailRef.current.value,
          timestamp:serverTimestamp()
        })
        history.push('/')
      } catch {
        setError("Błąd w tworzeniu konta")
        
      }
      setError("")
      setLoading(false)
    }
    return (
        <>
        <div className="max-w-xs">
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        E-mail
      </label>
      <input  ref={emailRef} required className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="E-mail"/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Hasło
      </label>
      <input  ref={passwordRef} required className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Powtórz hasło
      </label>
      <input  ref={passwordConfirmRef} required className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="passwordConfirm" type="password"/>
    </div>
    <div className="flex items-center justify-center">
      <button disabled={loading} className="uppercase text-sm font-bold font-body 
        border-2 border-green-400 border-opacity-50 rounded-full py-3 px-5 tracking-wide hover:border-gray-300" type="submit">
        Zarejestruj
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
Posiadasz już konto? <Link to="/logowanie">Zaloguj się!</Link>
  </div>
  </form>
  </div>
  </>);
}

export default RegisterForm;