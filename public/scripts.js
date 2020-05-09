const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a")

for (menuItem of menuItems) {
  console.log(currentPage, menuItem.getAttribute("href"));
  if (currentPage.includes(menuItem.getAttribute("href"))) {
    menuItem.classList.add("active")
    break;
  }


}





