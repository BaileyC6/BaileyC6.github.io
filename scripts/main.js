const instructions = document.querySelectorAll(".instruction-menu .instruction");
const newrungbutton = document.querySelector(".NewRung")
let NumOfRungs = 0;

// for (const instruction of instructions) {
//   instruction.addEventListener('click', addinstruction);
// }

// function addinstruction() {
//   // alert('added instruction');
// }

const XICelement = document.createElement('div.XICinstruction')

document.querySelector('.instruction > .XIC').addEventListener('click', addXIC);

function addXIC() {
  test = new XIC();
  document.querySelector('.Rung').innerText += test.structuredText;
}

newrungbutton.addEventListener('click', addnewrung);

function addnewrung() {
  const addedrung = document.createElement('p');
  addedrung.className = 'Rung';
  addedrung.innerText = `${NumOfRungs}`;
  document.querySelector('.Code').appendChild(addedrung);
  NumOfRungs ++;
}

class Instruction {
  constructor (text, tagName = '?') {
    this.structuredText = `${text}(${tagName})`;
    this.tagName = tagName;
  }
}

class XIC extends Instruction {
  value = false;
  constructor(tagName = '?') {
    super('XIC', tagName);
  }
}