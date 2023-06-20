import axios from 'axios'
import { useRef, useState } from "react";
// Nextjs
import Link from "next/link"
// Components
import Button from "@/components/Button"
// Hooks
import useContextProvider from '@/hooks/useAppContextProvider';

export default function LoginForm() {

    const { darkMode, auth, setAuth } = useContextProvider();

    // Message/Notification on sign in
    const [ message, setMessage ] = useState({ error: false, text: '' });

    // Get email and password elements from DOM
    const email = useRef(null);
    const password = useRef(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
    
        // If user is authenticated return
        if(Object.keys(auth).length !== 0) {
            return;
        }

        const emailValue = email.current.value;
        const passwordValue = password.current.value;
        // If email and password values are void then throw error message
        if([emailValue, passwordValue].includes('')) {
            setMessage({ error: true, text: 'There can be no empty fields' });
            setTimeout(() => {
                setMessage({ error: false, text: '' });
            }, 3000);
            return;
        }

        try {
            const { data } = await axios.post('/api/login', { email: emailValue, password: passwordValue, language: 'en' });
            // Set authentication on app state
            setAuth({ 
                _id: data._id, 
                name: data.name, 
                surname: data.surname, 
                email: data.email, 
                position: data.position,
                permissions: data.permissions
            })
            // Set authentication token on local storage
            localStorage.setItem('auth-token', data.token);
            // Throw message on success
            setMessage({ error: false, text: 'You have successfully logged in' });
            setTimeout(() => {
                setMessage({ error: false, text: '' });
            }, 3000);
        } catch (error) {
            setMessage({ error: true, text: error.response.data.msg })
        }
    }

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSignIn}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <div className="text-3xl text-light-main">Welcome back!</div>
                    <div className="text-light-subtitle">Sign in to stay connected!</div>
                    <div className="text-light-subtitle">You do not have an account? <Link className={"text-primary hover:text-primary-2 transition-colors"} href={"/en#my-project"}>Start a project with us</Link></div>
                </div>
                { message.text && <Message text={message.text} error={message.error} /> }
                <div className="flex flex-col gap-1 lazy-load-2">
                    <Input 
                        reference={email}
                        placeholder={"Email"}
                        id={"email"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        }
                        inputType={"email"}
                    />
                    <Input 
                        reference={password}
                        placeholder={"Password"}
                        id={"pass"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        }
                        inputType={"password"}
                    />
                </div>
                <div className="flex justify-end lazy-load-3">
                    <Link className={`w-fit ${darkMode ? 'text-dark-text hover:text-white' : 'hover:text-light-main'} transition-colors`} href={`/recover-password`}>Recover password</Link>
                </div>
            </div>
            <div className='lazy-load-4'>
                <Button properties={{
                    classes: "py-3",
                    handler: { action: handleSignIn },
                    disabled: Object.keys(auth).length == 0 ? false : true
                }}
                >{Object.keys(auth).length === 0 ? 'Log in' : 'You are already logged in'}</Button>
            </div>
        </form>
    )
}

function Input({ reference, placeholder, id, icon, inputType }) {

    const { darkMode } = useContextProvider();

    return (
        <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} flex items-center h-14 rounded-md`}>
            <div className="grid place-content-center w-[3.5rem] h-full text-neutral-600">
                {icon}
            </div>
            <div className="w-full">
                <input ref={reference} className={`${darkMode ? 'text-zinc-200' : 'text-black'} w-full pr-3 outline-none font-light bg-transparent`} type={inputType} name="" id={id} placeholder={placeholder} />
            </div>
        </div>
    )
}

function Message({ text, error }) {
    return <div className={`${error ? 'bg-red-500' : 'bg-light-main'} px-2 py-1 rounded-md text-white uppercase text-center font-medium select-none`}>{text}</div>
}