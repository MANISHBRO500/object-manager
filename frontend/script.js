// ✅ Fetch and display all objects
async function fetchObjects() {
  try {
    const res = await fetch("https://object-manager.onrender.com/api/objects");
    const data = await res.json();

    const tableBody = document.getElementById("objectTableBody");
    tableBody.innerHTML = "";

    data.forEach(obj => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td contenteditable="true" onblur="updateObject('${obj._id}', 'name', this.innerText)">${obj.name}</td>
        <td contenteditable="true" onblur="updateObject('${obj._id}', 'price', this.innerText)">${obj.price}</td>
        <td>
          <button onclick="deleteObject('${obj._id}')">🗑 Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Error fetching objects:", err);
  }
}

// ✅ Add new object
async function addObject() {
  const name = document.getElementById("nameInput").value.trim();
  const price = document.getElementById("priceInput").value.trim();

  if (!name || !price) {
    alert("⚠ Please enter both name and price.");
    return;
  }

  try {
    await fetch("https://object-manager.onrender.com/api/objects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price })
    });

    document.getElementById("nameInput").value = "";
    document.getElementById("priceInput").value = "";
    fetchObjects();
  } catch (err) {
    console.error("Error adding object:", err);
  }
}

// ✅ Update object field (inline edit)
async function updateObject(id, field, value) {
  try {
    await fetch(`https://object-manager.onrender.com/api/objects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value })
    });
    fetchObjects();
  } catch (err) {
    console.error("Error updating object:", err);
  }
}

// ✅ Delete object
async function deleteObject(id) {
  if (!confirm("Are you sure you want to delete this object?")) return;

  try {
    await fetch(`https://object-manager.onrender.com/api/objects/${id}`, {
      method: "DELETE"
    });
    fetchObjects();
  } catch (err) {
    console.error("Error deleting object:", err);
  }
}

// Load objects on page load
window.onload = fetchObjects;
