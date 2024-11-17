import * as supabase from '../Banco/banco.js'

const supabasePublicClient = supabase.pegarBanco()

const container = document.querySelector('.container');
const containerLista = document.querySelector('.container-list');

async function verificarBanco () {
  const response = await supabasePublicClient.from("dentistas").select("*");
  const data = response.data

  for (let i = 0 ; i <= data.length ; i++) {
    console.log(data[i]['user_name']);

    const ul = document.createElement('ul');
    ul.className=('container-list');
    const botao_consulta = document.createElement('a')
    botao_consulta.className = ('botao-dentista')
    botao_consulta.setAttribute('id' , data[i]['id'])
    // botao_consulta.setAttribute('href' , `/consulta.html`)
    botao_consulta.setAttribute('href' , `/dentistaSelecionado/${data[i]['id']}`)
    botao_consulta.innerHTML = 'Ver contato'


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