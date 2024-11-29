import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import database from "../backend/DataBase";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import WishList from "./WishList";

function ProductPage() {

    const [product,setProduct] = useState({});

    const {pid} = useParams();

    const userData = useSelector((state)=>state.authReducer.userData)

    async function getProduct(){
        const _product = await database.getProduct(pid);
        _product.product_image = database.getFilePreview(_product.product_image);
        setProduct(_product)
    }

    const [isCart,setIsCart] = useState("");
    const [isWishlist,setIsWishlist] = useState("");



    async function addCart(){


        const added = await database.addUserCardt({user_id:userData.$id,product_id:pid});
        if(added)
        {
            alert("added to cart")
            setIsCart(added);
        }

    }

    async function addWishlist(){
        const added = await database.addUserWishlist({user_id:userData.$id,product_id:pid});
        if(added)
        {
            alert("added to wishlist")
            setIsWishlist(added);
        }

    }

    async function removeCart() {
        const removed = await database.deleteCart(isCart)
        if(removed)
        {
            alert("removed from cart");
            setIsCart("");
        }
        
    }

    async function removeWishlist() {
        const removed = await database.deleteUserWishlist(isCart)
        if(removed)
        {
            alert("removed from cart");
            setIsWishlist("");
        }
    }

    async function checkStatus() {
        const dataCart=await database.getUserCart([Query.and([
            Query.equal("user_id", userData.$id), 
            Query.equal("product_id", pid)
          ])])

          const dataWishlist=await database.getUserWishlist([Query.and([
            Query.equal("user_id", userData.$id), 
            Query.equal("product_id", pid)
          ])])

        const _cart = dataCart.total==0?"":dataCart.documents[0].$id
        const _wishlist = dataWishlist.total==0?"":WishList.document[0].$id

        setIsCart(_cart);
        setIsWishlist(_wishlist)
    }

    useEffect(()=>{
        getProduct();
        checkStatus();
    },[pid])
    
    

    return (
        <>
            <div class="my-3 bg-gray-800 py-8">
                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col md:flex-row -mx-4">
                        <div class="md:flex-1 px-4">
                            <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img class="w-full h-full object-cover" src={product.product_image} alt="Product Image" />
                            </div>
                            <div class="flex -mx-2 mb-4">
                                <div class="w-1/2 px-2">
                                    <button onClick={!isCart?addCart:removeCart} class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">{!isCart?"Add to Cart":"Remove From Cart"}</button>
                                </div>
                                <div class="w-1/2 px-2">
                                    <button onClick={!isWishlist?addWishlist:removeWishlist} class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">{!isWishlist?"Add to Wishlist":"Remove from wishlist"}</button>
                                </div>
                            </div>
                        </div>
                        <div class="md:flex-1 px-4">
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.product_name}</h2>
                            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                                ante justo. Integer euismod libero id mauris malesuada tincidunt.
                            </p>
                            <div class="flex mb-4">
                                <div class="mr-4">
                                    <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                    <span class="text-gray-600 dark:text-gray-300">{product.price}₹</span>
                                </div>
                                <div>
                                    <span class="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                    <span class="text-gray-600 dark:text-gray-300">In Stock</span>
                                </div>
                            </div>
                          
                            <div>
                                <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    {product.product_desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductPage