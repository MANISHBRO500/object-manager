const objectForm = document.getElementById("objectForm");
const objectList = document.getElementById("objectList");
const totalEl = document.getElementById("total");

/* =====================
   API Functions
===================== */

// GET all objects
async function getObjects() {
  const res = await fetch("https://object-manager.onrender.com/api/objects");
  return await res.json();
}

// POST new object
async function addObject(object) {
  await fetch("https://object-manager.onrender.com/api/objects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object)
  });
}

// PUT update object
async function updateObject(id, updatedObject) {
  await fetch(`https://object-manager.onrender.com/api/objects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedObject)
  });
}

// DELETE object
async function deleteObjectAPI(id) {
  await fetch(`https://object-manager.onrender.com/api/objects/${id}`, { method: "DELETE" });
}

/* =====================
   Rendering
===================== */

async function fetchAndRender() {
  const objects = await getObjects();
  renderObjects(objects);
}

function renderObjects(objects) {
  objectList.innerHTML = "";
  let total = 0;

  objects.forEach(obj => {
    total += obj.quantity * obj.price;

    const li = document.createElement("li");
    li.innerHTML = `
      <b>${obj.name}</b> - Qty: ${obj.quantity}, Price: ₹${obj.price}
      <button onclick="editObject('${obj._id}')">Edit</button>
      <button onclick="deleteObjectHandler('${obj._id}')">Delete</button>
    `;
    objectList.appendChild(li);
  });

  totalEl.textContent = total;
}

/* =====================
   Handlers
===================== */

objectForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const quantity = +document.getElementById("quantity").value;
  const price = +document.getElementById("price").value;

  await addObject({ name, quantity, price });
  objectForm.reset();
  fetchAndRender();
});

async function deleteObjectHandler(id) {
  await deleteObjectAPI(id);
  fetchAndRender();
}

async function editObject(id) {
  const name = prompt("Enter new name:");
  const quantity = +prompt("Enter new quantity:");
  const price = +prompt("Enter new price:");

  if (!name || !quantity || !price) return;

  await updateObject(id, { name, quantity, price });
  fetchAndRender();
}

/* =====================
   Initial Load
===================== */
fetchAndRender();


