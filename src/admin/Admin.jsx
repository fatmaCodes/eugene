import { useEffect } from "react";
import conf from "../conf/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Admin() {



  const userData = useSelector((state) => state.authReducer.userData);

  const navigate = useNavigate()

  useEffect(() => {
    if (userData.$id != conf.adminId) {
      alert("you are not admin")
      navigate("/")
    }
  }, [userData])

  return (
    <>
      <div className="min-h-screen w-screen bg-[#E9EED9] text-slate-600">
        <div className="min-h-[8vh] border-b-4 border-b-[#FF77B7]">
          <h1 className="w-full text-center text-3xl font-mono p-3">
            EUGENE ADMIN PANEL
          </h1>
        </div>
        <div className="min-h-[92vh] flex bg-[#F5F5F7]">
          <div className="min-w-[23vw] min-h-[92vh]  bg-[#B7B7B7]">
            <div>
              <h1 className="p-2 text-2xl font-serif text-white border-blue-400 border-b-2">MANAGE</h1>
            </div>
            <div className="p-3">
              <ul className="flex pl-10 text-xl text-white list-disc flex-col gap-2">
                <li>
                  <Link to={"/admin/categories"} className="hover:cursor-pointer">Products</Link>
                </li>
                <li>
                  <Link to={"/admin/addcategories"} className="hover:cursor-pointer">Categories</Link>
                </li>
              </ul>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Admin