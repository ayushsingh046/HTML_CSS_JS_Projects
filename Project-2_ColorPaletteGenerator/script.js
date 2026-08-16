const generateBtn = document.getElementById("regen-btn")
const paletteContainer = document.querySelector(".palette-gen")

generateBtn.addEventListener("click", generatePalette)

paletteContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch((err) => console.log(err));
    } else if (e.target.classList.contains("color")) {
        const info = e.target.nextElementSibling
        const hexEl = info && info.querySelector(".color-hex")
        const copyBtn = info && info.querySelector(".copy-btn")

        if (!hexEl || !copyBtn) return

        const hexValue = hexEl.textContent;

        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(copyBtn))
            .catch((err) => console.log(err));
    }
});

function showCopySuccess(element) {
    if (!element) return

    // Swap clone icon to a check icon, keep styling simple and consistent
    element.classList.remove("fa-clone");
    element.classList.add("fa-circle-check");
    element.style.color = "#48bb78";

    setTimeout(() => {
        element.classList.remove("fa-circle-check");
        element.classList.add("fa-clone");
        element.style.color = "";
    }, 1500);
}

function generatePalette() {
    const colors = []

    for (let i = 0; i < 6; i++) {
        colors.push(generateRandomColor())
    }

    updatePaletteDisplay(colors)
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]

    }
    return color
}

function updatePaletteDisplay(colors) {
    const colorBox = document.querySelectorAll(".color-box")

    colorBox.forEach((box, index) => {
        const color = colors[index]
        const colorDiv = box.querySelector(".color")
        const hexValue = box.querySelector(".color-hex")

        colorDiv.style.backgroundColor = color
        hexValue.textContent = color
    })
}

generatePalette()