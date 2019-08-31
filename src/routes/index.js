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
    <p>Esta API fue creada por Rafael Alejandro Renteria
      Gomez </p>
    <h2>Servicios</h2>
    <table class="table">
      <tr>
        <th>Punto de acceso</th>
        <th>Metodo</th>
        <th>Descripcion</th>
      </tr>
      <tr>
        <td>/users</td>
        <td>Get</td>
        <td></td>
      </tr>
      <tr>
        <td>/users/:id</td>
        <td>Get</td>
        <td></td>
      </tr>
      <tr>
        <td>/users/signin</td>
        <td>Post</td>
        <td>Agrega un nuevo usuario</td>
      </tr>
      <tr>
        <td>/users/login</td>
        <td>Post</td>
        <td></td>
      </tr>
      <tr>
        <td>/users/:id</td>
        <td>Put</td>
        <td></td>
      </tr>
      <tr>
        <td>/users/:id</td>
        <td>Delete</td>
        <td></td>
      </tr>
     
    </table>
  </div>
  Postman collection LINK https://www.getpostman.com/collections/252cf368464e82ea1a93
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