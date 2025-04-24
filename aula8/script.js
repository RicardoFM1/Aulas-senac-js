// import { produtos } from "./data.js"
// const carrinho = []
// function montarProdutos(){
//     const ul = document.querySelector("ul")
//     produtos.forEach((produto)=>{
//         ul.insertAdjacentHTML("afterbegin",`
//              <li>
//                 <p>${produto.name}</p>
//                 <p>${produto.price}</p>
//                 <p>${produto.descricao}</p>
//                 <button>Adicionar ao carrinho</button>
//             </li>
//             `)
//         const button = document.querySelector("button")
//         button.addEventListener("click",()=>{
//             console.log("click",produto)
//             carrinho.push(produto)
//             montarCarrinho(carrinho)
//         })
//     }) 
// }
// montarProdutos()
// function montarCarrinho(carrinho=[]){
//     const ul = document.querySelector(".carrinho")
//     ul.innerHTML = ""
//     carrinho.forEach((produto)=>{
//         ul.insertAdjacentHTML("afterbegin",`
//             <li>
//                <p>${produto.name}</p>
//                <p>${produto.price}</p>
//                <p>${produto.descricao}</p>
//                <button>Remover ao carrinho</button>
//            </li>
//            `)
//     })
// }