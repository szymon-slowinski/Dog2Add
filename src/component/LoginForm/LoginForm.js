import React, {useRef, useState} from "react";
import {useAuth} from '../../context/AuthContext'
import { Link,useHistory } from "react-router-dom";
import Header from "../Header/Header";
import homeimage from "../../assets/img/homeimage.jpg"
 
export function LoginForm() {
    
    const emailRef =useRef();
    const passwordRef =useRef();
    const {login} = useAuth();
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmits(e) {
      e.preventDefault()
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/")
      } catch {
        setError("Błąd w logowaniu")
      }
      setError('')
      setLoading(false)
    }

    return (
        <>
        <Header/>
        <div className=' flex w-screen min-h-screen items-center justify-center  bg-white'>
        <div className=' z-0  m-5 flex-row w-1/2 pr-10 '>
                <img src={homeimage}   alt='dog2add' className='z-50 w-full object-cover object-center rounded-lg shadow-md'></img>
            </div>
        <div className="w-full max-w-xs">
  {error && <div role="alert">
  <div className="bg-red-500 text-white text-center font-bold rounded-t px-4 py-2">
    Błąd
  </div>
  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>{error}</p>
  </div>
</div>} 
  <form onSubmit={handleSubmits} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
    <div className="flex items-center justify-center">
      <button disabled={loading} className="uppercase text-sm font-bold font-body 
        border-2 border-green-400 border-opacity-50 rounded-full py-3 px-5 tracking-wide hover:border-gray-300" type="submit">
        Zaloguj
      </button>
    </div>
    <div className="text-center text-gray-500 text-base">
Nie posiadasz konta? <Link className="hover:bg-gray-50 rounded-full" to="/rejestracja">Zarejestruj się!</Link>
  </div>
  <div className="text-center text-gray-500 text-base ">
   <Link className="hover:bg-gray-50 rounded-full" to="/zapomniales-haslo">Zapomniałeś hasło?</Link>
  </div>
  </form>
  </div>
  </div>
  </>);
}

export default LoginForm;