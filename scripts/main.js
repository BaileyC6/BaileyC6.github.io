// #region Initializers

//give select/delete commands to intial html rung element
document.querySelector('.Rung').addEventListener('click', selectElement);
document.querySelector('.Rung').addEventListener('keydown', deleteElement);
//this var will be used to know what element is selected to delete or other stuff idk.....
var selectedElement;
//last rung used for info idk
const ENDRung = document.querySelector('.END');

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
  addedrung.tabIndex = '0'; //idk why this is needed
  addedrung.addEventListener('click', selectElement);
  addedrung.addEventListener('keydown', deleteElement);

  //add the rung before the NA end/last rung
  document.querySelector('.Code').insertBefore(addedrung, ENDRung);
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

//this is kind of shit
function deleteElement(e) 
{
  if(e.key == 'Delete')
  {
    var deletedElement = selectedElement; 
    //first try to select the next sibling element
    if(deletedElement.nextElementSibling != null)
    {
      selectedElement = deletedElement.nextElementSibling;
      selectedElement.style.background = '#120ee8';
    }
    //then try to get the previous sibling
    else if(deletedElement.previousElementSibling != null)
    {
      selectedElement = deletedElement.previousElementSibling;
      selectedElement.style.background = '#120ee8';
    }
    //if we arent deleting a rung (which will not have a deletable parent) then select the current rung
    else if (deletedElement.className != 'Rung')
    {
      selectedElement = deletedElement.parentElement;
      selectedElement.style.background = '#120ee8';
    }
    else
    {
      selectedElement = null; //nothing left to select
    }

    //finally remove the element we want to delete
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