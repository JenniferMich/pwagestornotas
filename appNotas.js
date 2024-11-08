// Se obtiene la referencia al botón y al campo de entrada
const botonGuardar = document.getElementById("botonGuardar");
const entradaNota = document.getElementById("entradaNota");
const listaNotas = document.getElementById("listaNotas");
// Se define una función para cargar las notas almacenadas
function cargarNotas() {
  // Se obtienen las notas del localStorage
  const notas = JSON.parse(localStorage.getItem("notas")) || [];
  // Se limpian las notas existentes en la lista
  listaNotas.innerHTML = "";
  // Se itera sobre cada nota para agregarla a la lista
  notas.forEach((nota, indice) => {
    const li = document.createElement("li"); // Se crea un nuevo elemento de lista
    li.textContent = nota; // Se asigna el texto de la nota
    li.appendChild(crearBotonEliminar(indice)); // Se añade un botón de eliminar;
    listaNotas.appendChild(li); // Se agrega el elemento de lista a la lista;
  });
}
// Se define una función para guardar una nueva nota
function guardarNota() {
  const textoNota = entradaNota.value.trim(); // Se obtiene el texto delcampo de entrada
  if (textoNota) {
    // Se verifica que no esté vacío
    const notas = JSON.parse(localStorage.getItem("notas")) || []; // Se obtienen las notas
    notas.push(textoNota); // Se agrega la nueva nota
    localStorage.setItem("notas", JSON.stringify(notas)); // Se guardanlas notas actualizadas
    entradaNota.value = ""; // Se limpia el campo de entrada
    cargarNotas(); // Se recargan las notas
  } else {
    alert("Por favor, escribe una nota."); // Alerta si el campo está vacío;
  } 
}
// Se define una función para crear un botón de eliminar
function crearBotonEliminar(indice) {
  const boton = document.createElement("button"); // Se crea un botón
  boton.textContent = "Eliminar"; // Texto del botón
  boton.onclick = () => eliminarNota(indice); // Se define la acción de eliminar;
  return boton; // Se retorna el botón
}
// Se define una función para eliminar una nota
function eliminarNota(indice) {
  const notas = JSON.parse(localStorage.getItem("notas")) || []; // Se obtienen las notas
  notas.splice(indice, 1); // Se elimina la nota en la posición indicada
  localStorage.setItem("notas", JSON.stringify(notas)); // Se guardan las notas actualizadas
  cargarNotas(); // Se recargan las notas
}
// Se vincula la función de guardar nota al evento click del botón
botonGuardar.addEventListener("click", guardarNota);
// Se cargan las notas al iniciar la aplicación
cargarNotas();
