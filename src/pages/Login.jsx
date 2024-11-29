import { useEffect, useState } from "react"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import changeLink from "../component/Navbar/changeLink"
import { useRef } from "react"
import auth from "../backend/auth"
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"
import { useNavigate } from "react-router-dom"
import loading from "../assets/loading.gif"



function Login() {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    useEffect(() => {
        changeLink("#login")
    }, [])

    const formRef = useRef(null)

    const [isDialogOpen,setIsDialogOpen]  = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsDialogOpen(true);
        
        const email = String(formRef.current[0].value)
        const password = String(formRef.current[1].value)

        try {
            
            const session = await auth.loginUser({ email, password })


            if (session) {
                const userData = await auth.getCurrentUser()
                if (userData) {
                    setIsDialogOpen(false)
                    dispatch(login(userData))
                    navigate("/")
                }
            } else {
                alert("check your email/password if its correct")
            }
        } catch (error) {
            alert(error)
        }


    }

    return (
        <>
            <dialog className={`h-screen w-screen flex justify-center items-center bg-slate-50/30 ${isDialogOpen?"":'hidden'}`}>
                <div className="w-full flex flex-col justify-center items-center">
                    <img src={loading} alt="" />
                    <h1 className="text-slate-900 text-3xl font-bold">PLEASE WAIT </h1>
                </div>

            </dialog>
            <section className="min-h-screen min-w-screen bg-[#a4988b] flex flex-col justify-between ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                        <b>LOG-IN</b>
                    </a>
                    <div className="w-full bg-[#eae6e2] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleLogin} ref={formRef} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></input>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                                </div>

                                <button type="submit" className="w-full text-slate-50 bg-fuchsia-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-black-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to={"/signup"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}
export default Login 