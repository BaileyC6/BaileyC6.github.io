// #region Initializers

let NumOfRungs = 1;
//give select/delete commands to intial html rung element
document.querySelector('.Rung').addEventListener('click', selectElement);
document.querySelector('.Rung').addEventListener('keydown', deleteElement);
//this var will be used to know what element is selected to delete or other stuff idk.....
var selectedElement;

// #endregion

//I dont know if this should be a function or a class
class inputDiv 
{
  addedInstruction;
  constructor(InstructionName, tagName = '?') 
  {
    const tagNameDiv = document.createElement('input');
    tagNameDiv.className = 'TagName'
    tagNameDiv.value = tagName;
    tagNameDiv.addEventListener('input', resizeInput);
    const InputDiv = document.createElement('div');
    InputDiv.className = 'Input';
    InputDiv.appendChild(tagNameDiv);
    InputDiv.addEventListener('click', selectElement);
    InputDiv.addEventListener('keydown', deleteElement);

    const instructionSymbol = document.createElement('div');

    switch (InstructionName) 
    {
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
function resizeInput() 
{
  this.style.width = this.value.length + "ch";
}

document.querySelector('.instruction > .XIC').addEventListener('click', addXIC);

function addXIC() 
{
  if(selectedElement != null) 
  {
   instruction = new inputDiv('XIC');
   selectedElement.appendChild(instruction);
  }
}

const newrungbutton = document.querySelector(".NewRung");
newrungbutton.addEventListener('click', addnewrung);

function addnewrung() 
{
  const addedrung = document.createElement('div');
  addedrung.className = 'Rung';
  addedrung.tabIndex = '0';
  addedrung.addEventListener('click', selectElement);
  addedrung.addEventListener('keydown', deleteElement);
  const rungnumber = document.createElement('div');
  rungnumber.className = 'RungNumber';
  rungnumber.innerText = NumOfRungs;
  addedrung.appendChild(rungnumber);
  document.querySelector('.Code').appendChild(addedrung);
  NumOfRungs ++;
}

// #region HTML Manipulations (selecting, deleting, undo, redo, etc.)

function selectElement(e) 
{
  e.stopPropagation(); //if we dont have this when clicking instructions the rung click event will also be triggered, thus always selecting the rung
  if(selectedElement != null) 
  {
    selectedElement.style.background = 'transparent';
  }
  selectedElement = e.currentTarget;
  selectedElement.style.background = '#120ee8';
}

//this feels kind of shit
function deleteElement(e) 
{
  if(e.key == 'Delete')
  {
    var deletedElement = selectedElement;
    if(selectedElement.previousElementSibling != null) 
    {
      //if its the last instruction on the rung select the rung (not the rung number)
      if(selectedElement.previousElementSibling.className == 'RungNumber')
      {
        selectedElement = deletedElement.parentElement;
      }
      else 
      {
        selectedElement = deletedElement.previousElementSibling;
      }
      selectedElement.style.background = '#120ee8';
    }
    deletedElement.remove();
  }
}

// #endregion

// #region Instruction Classes

class Instruction 
{
  constructor (text, tagName = '?') 
  {
    this.structuredText = `${text}(${tagName})`;
    this.tagName = tagName;
  }
}

class XIC extends Instruction 
{
  value = false;
  constructor(tagName = '?') 
  {
    super('XIC', tagName);
  }
}
// #endregion