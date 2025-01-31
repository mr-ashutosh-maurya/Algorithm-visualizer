const container = document.getElementById("matrix-container");

function createNumber() {
    const num = document.createElement("div");
    num.classList.add("number");
    num.innerText = Math.floor(Math.random() * 2); // 0 or 1
    num.style.left = Math.random() * 100 + "vw"; // Random X position
    num.style.animationDuration = Math.random() * 2 + 2 + "s"; // Random speed
    container.appendChild(num);

    // Remove the number after animation ends
    setTimeout(() => {
        num.remove();
    }, 3000);
}

// Create numbers continuously
setInterval(createNumber, 50);
