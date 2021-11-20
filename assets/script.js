// Ubah warna navbar ketika di scroll
const nav = document.querySelector("nav");
const menutoggle = document.querySelectorAll('.menu-toggle span');
window.addEventListener("scroll",function(){
    nav.classList.toggle("sticky",window.scrollY > 0);
    for(let i=0; i<menutoggle.length; i++){
        menutoggle[i].classList.toggle("sticky-menu-toggle",window.scrollY > 0);
    }
});
