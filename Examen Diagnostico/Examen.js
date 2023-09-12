
///LISTAR PERSONAS 

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');

    fetch('https://reqres.in/api/users?page=2')
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                data.data.forEach(usuario => {
                    const row = document.createElement('tr');
                    row.setAttribute('id', `fila-${usuario.id}`);
                    row.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>${usuario.first_name}</td>
                        <td>${usuario.last_name}</td>
                        <td>${usuario.email}</td>
                        <td><button type="button" class="btn btn-danger eliminar-btn">Eliminar</button></td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="5">No existen usuarios.</td>';
                tableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

     
});


/// CREAR PERSONAS
document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const tableBody = document.getElementById('table-body');

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;

        
        const nuevoUsuario = {
            nombre,
            apellido,
            email
        };

        fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuario),
        })
        .then(response => response.json())
        .then(data => {
           
            if (data.id) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.id}</td>
                    <td>${nuevoUsuario.nombre}</td>
                    <td>${nuevoUsuario.apellido}</td>
                    <td>${nuevoUsuario.email}</td>
                `;
                tableBody.appendChild(row);
                
                userForm.reset();
            } else {
                console.error('Error al crear usuario:', data);
            }
        })
        .catch(error => {
            console.error('Error al crear usuario----->>>>', error);
        });
    });
});

//// ELIMINAR PEROSONAS

function eliminarPersona(id) {
    fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 204) {
            return true;
        } else {
            return false;
        }
    })
    .then(eliminado => {
        if (eliminado) {
            const fila = document.getElementById(`fila-${id}`);
            if (fila) {
                fila.remove();
            }
        } else {
            console.error('Error al eliminar la persona.');
        }
    })
    .catch(error => {
        console.error('Error al eliminar la persona:', error);
    });
}



