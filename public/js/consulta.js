import * as supabase from './banco.js'

const supabasePublicClient = supabase.pegarBanco()
const userID = localStorage.getItem('userID');


const container = document.querySelector('.container');
var dataConsulta = JSON.parse(localStorage.getItem('diaSelecionado'))

const botaoAnterior = document.getElementById('consultaAnterior')
const botaoProximo = document.getElementById('proximaConsulta')


var tamanho = dataConsulta.length

async function preencherDadosUsuario(indice) {  
    const dataAtual = Number(dataConsulta[indice] , 10)

    const consulta = await supabasePublicClient.from("consultas").select('*,clientes!inner(*)').eq('data_da_consulta' , dataAtual )
    const consultaData = consulta.data 

    console.log(consultaData[indice])
    
    var idDentista = consultaData[0]['dentista_consulta'] 
    var dentista = await supabasePublicClient.from("dentistas").select('*').eq('id' , idDentista )
    dentista = dentista.data
    

    const nomeDentista = dentista[0]['name']
    const telefoneDentista = dentista[0]['telefone_contato']
    const emailDentista = dentista[0]['email']
    const consultorioDentista = consultaData[0]['consultorio_dentista']
    const nomeUsuario = consultaData[0]['clientes']['user_name']
    
    const textoData = consultaData[0]['data_da_consulta']
    const [ano, mes, dia] = textoData.split('-');

    const data = `${dia}/${mes}/${ano} `
    console.log(data)

    const ul = document.createElement('ul');
    ul.className = ('container-list');

    const nome_dentista_li = document.createElement('li');
    nome_dentista_li.className=('container-list-p');
    nome_dentista_li.setAttribute('id' , 'nomeDentista');

    const telefone_dentista_li = document.createElement('li');
    telefone_dentista_li.className=('container-list-p');
    telefone_dentista_li.setAttribute('id' , 'telefoneDentista');

    const email_dentista_li = document.createElement('li');
    email_dentista_li.className=('container-list-p');
    email_dentista_li.setAttribute('id' , 'emailDentista');

    const consultorio_dentista_li = document.createElement('li');
    consultorio_dentista_li.className=('container-list-p');
    consultorio_dentista_li.setAttribute('id' , 'consultorioDentista');

    const nome_usuario_li = document.createElement('li');
    nome_usuario_li.className=('container-list-p');
    nome_usuario_li.setAttribute('id' , 'user_name');
    
    const data_li = document.createElement('li');
    data_li.className=('container-list-p');
    data_li.setAttribute('id' , 'dataConsulta');


    nome_dentista_li.innerHTML = '';
    telefone_dentista_li.innerHTML = '';
    email_dentista_li.innerHTML = '';
    consultorio_dentista_li.innerHTML = '';
    nome_usuario_li.innerHTML ='';
    data_li.innerHTML = '';

    nome_dentista_li.innerHTML = `<b>Dentista responsável: </b> ${nomeDentista}`;
    if (!telefoneDentista) {
        telefone_dentista_li.innerHTML = `<b> Telefone de contato : </b> sem telefone de contato`;

    }else {
        telefone_dentista_li.innerHTML = `<b>Telefone de contato: </b> ${telefoneDentista}`;
    }
    emailDentista.toLowerCase()
    email_dentista_li.innerHTML = `<b>Email comercial: </b> ${emailDentista}`;
    consultorio_dentista_li.innerHTML = `<b>Local da consulta:</b> ${consultorioDentista}`;
    nome_usuario_li.innerHTML =  `<b>Nome do paciente :</b> ${nomeUsuario}`;
    data_li.innerHTML =  `<b>Data da consulta:</b> ${data}`;

    ul.innerHTML = ''

    ul.appendChild(nome_dentista_li)
    ul.appendChild(telefone_dentista_li)
    ul.appendChild(email_dentista_li)
    ul.appendChild(consultorio_dentista_li)
    ul.appendChild(nome_usuario_li)
    ul.appendChild(data_li)

    container.innerHTML = ''

    container.appendChild(ul)
}

var indice = 0

botaoAnterior.addEventListener('click' , () => {
    
    indice-=1
    if (indice < 0) {
        console.log('entrou no if do < que 0 ')
        return indice = 0
    }
    console.log(indice)
    
    preencherDadosUsuario(indice)
})
botaoProximo.addEventListener('click' , () => {
    indice+=1
    if (indice >= tamanho) {
        console.log('entrou no if do tamanho da consulta')
        indice = (tamanho - 1)
    }
    console.log(indice)

    preencherDadosUsuario(indice)
})

window.onload(preencherDadosUsuario(indice))


    

    

