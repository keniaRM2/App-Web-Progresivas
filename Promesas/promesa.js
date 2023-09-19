/*Ejercicio 1: Promesas Encadenadas
Crea una función que realice las siguientes tareas:

Inicia una promesa que se resuelva después de 2 segundos con un número aleatorio entre 1 y 100.
Luego, toma ese número y crea una segunda promesa que se resuelva después de 3 segundos con el 
resultado de elevar ese número al cuadrado.
Finalmente, toma el resultado de la segunda promesa y crea una tercera promesa que se resuelva 
después de 1 segundo con la raíz cuadrada del número resultante.*/

// function promesasEncadenadas() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const numRandom = Math.floor(Math.random() * 100) + 1;
//          resolve(numRandom);
//          console.log("------>>>paso 1:número aletorio:", numRandom);
//       }, 2000);
//     })
//     .then((numRandom) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           const numCuadrado = numRandom * numRandom;
//           console.log("------>>>paso 2:número al cuadrado:", numCuadrado);
//           resolve(numCuadrado);
//         }, 3000);
//       });
//     })
//     .then((numCuadrado) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           const numRaizCuadrada = Math.sqrt(numCuadrado);
//           console.log("------>>>paso 3:número raíz cuadrada:", numRaizCuadrada);
//           resolve(numRaizCuadrada);
//         }, 1000);
//       });
//     });
//   }
  
  /*
  Ejercicio 2: Promesa de Múltiples Solicitudes
Crea una función que realice las siguientes tareas:

Recibe un array de URLs como argumento.
Utiliza fetch y promesas para realizar una solicitud GET a cada URL en el array.
Devuelve una promesa que se resuelva con un array de los resultados de todas las solicitudes.
  
  */


// function promesadeMultiplesSolicitudes(urls) {
//     const promesas = urls.map((url) => {
//       return fetch(url).then((response) => response.json());
//     });
  
//     return Promise.all(promesas);
//   }
  
//   const urls = ["https://reqres.in/api/users", "https://reqres.in/api/users?page=2"]; 
  
//   promesadeMultiplesSolicitudes(urls)
//     .then((results) => {
//       console.log("----->>>> Tus datos :V :", results);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
  


/*
Ejercicio 3: Promesas Paralelas
Crea una función que realice las siguientes tareas:

Recibe un array de funciones que devuelven promesas como argumento.
Ejecuta todas las funciones en paralelo y espera a que todas las promesas se resuelvan.
Devuelve una promesa que se resuelva con un array de los resultados de todas las promesas.

*/

// function promesasParalelas(promesas) {
//     return Promise.all(promesas);
//   }
  
//   const promesas = [
//     function () {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve("promesa 1");
//         }, 1000);
//       });
//     },
//     function () {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve("promesa 2");
//         }, 1000);
//       });
//     },
//     function () {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve("promesa 3");
//         }, 1000);
//       });
//     }
//   ];
  
//   promesasParalelas(promesas)
//     .then((results) => {
//       console.log("------>>>> Muchas promesas--->>>>:", results);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
  

/*
Ejercicio 4: Promesas en Cadena con Retraso
Crea una función que realice las siguientes tareas:

Recibe un número n como argumento.
Utiliza un bucle para crear una cadena de promesas, donde cada promesa se resuelve 
después de N segundos con el número actual en el bucle.
Cada promesa debe imprimir el número en la consola antes de resolverse.
Finalmente, devuelve una promesa que se resuelva después de N segundos con el mensaje 
"Todas las promesas se resolvieron".
*/

// function promesasConRetraso(n) {
//     const promesas = [];
  
//     for (let i = 1; i <= n; i++) {
//       promesas.push(
//         new Promise((resolve) => {
//           setTimeout(() => {
//             console.log("Muchas promesas resolviendo ---->>>>", i);
//             resolve(i);
//           }, i * 1000);
//         })
//       );
//     }
  
//     return Promise.all(promesas).then((results) => {
//       console.log("Ya quedo listo todo resuelto");
//       return results; 
//     });
//   }
  
//   const n = 3;
//   promesasConRetraso(n)
//     .then((results) => {
//       console.log("----->>>>>> Resultados", results);
//     });
  

/*
Ejercicio 5: Promesa con Cancelación
Crea una función que realice las siguientes tareas:

Inicia una promesa que se resuelva después de 5 segundos con un mensaje.
Si se llama a una función cancel antes de que se cumplan los 5 segundos, 
la promesa debe rechazarse con el mensaje "Promesa cancelada".

*/

function promesaConCancelacion() {
  let promesaCancelada = false;
  let  time;
  const promesa = new Promise((resolve, reject) => {
    time = setTimeout(() => {
      if (!promesaCancelada) {
        resolve("La promesa se resolvió");
      }
    }, 5000);


    
  });

  promesa.cancel = () => {

    promesaCancelada = true;
    clearTimeout(time);

    Promise.reject("Promesa cancelada en el tiempo " + time);
  };
  return promesa;
}

const promesas = promesaConCancelacion();

promesas.then((resultado) => {
  console.log(resultado);
}).catch((error) => {
  console.error("Error-> "+error);
});


promesas.cancel();
  
