document.addEventListener("DOMContentLoaded", () => {
  // back
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      go("./menu.html");
    });
  }

  const grid = document.getElementById("plansGrid");
  const cards = Array.from(document.querySelectorAll(".card"));

  if (!grid || cards.length === 0) return;

  const getActiveCard = () => document.querySelector(".card.is-active");

  function openCard(card) {
    grid.classList.add("is-focus");

    cards.forEach(c => {
      const more = c.querySelector(".more");
      if (c === card) {
        c.classList.add("is-active");
        if (more) more.setAttribute("aria-hidden", "false");
      } else {
        c.classList.remove("is-active");
        if (more) more.setAttribute("aria-hidden", "true");
      }
    });
  }

  function closeCardSmooth(reason = "button") {
    const active = getActiveCard();
    if (!active) return;

    const more = active.querySelector(".more");

    active.classList.remove("is-active");
    if (more) more.setAttribute("aria-hidden", "true");

    const ms = (reason === "outside") ? 380 : 900;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      grid.classList.remove("is-focus");
      if (more) more.removeEventListener("transitionend", onEnd);
    };

    const onEnd = (e) => {
      if (e.propertyName === "max-height" || e.propertyName === "opacity" || e.propertyName === "transform") {
        finish();
      }
    };

    if (more) more.addEventListener("transitionend", onEnd);
    window.setTimeout(finish, ms);
  }

  // ========= Красивое всплывающее окно (создаём один раз) =========
  const modal = document.createElement("div");
  modal.className = "pay-modal";
  modal.innerHTML = `
    <div class="pay-modal__panel" role="dialog" aria-modal="true">
      <div class="pay-modal__text" id="payModalText"></div>
      <button class="pay-modal__btn" type="button">Ок</button>
    </div>
  `;
  document.body.appendChild(modal);

  const modalText = modal.querySelector("#payModalText");
  const modalBtn = modal.querySelector(".pay-modal__btn");

  function openModal(text) {
    modalText.textContent = text;
    modal.classList.add("is-open");
  }
  function closeModal() {
    modal.classList.remove("is-open");
  }

  modal.addEventListener("click", (e) => {
    // клик по затемнению — закрыть
    if (e.target === modal) closeModal();
  });
  modalBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  // ✅ “Выбрать” — раскрыть карточку
  document.querySelectorAll(".pick").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest(".card");
      if (!card) return;

      openCard(card);
    });
  });

  // ✅ CTA — теперь с нужной логикой
  document.querySelectorAll(".cta").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest(".card");
      if (!card) return;

      const plan = card.dataset.plan;

      // 1) Free Beta: золотой перелив на карточке → потом переход
      if (plan === "free_beta") {
        card.classList.add("gold-pulse");

        // чуть-чуть времени на красивый эффект
        window.setTimeout(() => {
          go("./cabinet.html");
        }, 520);

        // на всякий случай убираем класс (если вдруг навигация не случилась)
        window.setTimeout(() => {
          card.classList.remove("gold-pulse");
        }, 900);

        return;
      }

      // 2) Standart / Standart+: всплывающее окно (пока оплаты нет)
      openModal("Мы рады, что вы готовы нам отдать денег, но пока функция не работает. Выберите бесплатный тест.");
    });
  });

  // “Свернуть”
  document.querySelectorAll(".close-more").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCardSmooth("button");
    });
  });

  // Клик “куда угодно” закрывает, если клик НЕ внутри активной карточки
  document.addEventListener("pointerdown", (e) => {
    if (!grid.classList.contains("is-focus")) return;

    const active = getActiveCard();
    if (!active) return;

    if (!active.contains(e.target)) {
      closeCardSmooth("outside");
    }
  }, true);

  // Esc — закрыть карточку
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && grid.classList.contains("is-focus")) {
      closeCardSmooth("outside");
    }
  });
});
