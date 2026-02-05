document.getElementById("toPlansBtn")?.addEventListener("click", () => {
  go("./plans.html");
});

const userBtn = document.getElementById("userBtn");
const modal = document.getElementById("subModal");
const ok = document.getElementById("subModalOk");

function openSubModal() {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}
function closeSubModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

userBtn?.addEventListener("click", openSubModal);
ok?.addEventListener("click", closeSubModal);

modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeSubModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) closeSubModal();
});

/* ======================
   FAQ accordion
   ====================== */
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    // закрываем остальные (чтобы было аккуратно)
    document.querySelectorAll(".faq-item.is-open").forEach((x) => {
      if (x !== item) {
        x.classList.remove("is-open");
        x.setAttribute("aria-expanded", "false");
        const ans = x.querySelector(".faq-a");
        if (ans) ans.setAttribute("aria-hidden", "true");
      }
    });

    // тумблер текущего
    if (isOpen) {
      item.classList.remove("is-open");
      item.setAttribute("aria-expanded", "false");
      const ans = item.querySelector(".faq-a");
      if (ans) ans.setAttribute("aria-hidden", "true");
    } else {
      item.classList.add("is-open");
      item.setAttribute("aria-expanded", "true");
      const ans = item.querySelector(".faq-a");
      if (ans) ans.setAttribute("aria-hidden", "false");
    }
  });
});
