const arrayContainer = document.getElementById("array-container");
const generateArrayBtn = document.getElementById("generate-array");
const startSortBtn = document.getElementById("start-sort");
const arraySizeInput = document.getElementById("array-size");
const navbar = document.querySelector(".navbar");

// const themeToggle = document.getElementById("theme-toggle");
const themeToggle = document.getElementById("input");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    // themeToggle.textContent = document.body.classList.contains("light-mode") ? "🌙" :"🌞";
});

//  input section control 
const arraySizeSlider = document.getElementById("array-size");
const speedSlider = document.getElementById("speed");
const sizeValue = document.getElementById("size-value");
const speedValue = document.getElementById("speed-value");
let isSorting=false;

arraySizeSlider.addEventListener("input", () => {
  sizeValue.textContent = arraySizeSlider.value;
  generateArray(arraySizeSlider.value);
});
let animationSpeed=500;
speedSlider.addEventListener("input", () => {
  speedValue.textContent = `${speedSlider.value}ms`;
  animationSpeed = speedSlider.value; // Default animation speed
});

// reset button 
const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
  isSorting=false;
  array = [];
  arrayContainer.innerHTML = '';
  updateStatus("Array reset. Choose an algorithm to start sorting!");
  generateArray(arraySizeSlider.value);
});
// Adjust Animation Speed in Sorting Functions

function delay(animationSpeed) {
    return new Promise((resolve) => setTimeout(resolve, animationSpeed));
  }

// Interactive Navbar for Algorithm Selection
let currentAlgorithm = "Bubble Sort";

navbar.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    // Update active class
    document.querySelectorAll(".navbar a").forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");

    // Update current algorithm
    currentAlgorithm = e.target.textContent;
    updateStatus(`Selected Algorithm: ${currentAlgorithm}`);
  }
});


// sorting status message 
const statusMessage = document.getElementById("status");

function updateStatus(message) {
  statusMessage.textContent = message;
}

updateStatus("Choose an algorithm to start sorting!");

// creating array 
let array = [];
let currentSort = "Bubble Sort"; // Default sorting algorithm

// Generate a random array
function generateArray(size = 10) {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
  renderArray();
}

// Render the array as bars
function renderArray() {
  arrayContainer.innerHTML = "";
  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    bar.style.width = `${500 / array.length - 5}px`; // Dynamically adjust width
    // bar.innerHTML=`${value}`;
    // bar.style.transform = `translateX(${index * (500 / array.length)}px)`;
    // bar.style.transform = `translateX(${index * 5}px)`;
    arrayContainer.appendChild(bar);
  });
}

// Helper: Delay function for animations
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, animationSpeed));
}

// Helper: Highlight bars being compared
function highlightBars(index1, index2) {
  const bars = document.getElementsByClassName("bar");
  bars[index1].classList.add("comparing");
  bars[index2].classList.add("comparing");
}

// Helper: Remove highlight from bars
function unhighlightBars(index1, index2) {
  const bars = document.getElementsByClassName("bar");
  bars[index1].classList.remove("comparing");
  bars[index2].classList.remove("comparing");
}

// Helper: Mark bar as sorted
function markSorted(index) {
  const bars = document.getElementsByClassName("bar");
  bars[index].classList.add("sorted");
}

// Helper: Swap bars visually
function swapBars(index1, index2) {
  const bars = document.getElementsByClassName("bar");
  const tempTransform = bars[index1].style.transform;
  bars[index1].style.transform = bars[index2].style.transform;
  bars[index2].style.transform = tempTransform;

  const tempValue = bars[index1].innerHTML;
  bars[index1].innerHTML = bars[index2].innerHTML;
  bars[index2].innerHTML = tempValue;


  // Swap the bars in the DOM
  bars[index1].parentNode.insertBefore(bars[index2], bars[index1]);
}

// Bubble Sort
async function bubbleSort() {
  isSorting = true; // Sorting starts
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (!isSorting) return; // Stop if Reset is clicked

      // Highlight bars being compared
      bars[j].classList.add("comparing");
      bars[j + 1].classList.add("comparing");

      await delay(); // Wait for animation

      if (array[j] > array[j + 1]) {
        // Swap in the array
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // Update bars visually
        swapBars(j, j + 1);
      }

      // Remove highlight
      bars[j].classList.remove("comparing");
      bars[j + 1].classList.remove("comparing");
    }

    // Mark sorted bar
    bars[array.length - i - 1].classList.add("sorted");
  }

  isSorting = false; // Sorting ends
}


// Insertion Sort
async function insertionSort() {
  isSorting = true; // Sorting starts
  const bars = document.getElementsByClassName("bar");

  for (let i = 1; i < array.length; i++) {
    if (!isSorting) return; // Stop if Reset is clicked

    let key = array[i];
    let j = i - 1;

    bars[i].classList.add("comparing"); // Highlight current key

    await delay();

    while (j >= 0 && array[j] > key) {
      if (!isSorting) return; // Stop if Reset is clicked

      bars[j].classList.add("comparing"); // Highlight bars being compared

      array[j + 1] = array[j]; // Shift bar
      swapBars(j, j + 1); // Visual swap

      await delay();
      bars[j].classList.remove("comparing"); // Remove highlight

      j--;
    }

    array[j + 1] = key; // Insert the key
    bars[i].classList.remove("comparing");
  }

  // Mark all as sorted
  for (let i = 0; i < array.length; i++) {
    if (!isSorting) return;
    bars[i].classList.add("sorted");
  }

  isSorting = false; // Sorting ends
}

