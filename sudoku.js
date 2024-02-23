const cells = []; // array with all cells 0-80

function import_puzzle () {
	const sudoku1 =  [[0,0,0,2,6,0,7,0,1],
					[6,8,0,0,7,0,0,9,0],
					[1,9,0,0,0,4,5,0,0],
					[8,2,0,1,0,0,0,4,0],
					[0,0,4,6,0,2,9,0,0],
					[0,5,0,0,0,3,0,2,8],
					[0,0,9,3,0,0,0,7,4],
					[0,4,0,0,5,0,0,3,6],
					[7,0,3,0,1,8,0,0,0]];

	return sudoku1;
}

function sudoku_GUI() {
   const table = document.getElementById("gui"); // table from html

    // creates all the cells, assigns row, column and square
    for (let c = 0; c < 9; c++) {
        let row = document.createElement("tr"); // row element 

        for (let r = 0; r < 9; r++) {
            let input = document.createElement("input"); // cell input field 
            // sets all of the cell atributes
            input.type = "text"; 
            input.maxLength = 1; 
            input.row = r;
            input.column = c;
            input.square = square_number(r, c);
            input.onkeypress = validate; // validates that a number is entered

            // creates and places input field in cell-element
            const cell = document.createElement("td");
            cell.appendChild(input); 
            
            row.appendChild(cell); // puts cell into row 
            cells.push(input); // puts cell into array with all cells
        }
        table.appendChild(row); // places row into the table
    }
}

function validate(evt) {
    // this stops all non-numeric input
    evt = (evt) ? evt : window.addEventListener;
    var key = evt.keyCode || evt.which;
    key = String.fromCharCode(key);

    var regex = /[0-9]|\./;
    if ( !regex.test(key) ) {
        evt.returnValue = false;
        if (evt.preventDefault) { evt.preventDefault(); }
    }
}

function square_number(row, column) {
    /* this function returns square number of cell with 
       position x, y   */
    if (row < 3 && column < 3) { return 0; }
    if (row > 2 && row < 6 && column < 3) { return 1; }
    if (row > 5 && column < 3) { return 2; }
    if (row < 3 && column > 2 && column < 6) { return 3; }
    if (row > 2 && row < 6 && column > 2 && column < 6) { return 4; }
    if (row > 5 && column > 2 && column < 6) { return 5; }
    if (row < 3 && column > 5) { return 6; }
    if (row > 2 && row < 6 && column > 5) { return 7; }
    if (row > 5 && column > 5) { return 8; }
}

function valid_check(cell, value) { 
    /* this function checks if value is valid. it follow the standard
       sudoku rules in this check */
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].row == cell.row && cells[i].value == value) {
            return false;
        } else if (cells[i].column == cell.column && cells[i].value == value){
            return false;
        } else if (cells[i].square == cell.square && cells[i].value == value) {
            return false;
        } 
    }
    return true;
}
const solve_sudoku = (random_row) => {
	let numbers = [1,2,3,4,5,6,7,8,9];
	// cell index
	let i = 0; 
	// numbers-array index
	let n = 0; 
	// direction of backtracking (1 = forward)  
	let m = 1; 
	// used if generating sudoku (g=1) 
	let nums = [1,2,3,4,5,6,7,8,9]; 

	while (true) {
		// creates a random first row if generating
		if (i < 9 && random_row) { 
			var random_value = nums[Math.floor(Math.random()*nums.length)];
			// removes used value
			nums.splice(nums.indexOf(random_value),1); 
			// assigns value
			cells[i].value = random_value; 
			i++; 
			// tries solving cell
		} else if (cells[i].a == 1) { 
			if (valid_check(cells[i], numbers[n])) {
                // this is run if valid number is found
				cells[i].value = numbers[n]; 
				i++;     
				n = 0;  
				m = 1;  
			} else {
				if (n == 8) {
                    // this is run if we are at the end of numbers array (no more possible values)
					cells[i].value = 0; // removes value
					i--;    // steps to previous cell
					m = 0;  // direction: backwards
					if (cells[i].value == 9) { i--; }
					n = cells[i].value;
				} else {
                    // this is run if we have not found valid value and we are not at the end of possible values
					n++; // goes to next number in numbers array
				}
			}
		} else {
            // this is run if we hit a cell with static value,
            // moves backwards/forwards based on m variable
			if (m) { i++; }
            else { i--; }
		}
		if (i == 81) { break; } // stops the loop when we are done with last cell
	}
}
/*
function solve_sudoku(random_row) {
	let numbers = [1,2,3,4,5,6,7,8,9];
	// cell index
	let i = 0; 
	// numbers-array index
	let n = 0; 
	// direction of backtracking (1 = forward)  
	let m = 1; 
	// used if generating sudoku (g=1) 
	let nums = [1,2,3,4,5,6,7,8,9]; 

	while (true) {
		// creates a random first row if generating
		if (i < 9 && random_row) { 
			var random_value = nums[Math.floor(Math.random()*nums.length)];
			// removes used value
			nums.splice(nums.indexOf(random_value),1); 
			// assigns value
			cells[i].value = random_value; 
			i++; 
			// tries solving cell
		} else if (cells[i].a == 1) { 
			if (valid_check(cells[i], numbers[n])) {
                // this is run if valid number is found
				cells[i].value = numbers[n]; 
				i++;     
				n = 0;  
				m = 1;  
			} else {
				if (n == 8) {
                    // this is run if we are at the end of numbers array (no more possible values)
					cells[i].value = 0; // removes value
					i--;    // steps to previous cell
					m = 0;  // direction: backwards
					if (cells[i].value == 9) { i--; }
					n = cells[i].value;
				} else {
                    // this is run if we have not found valid value and we are not at the end of possible values
					n++; // goes to next number in numbers array
				}
			}
		} else {
            // this is run if we hit a cell with static value,
            // moves backwards/forwards based on m variable
			if (m) { i++; }
            else { i--; }
		}
		if (i == 81) { break; } // stops the loop when we are done with last cell
	}
}*/

function generate_sudoku() {
    //this function is used in the generation of the sudoku 

	for (cell of cells) { cell.a = 1; } // makes all cells-editable

	solve_sudoku(true); // the sudoku is solved with a random first row -> sudoku is created

	for (cell of cells) { // turns random cells blank
		if (Math.floor((Math.random() * 3)) == 0) { cell.value = ""; } 
	}
	
	for (cell of cells) { // locks all cells with values
		if (cell.value > 0) { cell.a = 0; }
	}
}


const load_sudoku = () => {
	let i = 0;
	let sudoku = import_puzzle();
	for (let c = 0; c < 9; c++) {
		for (let r = 0; r < 9; r++) {
			if (sudoku[c][r] != 0 ) {
				cells[i].value = sudoku[c][r];
			} else {
				cells[i].a = 1
			}
		}
	}
}

const clear_gui = () => {
	for (cell of cells) {
		cell.value = "";
		cell.a = 0;
	}
}

sudoku_GUI();
