function VerificarLogado(){
const Islogged = JSON.parse(localStorage.getItem("isLogged"))

if(!Islogged){
    document.body.insertAdjacentHTML("beforeend", `
        <div class="toast_autenticado">
        <p>Usuário não autenticado</p>
        </div>
        `)
}
}
VerificarLogado()