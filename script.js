
const movesDisplay = document.getElementById("moves");
const puzzleContainer = document.querySelector(".container");
const startScreen = document.querySelector(".cover-screen");
const resultText = document.getElementById("result");
const startButton = document.getElementById("startBtn");
let tileOrder = [];
let moveCount = 0 ; 
let clickedTile = null ; 

const isTouchDevice = () =>
{
    try{
        document.createEvent("TouchEvent");
        return true ; 
    }
    catch(e){
        return false ; 
    }
};

const getRandomTileNumber =()=> Math.floor(Math.random()*8)+1;

const getCellPosition =(cell) =>
{
    const [row,col]=cell.getAttribute("data-position").split("_");
    return [parseInt(row), parseInt(col)];
};


const areAdjacent = (row1, row2 , col1 , col2) =>
{
    if(row1 === row2){
        return col2===col1+1 || col2 ===col1-1 ;
    }
    if(col1===col2){
        return row2 === row1+1 || row2 === row1-1 ; 
    }
    return false ; 
};

const generateShuffledTiles = () =>
{
    while(tileOrder.length<8){
        let num = getRandomTileNumber();
        if(!tileOrder.includes(num)){
            tileOrder.push(num);
        }
    }
    tileOrder.push(9);
};

const createGrid = () =>{
    let index  = 0 ; 
    for(let i = 0 ; i <3 ; i++){
        for(let j = 0 ; j < 3 ; j++){
            let cell = document.createElement("div");
            cell.setAttribute("data-position",`${i}_${j}`);
            cell.addEventListener("click",handleTileClick);
            cell.classList.add("cell");
            const tilevalue = tileOrder[index];
            cell.innerHTML = 
            `
            <img 
            src="image_part_00${tilevalue}.png"
            class = "tile ${tilevalue ===9? "blank":""}"
            data-value = "${tilevalue}"/>`;
    

            puzzleContainer.appendChild(cell);
            index++
        }
    }
};

const handleTileClick =(e) =>
{
    e.preventDefault();
    clickedTile = e.target.closest("img");
    if(!clickedTile || clickedTile.classList.contains("blank"))
        return ; 
    const blankTile = document.querySelector(".blank");
     
    const clickedCell = clickedTile.parentElement ; 
    const blankCell = blankTile.parentElement; 

    const [row1,row2]= getCellPosition(clickedCell);
    const [col1,col2] =getCellPosition(blankCell);

    if(areAdjacent(row1,row2,col1,col2)){
        

        const clickedValue = parseInt(clickedTile.getAttribute("data-value"));
        const blankValue = parseInt(blankTile.getAttribute("data-value"));

        clickedTile.setAttribute("data-value",blankValue);
        blankTile.setAttribute("data-value",clickedValue);
    
    clickedCell.appendChild(blankTile);
    blankCell.appendChild(clickedTile);

    const clickedIndex = tileOrder.indexOf(clickedValue) ;
    const blankIndex = tileOrder.indexOf(blankValue);
     [
        tileOrder[clickedIndex],tileOrder[blankIndex]
     ]=
     [
        tileOrder[blankIndex] , tileOrder[clickedIndex]
     ];

     if (tileOrder.join("")==="123456789")
     {
        setTimeout(() =>{
            startScreen.classList.remove("hide");
            puzzleContainer.classList.add("hide");
            resultText.innerText = `Total moves : ${moveCount}`;
            startButton.innerText = "restart game ";},1000);


        }
        moveCount++;
        movesDisplay.innerText = `moves : ${moveCount}`;
     
    }
   
   


}
  window.onload = () => {
  startScreen.classList.remove("hide");
  puzzleContainer.classList.add("hide");
};




 startButton.addEventListener("click", () =>{
        puzzleContainer.classList.remove("hide");
        startScreen.classList.add("hide");
        puzzleContainer.innerHTML ="";
        tileOrder =[];
        generateShuffledTiles();
        createGrid();
        moveCount = 0 ; 
       movesDisplay.innerText = `moves : ${moveCount}`;
    });
