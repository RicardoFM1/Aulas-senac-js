const form = document.querySelector("#cadastro")
function fazerCadastro(){
    form.addEventListener("submit", async(eventocadastro)=>{
        eventocadastro.preventDefault()
        {
        const senha = document.querySelector("#senha")
        const email = document.querySelector("#email")
        const confirmarSenha = document.querySelector("#confirmaSenha")           
        const tamanhoSenha = `${senha.value}`
       
        if(senha.value != confirmarSenha.value){
            document.body.insertAdjacentHTML("beforeend",`
                <div class="toast erro">
                    <p>Confira se a senhas estão idênticas</p>
                </div>
                `)
        }else if(senha.value ===  "" || email.value === ""){
            document.body.insertAdjacentHTML("beforeend",`
                <div class="toast erro">
                    <p>Insira uma senha ou email válido</p>
                </div>
                `)
        }else if(tamanhoSenha.length < 8){
            document.body.insertAdjacentHTML("beforeend", `
                <div class="toast erro">
                     <p>A senha precisa ter no mínimo 8 caracteres!</p>
                </div>
               `)
        
        }else{
            const user  = {
                senha: senha.value,
                email : email.value
            }
            const res = await fetch("http://localhost:3001/users",{
                method:"POST",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type':"application/json; charset=utf-8"
                }
            })
            
            if (res.status === 201){
                document.body.insertAdjacentHTML("beforeend", `
                    <div class="toast sucesso">
                        <p>Usuário cadastrado com sucesso!</p>
                    </div>
                    `)
            }
            const response = await res.json()

            setTimeout(()=>{   
                location.href = "/login"
            },3000)
            
               
    }}})
    console.log(usuarioCadastrado, usuarioEmail)
}

fazerCadastro()




