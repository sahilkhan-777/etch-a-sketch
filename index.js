const container = document.querySelector(".container");
const darkenBtn = document.querySelector("#darken");
const defaultBtn = document.querySelector("#default");
const resetButton = document.querySelector("#new-grid");
const clearGridBtn = document.querySelector("#clear-grid");

//function to create a default grid of 16x16
function defaultGrid() {
    for (let i = 0; i < 256; i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-box");   // Add grid-box class to each grid square
        container.appendChild(gridSquare);
        // gridSquare.style.opacity = "0.1"; // Set initial opacity for grid squares
    }
}
defaultGrid();  // create default grid
setGridHover(); // Set hover effect on the grid boxes

resetButton.addEventListener('click', () => {
    const newNumOfGrids = parseInt(prompt("Enter a new grid size (max 100):", "16"));
    container.innerHTML = ""; // Clear the existing grid
    if (newNumOfGrids > 0 && newNumOfGrids <= 100) {
        for (let i = 0; i < newNumOfGrids * newNumOfGrids; i++) {
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-box");
            // gridSquare.style.opacity = "0.1"; // Set initial opacity for new grid squares
            const containerBorderWidth = 4; // 4px border (2px each side)
            gridSquare.style.width = `${(1120 - containerBorderWidth) / newNumOfGrids}px`;   //set new width of the grid square
            gridSquare.style.height = `${(1120 - containerBorderWidth) / newNumOfGrids}px`;  //set new height of the grid square
            container.appendChild(gridSquare);
        }
    }
    else {
        alert("Please enter a valid number between 1 and 100.");
        alert("Defaulting to 16x16 grid.");
        defaultGrid();  // Create default grid if input is invalid
    }
    setGridHover(); // Set hover effect on the new grid boxes
});


let isDarkenHoverMode = false;

function setGridHover() {
    const gridBoxes = document.querySelectorAll(".grid-box");

    gridBoxes.forEach((box) => {

        box.addEventListener("mouseover", () => {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            box.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            if (isDarkenHoverMode === true) {
                if (!box.style.opacity || box.style.opacity === "1") {
                    box.style.opacity = "0.1";
                }
                const currentOpacity = parseFloat(box.style.opacity);
                if (currentOpacity < 1) {
                    box.style.opacity = (currentOpacity + 0.1).toString();
                }
            }
            else{
                box.style.opacity = "1";
            }
        });
    });

    darkenBtn.addEventListener("click", () => {
        isDarkenHoverMode = true;
        gridBoxes.forEach((box) => {
            box.style.backgroundColor = "ffffff";
            box.style.opacity = "0.1";
        })
    });

    defaultBtn.addEventListener("click", () => {
        isDarkenHoverMode = false;
        gridBoxes.forEach((box) => {
            box.style.backgroundColor = "ffffff";
            box.style.opacity = "1"; // Reset opacity
        });
    });
}
clearGridBtn.addEventListener('click', () => {
    const gridBoxes = document.querySelectorAll(".grid-box");
    gridBoxes.forEach((box) => {
        box.style.backgroundColor = "#ffffff";
        box.style.opacity = "1";
    })
})