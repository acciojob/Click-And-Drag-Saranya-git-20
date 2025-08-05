const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.items .cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach((cube, index) => {
  // Position cubes initially in a grid
  const cols = 3;
  const spacing = 10;
  const size = 100;
  const x = (index % cols) * (size + spacing);
  const y = Math.floor(index / cols) * (size + spacing);
  cube.style.left = `${x}px`;
  cube.style.top = `${y}px`;

  // Mouse down: pick up cube
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    offsetX = e.clientX - cube.getBoundingClientRect().left;
    offsetY = e.clientY - cube.getBoundingClientRect().top;
    cube.style.cursor = 'grabbing';
  });
});

// Move the cube with mouse
document.addEventListener('mousemove', (e) => {
  if (selectedCube) {
    const containerRect = container.getBoundingClientRect();
    const cubeWidth = selectedCube.offsetWidth;
    const cubeHeight = selectedCube.offsetHeight;

    // Calculate new position
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // Boundary checks
    newLeft = Math.max(0, Math.min(newLeft, container.offsetWidth - cubeWidth));
    newTop = Math.max(0, Math.min(newTop, container.offsetHeight - cubeHeight));

    selectedCube.style.left = `${newLeft}px`;
    selectedCube.style.top = `${newTop}px`;
  }
});

// Release the cube
document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.cursor = 'grab';
    selectedCube = null;
  }
});
