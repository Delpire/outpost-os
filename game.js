var TIME_STEP = 1000/60;

var Game = function(){
  
  this.mainConsole = new Console(document.getElementById('main-console'));
  this.eventSchedule = new EventSchedule(this.mainConsole);
  
  this.elapsedTime = 0.0;
	this.startTime = 0;
	this.lastTime = 0;
	this.gameTime = 0;
}

Game.prototype = {

  update: function(elapsedTime){
    
    this.eventSchedule.update(this.mainConsole.lastInput);
    this.mainConsole.lastInput = null;
    this.mainConsole.update(elapsedTime);
  },
  
  keyDown: function(e)
	{
	  switch(e.keyCode){
	    
	    // Shift
	    case 16:
	      this.mainConsole.shiftKey(true);
	      break;
      // Enter
      case 13:
        this.mainConsole.addLine();
	      break;
      // Tab
      case 9:
        break;
      //Backspace
      case 8:
        this.mainConsole.removeChar();
        break;
      //Space
      case 32:
        this.mainConsole.addSpaceToBuffer();
        break;
      //Left arrow
      case 37:
        break;
      //up arrow
      case 38:
        break;
      //Right arrow
      case 39:
        break;
      //Down arrow
      case 40:
        break;
      // Forward slash (/)
      case 191:
        this.mainConsole.addNumToBuffer(58);
        break;
      //[48 - 57][65 - 90]  = [0 - 9][a - z]
      default:
        if(e.keyCode >= 48 && e.keyCode <= 57){
          this.mainConsole.addNumToBuffer(e.keyCode);
        }
        else if(e.keyCode >= 65 && e.keyCode <= 90){
          this.mainConsole.addCharToBuffer(e.keyCode);
        }
        break;
	        
	  }
	},
	
	keyUp: function(e)
	{
    switch(e.keyCode){
      // Shift
        case 16:
          this.mainConsole.shiftKey(false);
          break;
    }

		//e.keyCode
	},

 	start: function() {
		var self = this;
    
		window.onkeydown = function (e) { self.keyDown(e); };
		window.onkeyup = function (e) { self.keyUp(e); };
		
		this.startTime = Date.now();
		
		window.requestNextAnimationFrame(
			function(time) {
				self.loop.call(self, time);
			}
		);
	},
 
   //Move this to game function.
  loop: function(time){
    var self = this;
    
    this.elapsedTime += time - this.lastTime;
		this.lastTime = time;
		this.elapsedTime = Math.min(this.elapsedTime, 4 * TIME_STEP);
		
		while (this.elapsedTime >= TIME_STEP) {
			this.update(TIME_STEP);
			this.elapsedTime -= TIME_STEP;
			
			// add the TIME_STEP to gameTime
			this.gameTime += TIME_STEP;
		}
  
  	window.requestNextAnimationFrame(
  	function(time) {
  		  self.loop.call(self, time);
  	  }
    );
  }
  
}

var game = new Game();
game.start();
