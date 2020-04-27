var player1=prompt("Player 1:enter your name ,You will be BLUE");
var p1c='rgb(86, 151, 255)';

var player2=prompt("Player 2:enter your name ,You will be RED");
var p2c='rgb(237, 45, 73)';

var gameon=true;
var table = $('table tr');
//just for hack

function reportwin(row,col) {
  console.log("You won starting at this Row and Col");
  console.log(row);
  console.log(col);
}
//changing the color for more detail search for stackoverflow
function changecolor(rowi,coli,color) {
  return table.eq(rowi).find('td').eq(coli).find('button').css('background-color',color);
}
//returning the acolor at that particular point
function returncolor(rowi,coli){
  return table.eq(rowi).find('td').eq(coli).find('button').css('background-color');
}
//chaecking from bottom to that pnt where they meet and rows are used
function checkbottom(coli){
  var colorreport= returncolor(5,coli);
  for(var row=5;row>-1;row--){
    colorreport=returncolor(row,coli);
    if(colorreport==='rgb(128, 128, 128)'){
      return row;
    }
  }
}
//checking that four block meet or not
function colormatchcheck(one,two,three,four){
  return (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined);
}

//check for horizontal win checking

function horizontalwincheck(){
  for(var row=0;row<6;row++){
    for(var col=0;col<4;col++){
      if(colormatchcheck(returncolor(row,col),returncolor(row,col+1),returncolor(row,col+2),returncolor(row,col+3))){
        console.log('Horizontal');
        reportwin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

//check for vertical win check

function verticalwincheck(){
  for(var col=0;col<7;col++){
    for(var row=0;row<3;row++){
      if(colormatchcheck(returncolor(row,col),returncolor(row+1,col),returncolor(row+2,col),returncolor(row+3,col))){
        console.log('Vertical');
        reportwin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

//check for diagonal win checking
function diagonalwincheck(){
  for(var col=0;col<5;col++){
    for(var row=0;row<7;row++){
      if(colormatchcheck(returncolor(row,col),returncolor(row+1,col+1),returncolor(row+2,col+2),returncolor(row+3,col+3))){
        console.log('Diagonal');
        reportwin(row,col);
        return true;
      }else if(colormatchcheck(returncolor(row,col),returncolor(row-1,col+1),returncolor(row-2,col+2),returncolor(row-3,col+3))){
        console.log('Diagonal');
        reportwin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}



//it is an  extreme use of jquery where you do not use the js array

//Start with player 1
var currentplayer=1;
var currentname=player1;
var currentcolor=p1c;

$('h3').text(player1+" "+"it is your turn pick a column to drop in!");


//not that much neccesory but this is a showoff that jquery can do

$('.board button').on('click',function(){
  var col = $(this).closest('td').index();

  var bottomavail=checkbottom(col);

  changecolor(bottomavail,col,currentcolor);
  if(horizontalwincheck() || verticalwincheck() || diagonalwincheck()){
    $('h1').text(currentname+ " "+"You have won");
    //jquery animation
    $('h3').fadeout('fast');
    $('h2').fadeout('fast');
  }

  currentplayer=currentplayer * -1;

  if(currentplayer===1){
    currentname=player1;
    $('h3').text(currentname+" "+ " it is your turn.");
    currentcolor=p1c;
  }else{
    currentname=player2;
    $('h3').text(currentname+" "+ " it is your turn.");
    currentcolor=p2c;
  }
})
