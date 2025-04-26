function fazerCadastro(){
    const form = document.querySelector("#cadastro")
    form.addEventListener("submit", (evento)=>{
        evento.preventDefault()
        {
           
        const senha = document.querySelector("#senha")
        const email = document.querySelector("#email")
        const confirmarSenha = document.querySelector("#confirmaSenha")
        if(senha.value != confirmarSenha.value){
            document.body.insertAdjacentHTML("beforeend",`
                <div class="toast">
                    <p>Confira se a senhas estão idênticas</p>
                </div>
                `)
        }else{
        console.log("senha:",senha.value, "\nemail:",email.value)
        if(senha.value === "" || email.value === ""){
            document.body.insertAdjacentHTML("beforeend",`
                <div class="toast">
                    <p>Insira uma senha válida</p>
                </div>
                `)
        }else{
            const user  = {
                senha: senha.value,
                email : email.value
            }
            localStorage.setItem("usuario",JSON.stringify(user))
            
        }}
}})
}
fazerCadastro()

const user = localStorage.getItem("email")
const obj = JSON.parse(localStorage.getItem("usuario"))
console.log(obj)