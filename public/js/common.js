function go(url){
  window.location.href = url;
}

function openModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.classList.add("is-open");
  m.setAttribute("aria-hidden", "false");
}

function closeModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.classList.remove("is-open");
  m.setAttribute("aria-hidden", "true");
}
