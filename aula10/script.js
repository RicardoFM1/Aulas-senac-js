function VerificarLogado(){
    const Islogged = JSON.parse(localStorage.getItem("Islogged"));
console.log(Islogged)
if(!Islogged){
    document.body.insertAdjacentHTML("beforeend", `
        <div class="toast_autenticado">
        <p class="Autenticado"><img src="gg--danger.svg" class="danger">Usuário não autenticado</p>
        </div>
        `)
}
}
VerificarLogado()