import { exibirModal } from "../modal/modal.js";

const form = document.querySelector("#cadastro");
function fazerCadastro() {
  form.addEventListener("submit", async (eventocadastro) => {
    eventocadastro.preventDefault();
    {
      const senha = document.querySelector("#senha");
      const email = document.querySelector("#email");
      const confirmarSenha = document.querySelector("#confirmaSenha");
      const tamanhoSenha = `${senha.value}`;
      const datacadastro = new Date();
      const dia = datacadastro.getDate();
      const mes = datacadastro.getMonth() + 1;
      const ano = datacadastro.getFullYear();
      const nome = document.querySelector("#nome");

      if (senha.value != confirmarSenha.value) {
        exibirModal("Confira se a senhas estão idênticas");
      } else if (senha.value === "" || email.value === "") {
        exibirModal("Insira uma senha ou email válido");
      } else if (tamanhoSenha.length < 8) {
        exibirModal("A senha precisa ter no mínimo 8 caracteres!");
      } else if (nome.value === "") {
        exibirModal("O nome precisa ser preenchido!");
      } else {
        const user = {
          password: senha.value, // jorginho@gmail
          email: email.value, //jorginhobao
          nome: nome.value, // jorginho
          dataCadastro: `${dia}/${mes}/${ano}`,
        };
        const res = await fetch("http://localhost:3001/users", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        });

        if (res.status === 201) {
          document.body.insertAdjacentHTML(
            "beforeend",
            `
                    <div class="toast sucesso">
                        <p>Usuário cadastrado com sucesso!</p>
                    </div>
                    `
          );
          setTimeout(() => {
            location.href = "/login";
          }, 3000);
        } else {
          exibirModal("Esse email já está cadastrado!");
        }

        console.log(res);
      }
    }
  });
}

fazerCadastro();
