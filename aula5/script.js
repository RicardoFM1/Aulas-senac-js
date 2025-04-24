
// - Exercício 1
// Antes do racionamento de energia ser decretado, quase ninguém falava de quilowatts; mas agora, 
// todos incorporaram essa palavra em seu vocabulário.

// Sabendo que 100 quilowatts de energia custa um sétimo de salário mínimo, 100 = 1/7  de 1.518,00 = 216,85, 100 watts = 216,85
// 2,16 por quilowatts
// faça um aplicativo que receba o valor do salário mínimo e a quantidade de quilowatts gasta por uma residência.
//  Então, calcule e imprima:

// O valor em reais de cada quilowatt; O valor em reais a ser pago; 
// O novo valor a ser pago por essa residência com um desconto de 10%.

// let valordosalariominimo = parseFloat(prompt("Digite o salário minimo:")).toFixed(2)
// let quantidadedewattsporresidencia = parseFloat(prompt("Digite a quantidade de watts por residencia:")).toFixed(2)
// if(isNaN (valordosalariominimo) || isNaN (quantidadedewattsporresidencia)){
//     alert("Digite um valor numérico!")
// }else{
// function calcularumsetimovalorporwattevalornovocomdesconto(){
// let valorporquilowatt = (valordosalariominimo / 7 ) / quantidadedewattsporresidencia
// let valornovoapagar = quantidadedewattsporresidencia * valorporquilowatt
// let valornovoparapagarcomdesconto = valornovoapagar * 0.9

    

    
//     alert(`O valor em reais de cada quilowatt é: R$ ${valorporquilowatt.toFixed(2)}`)
//     alert(`O valor novo a pagar sem desconto é de: R$ ${valornovoapagar.toFixed(2)}`)
//     alert(`O valor novo a pagar com desconto é de: R$ ${valornovoparapagarcomdesconto.toFixed(2)}`)
// }
// calcularumsetimovalorporwattevalornovocomdesconto()
// }








// - Exercício 2
// Em épocas de pouco dinheiro, os comerciantes estão procurando aumentar suas vendas oferecendo desconto. 
// Faça um aplicativo que possa receber o valor de um produto e imprima o novo valor tendo 
// em vista que o desconto foi de 9%. -- 10% = *0.90 9% = 0.91

// let valordoproduto = parseFloat(prompt("Digite o valor do produto:")).toFixed(2)
// if(isNaN (valordoproduto)){
//     alert("Insira um valor válido!")
// }else{
// function calculardesconto(){
//     let produtocomdesconto = valordoproduto * 0.91
//     alert(`Seu produto com um desconto fica: R$ ${produtocomdesconto}`)
// }
// calculardesconto()
// }

// - Exercício 3
// Criar um aplicativo que leia a quantidade de fitas que uma locadora de vídeo possui e o valor que 
// ela cobra por cada aluguel, mostrando as informações pedidas a seguir:

// Sabendo que um terço das fitas são alugadas por mês, exiba o faturamento anual da locadora; 
// Quando o cliente atrasa a entrega, é cobrada uma multa de 10% sobre o valor do aluguel. 
// Sabendo que um décimo das fitas alugadas no mês são devolvidas com atraso, 
// calcule o valor ganho com multas por mês; Sabendo ainda que 2% das fitas se estragam ao longo do ano, 
// e um décimo do total é comprado para reposição, exiba a quantidade de fitas que a 
// locadora terá no final do ano.

// let fitas = parseInt(prompt("insira a quantidades de fitas da locadora"))
// let aluguel = parseInt(prompt("insira o valor do aluguel das fitas"))
// if(!isNaN(fitas) && aluguel > 0){
//     let aluguelpormes = fitas / 3 
//     let faturamentoanual = aluguelpormes * 12;

//     alert(`faturamento anual: R$ ${faturamentoanual.toFixed(2)}`)
//     let atrasospormes = aluguelpormes / 10
//     let multaspormes = atrasospormes * (aluguel * 0.1)
//     alert(`multas por mês: R$ ${multaspormes.toFixed(2)}`)
//     let fitasestragadas = fitas * 0.02
//     let fitasrepostas = fitas / 10
//     let fitasfinal = fitas - fitasestragadas + fitasrepostas
//     alert(`número de fitas finais: ${fitasfinal}`)
// }else{
//     alert("insira um valor valido!")
// }

// - Exercício 4
// Entrar com um número no formato CDU (centena, dezena e unidade) e imprimi-lo invertido. 
// Por exemplo, 123 sairá 321. O número deverá ser armazenado em outra variável antes de ser impresso.

// let numeroCDU = prompt("Digite um valor que se encaixe na Centena, Dezena e Unidade:")
// let numeroCDUinvertido = ""
// if(numeroCDU > 1000){
//     alert("Insira um valor menor que 1000!")
// }else if(numeroCDU < 0){
//     alert("Insira um valor maior ou igual a 0!")
// }else{
//     function imprimirinvertido(){
//         for(let i = numeroCDU.length -1; i >= 0; i--){ // length 123 = 3 - 1 = length 2, index 123 = 2, enquanto index(2) >= 0, i--, exemplo: 123; 3(index 2), i--, 2(index 1), i--, 1(index 0), i--
//             numeroCDUinvertido += numeroCDU[i] 
//         }
//         alert(`Seu número invertido é: ${numeroCDUinvertido}`)
//     }
// }
// imprimirinvertido() 


// - Exercício 5
// Criar um aplicativo que, dado um número de conta corrente com três dígitos, 
// retorne o seu dígito verificador.
//  Para encontrar o dígito verificador, siga o exemplo do número 235:

// Somar o número da conta com o seu inverso: 235 + 532 = 767; 
// Multiplicar cada dígito pela sua ordem posicional (da esquerda para a direita) e 
// somar estes resultados: 7 * 1 + 6 * 2 + 7 * 3 = 40; O último dígito desse resultado é o dígito verificador da conta:
//  último dígito de 40 é 0. 

// let contacorrente = parseInt((prompt("Digite um número de 3 dígitos:")))
// let numerosinvertidos = ""
// if(contacorrente > 1000){
//         alert("Insira um valor menor que 1000!")
//     }else if(contacorrente < 100){
//         alert("Insira um valor maior ou igual a 100!")
//     }else if (isNaN(contacorrente) || isNaN (numerosinvertidos)){
//         alert("Digite um valor de 3 dígitos válidos!") 
// }else{
// function descobrirocodigoverificador(){ 
// let stringconta = String(contacorrente)
  
// for(let i = stringconta.length -1; i >= 0; i--){
//     numerosinvertidos += stringconta[i]
// }
// soma = parseInt(contacorrente) + parseInt(numerosinvertidos)
// let stringsoma = String(soma)
// let somaverificador = 0
// for(let i = 0; i < stringsoma.length; i++){
//    somaverificador += parseInt(stringsoma[i])*(i+1)
// }
// let codigoverificador = somaverificador % 10;
// alert(`O inverso da sua conta corrente é: ${numerosinvertidos}`)
// alert(`A soma do número da conta corrente com o inverso dela é: ${soma}`)
// alert(`O seu código verificador é: ${codigoverificador}`)
// }
// descobrirocodigoverificador()
// }







