function openModal(){
    const btn = document.querySelector(".open")
    btn.addEventListener("click",()=>{
        // document.body.innerHTML = `
        //     <div class="wrapper">
        // <div class="modal">
        //     <h2>Olá</h2>
        //     <p>Isso é um modal</p>
        //     <button class="close">Fechar</button>
        // </div>
        // </div>
        // `
        document.body.insertAdjacentHTML("beforeend",`
            
            <div class="wrapper">
        <div class="modal">
            <h2>Olá</h2>
            <p>Isso é um modal</p>
            <button class="close">Fechar</button>
        </div>
        </div>
            `)
            const close = document.querySelector(".close2")
           
            close.addEventListener("click",()=>{
               
                const wrapper = document.querySelector(".wrapper")
                wrapper.remove()
            })
    })
    
}
openModal()

function addCart(){
    const btnAdd = document.querySelector(".add_cart")
    btnAdd.addEventListener("click",()=>{
        console.log("add")
        document.body.insertAdjacentHTML("beforeend",`
            
            <div class="toast">
                <p>Produto adicionado ao carrinho!</p>
            </div>
            `)
    })
}
addCart()
function getUser(){
    const email = localStorage.getItem("email")
    console.log(email,"email")
    if(email){
        const userspan = document.querySelector(".user")
        userspan.innerText = email
    }else{
        location.href = "../home"
    } 
}
getUser()