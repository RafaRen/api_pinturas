const express = require('express');
const router = express.Router();

const template = `
<html lang="en">
<head>
  <title>Api Pinturas</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B"
    crossorigin="anonymous">
</head>

<body>
  <div class="container">
    <h1>WEB NUTRIOLOGA</h1>
    <p>Esta API fue creada en la materia de Aplicaciones Web Interactivas por Rafael Alejandro Renteria
      Gomez y Julio Cesar Marin Cardona.</p>
    <h2>Servicios</h2>
    <table class="table">
      <tr>
        <th>Punto de acceso</th>
        <th>Metodo</th>
        <th>Descripcion</th>
      </tr>
      <tr>
        <td>/usuarios</td>
        <td>Get</td>
        <td>Obtiene todos los usuarios registrados</td>
      </tr>
      <tr>
        <td>/usuarios/:id</td>
        <td>Get</td>
        <td>Obtiene el usuario registrado especificado por id</td>
      </tr>
      <tr>
        <td>/usuarios/signup</td>
        <td>Post</td>
        <td>Agrega un nuevo usuario</td>
      </tr>
      <tr>
        <td>/usuarios/login</td>
        <td>Post</td>
        <td>Se loggea en el API y genera el token para la autentificación</td>
      </tr>
      <tr>
        <td>/usuarios/:id</td>
        <td>Put</td>
        <td>Modifica usuario especificado por id</td>
      </tr>
      <tr>
        <td>/usuarios/:id</td>
        <td>Delete</td>
        <td>Borra el usuario especificado por id</td>
      </tr>
      <tr>
        <td>/perfiles</td>
        <td>Get</td>
        <td>Obtiene todos los perfiles de los usuarios registrados</td>
      </tr>
      <tr>
        <td>/perfiles/:id</td>
        <td>Get</td>
        <td>Obtiene el perfil especificado del usuario por id</td>
      </tr>
      <tr>
        <td>/perfiles</td>
        <td>Post</td>
        <td>Agrega un nuevo perfil a un usuario en especifico por id</td>
      </tr>
      <tr>
        <td>/perfiles/:id</td>
        <td>Put</td>
        <td>Modifica el perfil del usuario especificado por id</td>
      </tr>
      <tr>
        <td>/perfiles/:id</td>
        <td>Delete</td>
        <td>Borra el perfil del usuario especificado por id</td>
      </tr>
      <tr>
        <td>/citas</td>
        <td>Get</td>
        <td>Obtiene todas las citas de los usuarios</td>
      </tr>      
      <tr>
        <td>/citas/:id</td>
        <td>Get</td>
        <td>Obtiene todas la cita del usuario especificada por id</td>
      </tr>
      <tr>
        <td>/citas</td>
        <td>Post</td>
        <td>Agrega una nueva cita al usuario especificado por id</td>
      </tr>
      <tr>
        <td>/citas/:id</td>
        <td>Put</td>
        <td>Modifica la cita del usuario especificado por id</td>
      </tr>
      <tr>
        <td>/citas/:id</td>
        <td>Delete</td>
        <td>Borra la cita del usuario especificada por id</td>
      </tr>
      <tr>
        <td>/planesAlimenticios</td>
        <td>Get</td>
        <td>Obtiene todas los planes alimenticios de los usuarios</td>
      </tr>
      <tr>
        <td>/planesAlimenticios/:id</td>
        <td>Get</td>
        <td>Obtiene todas el plan alimenticio por id especificado</td>
      </tr>
      <tr>
        <td>/planesAlimenticios</td>
        <td>Post</td>
        <td>Agrega un nuevo plan alimenticio al usuario especificado por id</td>
      </tr>
      <tr>
        <td>/planesAlimenticios/:id</td>
        <td>Put</td>
        <td>Modifica el plan alimenticio del usuario especificado por id</td>
      </tr>
      <tr>
        <td>/planesAlimenticios/:id</td>
        <td>Delete</td>
        <td>Borra el plan alimenticio del usuario especificado por id</td>
      </tr>
      <tr>
        <td>/raciones</td>
        <td>Get</td>
        <td>Obtiene todas las raciones de todos los planes alimenticios</td>
      </tr>
      <tr>
        <td>/raciones/:id</td>
        <td>Get</td>
        <td>Obtiene la racion del plan alimeticio especificado por id</td>
      </tr>
      <tr>
        <td>/raciones</td>
        <td>Post</td>
        <td>Agrega la racion al plan alimenticio especificado por id</td>
      </tr>
      <tr>
        <td>/raciones/:id</td>
        <td>Put</td>
        <td>Modifica las raciones del plan alimenticio especificado por id</td>
      </tr>
      <tr>
        <td>/raciones/:id</td>
        <td>Delete</td>
        <td>Borra la racion especificada por id</td>
      </tr>
      <tr>
        <td>/platillosDiarios</td>
        <td>Get</td>
        <td>Obtiene todos los platillos diarios</td>
      </tr>
      <tr>
        <td>/platillosDiarios/:id</td>
        <td>Get</td>
        <td>Obtiene el platillo diario especificado por id</td>
      </tr>
      <tr>
        <td>/platillosDiarios</td>
        <td>Post</td>
        <td>Agrega un nuevo platillo diario</td>
      </tr>
      <tr>
        <td>/platillosDiarios/:id</td>
        <td>Put</td>
        <td>Modifica un platillo diario especificado por id</td>
      </tr>
      <tr>
        <td>/platillosDiarios/:id</td>
        <td>Delete</td>
        <td>Borra el platillo diario especificado por id</td>
      </tr>
    </table>
  </div>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em"
    crossorigin="anonymous"></script>
</body>

</html>`;

router.get('/', (req, res) => {

    res.send(template);
});

module.exports = router;