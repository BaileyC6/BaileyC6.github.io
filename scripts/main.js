// #region bug list
// when 'END' is selected, instructions can be added
// #endregion

// #region Initializers

//give select/delete commands to intial html rung element
document.querySelector('.Rung').addEventListener('click', selectElement);
document.querySelector('.Rung').addEventListener('keydown', deleteElement);
//this var will be used to know what element is selected to delete or other stuff idk.....
var selectedElement;
//last rung used for info idk
const ENDRung = document.querySelector('.END');

// #endregion

// #region Buttons

const buttons = document.querySelectorAll('.instruction > *');
for (const button of buttons)
{
  button.addEventListener('click', addInstruction);
}

function addInstruction(e)
{
  if(selectedElement == null || 
    (selectedElement.className != 'Rung' &&
    selectedElement.className != 'Input' && 
    selectedElement.className != 'Output' ))
  {
    return;
  }
  instruction = instructionDiv(e.target.className);

  if (selectedElement.className == 'Rung')
  {
  //if the rung is selected append the new instruction as the last child
  selectedElement.appendChild(instruction);
  }
  else
  {
  //if an instruction is selected append the new one after the selected one
  selectedElement.parentElement.insertBefore(instruction, selectedElement.nextElementSibling)
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

// #endregion

function instructionDiv(InstructionName, tagName = '?') 
{
  const tagNameDiv = document.createElement('input');
  tagNameDiv.className = 'TagName'
  tagNameDiv.value = tagName;
  tagNameDiv.pattern = '^[A-Za-z](?:_?[A-Za-z0-9]+)*$'; //I hate regex https://stackoverflow.com/questions/2821419/regular-expression-starting-and-ending-with-a-letter-accepting-only-letters
  //maybe I can add a title to let the user know when something is wrong
  tagNameDiv.addEventListener('input', resizeInput);
  tagNameDiv.addEventListener('focusout', defineTagName);

  const instructionSymbol = document.createElement('div');
  instructionSymbol.className = InstructionName;
  instructionSymbol.innerText = InstructionName; //temp code until images are added

  const InputDiv = document.createElement('div');
  InputDiv.className = 'Input'; //this will need to be changed, either input or output
  InputDiv.appendChild(tagNameDiv);
  InputDiv.appendChild(instructionSymbol);
  InputDiv.addEventListener('click', selectElement);
  InputDiv.addEventListener('keydown', deleteElement);

  return InputDiv;
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

// resizes the input field to match the length of the text input
function resizeInput() 
{
  this.style.width = this.value.length + "ch";
}

//adds tag name to list if new, otherwise updates old tag
function defineTagName()
{
  //tag name meets regex and is valid
  if(this.validity.valid)
  {
    //create tag name
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