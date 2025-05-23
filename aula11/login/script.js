import { exibirModal } from "../modal/modal.js";

function Login() {
  const form = document.querySelector(".login");
  form.addEventListener("submit", async (eventologin) => {
    eventologin.preventDefault();
    const userId = localStorage.getItem("userId");
    const senhaLogin = document.querySelector(".senha");
    const emailLogin = document.querySelector(".email");
    const user = {
      email: emailLogin.value,
      password: senhaLogin.value,
    };
    console.log(user);
    const res = await fetch("http://localhost:3001/login", {
  body: JSON.stringify(user),
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
});

const response = await res.json();
if (res.ok) {
  exibirModal("Login realizado com sucesso!", "sucesso");

  const Islogged = { usuarioLogado: "logado" };
  const userId = response.user.id;
  const token = response.accessToken; // <-- Corrigido aqui!
  setTimeout(() => {
    localStorage.setItem("Islogged", JSON.stringify(Islogged));
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    location.href = "/";
  }, 3000);
    } else {
      document.body.insertAdjacentHTML(
        "beforeend",
        `
                <div class="toast erro">
                    <p>Este usuário não existe!</p>
                </div>
                `
      );
    }
  });
}

Login();
