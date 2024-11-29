import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import auth from "./backend/auth"
import { login } from "./store/authSlice"
import { logout } from "./store/authSlice"

function Root() {
    const dispatch = useDispatch()



  auth.getCurrentUser()
    .then((userAccount) => {
      if (userAccount) {
        dispatch(login(userAccount))
      } else {
        dispatch(logout())
      }
    })
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Root