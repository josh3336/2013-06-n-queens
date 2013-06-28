// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){

  //var solution = undefined; //fixme
  var board = new Board(makeEmptyMatrix(n));
  var count = 0;
  var row = 0;
  var checkDeeper = function(board,row){
    
      for (var column = 0; column < n; column++){
        board.attributes[row.toString()][column] = 1;
        if( column >  0){
          board.attributes[row.toString()][column - 1] = 0;
        }
        if( row === (n-1)){
          if ( !board.hasAnyColConflicts() && !board.hasAnyRowConflicts() ){
            count++;
            console.log('count',count)
            console.log('solutions',board.attributes)
            solution = board.attributes;
            return board.attributes;
          } 
          
        }
        if(!(board.hasAnyColConflicts() || board.hasAnyRowConflicts())){
          var clonedboard=ObjectHandler.getCloneOfObject(board);
          checkDeeper(clonedboard,row+1);
      }
    }
  };
    console.log('in findrooks')
    return checkDeeper(board,0);
  };

  // console.log('Single solution for ' + n + ' rooks:', solution);
  // return solution;
  // };

// window.findNRooksSolution = function(n){


//   //var solution = undefined; //fixme
//   var count = 0;
//   var bag = _.range(n);
  
//   var createArray = function(n){
//     var array = [];
//     for(var i = 0; i < n; i++){
//       array.push(0);
//     }
//     return array;
//   };

//   var function

//   var traverse = function(){
    
//   };
  
// };
  // console.log('Single solution for ' + n + ' rooks:', solution);
  // return solution;
//};

window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme




  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  //var solution = undefined; //fixme
  var board = new Board(makeEmptyMatrix(n));
  var count = 0;
  var row = 0;

  var checkDeeper = function(board,row){
      for (var column = 0; column < n; column++){
        board.attributes[row.toString()][column] = 1;
        if( column >  0){
          board.attributes[row.toString()][column - 1] = 0;
        }
        if( row === (n-1)){
          if ( !board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()){
            count++;
            console.log('count',count)
            console.log('solutions',board.attributes)
            solution = board.attributes;
            return board.attributes;
          }
        }
        if(!(board.hasAnyColConflicts() || board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts())){
          var clonedboard=ObjectHandler.getCloneOfObject(board);
          checkDeeper(clonedboard,row+1);
        }
      }
  };
    console.log('in queens for',n);
    return checkDeeper(board,0);

};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};



var makeEmptyMatrix = function(n){
  return _(_.range(n)).map(function(){
    return _(_.range(n)).map(function(){
      return 0;
    });
  });
};


var ObjectHandler = {
    //public method
    getCloneOfObject: function(oldObject) {
        var tempClone = {};

        if (typeof(oldObject) == "object")
            for (prop in oldObject)
                // for array use private method getCloneOfArray
                if ((typeof(oldObject[prop]) == "object") &&
                                (oldObject[prop]).__isArray)
                    tempClone[prop] = this.getCloneOfArray(oldObject[prop]);
                // for object make recursive call to getCloneOfObject
                else if (typeof(oldObject[prop]) == "object")
                    tempClone[prop] = this.getCloneOfObject(oldObject[prop]);
                // normal (non-object type) members
                else
                    tempClone[prop] = oldObject[prop];

        return tempClone;
    },

    //private method (to copy array of objects) - getCloneOfObject will use this internally
    getCloneOfArray: function(oldArray) {
        var tempClone = [];

        for (var arrIndex = 0; arrIndex <= oldArray.length; arrIndex++)
            if (typeof(oldArray[arrIndex]) == "object")
                tempClone.push(this.getCloneOfObject(oldArray[arrIndex]));
            else
                tempClone.push(oldArray[arrIndex]);

        return tempClone;
    }
};


