//Const con los elementos a emplear
const resClima = document.getElementById('departamento');
const IMG = document.querySelector('.IMG');
const Grados = document.getElementById('grados');
const GMax = document.getElementById('Max');
const GMin = document.getElementById('MIN');
const departments = document.getElementById('Departamentos');
const mensaje = document.querySelector('.message');
//Nos ayuda a mapear los valores seleccionados en el select
const departamentosMap = {
    'San Miguel': 'San_Miguel',
    'San Salvador': 'San_Salvador',
    'La Unión': 'La_Union',
    'Morazán': 'Morazan',
    'Usulután': 'Usulutan',
    'Santa Ana': 'Santa_Ana',
    'Ahuachapán': 'Ahuachapan',
    'Cabañas': 'Cabanas',
    'Chalatenango': 'Chalatenango',
    'La Libertad': 'La_Libertad',
    'La Paz': 'La_Paz',
    'San Vicente': 'San_Vicente',
    'Sonsonate': 'Sonsonate',
    'Cuscatlán': 'Cuscatlan'
};
//-----------------------------------------------------------------
//Objeto El Salvador
const El_Salvador = (() => {
    'use strict'

    // Constantes global
    const pais = 'SV';

    //Funcion que se encarga de llamar a la API
    function callAPI(city,country){
        const apiId ='a72cbe4528ce1e08929141bbb274beb5';
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
        //Promesa
        fetch(url)
            .then(data => {
                return data.json();
            })
            .then(dataJSON =>{
                MostrarClima(dataJSON);
                console.log(dataJSON)
            })
    }
    //----------------------------------------------------------------
    //Funcion encargada de mostrar los resultados
    function MostrarClima(data){
        const {name,main:{temp,temp_min,temp_max},weather:[arr]} = data; 
        const grados =Convesrion(temp);
        const gradosMax =Convesrion(temp_max);
        const gradosMin =Convesrion(temp_min);
        //Mostrando los resultados en el HTML
        resClima.textContent = `Clima en: ${name}`;
        const Contenido = document.createElement('div');
        Contenido.innerHTML = `<img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">`
        IMG.appendChild(Contenido);
        // Eliminamos el icono de la busqueda anterior 
        IMG.innerHTML = '';
        // Agregamos el icono
        IMG.appendChild(Contenido);
        Grados.textContent = `${grados}°C`;
        GMax.textContent = `Max: ${gradosMax}°C`;
        GMin.textContent = `Min: ${gradosMin}°C`;

        // Ocultamos el mapa y mostramos la sección de información del clima
        mapa.style.display = 'none';
        info.style.display = 'block';
    }
    //----------------------------------------------------------------
    //funcion para convertir los grados
    function Convesrion(temp){
        return  parseInt( temp - 273.15);
    }
    //----------------------------------------------------------------
    //Metodo para cada uno de los departamentos
    const ClimaDepartamentos = {
        San_Miguel: () => callAPI('San Miguel', pais),
        San_Salvador: () => callAPI('San Salvador', pais),
        La_Union: () => callAPI('La Unión', pais),
        Morazan: () => callAPI('Morazán', pais),
        Usulutan: () => callAPI('Usulután', pais),
        Santa_Ana: () => callAPI('Santa Ana', pais),
        Ahuachapan: () => callAPI('Ahuachapán', pais),
        Cabanas: () => callAPI('Cabañas', pais),
        Chalatenango: () => callAPI('Chalatenango', pais),
        La_Libertad: () => callAPI('La Libertad', pais),
        La_Paz: () => callAPI('La Paz', pais),
        San_Vicente: () => callAPI('San Vicente', pais),
        Sonsonate: () => callAPI('Sonsonate', pais),
        Cuscatlan: () => callAPI('Cuscatlán', pais),
    };
    return {
        ClimaDepartamentos
    } 
});
//-----------------------------------------------------------------
//Evento que nos permite que el clima se cambie al elejir automaticamente al seleccionar un Departamento
departments.addEventListener('change', () => {
    const selectedDepartment = departments.value;
    const departamentoKey = departamentosMap[selectedDepartment];
    
    if (departamentoKey) {
        El_Salvador().ClimaDepartamentos[departamentoKey]();
    } else {
        mensaje.innerHTML = "<span>Debe seleccionar un departamento</span>";
        setTimeout(() => {
            mensaje.innerHTML = "";
        }, 3000);
    }
});

// Evento inicial que puede mostrar el mapa antes de seleccionar un departamento
window.addEventListener('load', () => {
    mapa.style.display = 'block';
    info.style.display = 'none'; // Ocultar la información hasta que se elija un departamento
});
