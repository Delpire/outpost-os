var EventSchedule = function(console){
  this.eventId = 0;
  this.eventProgress = 0;
  this.hasTriggeredProgress = false;
  this.mainConsole = console;
  this.eventItem = "";
}

EventSchedule.prototype = {

  update: function(input){
    
    switch(this.eventId){
     
      case 0:
        this.playIntro();
        break;
      case 1:
        this.getUsernameEvent(input);
        break;
      case 2:
        this.listPlanetsEvent(input);
        break;
      case 3:
        this.choosePlanetEvent(input);
        break;
      
    }
    
    if(this.eventProgress >= 100){
      this.eventId++;
      this.eventProgress = 0;
    }
  },
  
  playIntro: function(){
    this.mainConsole.addToBuffer(intro[0]);
    this.eventProgress = 100;
  },
  
  getUsernameEvent: function(input){
    if(this.eventProgress < 50){
      this.mainConsole.addToBuffer(enterUsername[0]);
      this.eventProgress += 50;
    }
    else{
      if(input !== null){
        this.mainConsole.username = input;
        this.eventProgress += 50;
      }
    }
  },
  
  listPlanetsEvent: function(input){
    if(this.eventProgress < 30){
      this.mainConsole.addToBuffer(listPlanets[this.eventProgress / 15]);
      this.eventProgress += 15;
    }
    else if(this.eventProgress > 30){
      this.mainConsole.addToBuffer(listPlanets[(this.eventProgress / 15) - 1]);
      this.eventProgress += 15;
    }
    else{
      
      if(input == "/list planets"){
        this.eventProgress += 15;
      }
      else if(input !== null){
        this.mainConsole.addToBuffer("Incorrect Command...\n");
      }
    }
  },
  
  choosePlanetEvent: function(input){
    
    if(this.eventProgress < 33){
      this.mainConsole.addToBuffer(choosePlanet[0]);
      this.eventProgress += 33;
    }
    
    if(input !== null){
      if(input.slice(0, 7) == "/select"){
        if(input == "/select PlanetA" || input == "/select PlanetB" || input == "/select PlanetC" || input == "/select PlanetD"){
          this.eventItem = input.split(" ")[1];
          this.mainConsole.addToBuffer(this.eventItem + choosePlanet[1]);
          
          if(this.eventProgress == 33){
            this.eventProgress += 33;
          }
        }
        else{
          this.mainConsole.addToBuffer("Invalid Planet...\n");
        }
      }
      
      if(this.eventProgress == 99 && input == "/land"){
        this.mainConsole.planet = this.eventItem;
        this.eventProgress = 100;
      }
    }
    
    if(this.eventProgress == 66){
      this.mainConsole.addToBuffer(choosePlanet[2]);
      this.eventProgress += 33;
    }

  }

}