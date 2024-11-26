import * as supabase from '../Banco/banco.js'

const supabasePublicClient = supabase.pegarBanco()

async function verificarUsuarioLogado (idUsuario) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    
    
    var todosUsuariosCadastrados = []
    todosUsuariosCadastrados = await supabase.pegarTodosUsuarios(todosUsuariosCadastrados)
    const todosUsuarios = todosUsuariosCadastrados[0];
    const todosDentistas = todosUsuariosCadastrados[1];
    
    
    for (let i = 0 ; i < todosUsuarios.length ; i++) {
        
        var usuario = await supabasePublicClient.from('clientes').select('*').eq('email' , email).eq('password' , password)
        usuario = usuario.data
        
        if (Array.isArray(usuario) && usuario.length > 0 && todosUsuarios[i]['id'] == usuario[0]['id']) {
            console.log('usuario , email , id definido', idUsuario);
            return idUsuario = usuario[0]['id'];
        }
        var usuario = await supabasePublicClient.from('clientes').select('*').eq('user_name' , email).eq('password' , password)
        usuario = usuario.data
        
        if (Array.isArray(usuario) && usuario.length > 0 && todosUsuarios[i]['id'] == usuario[0]['id']) {
            console.log('usuario , user_name , id definido', idUsuario);
            idUsuario = usuario[0]['id'];
            return idUsuario = usuario[0]['id'];
        }
    }
    for (let i = 0 ; i < todosDentistas.length ; i++) {
        var dentista = await supabasePublicClient.from('dentistas').select('*').eq('email' , email).eq('password' , password)
        dentista = dentista.data
        
        
        if (Array.isArray(dentista) && dentista.length > 0 && todosDentistas[i]['id'] == dentista[0]['id']) {
            console.log('dentista , email , id definido', idUsuario);
            return idUsuario = dentista[0]['id'];
        }
        var dentista = await supabasePublicClient.from('dentistas').select('*').eq('user_name' , email).eq('password' , password)
        dentista = dentista.data
        
        if (Array.isArray(dentista) && dentista.length > 0 && todosDentistas[i]['id'] == dentista[0]['id']) {
            console.log('dentista , user_name , id definido', idUsuario);
            return idUsuario = dentista[0]['id'];
        }
    }
}

var idUsuario = ''
document.getElementById('botaoConfirma').addEventListener('click' , async (event) => {
    event.preventDefault();
    const idUsuario = await verificarUsuarioLogado('');

    // const consultas = await supabasePublicClient.from('consultas').select('*').eq('cliente_consulta' , idUsuario)
    // data = consultas.data

    localStorage.setItem('userID', idUsuario); 
    // localStorage.setItem('consultas' , data)
})



// Ao fazer o login, salva o ID do usuário em todo o código, até que seja apagado usando o comando:
// localStorage.removeItem('userID');


const userID = localStorage.getItem('userID');

console.log(`Id de usuario é : ${userID}`)

