import axios from "axios";
import { useState, useEffect, useRef } from "react";
// Nextjs
import { useRouter } from "next/router";
// Components
import Layout from "@/components/client/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider"
// Hooks
import axiosHeaders from "@/hooks/axiosHeaders";
// Push notification
import showToast from "@/hooks/showToast";
// Notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Languages
import myaccount from '../lang/myaccount.json'
// Image crop
import Cropper from 'react-easy-crop';
import getCroppedImg from '../pages/api/user/cropImage.js';
// Modal
import Modal from "@/components/Modal/Index";
// Upload image
import uploadImages from "@/hooks/uploadImages";
import Image from "next/image";
import deleteImages from "@/hooks/deleteImages";

export default function MyAccount() {

    const router = useRouter();
    
    const { auth, setAuth, darkMode, language } = useContextProvider();

    const name = useRef(null);
    const surname = useRef(null);
    const email = useRef(null);

    // User modal state and handler
    const [ showUserModal, setShowUserModal ] = useState(false);
    const handleShowUserModal = () => setShowUserModal(!showUserModal);
    // Save user changes to database
    async function handleSaveUser(e) {
        e.preventDefault();

        // Field validation
        if([name.current.value, surname.current.value, email.current.value].includes("")) {
            showToast("Hay campos vacíos", "error")
            return;
        }
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.current.value)) {
            showToast("Usa un correo electrónico válido", "error")
            return;
        }

        const config = axiosHeaders();
        if(!config) return;

        try {
            const { data } = await axios.post('/api/user/edit', { 
                user: { 
                    userId: auth._id, 
                    name: name.current.value, 
                    surname: surname.current.value, 
                    email: email.current.value 
                }, 
                lang: language, 
                config 
            });
            setAuth({...auth, name: name.current.value, surname: surname.current.value, email: email.current.value})
            showToast(data.msg, "success");
            handleShowUserModal();
        } catch (error) {
            showToast(error.response.data.msg, "error")
        }
    }

    const password = useRef(null);
    const repeatPassword = useRef(null);
    // Password modal state and handler
    const [ showPasswordModal, setshowPasswordModal ] = useState(false);
    const handleShowPasswordModal = () => setshowPasswordModal(!showPasswordModal);
    // Save user password on database
    async function handleSavePassword(e) {
        e.preventDefault();

        // Field validation
        if([password.current.value, repeatPassword.current.value].includes("")) {
            showToast("Hay campos vacíos", "error")
            return;
        }

        if(password.current.value != repeatPassword.current.value) {
            showToast("Las contraseñas no son iguales", "error")
            return;
        }

        if(password.current.value.length < 16) {
            showToast("Las contraseña debe tener 16 o más caracteres", "error")
            return;
        }

        const config = axiosHeaders();
        if(!config) return;

        try {
            const { data } = await axios.post('/api/user/edit', { 
                user: { 
                    userId: auth._id, 
                    password: password.current.value
                }, 
                lang: language, 
                config 
            });
            showToast(data.msg, "success");
            handleShowPasswordModal();
        } catch (error) {
            showToast(error.response.data.msg, "error")
        }
    }

    // Profile photo
    const inputImage = useRef(null);
    const [ imageUrl, setImageUrl ] = useState("");
    const [ showCropper, setShowCropper ] = useState(false);
    const handleShowCropper = (files) => {
        setShowCropper(true)
        setImageUrl(URL.createObjectURL(files[0]))
    };
    const handleHideCropper = () => {
        setShowCropper(false);
        inputImage.current.value = '';
    }
    // react-easy-crop state
    const [ crop, setCrop ] = useState({ x: 0, y: 0 });
    const [ zoom, setZoom ] = useState(1);
    const [ aspect, setAspect ] = useState(1);
    const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(null);
    // Final image file
    const [ croppedImage, setCroppedImage ] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    // Convert url to file
    const urlToFile = async (image) => {
        const response = await fetch(image);
        // here image is url/location of image
        const blob = await response.blob();
        const file = new File([blob], `${Math.random().toString(4).substring(2) }.jpg`, { type: blob.type });
        return file;
    }

    const updateProfileImage = async (imageUrl) => {
        const config = axiosHeaders();
        if (!config) return;

        try {
            const { data } = await axios.post('/api/user/edit', {
                user: {
                    userId: auth._id,
                    profile_img: imageUrl
                },
                lang: language,
                config
            });
            showToast(data.msg, "success");
            handleHideCropper();
            setAuth({...auth, profile_img: imageUrl})
        } catch (error) {
            showToast(error.response.data.msg, "error")
        }
    }

    const handleCropImage = async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageUrl,
                croppedAreaPixels
            )
            setCroppedImage(croppedImage)

            const file = await urlToFile(croppedImage);
            if(auth.profile_img) {
                deleteImages([auth.profile_img], 'users/profiles');
            }
            const image = await uploadImages([file], `users/profiles`);

            await updateProfileImage(image[0]);
        } catch (error) {
            showToast(error?.response?.data?.msg || error, "error")
        }
    }

    return (
        <Layout title={"Mi cuenta"}>
            { language && (
                <>
                    <div className="flex flex-col gap-5">
                        <button className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors" onClick={() => router.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>{myaccount[language]?.content?.goback}</span>
                        </button>
                        <div className={`flex flex-col gap-2 ${darkMode ? "bg-neutral-900" : "shadow-md bg-zinc-50"} rounded-md py-4 px-5 relative`}>
                            {auth.profile_img ? (
                                <div className={"image-container"} style={{width: '8rem'}}>
                                    <Image className={"image rounded-full"} src={auth.profile_img} fill />
                                </div>
                            ) : (
                                <div className={`grid place-content-center h-32 w-32 rounded-full ${darkMode ? 'bg-neutral-700' : 'bg-neutral-300'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.7} stroke={`${darkMode ? '#949494' : '#fff'}`} className="w-20 h-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                            )}
                            <input className={"hidden"} type="file" id="profilePhoto" ref={inputImage} onChange={(e) => handleShowCropper(e.target.files) } />
                            <label htmlFor={"profilePhoto"} className={`cursor-pointer p-2 rounded-full ${darkMode ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-300 hover:bg-neutral-400"} transition-colors absolute top-2 right-2`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </label>
                            { showCropper && (
                                <Modal handleClose={handleHideCropper}>
                                    <div className={"flex flex-col gap-5"}>
                                        <div className={"relative w-[400px]"}>
                                            <div className={"w-full h-[400px]"}>
                                                <Cropper
                                                    image={imageUrl}
                                                    crop={crop}
                                                    zoom={zoom}
                                                    aspect={aspect}
                                                    cropShape="round"
                                                    showGrid={false}
                                                    onCropChange={setCrop}
                                                    onCropComplete={onCropComplete}
                                                    onZoomChange={setZoom}
                                                />
                                            </div>
                                        </div>
                                        <div className={"flex flex-col gap-3"}>
                                            <input className="range range-primary" type="range" step={0.04} min={1} max={3} value={zoom} onChange={(e) => setZoom(e.target.value)} />
                                            <div className={"flex justify-between z-30"}>
                                                <button className={"py-1 px-4 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-sm"} onClick={handleHideCropper}>Cancelar</button>
                                                <button className={"py-1 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-sm"} onClick={handleCropImage}>Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            )}
                        </div>
                        <AccountSection title={myaccount[language].content["personal-info"].title}>
                            <AccountField title={myaccount[language].content["personal-info"].name} value={auth?.name} />
                            {auth?.surname && (
                                <AccountField title={myaccount[language].content["personal-info"].surname} value={auth?.surname} />
                            )}
                            <AccountField title={myaccount[language].content["personal-info"].email} value={auth?.email} />
                            <EditButton handler={handleShowUserModal} />
                        </AccountSection>
                        <AccountSectionRow title={myaccount[language].content.password.title} value={"********"}>
                            <EditButton handler={handleShowPasswordModal} />
                        </AccountSectionRow>
                        <AccountSectionRow title={myaccount[language].content.permissions} value={myaccount[language].permissions[auth?.permissions]} />
                    </div>
                    {/* User modal */}
                    <AccountModal setState={setShowUserModal} showModal={showUserModal}>
                        <form className="flex flex-col gap-10 py-4" onSubmit={handleSaveUser}>
                            <div className="flex flex-col gap-7">
                                <div className="text-2xl uppercase text-center font-medium">{myaccount[language].content["personal-info"].title}</div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="name">{myaccount[language].content["personal-info"].name}</label>
                                        <input id="name" className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-2 px-2`} type="text" placeholder={myaccount[language].content["personal-info"].placeholders.name} ref={name} defaultValue={auth.name} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="surname">{myaccount[language].content["personal-info"].surname}</label>
                                        <input id="surname" className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-2 px-2`} type="text" placeholder={myaccount[language].content["personal-info"].placeholders.surname} ref={surname} defaultValue={auth.surname} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="email">{myaccount[language].content["personal-info"].email}</label>
                                        <input id="email" className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-2 px-2`} type="email" placeholder={myaccount[language].content["personal-info"].placeholders.email} ref={email} defaultValue={auth.email} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <button type="button" className="py-2 px-4 bg-red-500 hover:bg-red-800 transition-colors text-white rounded-sm" onClick={handleShowUserModal}>{myaccount[language].content.buttons.cancel}</button>
                                <button type="submit" className="py-2 px-4 bg-primary hover:bg-primary-2 transition-colors text-white rounded-sm">{myaccount[language].content.buttons.save}</button>
                            </div>
                        </form>
                    </AccountModal>
                    {/* Password modal */}
                    <AccountModal setState={setshowPasswordModal} showModal={showPasswordModal}>
                        <form className="flex flex-col gap-10 py-4" onSubmit={handleSavePassword}>
                            <div className="flex flex-col gap-7">
                                <div className="text-2xl uppercase text-center font-medium">{myaccount[language].content.password.title}</div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="password">{myaccount[language].content.password.title}</label>
                                        <input id="password" className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-2 px-2`} type="password" placeholder={myaccount[language].content.password.placeholders.password} ref={password} defaultValue={""} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="repeatPassword">{myaccount[language].content.password.placeholders.repeatPassword}</label>
                                        <input id="repeatPassword" className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-2 px-2`} type="password" placeholder={myaccount[language].content.password.placeholders.repeatPassword} ref={repeatPassword} defaultValue={""} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <button type="button" className="py-2 px-4 bg-red-500 hover:bg-red-800 transition-colors text-white rounded-sm" onClick={handleShowPasswordModal}>{myaccount[language].content.buttons.cancel}</button>
                                <button type="submit" className="py-2 px-4 bg-primary hover:bg-primary-2 transition-colors text-white rounded-sm">{myaccount[language].content.buttons.save}</button>
                            </div>
                        </form>
                    </AccountModal>
                    {/* Notifications container */}
                    <ToastContainer />
                </>
            )}
        </Layout>
    )
}

function AccountSection({ title, children }) {
    
    const { darkMode } = useContextProvider();

    return(
        <div className={`flex flex-col gap-2 ${darkMode ? "bg-neutral-900" : "shadow-md bg-zinc-50"} rounded-md py-4 px-5 relative`}>
            <div className="uppercase font-medium text-lg">{title}</div>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    )
}

function AccountSectionRow({ children, title, value }) {
    
    const { darkMode } = useContextProvider();

    return (
        <div className={`flex items-center gap-2 ${darkMode ? "bg-neutral-900" : "shadow-md bg-zinc-50"} rounded-md py-4 px-5 relative`}>
            <div className="uppercase font-medium">{title}</div>
            <div className="description-dark">{value}</div>
            {children}
        </div>
    )
}

function AccountField({ title, value }) {
    return (
        <div>
            <div>{title}</div>
            <div className="description-dark">{value}</div>
        </div>
    )
}

function EditButton({ handler }) {

    const { darkMode } = useContextProvider();

    return (
        <button className={`p-2 rounded-full ${darkMode ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-300 hover:bg-neutral-400"} transition-colors absolute top-2 right-2`} onClick={handler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
        </button>
    )
}

function AccountModal({ setState, showModal, children }) {

    const { darkMode } = useContextProvider();

    const [show, setShow] = useState(false);
    const [closeAnim, setCloseAnim] = useState(false);

    function handleShowModal() {
        setShow(true);
    }

    function handleCloseModal() {
        setCloseAnim(true);
        setTimeout(() => {
            setState(false);
            setCloseAnim(false);
            setShow(false);
        }, 170)
    }

    useEffect(() => {
        if (showModal) {
            handleShowModal();
            return;
        }
        handleCloseModal();
    }, [showModal])

    return (
        show && (
            <>
                <div className="fixed bg-black opacity-75 top-0 left-0 w-screen h-screen" onClick={handleCloseModal}></div>
                <div className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} ${closeAnim ? 'modal-close' : 'modal-open'} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-7 shadow-md px-5 py-4 rounded-md z-10 w-[95%] xs:w-[22rem] md:w-[25rem]`}>
                    {children}
                </div>
            </>
        )
    )
}