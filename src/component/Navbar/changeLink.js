export default function changeLink(target){
        const currentPage = document.querySelector(".eugene-nav-active");
        if (currentPage) {
            currentPage.classList.remove("eugene-nav-active");
        }
        document.querySelector(target)?.classList.add("eugene-nav-active")

}