
//REFERENCIAS HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')




const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true
});

socket.on('ultimo-ticket',(ultimoTicket)=>{
    if(ultimoTicket === 0) {
        lblNuevoTicket.innerText = 'Cargando...'
    }
    lblNuevoTicket.innerText = `Ticket ${ultimoTicket}`
}) 

btnCrear.addEventListener( 'click', () => {
    
    socket.emit('siguiente-ticket', null, ( ticket ) => {
        console.log('Desde el server', ticket );
        lblNuevoTicket.innerText = ticket
    });

    

});
