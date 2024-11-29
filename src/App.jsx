import { Outlet } from "react-router"
import Navbar from "./component/Navbar/Navbar"
import Footer from "./component/Footer"

function App() {

  


  return (

    <div className="min-h-screen min-w-screen bg-[#93785B] flex flex-col justify-between ">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )

}
export default App
