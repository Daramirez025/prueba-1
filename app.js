(function () {
  "use strict";

  const logEl = document.getElementById("event-log");
  const MAX_LOG = 12;

  function log(message) {
    if (!logEl) return;
    const item = document.createElement("li");
    const time = new Date().toLocaleTimeString("es-ES");
    item.textContent = `[${time}] ${message}`;
    logEl.prepend(item);
    while (logEl.children.length > MAX_LOG) {
      logEl.removeChild(logEl.lastElementChild);
    }
  }

  document.getElementById("year").textContent = String(new Date().getFullYear());

  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("testlab-theme");
  if (storedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  themeToggle?.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("testlab-theme", "light");
      log("Tema claro activado");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("testlab-theme", "dark");
      log("Tema oscuro activado");
    }
  });

  document.getElementById("cta-primary")?.addEventListener("click", () => {
    log("Clic en acción principal");
  });

  document.getElementById("cta-secondary")?.addEventListener("click", () => {
    log("Clic en acción secundaria");
  });

  let counter = 0;
  const counterValue = document.getElementById("counter-value");

  function updateCounter(delta) {
    counter += delta;
    if (counterValue) counterValue.textContent = String(counter);
    log(`Contador: ${counter}`);
  }

  document.getElementById("counter-inc")?.addEventListener("click", () => updateCounter(1));
  document.getElementById("counter-dec")?.addEventListener("click", () => updateCounter(-1));
  document.getElementById("counter-reset")?.addEventListener("click", () => {
    counter = 0;
    if (counterValue) counterValue.textContent = "0";
    log("Contador reiniciado");
  });

  const todoList = document.getElementById("todo-list");
  const todoInput = document.getElementById("todo-input");

  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed || !todoList) return;
    const li = document.createElement("li");
    li.textContent = trimmed;
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "×";
    removeBtn.setAttribute("aria-label", "Eliminar");
    removeBtn.addEventListener("click", () => {
      li.remove();
      log(`Ítem eliminado: ${trimmed}`);
    });
    li.appendChild(removeBtn);
    todoList.appendChild(li);
    log(`Ítem añadido: ${trimmed}`);
  }

  document.getElementById("todo-add")?.addEventListener("click", () => {
    if (todoInput) {
      addTodo(todoInput.value);
      todoInput.value = "";
      todoInput.focus();
    }
  });

  todoInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo(todoInput.value);
      todoInput.value = "";
    }
  });

  const modal = document.getElementById("demo-modal");
  document.getElementById("open-modal")?.addEventListener("click", () => {
    modal?.showModal();
    log("Modal abierto");
  });

  modal?.addEventListener("close", () => log("Modal cerrado"));

  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (feedback) {
        feedback.textContent = "Revisa los campos obligatorios.";
        feedback.className = "form-feedback error";
      }
      log("Envío de formulario fallido (validación)");
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const name = data.get("name");
    if (feedback) {
      feedback.textContent = `Gracias, ${name}. Formulario simulado enviado correctamente.`;
      feedback.className = "form-feedback success";
    }
    log(`Formulario enviado (${data.get("email")})`);
    form.reset();
  });

  document.getElementById("clear-log")?.addEventListener("click", () => {
    if (logEl) logEl.innerHTML = "";
    log("Log limpiado");
  });

  log("Página cargada");
})();
