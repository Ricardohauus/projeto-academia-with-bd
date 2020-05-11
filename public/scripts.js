const currentPageIndex = location.pathname;
const menuItems = document.querySelectorAll("header .links a")

for (menuItem of menuItems) {
  if (currentPageIndex.includes(menuItem.getAttribute("href"))) {
    menuItem.classList.add("active")
    break;
  }
}


let totalPages = 4,
  selectedPage = 19,
  pages = [],
  oldPage

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
  const firstAndLastPage = currentPage == 1 || currentPage == totalPages
  const pagesAfterSelectedPage = currentPage <= selectedPage + 2
  const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

  if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
    if (oldPage && currentPage - oldPage > 2) {
      pages.push("...")
    }

    if (oldPage && currentPage - oldPage == 2) {
      pages.push(currentPage - 1)
    }
    pages.push(currentPage)
    oldPage = currentPage
  }
}
console.log(pages);




