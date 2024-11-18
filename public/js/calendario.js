import * as supabase from '../Banco/banco.js'

const supabasePublicClient = await supabase.pegarBanco() ;

const userID = localStorage.getItem('userID');

if (userID) {
    console.log(`O Id do usuário: ${userID}`);
} else {
    // document.getElementById('usuarios').innerHTML = `Login necessário`
    window.alert("Usuário não está logado");
    window.location.href = "./login.html";

}



var consultasDoUsuario = await supabasePublicClient.from('clientes').select('*,consultas!inner(*)').eq('id',  userID)

consultasDoUsuario = consultasDoUsuario.data
if  (!consultasDoUsuario || consultasDoUsuario.length === 0) {
    window.alert("Sem consultas");
} else {
    consultasDoUsuario = consultasDoUsuario[0]['consultas']
}


console.log(consultasDoUsuario)

let dataAtual = new Date();

let dataSelecionada = null;

document.getElementById('mesAnterior').addEventListener('click' , () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    atualizarCalendario();
    mudarValorDia ();
})


document.getElementById('proximoMes').addEventListener('click' , () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    atualizarCalendario();
    mudarValorDia ()
})

function atualizarCalendario() {
    const mesAno = document.getElementById('mes-ano');
    const diasContainer = document.getElementById('dias');
    
    mesAno.textContent = dataAtual.toLocaleDateString('en', { month: 'long', year: 'numeric' });
    
    const primeiroDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    const ultimoDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);
    
    diasContainer.innerHTML = '';
    
    // Adiciona espaços vazios até o primeiro dia do mês
    for(let i = 0; i < primeiroDia.getDay(); i++) {
        diasContainer.innerHTML += '<div></div>';
    }
    
    // Adiciona os dias do mês
    for(let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const diaElement = document.createElement('a');
        const diaSelecionado = `${dataAtual.getFullYear()}${(dataAtual.getMonth() +1 )}${dia}`
        console.log(diaSelecionado)
        diaElement.className = 'dia';
        diaElement.setAttribute('id' , diaSelecionado);
        diaElement.setAttribute('href' , '/consulta.html');

        diaElement.textContent = dia;
        diasContainer.appendChild(diaElement);
        diaElement.addEventListener('click' , () => {
            mudarValorDia()
        })

    }
    

}

atualizarCalendario();


function mudarValorDia () {
    const todosDiasDeConsultas = []
    for (let i = 0 ; i < consultasDoUsuario.length ; i++) {
        var diaDaConsulta = consultasDoUsuario[i]['data_da_consulta']
        diaDaConsulta = diaDaConsulta.replace(/-/g, "");
        // este valor da 2024-11-14
        console.log(diaDaConsulta)
        todosDiasDeConsultas.push(diaDaConsulta)

        const botaoDiaConsulta = document.getElementById(diaDaConsulta);
        if (botaoDiaConsulta) {
            botaoDiaConsulta.style.backgroundColor = '#ffff00';
        } else {
            console.log("Botão não encontrado.");
        }
    }
    localStorage.removeItem('diaSelecionado')
    localStorage.setItem('diaSelecionado' , JSON.stringify(todosDiasDeConsultas))
    var diaSelecionado = localStorage.getItem('diaSelecionado')

    
    console.log(diaSelecionado)
}
    
mudarValorDia()


