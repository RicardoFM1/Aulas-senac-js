function soma(a,b){
    return a+b
}
function multiplica(a,b,callback){
    let resultado = 0
    for(let i = 1; i <= b; i=soma(i,1)){
        resultado = callback(a,resultado)
    }
    return  resultado
}
function potencia(a,b){
    let resultado = a
    for(let i = 1; i < b; i++){
        resultado = multiplica(a,resultado)
    }
    return resultado
}
function fatorial(a){
    let resultado = a
    for(let i = 1; i < a; i++){
        resultado = multiplica(resultado,i)
    }
    return resultado
}
const resultMultiplicacao = multiplica(30,3,soma)
console.log(resultMultiplicacao)
// const resultPotencia = potencia(2,3)
// console.log(resultPotencia)
// const resultFatorial = fatorial(5)
// console.log(resultFatorial)

//CALLBACK 


