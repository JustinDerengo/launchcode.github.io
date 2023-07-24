class Rover {

   constructor (position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }
    receiveMessage(message) {
      let response = {
        message: message.name,
        results: []  
        
      }
      //need to create new object and push it into results [] per new command
      
      for(let i = 0; i < message.commands.length; i++) {
        if (message.commands[i].commandType === "STATUS_CHECK") {
          response.results.push({
            completed: true,
            roverStatus: {
              mode: this.mode,
              position: this.position,
              generatorWatts: this.generatorWatts
            }
          })
        } else if (message.commands[i].commandType === "MODE_CHANGE" && (message.commands[i].value === "LOW_POWER" || message.commands[i].value === "NORMAL")) {
          response.results.push({
            completed: true
          })
          this.mode = message.commands[i].value
        } else if (message.commands[i].commandType === "MOVE") {
          if (this.mode === "NORMAL") {
            response.results.push({
              completed: true
            })
            this.position = message.commands[i].value
          } else {
            response.results.push({
              completed: false
            })
          }
        }
        else {
          response.results.push({
            completed: false,
            message: "IVALID COMMAND"
          });
        }
      }
      return response
    }
    // create constructor that gets tests to pass (Test 7)
  
    // create receiveMessage(message) method
  
      // create response object, and set its message property (Test 8)
  
      // add a results property to response object, as an empty array (Test 9)
  
      // for each command in the message, add an item to the results array (Test 9)
  
        // for each command, add {} (an empty object) (Test 9)
  
        // if the command.commandType is STATUS_CHECK (Test 10) 
  
          // create a result object (empty to start)
  
          // set result.completed = true;
  
          // add a roverStatus object to the result object, with the status values of the rover
  
          // add the result object to the results array
  
        // if command.commandType is MODE_CHANGE (Test 11)
  
          // create a result obj
  
          // set result.completed = true
  
          // update rover's mode
  
          // add result to the results array
  
      // if command.commandType is MOVE (Test 12)
  
        // if rover mode is LOW_POWER, don't move and send competed = false in response
  
        // else if mode is NORMAL, change the position and send completed = false in response (Test 13)
    
      // return the response object
   
}

module.exports = Rover;