import { createContext, useContext, useState, useEffect } from 'react';
import { set } from 'react-hook-form';

const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});

    const putUserData = (userData) => {
        setUserInfo(userData)

        localStorage.setItem('DevBurguer:userData', JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem('DevBurguer:userData', )
        setUserInfo({});
    };

    useEffect(() => {
        const userInfolocalStorage = localStorage.getItem('DevBurguer:userData');

        if(userInfolocalStorage){
            setUserInfo(JSON.parse(userInfolocalStorage));
        }
    },[]);

    return (
        <UserContext.Provider value={{userInfo, putUserData, logout}}>{children}</UserContext.Provider>
    )
}


export const useUser = () => {
    const context = useContext(UserContext)

    if(!context){
        throw new error('useUser must be a valid context')
    }

    return context
}