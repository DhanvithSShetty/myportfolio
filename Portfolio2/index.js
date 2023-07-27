// scroll section
window.onscroll = () => {
// sticky header
let header=document.getElementById('header');
header.classList.toggle('sticky',window.scrollY>100);

}