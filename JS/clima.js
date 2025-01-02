//Forma 1 que intente para hacer la app del clima con el uso de la API
//Const a emplear 
const resClima = document.getElementById('departamento');
const IMG = document.querySelector('.IMG');
const Grados = document.getElementById('grados');
const GMax = document.getElementById('Max');
const GMin = document.getElementById('MIN');
const departments = document.getElementById('Departamentos');
const consulta = document.querySelector('#consulta');
const mensaje = document.querySelector('.message');
const pais = 'SV';
//-----------------------------------------------------------------

//Objeto El Salvador
const El_Salvador = (() =>{
    'use strict'

    //Funcion encargada de llamar a la API
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
                //console.log(dataJSON)
              })
    }

    //Funcion para mostrar el clima
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
    }

    //funcion para convertir los grados
    function Convesrion(temp){
        return  parseInt( temp - 273.15);
    }

    //Metodo para imprimri la hora
    const ImprimeClima = () =>{

        //Almacenando el valor del departamento seleccionado en una variable
        const departamentos = departments.value;

        //Validacion de la eleccion del departamento
        if(departamentos === ''){
            mensaje.innerHTML = "<span>Debe seleccionar un departamento</span>";
            //Para que el mensaje se elimine despues de 3 segundos
            setTimeout(() => {
                mensaje.innerHTML = "";
            }, 3000);
        }
        else{
            //Llamamos a la API
            callAPI(departamentos, pais)
            }
    } 

    return {
        ImprimeClima
    }
 
})();

//Evento encargado de la consulta
consulta.addEventListener('click', (e) =>{
    e.preventDefault();
   //Llamamos al objeto El salvador
   El_Salvador.ImprimeClima();
})