const form = document.querySelector("#add");
const inputForm = document.querySelector(".add-text");
const btnForm = document.querySelector("#check-button");
const list = document.querySelector(".ul");
const conteo = document.querySelector("#conteo");

let renderConteo = (total, completados, sinCompletar) => {
  const search = `
        <p class:"conteo">Total: ${total}</p>
        <p class:"conteo">Completados: ${completados}</p>
        <p class:"conteo">Sin Completar: ${sinCompletar}</p>
    `;
  conteo.innerHTML = total === 0 ? "" : search;
};
let upDateConteo = (list) => {
  const total = list.querySelectorAll("li").length;
  const checkList = list.querySelectorAll(".check")?.length ?? 0;
  const incompletos = total - checkList;
  renderConteo(total, checkList, incompletos);
};

inputForm.addEventListener("input", (e) => {
  btnForm.disabled = inputForm.value ? false : true;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const li = document.createElement("li");
  li.innerHTML = `
    <p class="task">${inputForm.value}</p>
    <button class="delete-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button>
    <button class="check-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>  
  </button>
    `;
  list.append(li);
  inputForm.value = "";
  btnForm.disabled = true;
  localStorage.setItem("listaTareas", list.innerHTML);
  upDateConteo(list);
});

list.addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) {
    e.target.closest(".delete-btn").parentElement.remove();
    localStorage.setItem("listaTareas", list.innerHTML);
  }
  if (e.target.closest(".check-btn")) {
    const checkIcon = e.target.closest(".check-btn");
    const p = checkIcon.parentElement.children[0];
    if (p.classList.contains("check")) {
      p.classList.remove("check");
    } else {
      p.classList.add("check");
    }
    localStorage.setItem("listaTareas", list.innerHTML);
  }
  upDateConteo(list);
});

(() => {
  const localList = localStorage.getItem("listaTareas");
  list.innerHTML = localList;
  upDateConteo(list);
})();
