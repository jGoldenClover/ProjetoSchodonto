const { createClient } = require('@supabase/supabase-js');

function pegarBanco() {
    const url = 'https://brioutndycetdzaqsxka.supabase.co';
    const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyaW91dG5keWNldGR6YXFzeGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NjIxNDgsImV4cCI6MjAyOTEzODE0OH0.fE2ANGfCaVLTaFZMb8d43WUEqOsCiURSL-NRjXO4ga0';
    
    const supabasePublicClient =  createClient(url , key);
    return supabasePublicClient ; 
}

async function pegarTodosUsuarios () {
    todosUsuarios = []
    let supabasePublicClient = pegarBanco();
    
    const responseUsuarios = await supabasePublicClient.from('clientes').select('*');

    if (responseUsuarios.error) {
        console.error("Erro ao buscar usuarios:", responseUsuarios.error);
    } else {
        todosUsuarios.push(responseUsuarios.data);
    }
    
    const responseDentistas = await supabasePublicClient.from('dentistas').select('*')

    if (responseDentistas.error) {
        console.error("Erro ao buscar dentistas:", responseDentistas.error);
    } else {
        todosUsuarios.push(responseDentistas.data);
    }
    return todosUsuarios;
}

module.exports = { pegarTodosUsuarios }

module.exports = { pegarBanco }