import { Link } from "react-router-dom";
import Header from "../Header/Header";
import {useForgotPassword} from "./useFrogotPassword"

 export function ForgotPassword() {
    
  const {
        error,
        message,
        handleSubmits,
        emailRef,
        loading
    }=useForgotPassword()
   

    return (
        <>
        <Header/>
        <div className=' flex w-screen min-h-screen items-center justify-center  bg-white'>
        <div className="w-full max-w-xs">
  {error && <div role="alert">
  <div className="bg-red-500 text-white text-center font-bold rounded-t px-4 py-2">
    Błąd
  </div>
  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>{error}</p>
  </div>
</div>} 
{message && <div class=" bg-green-100  border-t-4 border-green-300 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div class="flex">
    <div class="py-1"></div>
    <div>
      <p class="font-bold">{message}</p>
    </div>
  </div>
</div>} 
  <form onSubmit={handleSubmits} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        E-mail
      </label>
      <input  ref={emailRef} required className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="E-mail"/>
    </div>
    <div className="flex items-center justify-center">
      <button disabled={loading} className="uppercase text-sm font-bold font-body 
        border-2 border-green-400 border-opacity-50 rounded-full py-3 px-5 tracking-wide hover:border-gray-300" type="submit">
        Zmień hasło
      </button>
    </div>
    <div className="text-center text-gray-500 text-base">
 <Link className="hover:bg-gray-50 rounded-full" to="/logowanie">Zaloguj</Link>
  </div>
  </form>
  </div>
  </div>
  </>);
}

export default ForgotPassword;