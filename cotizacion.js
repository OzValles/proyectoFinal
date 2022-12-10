//cotizacion

/* const divCards = document.querySelector('.cards')
const inputName = document.getElementById('name')
const lista = document.getElementById('lista')
const botonApi = document.getElementById('todos')

botonApi.onclick = () =>{
    fetch(`https://rickandmortyapi.com/api/character?name=${inputName.value}`)
    .then((response)=>response.json())
    .then((response)=>{
        const personajes = response.results
        personajes.forEach((personaje )=>{
            const {name,image,species,status} = personaje
            const li = document.createElement('li')
            li.innerHTML = `
            <h2>${name}</h2>
            <img src = ${image}>
            <button class="btn colorBoton"> Agregar a la cotizacion </button>
            `
            lista.append(li)
        })
    })
    .catch(error=>console.log(error))
} */

const divCards = document.querySelector('.cards')
const inputName = document.getElementById('name')
const lista = document.getElementById('lista')
const botonApi = document.getElementById('todos')

botonApi.onclick = async () => {
    const infoApi = await fetch(`https://rickandmortyapi.com/api/character?name=${inputName.value}`) // asincrona
    const response = await infoApi.json() // asincrona
    const personajes = response.results
    personajes.forEach((personaje) => {
      const { name, image,id } = personaje
      divCards.innerHTML +=
       `
       <div class="card" style="width: 18rem;">
       <img class="card-img-top" src="${image}" alt="Card image cap">
       <div class="card-body">
         <h5 class="card-title">${name}</h5>
         <button class="btn colorBoton" id=${id}> Agregar a la cotizacion </button>
       </div>
     </div>
        `
    })
  }

  //boton vaciar carrito
const vaciarApi= document.getElementById("vaciarApi");

vaciarApi.onclick =() => {
    eliminarTodos();
}

const eliminarTodos = () => {
    divCards.innerHTML = ""
}