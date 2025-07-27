const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Make each item absolutely positioned inside container
items.forEach((item, index) => {
  // Position in grid (5 items per row)
  const col = index % 5;
  const row = Math.floor(index / 5);
  item.style.position = 'absolute';
  item.style.left = `${col * 100}px`;
  item.style.top = `${row * 100}px`;

  // Mouse down to start dragging
  item.addEventListener('mousedown', (e) => {
    selectedItem = item;
    selectedItem.style.zIndex = 1000;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    item.classList.add('dragging');
  });
});

// Mouse move to drag item
document.addEventListener('mousemove', (e) => {
  if (selectedItem) {
    const containerRect = container.getBoundingClientRect();
    const itemWidth = selectedItem.offsetWidth;
    const itemHeight = selectedItem.offsetHeight;

    // Calculate new position
    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    // Constrain inside container
    x = Math.max(0, Math.min(x, container.clientWidth - itemWidth));
    y = Math.max(0, Math.min(y, container.clientHeight - itemHeight));

    selectedItem.style.left = `${x}px`;
    selectedItem.style.top = `${y}px`;
  }
});

// Mouse up to stop dragging
document.addEventListener('mouseup', () => {
  if (selectedItem) {
    selectedItem.classList.remove('dragging');
    selectedItem.style.zIndex = '';
    selectedItem = null;
  }
});
