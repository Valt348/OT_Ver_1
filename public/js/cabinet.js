// ====== “Войти в магазин” — пока заглушка (модалка) ======
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("cabModal");
const okBtn = document.getElementById("cabModalOk");

function openCabModal(){
  if(!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}
function closeCabModal(){
  if(!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

loginBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  openCabModal();
});
okBtn?.addEventListener("click", closeCabModal);
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeCabModal();
});

// ====== Drawer профиля ======
const userBtn = document.getElementById("userBtn");
const drawer = document.getElementById("userDrawer");
const drawerClose = document.getElementById("drawerClose");
const drawerBack = document.getElementById("drawerBack");

function openDrawer(){
  if(!drawer) return;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer(){
  if(!drawer) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
}

userBtn?.addEventListener("click", openDrawer);
drawerClose?.addEventListener("click", closeDrawer);

// клик по затемнению — закрыть
drawer?.addEventListener("click", (e) => {
  if (e.target === drawer) closeDrawer();
});

// “Назад к подпискам” (чтобы не терять навигацию)
drawerBack?.addEventListener("click", () => {
  go("./plans.html");
});

// Esc: закрывает сначала модалки/дроверы
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  if (modal?.classList.contains("is-open")) {
    closeCabModal();
    return;
  }
  if (drawer?.classList.contains("is-open")) {
    closeDrawer();
    return;
  }
});
