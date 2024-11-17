import * as supabase from '../Banco/banco.js'

const supabasePublicClient = supabase.pegarBanco();

const container_dentista = document.querySelector('#condicao_dentista');
const botaoCondicao = document.getElementById('if_dentista');
const botaoConfirm = document.getElementById('btn-confirm');

const input_email = document.getElementById('email');
const input_password = document.getElementById('password');
const input_complete_name = document.getElementById('complete_name');
const input_user_name = document.getElementById('user_name');




botaoCondicao.addEventListener('click' , function adicionarInput () {
    console.log(botaoCondicao.checked)
    if (botaoCondicao.checked) {
        console.log(botaoCondicao.value)
        
        const div_empresa = document.createElement('div');
        const input_empresa = document.createElement('input');

        const div_telefone = document.createElement('div');
        const input_telefone = document.createElement('input');
        

        div_empresa.className =('container-input-box-empresa');
        input_empresa.className = ('container-input-empresa');

        div_telefone.className =('container-input-box-telefone');
        input_telefone.className= ('container-input-telefone');
        
        input_empresa.setAttribute('id' , 'empresa')
        input_empresa.setAttribute('placeholder' , 'Empresa responsável ')
        input_empresa.setAttribute('type' , 'text')
        input_empresa.setAttribute('name' , 'dentista_empresa')
        input_empresa.setAttribute('required' , '')

        input_telefone.setAttribute('id' , 'telefone')
        input_telefone.setAttribute('placeholder' , 'Telefone de contato (Opcional).')
        input_telefone.setAttribute('type' , 'text')
        input_telefone.setAttribute('name' , 'dentista_telefone')



        div_empresa.appendChild(input_empresa)
        div_telefone.appendChild(input_telefone)
        
        container_dentista.appendChild(div_empresa)
        container_dentista.appendChild(div_telefone)
    
    }
    else {
        console.log('botao Desligado')
        var input_empresa = document.getElementById('empresa');
        var input_telefone = document.getElementById('telefone');
        var div_empresa = document.querySelector('.container-input-box-empresa');
        var div_telefone = document.querySelector('.container-input-box-telefone');

        input_empresa.innerHTML = ''
        input_telefone.innerHTML = ''

        div_telefone.innerHTML = ''
        div_empresa.innerHTML = ''

        container_dentista.innerHTML = ''
    }
})

function verificarEmail(email) {
    const validarEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/;
    // antes do @ pode ter números e letras(maiúsculas ou minúsculas) 
    // depois tem que ter números e letras(maiúsculas ou minúsculas) 
    // depois do @ tem um "." tem somente letras(maiúsculas ou minúsculas)   
  
    return validarEmail.test(email);
    // o .test vai fazer a verificação
}



botaoConfirm.addEventListener('click' ,  async (event) =>  {
    event.preventDefault();
    const nomeCompleto = input_complete_name.value;
    const user_name= input_user_name.value;
    const email = input_email.value;
    const password = input_password.value;    

    const id = crypto.randomUUID();

    const created_at = new Date().toLocaleString("en", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });
    console.log()
    console.log(created_at)

    if (!email && !verificarEmail(email)) {
        console.log('Erro no email')
        return;
    }
    if (!password) {
        console.log('Erro na senha')
        return;
    }
    if (!nomeCompleto) {
        console.log('Erro no nome completo')
        return;
    }
    if (!user_name) {
        console.log('Erro no nome de usuario')
        return;
    }

    if (botaoCondicao.checked) {
        const nome_empresa = document.getElementById('empresa');
        const nome_telefone = document.getElementById('telefone');

        const empresa = nome_empresa.value;
        const telefone = nome_telefone.value;

        if (!empresa){
            console.log("Erro no nome da empresa")
            return;
        }
        if (!telefone){
            console.log('sem telefone')
            const { data , error } = await supabasePublicClient.from('dentistas').insert([{
                id: id, 
                email: email,
                user_name : user_name,
                name: nomeCompleto,
                password: password,
                empresa_responsavel: empresa,
                telefone_contato: "Sem telefone!",
                data_da_conta: created_at
                }]);
            return;
        }

        else {
            console.log('asdiaisd')
            
            const { data , error } = await supabasePublicClient.from('dentistas').insert([{
                id: id, 
                email: email,
                user_name : user_name,
                name: nomeCompleto,
                password: password,
                empresa_responsavel: empresa,
                telefone_contato: telefone,
                data_da_conta: created_at
                }]);
            return;
    }
}
    
    console.log('91239012930219039021390')

    const { data , error } = await supabasePublicClient.from("clientes").insert([
        {
        id: id, 
        email:email,
        user_name : user_name,
        name: nomeCompleto,
        password: password,
        data_da_conta: created_at
    }
]);
    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Inserted data:', data);
    }
    

    const contaExemplo = await supabasePublicClient.from("clientes").select("*")
    const contaExemploDentistas = await supabasePublicClient.from("dentistas").select("*")
    const datar = contaExemplo.data
    const datar2 = contaExemploDentistas.data
    console.log(datar)
    console.log(datar2)

    

});




