import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebase"

export const useAuth = async () => {
    const [currenUser, setCurrentUser] = useState(null)
    useEffect(() => {
        const listen = onAuthStateChanged(auth, user => {
            if (user){
                setCurrentUser(user)
            }
            else {
                setCurrentUser(null)
            }
        })
        return listen
    }, [])

    return currenUser
}