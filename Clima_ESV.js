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
    'Usulután': 'Usulutan',
    'La Unión': 'La_Union',
    'Santa Ana': 'Santa_Ana',
    'San Salvador': 'San_Salvador'
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
       Grados.textContent = `${grados}`;
       GMax.textContent = `Max: ${gradosMax}`;
       GMin.textContent = `Min: ${gradosMin}`
    }
    //----------------------------------------------------------------
    //funcion para convertir los grados
    function Convesrion(temp){
        return  parseInt( temp - 273.15);
    }
    //----------------------------------------------------------------
    //Metodo para cada uno de los departamentos
    const ClimaDepartamentos = {
        San_Miguel: () => callAPI('San Miguel',pais),
        Usulutan: () => callAPI('Usulutan',pais),
        La_Union: () => callAPI('La Unión',pais),
        Santa_Ana: () => callAPI('Santa Ana',pais),
        San_Salvador: () => callAPI('San Salvador',pais)
    };
    return {
        ClimaDepartamentos
    } 
});
//-----------------------------------------------------------------
//Evento encargado de la consulta
consulta.addEventListener('click', (e) =>{
    e.preventDefault();
    //Devuelve el valor seleccionado en el select
    const departamentos = departments.value;
    //Se encarga de acceder a una clave en el objeto 
    const departamentoKey = departamentosMap[departamentos];
    if (departamentoKey) {
        El_Salvador().ClimaDepartamentos[departamentoKey]();
    } else {
        mensaje.innerHTML = "<span>Debe seleccionar un departamento</span>";
            //Para que el mensaje se elimine despues de 3 segundos
            setTimeout(() => {
                mensaje.innerHTML = "";
            }, 3000);
    }
})