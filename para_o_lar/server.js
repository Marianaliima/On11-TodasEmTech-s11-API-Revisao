const app = require ('./src/app') // chamar o app

const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`rodando na porta ${PORT}`)
})