// Selection Sort
async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < array.length; j++) {
        highlightBars(minIndex, j);
        if (!isSorting) return;
  
        await delay(200);
if (array[j] < array[minIndex]) {
    unhighlightBars(minIndex, j);
    minIndex = j;
    highlightBars(minIndex, j);
  } else {
    unhighlightBars(minIndex, j);
  }
}

if (minIndex !== i) {
  [array[i], array[minIndex]] = [array[minIndex], array[i]];
  swapBars(i, minIndex);
}
}
}

// Function to highlight bars
function highlightBars(index1, index2) {
    const bars = document.getElementsByClassName('bar');
    bars[index1].classList.add('comparing');
    bars[index2].classList.add('comparing');
  }
  
  // Function to unhighlight bars
  function unhighlightBars(index1, index2) {
    const bars = document.getElementsByClassName('bar');
    bars[index1].classList.remove('comparing');
    bars[index2].classList.remove('comparing');
  }
// Function to swap bars visually
function swapBars(index1, index2) {
    const bars = document.getElementsByClassName('bar');
    const tempHeight = bars[index1].style.height;
    bars[index1].style.height = bars[index2].style.height;
    bars[index2].style.height = tempHeight;
  }
  
  // Function to introduce delay
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, animationSpeed));
  }

// Quick Sort
async function quickSort(left = 0, right = array.length - 1) {
    if (left < right) {
      // Partition the array and get the pivot index
      const pivotIndex = await partition(left, right);
  
      // Recursively sort elements before and after partition
      await quickSort(left, pivotIndex - 1);
      await quickSort(pivotIndex + 1, right);
    }
  
    // Mark sorted when the entire section is sorted
    if (left === 0 && right === array.length - 1) {
      for (let i = 0; i < array.length; i++) {
        markSorted(i);
      }
    }
  }
  
  async function partition(left, right) {
    const pivot = array[right]; // Choose the rightmost element as pivot
    let i = left - 1;
  
    const bars = document.getElementsByClassName("bar");
  
    // Highlight the pivot
    bars[right].classList.add("pivot");
  
    for (let j = left; j < right; j++) {
      // Highlight the current element being compared
      highlightBars(j, right);
  
      await delay(200); // Delay for visualization
  
      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          // Swap elements in the array and visually
          [array[i], array[j]] = [array[j], array[i]];
          swapBars(i, j);
        }
      }
  
      // Remove highlight for the current element
      unhighlightBars(j, right);
    }
  
    // Swap the pivot element into its correct position
    [array[i + 1], array[right]] = [array[right], array[i + 1]];
    swapBars(i + 1, right);
  
    // Remove pivot highlight
    bars[right].classList.remove("pivot");
  
    return i + 1; // Return the final position of the pivot
  }

// Merge Sort
async function mergeSort(start = 0, end = array.length - 1) {
    if (start < end) {
      if (!isSorting) return;
      const mid = Math.floor((start + end) / 2);
  
      // Recursively split and sort the left and right halves
      await mergeSort(start, mid);
      await mergeSort(mid + 1, end);
  
      // Merge the sorted halves
      await merge(start, mid, end);
    }
  
    // Mark sorted when entire section is merged
    if (start === 0 && end === array.length - 1) {
      for (let i = 0; i < array.length; i++) {
        markSorted(i);
      }
    }
  }
  
  async function merge(start, mid, end) {
    if (!isSorting) return;
    const left = array.slice(start, mid + 1); // Left subarray
    const right = array.slice(mid + 1, end + 1); // Right subarray
  
    let i = 0, j = 0, k = start;
  
    const bars = document.getElementsByClassName("bar");
  
    while (i < left.length && j < right.length) {
      if (!isSorting) return;
      // Highlight the bars being compared
      highlightBars(k, k);
  
      await delay(200); // Delay for visualization
  
      if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
      } else {
        array[k] = right[j];
        j++;
      }
  
      // Update the bar heights and remove highlight
      bars[k].style.height = `${array[k]}px`;
    //   bars[k].textContent = array[k];
      unhighlightBars(k, k);
  
      k++;
    }
  
    // Copy any remaining elements from left subarray
    while (i < left.length) {
      highlightBars(k, k);
  
      await delay(200); // Delay for visualization
      array[k] = left[i];
  
      bars[k].style.height = `${array[k]}px`;
    //   bars[k].textContent = array[k];
      unhighlightBars(k, k);
  
      i++;
      k++;
    }
  
    // Copy any remaining elements from right subarray
    while (j < right.length) {
      highlightBars(k, k);
  
      await delay(200); // Delay for visualization
      array[k] = right[j];
  
      bars[k].style.height = `${array[k]}px`;
    //   bars[k].textContent = array[k];
      unhighlightBars(k, k);
  
      j++;
      k++;
    }
  }
  

// Event Listeners
generateArrayBtn.addEventListener("click", () => {
  const size = parseInt(arraySizeInput.value) || 10;
  generateArray(size);
});


// Add event listeners for sorting algorithm links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.navbar a.active').classList.remove('active');
        link.classList.add('active');
        currentSort = link.textContent.trim();
    });
});


// Add event listener for the start sort button
startSortBtn.addEventListener('click', () => {
    console.log(currentSort);
    console.log(animationSpeed);
    isSorting=true;
    switch (currentSort) {
        case 'Bubble sort':
            bubbleSort();
            break;
        case 'Insertion sort':
            insertionSort();
            break;
        case 'Selection sort':
            selectionSort();
            break;
        case 'Quick sort':
            quickSort();
            break;
        case 'Merge sort':
            mergeSort();
            break;
        default:
            bubbleSort();
            break;
    }
});

// Initialize with default array
generateArray();