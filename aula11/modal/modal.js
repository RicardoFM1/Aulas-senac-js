export function exibirModal(mensagem, tipo = "erro") {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="toast ${tipo}">
      <p>${mensagem}</p>
    </div>
  `;
  document.body.appendChild(modal);
}







