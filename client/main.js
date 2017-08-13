'use strict'
let socket = io.connect('http://192.168.1.9:6677', {'forceNew': true});

socket.on('messages', function(data){
    render(data)
});
function render(data){
    // recorro el array para ir mostrnado los mensajes
    let html = data.map(function(message, index){
      return(`
        <div class="message">
          <strong>${message.nickname}</strong> dice:
          <p>${message.text}</p>
        </div>
        `);
    }).join(' ');//se introduce un espacio entre elemento y elemento

    let div_msg = document.getElementById('messages');
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight; 
}

function addMessage(e){
  let dato = {
    nickname : document.getElementById('nickname').value,
    text : document.getElementById('text').value
    };
  //para no poder cambiar el nombre del usuario mientras estemos en el chat si reinicias si vas a poder -_-
  document.getElementById('nickname').style.display = "none";
  //se envia un evento al socket lo debe recibir el servidor en el index.js
  socket.emit('add-message', dato);

  return false;

}
