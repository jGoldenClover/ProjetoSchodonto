export function pegarBanco() {
    const url = 'https://brioutndycetdzaqsxka.supabase.co';
    const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyaW91dG5keWNldGR6YXFzeGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NjIxNDgsImV4cCI6MjAyOTEzODE0OH0.fE2ANGfCaVLTaFZMb8d43WUEqOsCiURSL-NRjXO4ga0';
    
    const supabasePublicClient =  supabase.createClient(url , key);
    return supabasePublicClient ; 
}

export async function pegarTodosUsuarios (todosUsuarios) {
    todosUsuarios = []
    let supabasePublicClient = pegarBanco();
    
    const responseUsuarios = await supabasePublicClient.from('clientes').select('*');
    console.log(responseUsuarios.data)

    if (responseUsuarios.error) {
        console.error("Erro ao buscar usuarios:", responseUsuarios.error);
    } else {
        todosUsuarios.push(responseUsuarios.data);
    }
    
    const responseDentistas = await supabasePublicClient.from('dentistas').select('*')
    console.log(responseDentistas.data)

    if (responseDentistas.error) {
        console.error("Erro ao buscar dentistas:", responseDentistas.error);
    } else {
        todosUsuarios.push(responseDentistas.data);
    }
    console.log(todosUsuarios)
    return todosUsuarios;
}

