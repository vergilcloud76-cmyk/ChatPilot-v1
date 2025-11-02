async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const json = await res.json();
    const list = document.getElementById('data-list');
    list.innerHTML = '';
    json.data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `ID: ${item._id}, Name: ${item.name}, Price: ${item.price}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener('DOMContentLoaded', fetchData);
