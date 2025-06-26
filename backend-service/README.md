Esquema base de datos
Tabla respuestas:

Campo Tipo Restricciones
id INTEGER PRIMARY KEY AUTOINCREMENT
email TEXT NOT NULL, UNIQUE
motivacion TEXT Opcional
lenguaje TEXT NOT NULL, CHECK en ('JavaScript','Python','Java','C#','Otro')
fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP

Para correr el servidor hacer los siguientes pasos:

1. npm install
2. npm run build
3. npm run setup-db
4. npm run dev

Con esto quedaria listo el backend y quedaria la base de datos con data de prueba, al hacerle curl o mandar una peticion con postman a http://localhost:4001/dev/backend/api/responses/stats deberia responder lo siguiente:

{
"estadisticas": [
{
"lenguaje": "C#",
"cantidad": 2
},
{
"lenguaje": "Java",
"cantidad": 2
},
{
"lenguaje": "JavaScript",
"cantidad": 2
},
{
"lenguaje": "Otro",
"cantidad": 2
},
{
"lenguaje": "Python",
"cantidad": 2
}
]
}

los endpoints con los datos son los siguientes:

GET /api/responses/recent

{
"ultimos": [
{
"email": "usuario@example.com",
"fecha_creacion": "2025-06-26 20:14:38",
"motivacion": "Motivación texto libre"
},
...
]
}

GET /api/responses/total

{
"total": 10
}

GET /api/responses/stats

{
"estadisticas": [
{ "lenguaje": "JavaScript", "cantidad": 2 },
{ "lenguaje": "Python", "cantidad": 2 },
{ "lenguaje": "Java", "cantidad": 2 },
{ "lenguaje": "C#", "cantidad": 2 },
{ "lenguaje": "Otro", "cantidad": 2 }
]
}

POST /api/responses

Body del json:

{
"email": "usuario@example.com", (obligatorio, único, formato válido.)
"motivacion": "Texto opcional", (opcional)
"lenguaje": "JavaScript" (obligatorio, solo permitido uno de: JavaScript, Python, Java, C#, Otro.)
}

Para correr el frontend hacer los siguientes pasos:

1. npm install
2. npm run dev

Con esto deberia quedar corriendo en frontend en el puerto http://localhost:3000, hay 2 rutas, la primera es la base donde esta el formulario o sea http://localhost:3000/
y la segunda donde se encuentra el dashboard o sea http://localhost:3000/dashboard
