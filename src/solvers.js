/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  var solution;
  //make new board
  var board = new Board({n:n});

  var checkRow = function(row, column) {
    //put down rook
    board.togglePiece(row, column);
    //check for conflicts
    if( board.hasAnyRooksConflicts() ) {
      //remove existing piece
      board.togglePiece(row, column);
      //move to next column, or move to next row
      if(column + 1 < n) {
        checkRow( row, column + 1 );
      } else if (row + 1 < n) {
        checkRow( row + 1, 0);
      }
    //if no conflict, go to next row
    } else {
      if (row + 1 < n) {
        checkRow( row + 1, 0);
      }
    }
  };
  checkRow(0,0);

  solution = board.rows();
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var solver = function(row) {
    if( row === n ) {
      solutionCount++;
      return;
    }
    for( var i = 0; i < n; i++ ) {
      board.togglePiece(row, i);
      if(!board.hasAnyRooksConflicts()) {
        solver(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  solver(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  //make new board
  var board = new Board({n:n});
  var solver = function(row) {
    if( row === n ) {
      return;
    }
    for( var i = 0; i < n; i++ ) {
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts()) {
        solver(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  solver(0);
  solution = _.map(board.rows(), function(row) {
    return row.slice() || board.rows();
  });
  return solution;
  };


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var solver = function(row) {
    if( row === n ) {
      solutionCount++;
      return;
    }
    for( var i = 0; i < n; i++ ) {
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts()) {
        solver(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  solver(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
