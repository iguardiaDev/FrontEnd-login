import React, { useState } from 'react';

function App() 
{

  const [pantalla, setPantalla] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejoLogin = async (e) =>
  {
    //
    const res = await fetch('https://login-jwt-production.up.railway.app/usuarios/login',
    {
      method: 'POST', //Es el tipo de request que haremos
      headers: {'Content-Type': 'application/json'}, //Estamos enviando un JSON
      body: JSON.stringify({email, password}) //Convertimos a texto los parametros
    });
    const data = await res.json(); //Convertimos a objeto JavaScript

    //Guardamos el token en el localstorage   
    //En caso de que el token sea valido cambiamos a la pantalla de perfil
    if(data.token)
    {
      localStorage.setItem('token', data.token);
      setPantalla('perfil');
    }
    else
    {
      setMensaje(data.mensaje);
      
    }

  }

  const manejoRegistro = async (e) =>
  {
    const res = await fetch('https://login-jwt-production.up.railway.app/usuarios/registro',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nombre, email, password})
    });
    const data = await res.json();

    if(data.ok)
    {
      setPantalla('login');
    }
    else
    {
      setMensaje(data.mensaje);
      setTimeout(() => {setMensaje('');}, 5000);
    } 
  }

  const manejoLogout = () =>
  {
    localStorage.removeItem('token');
    setMensaje('Sesion cerrada');
    setTimeout(() => {setMensaje('');}, 5000);
    setPantalla('login');
  }

  //LimpiarCampos
  const limpiarCampos = () =>
  {
    setEmail('');
    setPassword('');
    setNombre('');
  }

  //Creamos la pantalla de login
  if (pantalla === 'login')
    return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        <input
          className="w-full bg-gray-700 text-white p-3 rounded-lg mb-4 outline-none"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full bg-gray-700 text-white p-3 rounded-lg mb-4 outline-none"
          value={password}
          placeholder="Contraseña"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg"
          onClick={manejoLogin}
        >
          Iniciar sesión
        </button>
        <p className="text-red-400 text-center mt-3">{mensaje}</p>
        <p className="text-gray-400 text-center mt-4">
          ¿Sin cuenta?{' '}
          <span className="text-blue-400 cursor-pointer hover:underline" 
          onClick={() =>{
            limpiarCampos();
            setPantalla('registro');
          }}>
            Registrate
          </span>
        </p>
      </div>
    </div>
  );

  if (pantalla === 'registro')
    return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
       <h2 className="text-3xl font-bold text-white mb-6 text-center">REGISTRO</h2>
        <input
          className="w-full bg-gray-700 text-white p-3 rounded-lg mb-4 outline-none" 
          value={nombre}
          placeholder="Nombre" 
          onChange={e => setNombre(e.target.value)}
        />
        <input 
          className="w-full bg-gray-700 text-white p-3 rounded-lg mb-4 outline-none"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          className="w-full bg-gray-700 text-white p-3 rounded-lg mb-4 outline-none"
          value={password}
          placeholder="Contraseña" 
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg"
          onClick={manejoRegistro}
          >
            Registrar
        </button>
        <p className="text-red-400 text-center mt-3">{mensaje}</p>
        <p className="text-red-400 text-center mt-3">
          ¿Ya tienes cuenta?{' '}
          <span className="text-blue-400 cursor-pointer hover:underline" 
          onClick={() => {
            limpiarCampos();
            setPantalla('login');
            }}>
            Logueate
          </span>
        </p>
      </div>
    </div>

    );
  if (pantalla === 'perfil')
    return(
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">PERFIL</h2>
       <h3 className="text-xl font-bold text-white mb-6 text-center">Bienvenido usuario</h3>
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg"
          onClick={manejoLogout}
          >
            Cerrar Sesion
        </button>
      </div>
    </div>
    );
}

export default App;
