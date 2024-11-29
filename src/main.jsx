import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import CategoryPage from "./pages/Category.jsx"
import Wishlist from "./pages/WishList.jsx"
import Cart from './pages/Cart.jsx'
import CustomProduct from './pages/CustomProduct.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AuthLayout from './component/AuthLayout.jsx'
import Admin from './admin/Admin.jsx'
import Root from './Root.jsx'
import AdminProduct from './admin/AdminProduct.jsx'
import AddProduct from './admin/AddProduct.jsx'
import ProductPage from './pages/ProductPage.jsx'
import AddCategory from './admin/AddCategory.jsx'
import AddCategoryForm from './admin/AddCategoryForm.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Homepage />
          },
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/signup",
            element: <Signup />
          },
          {
            path: "/categories",
            element: 
              <CategoryPage />
           

          },
          {
            path: "/wishlist",
            element: 
            <AuthLayout>
              <Wishlist />
              </AuthLayout>
           
          },
          {
            path: "/cart",
            element: 
            <AuthLayout>
              <Cart />
            </AuthLayout>
          },
          {
            path: "/categories/:categ",
            element: <CustomProduct />
          },
          {
            path:"/product/:pid",
            element:<ProductPage />
          }
        ]
      },
      {
        path: "/admin",
        element: <AuthLayout>
          <Admin />
        </AuthLayout>,
        children:[
          {
            path:"/admin/categories",
            element:<AuthLayout>
              <AdminProduct/>
            </AuthLayout>
          },
          {
            path:"/admin/addproducts",
            element:<AuthLayout>
              <AddProduct/>
            </AuthLayout>

          }, 
          {
            path:"/admin/addcategories",
            element:<AuthLayout>
              <AddCategory/>
            </AuthLayout>

          },
          {
            path: "/admin/addCategoryForm",
            element: <AuthLayout>
              <AddCategoryForm />
            </AuthLayout>

          }
        ]
      }]
  },


])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

)
