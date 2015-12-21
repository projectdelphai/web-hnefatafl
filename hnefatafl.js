currentPlayer = "white";
pieceChosen = false;
pieceChosenXCoord = 0;
pieceChosenYCoord = 0;

function sayHello() {
  alert("Hello World!");
}

function displayCurrentPiece(pieceID) {
  alert("Your piece is located at: " + pieceID);
}

function checkForCapture(x, y)
{
  topPiece =  document.getElementById(x + "," + (y+1))
  bottomPiece =  document.getElementById(x + "," + (y-1))
  leftPiece =  document.getElementById((x-1) + "," + y)
  rightPiece =  document.getElementById((x+1) + "," + y)
  var neighbors = [ topPiece, bottomPiece, leftPiece, rightPiece ];
  ally = "black";
  if (currentPlayer == "black")
  {
    ally = "white";
  }
  enemyColor = currentPlayer;
  for (index = 0; index < neighbors.length; index++) {
    if (neighbors[index] == null)
      continue;
    if (neighbors[index].getAttribute("class") == enemyColor)
    {
      newCoords = neighbors[index].id.split(",");
      newX = parseInt(newCoords[0]);
      newY = parseInt(newCoords[1]);
      newTopPiece =  document.getElementById(newX + "," + (newY+1));
      newBottomPiece =  document.getElementById(newX + "," + (newY-1));
      newLeftPiece =  document.getElementById((newX-1) + "," + newY);
      newRightPiece =  document.getElementById((newX+1) + "," + newY);
      var newNeighbors = [ newTopPiece, newBottomPiece, newLeftPiece, newRightPiece ];
      sum = 0;
      for (j = 0; j < newNeighbors.length; j++)
      {
        if (newNeighbors[j] == null)
          continue;
        if (newNeighbors[j].getAttribute("class") == ally)
        {
          sum++;
        }
      }
      if (sum == 2)
      {
        document.getElementById(newX + "," + newY).setAttribute("class", "");
      }
    }
  }
}

function moveToTile(x, y) {
  pieceChosen = false;
  // move piece to new tile
  document.getElementById(x + "," + y).setAttribute("class", currentPlayer);
  // remove old piece
  document.getElementById(pieceChosenXCoord + "," + pieceChosenYCoord).setAttribute("class", "");
  // switch turns
  if (currentPlayer == "white"){
    currentPlayer = "black";
  }
  else {
    currentPlayer = "white";
  }
  // set info in stats
  document.getElementById("pieceChosen").innerHTML = "pieceChosen: false";
  document.getElementById("pieceChosenCoords").innerHTML = "pieceChosenCoords:";
  document.getElementById("clickedPiece").innerHTML = "clickedPieced:";
  document.getElementById("currentPlayer").innerHTML = "currentPlayer: " + currentPlayer;
  checkForCapture(x, y);
}

function pieceClicked(x, y) {
  // set clickedPiece in stats
  document.getElementById("clickedPiece").innerHTML = "clickedPiece: " + x + "," + y;

  // check if initial piece to move has been chosen
  if (pieceChosen == false)
  {
    // if it has, check if piece correct color
    selectedPiece = document.getElementById(x + "," + y).getAttribute("class");
    if ((selectedPiece == currentPlayer) || (currentPlayer == "white" && selectedPiece == "king"))
    {
      // set as piece to move
      pieceChosen = true;
      pieceChosenXCoord = x;
      pieceChosenYCoord = y;
      document.getElementById(x + "," + y).setAttribute("class", "chosen " + currentPlayer);
      // set info in stats
      document.getElementById("pieceChosenCoords").innerHTML = "pieceChosenCoords: " + x + "," + y;
      document.getElementById("pieceChosen").innerHTML = "pieceChosen = true";
    }
  }
  else
  {
    // check if open space
    selectedSpace = document.getElementById(x + "," + y).getAttribute("class");
    if (selectedSpace == "")
    {
      if (pieceChosenXCoord == x)
      {
        if ((pieceChosenYCoord + 1) == y || (pieceChosenYCoord - 1) == y)
        {
          moveToTile(x, y);
        }
      }
      else if (pieceChosenYCoord == y)
      {
        if ((pieceChosenXCoord + 1) == x || (pieceChosenXCoord - 1) == x)
        {
          moveToTile(x, y);
        }
      }
      else
      {
        pieceChosen = false;
        document.getElementById(pieceChosenXCoord + "," + pieceChosenYCoord).setAttribute("class", currentPlayer);
        document.getElementById("pieceChosen").innerHTML = "pieceChosen: false";
        document.getElementById("pieceChosenCoords").innerHTML = "pieceChosenCoords:";
        document.getElementById("clickedPiece").innerHTML = "clickedPieced:";

      }
    }
    else if (selectedSpace == currentPlayer)
    {
      document.getElementById(pieceChosenXCoord + "," + pieceChosenYCoord).setAttribute("class", currentPlayer);
      pieceChosenXCoord = x;
      pieceChosenYCoord = y;
      document.getElementById(x + "," + y).setAttribute("class", "chosen " + currentPlayer);
      // set info in stats
      document.getElementById("pieceChosenCoords").innerHTML = "pieceChosenCoords: " + x + "," + y;
      document.getElementById("pieceChosen").innerHTML = "pieceChosen = true";

    }
  }
}
