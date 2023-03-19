const container = document.getElementById("container");
const MIN_RECTANGLE_SIZE = 10;
const rectangles = [];

container.addEventListener("mousedown", function(event) {
    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const startX = event.clientX;
    const startY = event.clientY;
    let rectangle = null;

    container.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function onMouseMove(event) {
        const width = Math.abs(event.clientX - startX);
        const height = Math.abs(event.clientY - startY);

        if (width < MIN_RECTANGLE_SIZE || height < MIN_RECTANGLE_SIZE) {
            event.preventDefault();
            return;
        }

        if (rectangle) {
            container.removeChild(rectangle); // Si un rectangle est déjà dessiné, on le supprime
        }

        rectangle = document.createElement("div");
        rectangle.classList.add("rectangle");
        rectangle.style.width = width + "px";
        rectangle.style.height = height + "px";
        rectangle.style.backgroundColor = color;
        rectangle.style.top = Math.min(event.clientY, startY) + "px";
        rectangle.style.left = Math.min(event.clientX, startX) + "px";

        container.appendChild(rectangle);
    }

    function onMouseUp(event) {
        container.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        rectangles.push(rectangle);
    }
});

container.addEventListener("dblclick", function(event) {
    const index = rectangles.indexOf(event.target);
    if (index !== -1 && event.target === rectangles[index]) {
        const rectangle = rectangles[index];
        rectangle.style.transform = "rotate(360deg)";
        setTimeout(function() {
            if (rectangle.offsetWidth > 10 && rectangle.offsetHeight > 10) {
                rectangle.remove();
                rectangles.splice(index, 1);
            }
        }, 1000);
    }
});