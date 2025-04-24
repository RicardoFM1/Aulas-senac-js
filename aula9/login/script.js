function fazerLogin(){
    const form = document.querySelector("form")
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        console.log("submit")
        const email = document.querySelector("#email")
        const pass = document.querySelector("#pass")
        console.log(email.value,pass.value)
        if(pass.value=="1234"){
            document.body.insertAdjacentHTML("beforeend",`
            
                <div class="toast success">
                    <p>Login efetuado com sucesso!</p>
                </div>
                `)
            setTimeout(()=>{
                localStorage.setItem("email",email.value)
                location.href = "../home"
                
            },3000)
        }else {
            document.body.insertAdjacentHTML("beforeend",`
            
                <div class="toast error">
                    <p>Senha ou usuário inválidos</p>
                </div>
                `) 
        }
    })
}   
fazerLogin()