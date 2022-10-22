// const instructions = document.querySelectorAll(".instruction-menu .instruction");

// for (const instruction of instructions) {
//   instruction.addEventListener('click', addinstruction);
// }

//I dont know if this should be a function or a class
class inputDiv {
  addedInstruction;
  constructor(InstructionName, tagName = '?') {
    const tagNameDiv = document.createElement('input');
    tagNameDiv.className = 'TagName'
    tagNameDiv.value = tagName;
    tagNameDiv.addEventListener('input', resizeInput);
    const InputDiv = document.createElement('div');
    InputDiv.className = 'Input';
    InputDiv.appendChild(tagNameDiv);

    const instructionSymbol = document.createElement('div');

    switch (InstructionName) {
      case 'XIC':
        const addedInstruction = new XIC(tagName);
        instructionSymbol.className = 'XICInstruction';
        instructionSymbol.innerText = 'XIC'; //temp code until images are added
        break;
    }
    InputDiv.appendChild(instructionSymbol);
    return InputDiv;
  }
}

// resizes the input field to match the length of the text input
//can probably add the tagname rename on exit
function resizeInput() {
  this.style.width = this.value.length + "ch";
}

document.querySelector('.instruction > .XIC').addEventListener('click', addXIC);

function addXIC() {
  instruction = new inputDiv('XIC');
  selectedRung.appendChild(instruction);
}

let NumOfRungs = 1;
var selectedRung = document.querySelector('.Rung');
document.querySelector('.Rung').addEventListener('click', SelectRung);
document.querySelector('.Rung').addEventListener('keydown', (e) => DeleteRung(e));

function SelectRung() {
  selectedRung.style.background = 'transparent';
  selectedRung = this;
  selectedRung.style.background = '#AA0000';
}

function DeleteRung(e) {
  if(e.key == 'Delete')
  {
    selectedRung.remove();
    //need to renumber rungs here too
  }
}

const newrungbutton = document.querySelector(".NewRung");
newrungbutton.addEventListener('click', addnewrung);

function addnewrung() {
  const addedrung = document.createElement('div');
  addedrung.className = 'Rung';
  addedrung.tabIndex = '0';
  addedrung.addEventListener('click', SelectRung);
  addedrung.addEventListener('keydown', (e) => DeleteRung(e));
  const rungnumber = document.createElement('div');
  rungnumber.className = 'RungNumber';
  rungnumber.innerText = NumOfRungs;
  addedrung.appendChild(rungnumber);
  document.querySelector('.Code').appendChild(addedrung);
  NumOfRungs ++;
}

// Instruction Classes

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