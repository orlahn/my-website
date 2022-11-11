"use strict";

/*
   
   Word Search Game Script
   
   Global Variables
   
   allCells
      References all of the cells in the word search table
      
   found
      Stores a Boolean value indicating whether the currently
      selected letters represents a word in the word search list.
     
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array

*/

var allCells;
var found = false;


window.onload = init;

function init() {
    document.querySelectorAll("aside h1")[0].innerHTML = wordSearchTitle;
    document.getElementById("wordTable").innerHTML = drawWordSearch(letterGrid, wordGrid);
    document.getElementById("wordList").innerHTML = showList(wordArray);

    allCells = document.querySelectorAll("table#wordSearchTable td");

    // Begin Project 3 
    // Array loops through allCells, changes cursor, & adds event listener

    for (var i = 0; i < allCells.length; i++) { // iterates through all the cells in the word search
        allCells[i].style.cursor = "pointer"; // changes the cursor to a pointer when on cell
        allCells[i].addEventListener("mousedown", startSelecting);
    }

    function selectCompare() { // function checks if user selection is in wordList
        var userSelect = document.getElementById("pickedLetters").value;
        var wordList = document.querySelectorAll("ul#wordSearchList li");


        for (var i = 0; i < wordList.length; i++) { // iterates though all words in word search
            if (userSelect === wordList[i].innerText) { // checks to see if user selected the correct word
                wordList[i].style.color = "grey"; // greys out found words
                wordList[i].style.textDecoration = "line-through"; // crosses out words user has already found
                found = true;
            } // end if
        } // end for


        for (var i = 0; i < allCells.length; i++) { // iterates through all the cells in the word search
            if (allCells[i].style.background !== "lightgreen") { // checks to see if cell is green, if not conditions continue
                if (allCells[i].style.background === "pink" && found) { // checks to see if cells selected is pink and if match the found word
                    allCells[i].style.background = "lightgreen"; // changes cell to green once match is found
                } else {
                    allCells[i].style.background = "white"; // if no match is found, cell remains white
                } // end if-else
            } // end if
        } // end for 


        document.getElementById("pickedLetters").value = "";
        found = false;
    } // end of selectCompare


    /* ---------------------------------------------------------------------------------------------------------------------------------------- */


    // Begin Hints From Video

    document.getElementById("main").addEventListener("mouseup", function() {
        stopSelecting(); // mouseup ends selecting

        var wordList = document.querySelectorAll("ul#wordSearchList li"); //creates list representing all matching words in wordSearchList
        var done = true;
        wordList.forEach(word => { // iterates through all words in wordList
                if (word.style.textDecoration !== "line-through") { // checks if there is a strikethough on all found words
                    done = false;
                } // end if
            }) // end for each 
        if (done) {
            alert("All words have been found!"); // alerts user that word search has been completed if true
        } // end if
    }); // end event listener

    document.getElementById("showSolution").addEventListener("click", function() { // shows all locations of words in list
        allCells.forEach(cell => {
                if (cell.classList.contains("wordCell")) {
                    cell.style.backgroundColor = "plum"; // highlights words in list
                } // end if
            }) // end for each
    }); // end event listener

    function startSelecting(e) {
        document.getElementById("pickedLetters").value += e.target.textContent; // chooses e.target as selected cell
        if (e.target.style.backgroundColor !== "lightgreen") { // checks to see if cell is not green
            e.target.style.backgroundColor = "pink"; // changes cell to pink if condition is true
        } // end if
        for (var i = 0; i < allCells.length; i++) {
            allCells[i].addEventListener("mouseenter", continueSelecting); // event listener lets user continue selecting cells
        } // end for
        e.preventDefault();
    } // end of startSelecting function

    function continueSelecting(e) {
        if (e.target.style.backgroundColor !== "lightgreen") { // checks to see if cell is not green
            e.target.style.backgroundColor = "pink"; // changes cell to pink if condition is true
        } // end if
        document.getElementById("pickedLetters").value += e.target.textContent; // adds the letters to the box
    } // end of continueSelecting function

    function stopSelecting() {
        for (var i = 0; i < allCells.length; i++) {
            allCells[i].removeEventListener("mouseenter", continueSelecting);
        }
        selectCompare(); // calls function to compare user input w/ wordList
    } // end of stopSelecting function

} // end of init function

/*============================================================*/

function drawWordSearch(letters, words) {
    var rowSize = letters.length;
    var colSize = letters[0].length;

    var htmlCode = "<table id='wordSearchTable'>";
    htmlCode += "<caption>Word Search</caption>";

    for (var i = 0; i < rowSize; i++) {
        htmlCode += "<tr>";

        for (var j = 0; j < colSize; j++) {
            if (words[i][j] == " ") {
                htmlCode += "<td>";
            } else {
                htmlCode += "<td class='wordCell'>";
            }
            htmlCode += letters[i][j];
            htmlCode += "</td>";
        }

        htmlCode += "</tr>";
    }
    htmlCode += "</table>";

    return htmlCode;
}

function showList(list) {
    var htmlCode = "<ul id='wordSearchList'>";

    for (var i = 0; i < list.length; i++) {
        htmlCode += "<li>" + list[i] + "</li>";
    }

    htmlCode += "</ul>";

    return htmlCode;
}