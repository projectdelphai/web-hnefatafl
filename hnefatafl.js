currentPlayer = "white";
pieceChosen = false;
pieceChosenXCoord = 0;
pieceChosenYCoord = 0;
kingChosen = false;
kingX = 5;
kingY = 5;

function startGame()
{
  document.getElementById("startgame").style.display = "none";
  document.getElementById("chooseGameMode").style.display = "block";
}

function chooseSinglePlayer()
{
  document.getElementById("chooseGameMode").style.display = "none";
  document.getElementById("gameboard").style.display = "block";
  document.getElementById("stats").style.display = "block";
}

function chooseMultiPlayer()
{
}

function displayCurrentPiece(pieceID) {
  alert("Your piece is located at: " + pieceID);
}

function whiteWin()
{
  document.getElementById("winner").innerHTML = "White Wins!";
  document.getElementById("winner").style.display = "block";
}

function blackWin()
{
  document.getElementById("winner").innerHTML = "Black Wins!";
  document.getElementById("winner").style.display = "block";
}

function checkForWin()
{
  if (kingX == 0 && kingY == 0)
    whiteWin();
  else if (kingX == 10 && kingY == 10)
    whiteWin();
  else if (kingX == 10 && kingY == 0)
    whiteWin();
  else if (kingX == 0 && kingY == 10)
    whiteWin();

  topPiece =  document.getElementById(kingX + "," + (kingY+1))
  bottomPiece =  document.getElementById(kingX + "," + (kingY-1))
  leftPiece =  document.getElementById((kingX-1) + "," + kingY)
  rightPiece =  document.getElementById((kingX+1) + "," + kingY)

  var neighbors = [ topPiece, bottomPiece, leftPiece, rightPiece ];
  sum = 0;
  
  for (index = 0; index < neighbors.length; index++) {
    if (neighbors[index] == null)
      continue;
    if (neighbors[index].getAttribute("class") == "black") {
      sum++;
    }
  }

  if (sum == 4)
    blackWin();
 
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
      if (sum >= 2)
      {
        document.getElementById(newX + "," + newY).setAttribute("class", "");
      }
    }
  }
}

function moveToTile(x, y) {
  pieceChosen = false;
  // move piece to new tile
  if (kingChosen == true)
  {
    kingX = x;
    kingY = y;
    document.getElementById(x + "," + y).setAttribute("class", "king");
    kingChosen = false;
  }
  else
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
  document.getElementById("currentPlayer").innerHTML = "Current Player: " + currentPlayer;
  checkForCapture(x, y);
  checkForWin();
}

function pieceClicked(x, y) {
  // check if initial piece to move has been chosen
  if (pieceChosen == false)
  {
    // if it has, check if piece correct color
    selectedPiece = document.getElementById(x + "," + y).getAttribute("class");
    if ((selectedPiece == currentPlayer) || (currentPlayer == "white" && selectedPiece == "king"))
    {
      if (selectedPiece == "king")
        kingChosen = true;
      // set as piece to move
      pieceChosen = true;
      pieceChosenXCoord = x;
      pieceChosenYCoord = y;
      if (kingChosen == true)
        document.getElementById(x + "," + y).setAttribute("class", "chosen king");
      else
        document.getElementById(x + "," + y).setAttribute("class", "chosen " + currentPlayer);
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
        if (kingChosen == true)
          document.getElementById(pieceChosenXCoord + "," + pieceChosenYCoord).setAttribute("class", "king");
        else
          document.getElementById(pieceChosenXCoord + "," + pieceChosenYCoord).setAttribute("class", currentPlayer);
        document.getElementById("pieceChosen").innerHTML = "pieceChosen: false";
        document.getElementById("pieceChosenCoords").innerHTML = "pieceChosenCoords:";
        document.getElementById("clickedPiece").innerHTML = "clickedPieced:";
        kingChosen = false;
      }
    }
    else if (selectedSpace == currentPlayer)
    {
      if (kingChosen == true)
        document.getElementById(pieceChosenXCoord + "," + pieceChosenYCoord).setAttribute("class", "king");
      else
        document.getElementById(pieceChosenXCoord + "," + pieceChosenYCoord).setAttribute("class", currentPlayer);
      pieceChosenXCoord = x;
      pieceChosenYCoord = y;
      document.getElementById(x + "," + y).setAttribute("class", "chosen " + currentPlayer);
      kingChosen = false;
    }
  }
}
