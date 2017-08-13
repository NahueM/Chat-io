'use strict'

const express = require('express');
let app = express();
//creamos la variable server y le pasamos express en su propiedad server
let server = require('http').Server(app);
let io = require('socket.io')(server);


app.use(express.static('../client'));

app.get('/hola', function(req, res){
  res.status(200).send('Hola locoooo!!')
});
// esto deveria ir en una base de datos
let messages = [{
      id:1,
      text: 'Bienvenido al chat super duper del magnifico Nahuel Maya',
      nickname: 'Bot de Bienvenida'
}]

//abrimos una conexion al socket.io, el metodo on nos permite lanzar eventos
//este metodo se va a encargar de detectar las conexiones
io.on('connection', function(socket){
  console.log("Elcliente con la IP:" +socket.handshake.address+" se ha conectado...");

  socket.emit('messages', messages);
  //socket. on capta eventos
  socket.on('add-message', function(data){
        //mientras el socket este abierto los datos van a persistir en el array messages
        messages.push(data);

        //envio a todos los que esten conectados al oscket los mensajes
        io.sockets.emit('messages', messages);
  });
});

server.listen(6677, function(){
  console.log('Servidor funcionando en http://localhost:6677');
});
