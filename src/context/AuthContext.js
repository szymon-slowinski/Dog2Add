import { useContext, useState, useEffect,createContext } from "react"
import {auth} from '../firebase'
import {onAuthStateChanged} from "firebase/auth";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,sendPasswordResetEmail} from "firebase/auth";

const AuthContext = createContext()

export function useAuth() {
  const ctx=useContext(AuthContext);
  if(!ctx){
    throw new Error("Component not wrapped in AuthProvider")
  }
  return ctx
}


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth,email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth,email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth.currentUser,email)
  }

  function updateEmail(email) {
    return updateEmail(auth.currentUser, email).then(()=> {
      console.log('email zmieniony')
    }).catch((error) => {
      //TODO toast message
      console.log(`blad ${error}`)
    })
  }


  function updatePassword(password) {
    return updatePassword(auth.currentUser,password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
