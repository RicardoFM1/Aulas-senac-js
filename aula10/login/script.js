function Login(){
    const usuario = JSON.parse(localStorage.getItem("usuario")) //== object: email: ricardofernandes10@gmail.com senha: 11111111111
    const usuarioSenha = usuario.senha 
    const usuarioEmail = usuario.email    
    const form = document.querySelector(".login")
    form.addEventListener("submit", (eventologin)=>{
        eventologin.preventDefault()
        {
    const senhaLogin = document.querySelector(".senha")
    const emailLogin = document.querySelector(".email")
    if(senhaLogin.value == usuarioSenha && emailLogin.value == usuarioEmail){
        document.body.insertAdjacentHTML("beforeend", `
            <div class="toast sucesso">
                <p>Login efetuado com sucesso!</p>
                <p>Redirecionando para a página principal.</p
            </div>
            `)
        setTimeout(()=>{
            location.href = "/"
        },3000)
        }else{
            document.body.insertAdjacentHTML("beforeend", `
                <div class="toast erro">
                    <p>Este usuário não existe!</p>
                </div>
                `)
            }
        }})
        console.log(usuarioEmail, usuarioSenha, usuario)
    }
Login()