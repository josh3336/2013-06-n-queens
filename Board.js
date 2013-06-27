(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      var rowCounter = 0;
      for(var i = 0; i < this.attributes[rowIndex].length; i++){
        if(this.attributes[rowIndex][i] === 1){
          rowCounter = rowCounter + 1;
        }
        if(rowCounter > 1){
          return true;
        }
      }
      return false;
    },

    hasAnyRowConflicts: function(){
      for(var row in this.attributes){
        if(row !== 'n' && this.hasRowConflictAt(row)) {
          return true;
        }
      }
      return false;
    },

    hasColConflictAt: function(colIndex){
      return false; // fixme
    },

    hasAnyColConflicts: function(){
    var conflicts=false;
    for(var i = 0; i < this.attributes.n; i++){
        if(conflicts === true){
          break;
        }
        var rowCounter = 0;

        for(var key in this.attributes){
          if(this.attributes[key][i] === 1){
            rowCounter = rowCounter + 1;
          }
          if(rowCounter > 1){
             conflicts = true;
          }
        }
      }
      return conflicts;

      },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      return false; // fixme
    },

    hasAnyMajorDiagonalConflicts: function(){
      for(var key in this.attributes){
        if(key !== 'n'){
          var nextKey=(parseInt(key)+1)+"";
          if (this.attributes[nextKey] === undefined){
            return false;
          }
          for(var i = 0; i < this.attributes.n; i++){
            if(this.attributes[key][i] === 1){
              if(this.attributes[nextKey][i - 1] ===1 || this.attributes[nextKey][i + 1] ===1){
                return true;
              }
            }
          }
        }
      }
      return false;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      return false; // fixme
    },

    hasAnyMinorDiagonalConflicts: function(){
  
     for(var key in this.attributes){
       if(key !== 'n'){
        for(var k = 2; k < this.attributes.n; k++){
          var nextKey=(parseInt(key)+k)+"";
          var nextKeyasint=parseInt(nextKey);
          for(var i = nextKey; i < this.attributes.n; i++){
            for(var j = 0; j < this.attributes.n; j++){
              if(this.attributes[key][j] === 1){
                if(this.attributes[nextKey][j - nextKeyasint] ===1 || this.attributes[nextKey][j + nextKeyasint] ===1){
                  return true;
                }
              }
            }
          }
        }
       }
     }
     return false;
  }
  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
