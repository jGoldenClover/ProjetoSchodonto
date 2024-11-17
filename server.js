const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const helmet = require("helmet");

// esse helmet funciona como um link secundário para conectar o ejs com os links externos (o supabase , o cdn que usa para conectar o supabase e etc)
app.use(helmet.contentSecurityPolicy({
    directives: {
    // os links default serão entregues pelo próprio arquivo ("self")
      defaultSrc: ["'self'"], 
    // o link de script secundário é o cdn que vai fazer a conexão com o supabase
      scriptSrc: ["'self'" , "https://cdn.jsdelivr.net"], 
    // o link de css são o do próprio supabase e o de fontes do google
      styleSrc: ["'self'" , "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
    // o link de outras conexões
      connectSrc: ["'self'" , "https://brioutndycetdzaqsxka.supabase.co"],
      imgSrc: ["'self'"],
    },
    
}))

app.set('view engine' , 'ejs')
PORT = 3000

// basicamente, toda vez que usar localhost:3000/, vai retornar o index.ejs, que é só o cabeçalho, padrão

app.get('/' , (req , res) =>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
}) 
app.get('/cadastro' , (req , res) =>{
    res.sendFile(path.join(__dirname, "public", "cadastro.html"));
}) 
app.get('/login' , (req , res) =>{
    res.sendFile(path.join(__dirname, "public", "login.html"));
}) 
app.get("/dentistas" ,(req , res) => {
    res.sendFile(path.join(__dirname, "public", "dentistas.html"));  
});
app.get("/calendario" ,(req , res) => {
    res.sendFile(path.join(__dirname, "public", "calendario.html"));  
});


// o router existe para facilitar os links entre as novas páginas, importando os comandos do ./routes/consulta
const consultasRouter = require('./routes/routes.js');
const { connect } = require('http2');

// a gente importa os códigos de "./routes/consulta", e basicamente, define que apartir de /consultas, o que for digitado , caso corresponda ao que está no "./routes/consulta" , vai acessar essa página específica

// o servidor está localizado no localhost:3000 e eu defino lá em cima que se usar localhost:3000/ eu puxo tudo o que está no index.ejs. no entanto, na página "./routes/consulta", eu defino que se digitado "/" ou "/dia" irá aparecer um texto, aleatório.

// para não acessar a mesma página usando o /, eu (aqui em baixo) defino que tudo que for escrito após /consultas, vai entrar nessas condições. Ou seja, se digitar /consultas/ ou /consultas/dia eu mostro os textos dos caminhos que eu defini no "./routes/consulta"
app.use('/consultas' , consultasRouter) 



app.listen(PORT , () => {
    console.log(`server rodando na porta: ${PORT}`)
});
