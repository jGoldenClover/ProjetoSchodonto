import * as supabase from '../Banco/banco.js'

const supabasePublicClient = supabase.pegarBanco()

const container = document.querySelector('.container');
const containerLista = document.querySelector('.container-list');


async function verificarBanco (dentistaId) {
  const response = await supabasePublicClient.from("dentistas").select("*");
  const data = response.data

  for (let i = 0 ; i < data.length ; i++) {
    console.log(data[i]['user_name']);

    const ul = document.createElement('ul');
    ul.className=('container-list');
    const botao_consulta = document.createElement('button')
    botao_consulta.className = ('botao-dentista')
    botao_consulta.setAttribute('id' , data[i]['id'])
    botao_consulta.innerHTML = 'Selecionar'

    botao_consulta.addEventListener('click' ,async () => {
        dentistaId = data[i]['id']
        console.log(dentistaId)

        const dentista = await supabasePublicClient.from("dentistas").select("*").eq('id' , dentistaId);
        var dentistaData = dentista.data
        const id = crypto.randomUUID();
        const dentista_consulta = dentistaId;
        const consultorioDentista = dentistaData[0]['empresa_responsavel']
        const userID = localStorage.getItem('userID');
        const clienteConsulta = userID

        document.querySelector('.container').innerHTML = ''

        var dataConsulta = document.createElement('p')
        dataConsulta.innerText = 'Selecione a data da consulta :'
        const digitarDia = document.createElement('input')
        digitarDia.setAttribute('id' , 'diaDigitado')
        digitarDia.setAttribute('placeholder' , 'Escolha o dia da consulta.')
        digitarDia.setAttribute('type' , 'date')
        digitarDia.setAttribute('name' , 'diaonsulta')


        var botaoConfirma = document.createElement('button')
        botaoConfirma.className = ('botao-dentista')
        botaoConfirma.innerHTML = 'Marcar Consulta'
        
        


        container.appendChild(dataConsulta)
        container.appendChild(digitarDia)
        container.appendChild(botaoConfirma)


        botaoConfirma.addEventListener('click' , async () => {
            var data_da_consulta = digitarDia.value ;
            console.log(data_da_consulta)

            const { data , error } = await supabasePublicClient.from('consultas').insert([{
                id: id, 
                dentista_consulta : dentista_consulta ,
                consultorio_dentista : consultorioDentista,
                cliente_consulta : clienteConsulta,
                data_da_consulta : data_da_consulta
                }]);
            window.location.href = "/calendario.html";
            return;
        })


        

    })
    

    const nome_li = document.createElement('li');
    nome_li.className=('container-list-p');
    nome_li.setAttribute('id' , 'name');
    const email_li = document.createElement('li');
    email_li.className=('container-list-p');
    email_li.setAttribute('id' , 'email');

    const telefone_li = document.createElement('li');
    telefone_li.className=('container-list-p');
    telefone_li.setAttribute('id' , 'telefone');
    
    const name = data[i]['user_name'];
    const email = data[i]['email'];
    const telefone = data[i]['telefone_contato'];
    
    nome_li.innerHTML = name;
    ul.appendChild(nome_li);
    email_li.innerHTML = email;
    ul.appendChild(email_li);
    telefone_li.innerHTML = telefone;
    ul.appendChild(telefone_li)
    ul.appendChild(botao_consulta)


    container.appendChild(ul)
  
  }

  
  }


verificarBanco()
