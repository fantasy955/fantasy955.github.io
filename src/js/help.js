let tocContainer = document.querySelector(".markdown-toc-list");   // select your toc cantainer
let liElements = tocContainer.getElementsByTagName("li");
for (let i = 0; i < liElements.length; i++) {
    let el = liElements[i].firstChild;
    el.addEventListener("click", function (event) {
        event.preventDefault();
        titleElments[i].scrollIntoView({
            behavior: "smooth",
        });
    });
    observer.observe(titleElments[i]);
}