// let nomeUsuario = prompt("Insira seu nome")

// console.log(nomeUsuario, "nome digitado")

// alert(`Nome digitado ${nomeUsuario}`)

//let numeroa = parseInt(prompt("Digite o primeiro número da soma"))
//let numerob = parseInt(prompt("Digite o segundo número da soma"))

//let soma = numeroa + numerob

//alert("Resulta da soma: "+ soma.toFixed(2))

 //let nome = prompt("Insira seu nome").toUpperCase()
 //alert(`Nome digitado ${nome}`)

 // "Alert" = mostrar na tela um texto para o usuario
 // "toUpperCase" = para colocar em maiúsculo
 // "parseInt" = converte em número inteiro
 // "prompt" = executar uma função



 
 
 // let nome = prompt("Digite um nome")

//  COMPARAÇÃO
// == SE O VALOR É IGUAL
// === SE O VALOR E O TIPO SÃO IGUAIS
// console.log(3 === "3")
// != diferente
// || OU 
// && E

// CONDICIONAL 
// if(condicao){
// executa
// }
// else if(condicao){
// executa
//}
// else{
// executa
//}
// if(nome == "Anderson"){
//     console.log("if 1")
//     alert("Você é muito bonito")
// }
// else if(nome == "José"){        // else if seria para continuar na mesma função de cima sem passar para a próxima função
//     console.log("if 2")
//     alert("Você não é bonito")
// }
// else{
//     console.log("else")
//     alert(`seu nome é ${nome}`)
// }
// if(nome != "Maria"){
//     alert("Seu nome deve ser Maria")
// }
// if(nome == "Anderson" || nome == "Pedro"){
//     alert("VOcê ganhou o prêmio")
// }
//if(nome.toLowerCase() == "anderson" && 1>0){   //<--- se não for iguais, não executa. 
   // alert("Parabens!")
 //}






  let operador = prompt(`Digite uma opção,
    1 - soma, 
    2 - subtração, 
    3 - multiplicação, 
    4 - divisão`)
if(operador != "1" && operador != "2" && operador != "3" && operador != "4"){
    alert("Operação inválida")
} else {
    alert("Faça uma conta")
}
let primeiroNumero = parseInt(prompt(`Digite o primeiro número`))
let segundoNumero = ""
if(isNaN(primeiroNumero)){
    alert("Digite um valor numérico")
}else{
     segundoNumero  = parseInt(prompt(`Digite o segundo número`))
    if(isNaN(segundoNumero)){
        alert("Digite um valor numérico")
        
    }else {
        if(!isNaN(primeiroNumero) && !isNaN(segundoNumero)){
   
            soma = primeiroNumero + segundoNumero
            sub = primeiroNumero - segundoNumero
            mult = primeiroNumero * segundoNumero
            div = primeiroNumero / segundoNumero
            if(operador == "1")    
                alert(`A soma do seu número é: ${soma}`)
            if(operador == "2")    
                alert(`A subtração do seu número é: ${sub}`)
            if(operador == "3")    
                alert(`A multiplicação do seu número é: ${mult}`)
            if(operador == "4"){
                if(primeiroNumero === 0 || segundoNumero ===0){
                    alert("Digite um valor numérico")

                }else{

                    alert(`a divisão do seu número é: ${div}`)    
                }
         }
         }
    }
   
}



// a