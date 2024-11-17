const { pegarBanco } = require('../public/Banco/bancoEndPoint')


var todosUsuariosCadastrados = []
const supabasePublicClient = pegarBanco()

async function pegarTodosUsuarios (todosUsuariosCadastrados) {
    let supabasePublicClient = pegarBanco();
    
    const responseUsuarios = await supabasePublicClient.from('clientes').select('*');

    if (responseUsuarios.error) {
        console.error("Erro ao buscar usuarios:", responseUsuarios.error);
    } else {
        todosUsuariosCadastrados.push(responseUsuarios.data);
    }
    
    const responseDentistas = await supabasePublicClient.from('dentistas').select('*')

    if (responseDentistas.error) {
        console.error("Erro ao buscar dentistas:", responseDentistas.error);
    } else {
        todosUsuariosCadastrados.push(responseDentistas.data);
    }
    return todosUsuariosCadastrados;
}

async function definirUsuariosEDentistas () {
    todosUsuariosCadastrados = await pegarTodosUsuarios(todosUsuariosCadastrados)

    const todosUsuarios = todosUsuariosCadastrados[0];
    const todosDentistas = todosUsuariosCadastrados[1];
    
    // console.log(todosDentistas)
    // console.log(todosUsuarios)

}

definirUsuariosEDentistas()



const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());


router.use(express.json());

router.get("/:data/:id" , (req , res) => {
    const consultaData = req.params.data
    const consultaId = req.params.id

    res.render('consulta')

    module.exports = consultaData
})

module.exports = router
