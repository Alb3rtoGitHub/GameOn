// Todo se ejecuta cuando el DOM se carga completamente
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el formulario en DOM
    const formulario = document.querySelector('form');
    // ---------------------------------------------------------------
    
    // Función mostrar error
    const mostrarError = (input, mensaje) => {
        //acceder al div contenedor (padre)
        const divPadre = input.parentNode;
        //encontramos el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        //agregar la clase de error al elemento padre
        divPadre.classList.add('error');
        //agregamos mensaje de error
        errorText.innerText = mensaje;
    }
    
    const input = document.querySelector('#password');
    const mensaje = 'campo obligatorio CHE';
    // ---------------------------------------------------------------
    
    // Eliminar mensaje de error
    const eliminarError = input => {
        //acceder al la etiqueta contenedora
        const divPadre = input.parentNode;
        //eliminar la clase de error del elemento padre/contenedor
        divPadre.classList.remove('error');
        //encontramos el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        //establecemos el texto como vacío
        errorText.innerText = '';
    }
    
    // ---------------------------------------------------------------
    // Función para comprobar si están completos los campos para sacar el error
    
    formulario.querySelectorAll('input').forEach(input => {
        // se activa cuando el valor de un elemento del formulario cambia y se sale del elemento
        input.addEventListener('change', () => {
            // obtenemos el valor del campo seleccionado
            const valor = input.value.trim(); // elimina cq espacio en blanco al ppio. y fin.
            if (valor !== '') {
                eliminarError(input);
            }
            
            
        })
        
    });
    
    // ---------------------------------------------------------------
    // Función para validar campo
    function validarCampo(campoId, mensaje) {
        const campo = document.getElementById(campoId);
        const value = input.value.trim();
    
        if (value === '') {
            mostrarError(campo, mensaje);
            return false; // indicamos que la validación falló
        } else {
            eliminarError(campo);
            return true; // indicamos que la validación fue exitosa
        }
    }
    
    // Función para validar un correo electrónico usando una expresión regular
    function isEmail(email) {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email); // devuelve true si la cadena coincide con el patrón de la exp. regular (es un e-mail válido)
    }
    
    function validarEmail(campoId, mensaje) {
        //obtenemos el elemento mediante id
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();
    
        // si el campo está vacío
        if (email === '') {
            // establecemos el mensaje de error
            mostrarError(campo, 'El correo electrónico es obligatorio');
            // indicamos que la validación ha fallado
            return false;
        } else if (!isEmail(email)) {
            // establecemos el mensaje de error
            mostrarError(campo, mensaje);
            // indicamos que la validación ha fallado
            return false;
        } else {
            // si es válido eliminamos cq error
            eliminarError(campo);
            // indicamos que la validación ha sido exitosa
            return true;
        }
    }
    
    // ---------------------------------------------------------------
    // Función para validar el formulario
    const validarFormulario = () => {
        let validar = true;
        
        // validar campo email
        validar = validarEmail('email', 'El correo electrónico no es válido') && validar;
        validar = validarCampo('password', 'La contraseña es obligatoria') && validar;
    
        return validar;
    }
    
    // ---------------------------------------------------------------
    // Evento de escucha para cuando se envía el formulario
    
    formulario.addEventListener('submit', event => {
        event.preventDefault();
        if (!validarFormulario()) {
            // mensaje no válido
            event.preventDefault() //evita que el formulario se envíe
            console.log("El formulario no es válido...");
        } else {
            event.preventDefault();
            console.log("El formulario es válido...");
        }
    })
})
