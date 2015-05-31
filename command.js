COMMANDS = ["/commands", "/water"];

var Command = function(console){

  this.mainConsole = console;

}

Command.prototype = {

  checkCommand: function(input){
    
    for(var i = 0; i < COMMANDS.length; i++){
     
      if(COMMANDS[i] == input){
        this.command(i);
        return;
      }
    }
  },
  
  command: function(commandId){
    
    switch(commandId){
      
      case 0:
        break;
      case 1:
        break;
    }
  },
  
  listCommands: function(){
    
    for(var i = 0; i < COMMANDS.length; i++){
      this.mainConsole.addToBuffer(COMMANDS[i] + "\n");
    }
  }
  


}