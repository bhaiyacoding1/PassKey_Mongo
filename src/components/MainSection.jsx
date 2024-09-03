import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const MainSection = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("https://pass-key-mongo.vercel.app/");
        let passwords = await req.json();
        // console.log(passwords)
        setpasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords();
    }, [])

    const copyText = (text) => {
        toast('Copy to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showpassword = () => {

        console.log(ref.current.src);

        if (ref.current.src.includes("icons/closeeyes.png")) {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eyes.png"
            ref.current.className = "absolute right-[3px] -top-[1px] w-[30px] cursor-pointer"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/closeeyes.png"
            ref.current.className = "absolute right-[8px] top-[3px] w-[21px] cursor-pointer"
        }
    }
    const savePassword = async () => {
        if (form.site.length < 40 && form.username.length < 10 && form.password.length < 8) {

            await fetch("https://pass-key-mongo.vercel.app/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id: form.id }) })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("https://pass-key-mongo.vercel.app/", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" });
            toast('Password saved', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Not saved');
        }
    }

    const deletePassword = async (id) => {
        console.log("deleting pass " + id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("https://pass-key-mongo.vercel.app/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            toast('Password deleted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        // console.log([...passwordArray, form])
    }

    const editPassword = (id) => {
        console.log("editing pass " + id)
        setform({...passwordArray.filter(i => i.id === id)[0], id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className='px-4 md:py-3 md:my-container min-h-[82vh]'>
                <h2 className='text-2xl font-bold text-center'>
                    <span className='text-purple-600'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-purple-600'>Key/&gt;</span>
                </h2>
                <p className='text-purple-900 text-lg capitalize font-bold text-center'>save your password</p>
                <div className='flex flex-col  text-black p-4 gap-5 items-center'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter website URL' className='rounded-full border border-purple-500 w-full px-4 ' type="text" name='site' id='' />
                    <div className='flex flex-col md:flex-row  w-full gap-5'>
                        <input value={form.username} onChange={handlechange} placeholder='Enter username' className='rounded-full border border-purple-500 w-full px-4 ' type="text" name='username' id='' />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-purple-500 w-full px-4' type="password" name='password' id='' />
                            {/* <span ref={spanref} className='' onClick={showpassword}> */}
                            <img ref={ref} className='absolute right-[3px] -top-[1px] w-[30px] cursor-pointer' onClick={showpassword} src="/icons/eyes.png" alt="pass" />
                            {/* </span> */}
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-1 bg-purple-500 rounded-full w-fit px-5 py-2 text-white border border-black'>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                        save
                    </button>
                </div>
                <div className="password mt-8">
                    <h2 className='text-xl font-bold text-purple-800 py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No password to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded mb-4">
                        <thead className='bg-purple-700 text-white'>
                            <tr>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>Password</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-purple-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center min-w-4 md:min-w-32'>
                                        <div className='flex justify-center items-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    colors="primary:#0000"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "6px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center min-w-4 md:min-w-32'>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    colors="primary:#0000"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "6px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='items-centerpy-2 border border-white text-center min-w-4 md:min-w-32'>
                                        <div className='flex justify-center items-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    colors="primary:#0000"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "6px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='items-centerpy-2 border border-white text-center min-w-4 md:min-w-32'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                colors="primary:#0000"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "6px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                colors="primary:#0000"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "2px", "paddingLeft": "6px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default MainSection
