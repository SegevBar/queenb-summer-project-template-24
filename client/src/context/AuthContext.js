import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()


// checks the action log-in/out / nothing, and returns data accordingly 
export const authReducer = (state, action) => {
    switch (action.type) { // we check which type of action we do - login/logout
        case 'LOGIN':
            return { user: action.payload } // if we log in, it returns something associated to the user
        case 'LOGOUT':
            return { user: null } // if we log out, it returns null
        default:
            return state // if there are no changes to the state, it returns the state
    }
}


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // "only fire this useEffect function once, when the component first renders"
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) // if the user item is present in localStorage, we get the user object with the email and the token. otherwise, null
    
        if (user){
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    // Every time the log-in/out state changes, this will be logged to the console (to help us keep track of the state)
    console.log('AuthContext state: ', state)


    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}