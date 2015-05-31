var TYPE_TIME_STEP = 25;
var CURSOR_BLINK_SPEED = 150;
var TEXT_BUFFER_MAX = 1550;

var CODE_TO_CHAR = [ ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] ];
var CODE_TO_NUM = [ ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "/"], [")", "!", "@", "#", "$", "%", "^", "&", "*", "(", "?"] ];

var Console = function(textArea){
  
  this.textArea = textArea;
  this.textBuffer = [];
  this.inputIndex = 0;
  this.bufferIndex = 0;
  this.stringIndex = 0;
  this.deltaTime = 0;
  this.timeStep = TYPE_TIME_STEP;
  this.isShowingCursor = true;
  this.cursorLocation = 0;
  this.shift = 0;
  this.username = "";
  this.planet = null;
  this.lastInput = "";
};

Console.prototype = {
  
  addToBuffer: function(text){
    
    if(this.textBuffer.length == TEXT_BUFFER_MAX){
      //TODO Remove top element of buffer if buffer is full to a certain point.
    }
    
    this.textBuffer.push(text);
  },
  
  addCharToBuffer: function(code){

    this.textBuffer[this.textBuffer.length - 1] += CODE_TO_CHAR[this.shift][code - 65];

    this.inputIndex++;
  },
  
  addNumToBuffer: function(code){
    
    this.textBuffer[this.textBuffer.length - 1] += CODE_TO_NUM[this.shift][code - 48];
    
    this.inputIndex++;
  },
  
  addSpaceToBuffer: function(){
    
    this.textBuffer[this.textBuffer.length - 1] += " ";
    
    this.inputIndex++;
  },
  
  addLine: function(){
    
    this.lastInput = this.textBuffer[this.textBuffer.length - 1].split(":")[1];
    this.textBuffer[this.textBuffer.length - 1] += "\n";
    this.inputIndex = 0;
  },
  
  removeChar: function(){
    
    if(this.inputIndex > 0){
      this.textArea.innerHTML = this.textArea.innerHTML.slice(0, this.textArea.innerHTML.length - 1);
      this.textBuffer[this.textBuffer.length - 1] = this.textBuffer[this.textBuffer.length - 1].slice(0, this.textBuffer[this.textBuffer.length - 1].length - 1);
      this.inputIndex--;
      this.stringIndex--;
    }
  },
  
  shiftKey: function(isHoldingShift){
    
    if(isHoldingShift){
      this.shift = 1;
    }
    else{
      this.shift = 0;
    }
  },
  
  update: function(elapsedTime){
  
    this.deltaTime += elapsedTime;
  
    if(this.bufferIndex == this.textBuffer.length){
      if(this.planet === null){
        this.textBuffer.push(this.username + ":");
      }
      else{
        this.textBuffer.push(this.username + "@" + this.planet + ":");
      }
    }
  
    // If the amount of time since last printed character
    // is longer than TYPE_TIME_STEP, then print the next
    // character.
    if(this.deltaTime >= this.timeStep && this.bufferIndex < this.textBuffer.length && this.stringIndex < this.textBuffer[this.bufferIndex].length){
      
      this.textArea.innerHTML = this.textArea.innerHTML.slice(0, this.textArea.innerHTML.length - 1);
      this.textArea.innerHTML += this.textBuffer[this.bufferIndex][this.stringIndex];
      this.textArea.innerHTML += '|';
    
      if(this.textBuffer[this.bufferIndex][this.stringIndex] == '\n'){
        this.bufferIndex++;
        this.stringIndex = 0;
        this.timeStep = 5 * TYPE_TIME_STEP;
      }
      else{
        this.stringIndex++;
        this.timeStep = TYPE_TIME_STEP;
      }
      
      
      this.deltaTime = 0;
    }
    else if(this.deltaTime >= CURSOR_BLINK_SPEED){
      
      if(this.isShowingCursor){
        this.textArea.innerHTML = this.textArea.innerHTML.slice(0, this.textArea.innerHTML.length - 1);
        this.textArea.innerHTML += " ";
        this.isShowingCursor = false;
      }
      else{
        this.textArea.innerHTML = this.textArea.innerHTML.slice(0, this.textArea.innerHTML.length - 1);
        this.textArea.innerHTML += "|";
        this.isShowingCursor = true;
      }
      
      if(this.bufferIndex >= this.textBuffer.length || this.stringIndex >= this.textBuffer[this.bufferIndex].length){
        this.deltaTime = 0;
      }
    }
  },
}