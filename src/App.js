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
    const res = await fetch('http://localhost:3000/usuarios/login',
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
    const res = await fetch('http://localhost:3000/usuarios/registro',
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
    } 
  }

  const manejoLogout = () =>
  {
    localStorage.removeItem('token');
    setMensaje('Sesion cerrada');
    setPantalla('login');
  }

  //Creamos la pantalla de login
  if (pantalla === 'login')
    return (

    <div>
      <h2>LOGIN</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
      <input placeholder="Contraseña" type="password" onChange={e => setPassword(e.target.value)}/>
      <button onClick={manejoLogin}>Iniciar sesion</button>
      <p>{mensaje}</p>
      <p>¿Sin cuenta? <span onClick={() => setPantalla('registro')}>Registrate</span></p>
    </div>
    );
  if (pantalla === 'registro')
    return (
      
      <div>
        <h2>REGISTRO</h2>
        <input placeholder="Nombre" onChange={e => setNombre(e.target.value)}/>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Contraseña" type="password" onChange={e => setPassword(e.target.value)}/>
        <button onClick={manejoRegistro}>Registrar</button>
        <p>{mensaje}</p>
        <p>¿Ya tienes cuenta?<span onClick={() => setPantalla('login')}>Logueate</span></p>
      </div>

    );
  if (pantalla === 'perfil')
    return(

      <div>
        <h2>PERFIL</h2>
        <h3>Bienvenido usuario</h3>
        <button onClick={manejoLogout}>Cerrar Sesion</button>
      </div>
    
    );
}

export default App;
