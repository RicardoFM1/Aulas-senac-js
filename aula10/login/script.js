const usuarios = localStorage.getItem("usuario")
const senhaLogin = document.querySelector(".senha")
const emailLogin = document.querySelector(".email")
const usuariosemobj = JSON.parse(usuarios)
    if(senhaLogin.value || emailLogin.value != usuarios){
    document.body.insertAdjacentHTML("beforeend", `
        <div id="toast"
            <p>Esse usuário não existe</p>
        </div>
        `)
    }else{
        document.body.insertAdjacentHTML("beforeend", `
            <div id="toast"
                <p>Login efetuado com sucesso</p>
            </div>
            `)
    }