import pic from "../assets/pic.png";
function Herosec() {
    return(
        <>
        <section class="bg-white dark:bg-gray-900 rounded-md">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Where Sophistication Meets Stunning Shades</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">At Eugene, we offer a curated selection of premium hair colors designed to enhance your unique style. From bold to classic shades, our products empower you to express yourself with confidence, ensuring salon-quality results in the comfort of your home. </p>

        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={pic} alt="mockup" className="h-[70%]"></img>
        </div>                
    </div>
</section>
        
        </>
    )
}
export default Herosec;