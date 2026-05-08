# ⚡ App Fullstack con React + JWT + PostgreSQL

Aplicación fullstack con autenticación completa. Frontend en React 
conectado a una API REST en Node.js con JWT, bcrypt y PostgreSQL en Railway.

---

## 🖥️ Pantallas

- **Login** — inicio de sesión con email y password
- **Registro** — creación de cuenta nueva
- **Perfil** — pantalla protegida, solo accesible con token válido

---

## 🛠️ Tecnologías

**Frontend**
- React
- Tailwind CSS
- fetch API
- localStorage

**Backend**
- Node.js + Express
- jsonwebtoken
- bcrypt
- pg + PostgreSQL en Railway
- CORS

---

## ⚙️ Instalación

**Backend:**
```bash
cd login-jwt
npm install
node app.js
```

Crear `.env`:

**Frontend:**
```bash
cd frontend-login
npm install
npm start
```

---

## 🔄 Flujo

1. Usuario se registra — contraseña encriptada con bcrypt y guardada en PostgreSQL
2. Usuario inicia sesión — backend verifica credenciales y devuelve token JWT
3. React guarda el token en localStorage
4. Usuario accede al perfil — token válido da acceso a la pantalla protegida
5. Al cerrar sesión — token eliminado del localStorage

---
| Proyecto | Demo | Tecnologías |
|----------|------|-------------|
| [🔐 Login JWT](https://github.com/iguardiaDev/login-jwt) | [Backend](https://login-jwt-production.up.railway.app) | Node.js, JWT, PostgreSQL |
| [⚡ App Fullstack](https://github.com/iguardiaDev/frontend-login) | [Demo](https://frontend-login-xxxx.vercel.app) | React, Tailwind, JWT |

---

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt (10 salt rounds)
- Tokens JWT con expiración de 1 hora
- CORS configurado para permitir solo el frontend
- DATABASE_URL en `.env`, nunca en GitHub

---

## 👨‍💻 Autor

**Daniel Iguardia** — [GitHub](https://github.com/iguardiaDev)
