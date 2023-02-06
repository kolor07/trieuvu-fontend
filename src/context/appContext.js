import { createContext, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [productType, setProductType] = useState('');
    const [categoryId, setCategoryId] = useState(2);

    const [isClose, setIsClose] = useState(false);
    return (
        <AppContext.Provider
            value={{
                isSignUpForm,
                setIsSignUpForm,
                isClose,
                setIsClose,
                isLoginForm,
                setIsLoginForm,
                productType,
                setProductType,
                categoryId,
                setCategoryId,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
