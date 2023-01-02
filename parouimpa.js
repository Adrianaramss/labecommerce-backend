const number = Number (process.argv[2])
const parouimpa = process.argv[3]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)
  console.log(numeroAleatorioEntreZeroeDez)

let total= number + numeroAleatorioEntreZeroeDez
console.log (total);


  if (total % 2 === 0 && parouimpa === "par") {
    console.log (`você escolheu ${parouimpa} e o resultado ${total} você ganhou`);
  }else if (total % 2 === 1 && parouimpa !== "par") { 
   console.log(`você escolheu ${parouimpa} e o resultado ${total} você ganhou`)
  }else if (total % 2 === 0 && parouimpa !== "par") { 
    console.log(`você escolheu ${parouimpa} e o resultado ${total} computador ganhou`)
}else if (total % 2 === 1 && parouimpa !== "par") { 
    console.log(`você escolheu ${parouimpa} e o resultado ${total} computador ganhou`)
}