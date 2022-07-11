import {useRef,useState} from "react";
import { useAuth } from "../../context/AuthContext";

export const useForgotPassword=()=>{
     const emailRef =useRef();
    const {resetPassword} = useAuth();
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [message,setMessage]=useState('')

    async function handleSubmits(e) {
      e.preventDefault()
      try {
        setMessage("")
        setError("")
        setLoading(true)
        await resetPassword(emailRef.current.value )
        setMessage("Sprawdź swoją skrzynkę pocztową")
      } catch {
        setError("Błąd przy zmianie hasła")
      }
    }

    return {
        error,
        message,
        handleSubmits,
        emailRef,
        loading
    }
}