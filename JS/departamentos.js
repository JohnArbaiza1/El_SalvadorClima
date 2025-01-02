//Definimos una lista con los departamentos del pais
const departamentos = [
    "San Miguel", "San Salvador","La Unión", "Morazán", "Usulután",
    "Santa Ana", "Ahuachapán", "Cabañas", "Chalatenango", "La Libertad", 
    "La Paz", "San Vicente", "Sonsonate",  "Cuscatlán"
];

//Obtenemos el id
const select = document.getElementById("Departamentos");

//Iteramos sobre la lista de departamentos
departamentos.forEach(departamento => {
    let option = document.createElement("option")
    option.value = departamento;
    option.textContent = departamento;
    select.appendChild(option);
});