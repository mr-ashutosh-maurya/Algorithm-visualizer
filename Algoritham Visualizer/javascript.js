const arrayContainer = document.getElementById('array-container');
const generateArrayBtn = document.getElementById('generate-array');
const startSortBtn = document.getElementById('start-sort');
const arraySizeInput = document.getElementById('array-size');

let array = [];

// Generate a random array
function generateArray(size = 10) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
    renderArray();
}
function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = `${value}px`;
      bar.style.width = `${500 / array.length - 5}px`; 
    //   bar.style.height=`50px`;
    //   bar.style.width=`50px`; // Dynamically adjust width
      bar.dataset.index = index; // Store index for swapping animation
      bar.innerHTML=`${value}`;
      arrayContainer.appendChild(bar);
    });
  }
    // Swap two bars visually
    function swapBars(index1, index2) {
        const bars = document.getElementsByClassName('bar');
  
        // Calculate positions
        const bar1 = bars[index1];
        const bar2 = bars[index2];
  
        const tempTransform = bar1.style.transform;
  
        // Swap transform positions
        bar1.style.transform = bar2.style.transform;
        bar2.style.transform = tempTransform;
  
        // Swap their order in the DOM
        bar1.dataset.index = index2;
        bar2.dataset.index = index1;
  
        arrayContainer.insertBefore(bar2, bar1);
      }
// Bubble Sort visualization
async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');

    // Assign initial transform positions to bars
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.transform = `translateX(${i * 10}px)`;
      }
    // bubble sort logic
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add('comparing');
            bars[j + 1].classList.add('comparing');

            await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for animation
            if (array[j] > array[j + 1]) {
                // Swap heights
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                // renderArray();
                swapBars(j,j+1);
            }

            bars[j].classList.remove('comparing');
            bars[j + 1].classList.remove('comparing');
        }

        // Mark sorted
        bars[array.length-i-1].classList.add('sorted');
    }
}

// Event listeners
generateArrayBtn.addEventListener('click', () => {
    const size = parseInt(arraySizeInput.value) || 10;
    generateArray(size);
});

startSortBtn.addEventListener('click', () => {
    bubbleSort();
});

// Initialize with default array
generateArray();