import axios from "axios";
// React
import { createContext, useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    
    const router = useRouter();

    // Allow user cookies state
    const [cookiesAllowed, setCookiesAllowed] = useState(null);
    const [showCookiesWindow, setShowCookiesWindow] = useState(true);
    const handleAllowCookies = () => {
        setCookiesAllowed(true);
        localStorage.setItem('allow-cookies', true);
    }
    const handleShowCookiesWindow = () => {
        setShowCookiesWindow(!showCookiesWindow);
    }

    // Language and dark mode settings
    const [ language, setLanguage ] = useState('de');
    const [ darkMode, setDarkMode ] = useState(true);
    // On component load load:
    useEffect(() => {
        // Use saved localStorage language or 'de'(german)
        /* const urlLanguage = router.pathname.split('/')[1];
        const localStorageLanguage = localStorage.getItem('language') || 'de';
        if(urlLanguage == 'de' || urlLanguage == 'en' || urlLanguage == 'es') {
            setLanguage((urlLanguage != localStorageLanguage) && urlLanguage != '' ? urlLanguage : localStorageLanguage);
        } else {
            setLanguage(localStorageLanguage);
        } */
        if(!localStorage.getItem('language')) {
            localStorage.setItem('language', 'de');
        }

        setCookiesAllowed(localStorage.getItem('allow-cookies'));
        setLanguage(localStorage.getItem('language'));
        setDarkMode(JSON.parse(localStorage.getItem('darkmode')) == false ? false : true);
    }, []);

    // User Authentication
    const [ auth, setAuth ] = useState({});
    const [ fetchingAuth, setFetchingAuth ] = useState(true);

    // Check user authentication
    useEffect(() => {
        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if(!token) {
            setFetchingAuth(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        getProfile(config);
    }, [])

    async function getProfile(config) {
        try {
            const { data } = await axios.post('/api/getProfile', { config, language });
            setAuth(data);
        } catch (error) {
            setAuth({});
        } finally {
            setFetchingAuth(false);
        }
    }

    // Toggle dark mode on/off
    const handleDarkMode = () => {
        setDarkMode(current => !current);
        // Set theme on localStorage
        darkMode ? localStorage.setItem('darkmode', false) : localStorage.setItem('darkmode', true);
    }

    // Client project state
    const [ clientProject, setClientProject ] = useState({});
    const [ clientProcess, setClientProcess ] = useState([]);

    return (
        <AppContext.Provider value={{
            auth, 
            setAuth,
            fetchingAuth,
            language,
            setLanguage,
            handleDarkMode,
            darkMode,
            clientProject,
            setClientProject,
            clientProcess,
            setClientProcess,
            cookiesAllowed,
            handleAllowCookies,
            showCookiesWindow,
            handleShowCookiesWindow
        }}>
            {children}
        </AppContext.Provider>
    )
}

export {
    AppContextProvider
}

export default AppContext