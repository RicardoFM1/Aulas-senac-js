






// function filtro(array=[],condicao){
//     let lista = []
//     for(let i = 0; i <= array.length; i++){
//         if(array[i] < condicao){
//             lista.push(array[i])
//         }
//     }                               //---- ver com o sor certinho como funciona isso.
//     return lista
// }
// const filter = filtro([1,2,3,4,5],100)
// // const lista = [1,23,45,67,8,9]
// console.log(filter,"filtro")




// // FILTER RET0RNA SEMPRE UM ARRAY, COM ITEMS QUE PASSAM PELA CONDIÇÃO
// // SE NENHUM ITEM PASSAR, []

// const result = lista.filter((item)=>{
//     // console.log(item,"item")
//     return item > 3
// })
// console.log(result)

// const lista = [1,2,3,4,5]
////MAP
////SEMPRE RETORNA UM ARRAY DO MESMO TAMANHO
// const resultMap = lista.map((item)=>{
//     if(item < 3){
//         return item * 3
//     }else {
//         return item
//     }
// })
// console.log(lista)
// console.log(resultMap, "lista com map")

//FOREACH
//FOREACH SÓ PERCORRE O ARRAY, NÃO RETORNA NADA
// let aux = [1,2,3,4,5]
// const resultForEach = aux.forEach((item)=>{
//     if(item > 9){
//         aux.push(item)
//     }
//     return item
// })
// console.log(resultForEach,"foreach",aux)


// //FIND 
// //PERCORRE O ARRAY E RETORNA O PRIMEIRO ITEM QUE PASSAR NA CONDIÇÃO
// let lista = [1,2,3,4,5]
// const resultFind = lista.find((item)=>{
//     console.log("item find")
//     return item > 3
// })
// console.log(resultFind,"find")

// //FIND INDEX
// //PERCORRE O ARRAY E RETORNA O INDEX DO PRIMEIRO ITEM ENCONTRADO PELA CONDIÇÃO
// let lista = [1,2,3,4,5]
// const resultFindIndex = lista.findIndex((item)=>{
//     console.log("item find")
//     return item > 3
// })
// console.log(resultFindIndex,"index")

// //SPLICE
// //REMOVE UM OU MAIS ITENS DO ARRAY, e ALTERA O ARRAY ORIGINAL
// let lista = [1,2,3,4,5]
// lista.splice(0,2) // -- utiliza o index para se referir aos números. splice(primeiro i até o segundo i),  um trecho.
// console.log(lista)



// //SLICE RETORNA UM TRECHO DO ARRAY, SEM ALTERAR O ORIGINAL
// let lista = [1,2,3,4,5]
// const resultSlice = lista.slice(0,4) // -- primeiro índice vai incluir, mas o último não, porque delimita ali o final do trecho.
// console.log(lista,"lista")
// console.log(resultSlice,"resultSlice")

//result a  