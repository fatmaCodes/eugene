import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { useRef } from "react"
import auth from "../backend/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loading from "../assets/loading.gif"


function Signup() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const formRef = useRef(null);

    const [isDialogOpen,setIsDialogOpen]  = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsDialogOpen(true);
        const name = String(formRef.current[0].value)
        const email = String(formRef.current[1].value)
        const password = String(formRef.current[2].value)
        const confirmPassword = String(formRef.current[3].value)

        if(password != confirmPassword || password.length < 8)
        {
            alert("the passwords are not same or length is less than 8");
        }

        try {

            const session = await auth.createAccount({email,password,name})

            setIsDialogOpen(false);

            if (session) {
                const userData = await auth.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate("/")
                }
            } else {
                alert("looks like u already with us please login")
            }
        } catch (error) {
            alert(error)
            setIsDialogOpen(false);
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
        <section className="min-h-screen min-w-screen bg-[#93785B] flex flex-col justify-between ">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
                    <b>Sign-Up</b>
                </a>
                <div class="w-full bg-[#f8f7f6] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form onSubmit={handleSignup} ref={formRef} class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name" required=""></input>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></input>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                            </div>
                            <div>
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                            </div>
                            <button type="submit" class="w-full text-slate-100 bg-fuchsia-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p class="text-sm font-light text-black-500 dark:text-gray-400">
                                Already have an account? <Link to={"/login"} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>

    )
}

export default Signup 