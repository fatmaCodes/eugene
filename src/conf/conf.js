const conf = {
    appWriteUrl:String(import.meta.env.VITE_PUBLIC_APPWRITE_URL),
    projectId:String(import.meta.env.VITE_PUBLIC_PROJECT_ID),
    dbId:String(import.meta.env.VITE_PUBLIC_DB_ID),
    collectionId:String(import.meta.env.VITE_PUBLIC_COLLECTION_ID),
    bucketId:String(import.meta.env.VITE_PUBLIC_BUCKET_ID),
    adminId:String(import.meta.env.VITE_ADMIN_ID),
    cartId:String(import.meta.env.VITE_CART_ID),
    wishListId:String(import.meta.env.VITE_WISHLIST_ID),
    categoryID:String(import.meta.env.VITE_CATEGORY_ID),
}

export default conf