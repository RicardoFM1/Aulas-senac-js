function Login(){
   
    
    const form = document.querySelector(".login")
    form.addEventListener("submit", async(eventologin)=>{
        eventologin.preventDefault()
        
    const senhaLogin = document.querySelector(".senha")
    const emailLogin = document.querySelector(".email")
    const user = {
        email: emailLogin.value,
        password: senhaLogin.value
    }

    console.log(user)
    const res = await fetch("http://localhost:3001/login",
        {
            body: JSON.stringify(user),
            method: "POST",
            headers:  {
                'Content-Type':"application/json; charset=utf-8"
            }
        })})
        if(res.status === 200){
            document.body.insertAdjacentHTML("beforeend", `
                <div class="toast sucesso">
                    <p>Login efetuado com sucesso!</p>
                    <p>Redirecionando para a página principal</p
                </div>
                `)
                const Islogged = {
                    usuarioLogado: "logado"
                }
                setTimeout(()=>{
                localStorage.setItem("Islogged", JSON.stringify(Islogged))
                location.href = "/"
            },3000)
    }
        else{
    
            document.body.insertAdjacentHTML("beforeend", `
                <div class="toast erro">
                    <p>Este usuário não existe!</p>
                </div>
                `)
            }
            
        }
    
Login()