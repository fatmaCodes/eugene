import logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import auth from "../../backend/auth";



function Navbar() {

    const userStatus = useSelector((state) => state.authReducer.userStatus)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async ()=>{
        try {
            await auth.logoutUser()
            dispatch(logout);
            navigate("/");
            window.location.reload();
        } catch (error) {
            alert(error)
        }
    }


    return (
        <>
            <nav className="bg-[#c9b497] border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-slate-900">EUGENE</span>
                    </Link>
                    <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden  w-full md:block md:w-auto" id="navbar-multi-level">
                        <ul className="flex flex-col font-medium p-3 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
                           
                                <>
                                    <li>
                                        <Link to={"/"} className="block py-2 px-3 text-slate-900 bg-blue-700 rounded md:bg-transparent md:p-0 dark:bg-blue-600 md:dark:bg-transparent" id="home">Home</Link>

                                    </li>
                                    <li>
                                        <button onClick={userStatus?handleLogout:()=>navigate("/login")} className="block py-2 px-3 text-slate-900 bg-blue-700 rounded md:bg-transparent md:p-0 dark:bg-blue-600 md:dark:bg-transparent" id="login">{userStatus?"logout":"login"}</button>
                                    </li>
                                    <li>
                                        <Link to={"/categories"} className="block py-2 px-3 text-slate-900 bg-blue-700 rounded md:bg-transparent md:p-0 dark:bg-blue-600 md:dark:bg-transparent" id="category">Categories</Link>
                                    </li>
                                    <li>
                                        <Link to={"/wishlist"} className="block py-2 px-3 text-slate-900 bg-blue-700 rounded md:bg-transparent md:p-0 dark:bg-blue-600 md:dark:bg-transparent" id="wishlist">Wishlist</Link>
                                    </li>
                                    <li>
                                        <Link to={"/cart"} className="block py-2 px-3 text-slate-900 bg-blue-700 rounded md:bg-transparent md:p-0 dark:bg-blue-600 md:dark:bg-transparent" id="cart">Cart</Link>
                                    </li>
                                </>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;