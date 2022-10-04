const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


// Expresiones Regulares
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false,
}

const validarFormulario = (evento) => {
	// target.name = trae todos los atributos 'name' de las etiquetas html
	switch (evento.target.name) {
		case 'usuario':
			validarCampo(expresiones.usuario, evento.target, 'usuario');
			break;
			case 'nombre':
				validarCampo(expresiones.nombre, evento.target, 'nombre');
				break;
				case 'password':	
					validarCampo(expresiones.password, evento.target, 'password');
					validacionSegundoPassword();
			break;
		case 'password2':
			validacionSegundoPassword();
			break;
		case 'correo':
			validarCampo(expresiones.correo, evento.target, 'correo');
			break;
		case 'telefono':
			validarCampo(expresiones.telefono, evento.target, 'telefono');
			break;
	}
}

// Función Validar campos
const validarCampo = (expresion, input, campo) => {
				// test() es una validación de JS funciona como un booleano
				if(expresion.test(input.value)){
					// ById revisar html,,,, claslist-revisar CSS
					document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
					document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
	
					// cambiar el ícono -- query revisar html,,, classlist revisar html
					//i es la etiqueta
					document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
					document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
					
					// Enviar aviso error -- query revisar html,, classlist revisar CSS
					document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');

					// llamamos a nuestra variable campos
					campos[campo] = true;
	
				}else{
					// ById revisar html,,,, claslist-revisar CSS
					document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
					document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
	
					// cambiar el ícono -- query revisar html,,, classlist revisar html
					//i es la etiqueta
					document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
					document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
	
					// Enviar aviso error -- query revisar html,, classlist revisar CSS
					document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');

					// llamamos a nuestra variable campos
					campos[campo] = false;
					
				}
}

const validacionSegundoPassword = () => {
	const inputPassword_1 = document.getElementById('password');
	const inputPassword_2 = document.getElementById('password2');

	if(inputPassword_1.value !== inputPassword_2.value){
		// ById revisar html,,,, claslist-revisar CSS
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');

		// cambiar el ícono -- query revisar html,,, classlist revisar html
		//i es la etiqueta
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');

		// Enviar aviso error -- query revisar html,, classlist revisar CSS
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');

		// llamamos a nuestra variable campos
		campos['password'] = false;

	} else {

		// ById revisar html,,,, claslist-revisar CSS
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');

		// cambiar el ícono -- query revisar html,,, classlist revisar html
		//i es la etiqueta
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');

		// Enviar aviso error -- query revisar html,, classlist revisar CSS
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');

		// llamamos a nuestra variable campos
		campos['password'] = true;
	}
}

// Función para recorrer cada input del formulario
inputs.forEach((input) => {
	// keyup --> tecla levantada al escribir en el campo
	// blur --> cursor fuera del campo al escribir en el campo
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (evento) => {

	evento.preventDefault();

	const terminos = document.getElementById('terminos');

	// Condicional para validar que todos los campos esten correctos
	if(campos.usuario && campos.nombre && campos.password && campos.correo & campos.telefono && terminos.checked){
		formulario.reset();

		// ById revisar html,,,, claslist-revisar CSS
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');

		}, 5000);

		// recorrido de todos los iconos de los campos para eliminarlos
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});

	}else{
		
		// ById revisar html,,,, claslist-revisar CSS
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
})