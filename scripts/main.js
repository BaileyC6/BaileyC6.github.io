const instructions = document.querySelectorAll(".instruction-group .instruction");
const newrungbutton = document.querySelector(".Rung")
let NumOfRungs = 0;

for (const instruction of instructions) {
  instruction.addEventListener('click', addinstruction);
}

newrungbutton.addEventListener('click', addnewrung);

function addinstruction() {
  alert('added instruction');
}

function addnewrung() {
  const addedrung = document.createElement('p');
  addedrung.innerText = NumOfRungs + ' |-----------------------------|';
  document.querySelector('.Code').appendChild(addedrung);
  NumOfRungs ++;
}