//Aca se maneja el cambio del tema de la pagina

//Const a emplear
const CambioTema = document.getElementById('Tema');
const body = document.body;

//Evento que se encargara del cambio 
CambioTema.addEventListener("click", () =>{
    body.classList.toggle("Temas");

    //Cambiamos los iconos segun el modo en que se encuentre actualmente la pagina
    const sunIcon = '<i class="fas fa-sun"></i>';
    const moonIcon = '<i class="fas fa-moon"></i>';

    if (body.classList.contains("Temas")) {
        CambioTema.innerHTML = sunIcon; // Cambiar a icono de sol (modo día)
      } else {
        CambioTema.innerHTML = moonIcon; // Cambiar a icono de luna (modo noche)
      }
});