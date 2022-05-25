

const searchParams = new URLSearchParams( window.location.search )

//REFERENCIAS HTML
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')


if( !searchParams.has('escritorio') ){
    window.location = 'index.html'
    throw new Error('El escritorio es obligarotio')
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio

divAlerta.style.display = 'none'

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true
});


socket.on('tickets-pendientes',( ticketsPendientes ) =>{
    if(ticketsPendientes === 0) {
        lblPendientes.style.display = 'none';
        btnAtender.disabled = true
    }else{
        btnAtender.disabled = false
        lblPendientes.style.display = '';
    }
    lblPendientes.innerText = ticketsPendientes
})

btnAtender.addEventListener( 'click', () => {
    

    socket.emit('atender-ticket', { escritorio }, ( { ok,ticket } )=>{

        if(!ok){
            document.querySelector('h4').innerText = 'Ya no hay más tickets'
            return divAlerta.style.display = ''
        }
        lblTicket.innerText = 'Ticket ' + ticket.numero
    })

});
