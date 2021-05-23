const models = require('../models/estabelecimentos.json') // basta voce trocar para json


const getAll = (req, res) => {
    return res.status(200).send(models)
}

const getById = (req, res)=>{
    const idRequerido = req.params.id
    let idFiltrado = models.find(estabelecimentos => estabelecimentos.id == idRequerido)

    if(idFiltrado == undefined || idRequerido == " "){
        res.status(404).json([{
            "mensagem":"id não existente"
        }])
    }else{
        res.status(200).json(idFiltrado)       
    }   
}

const create = (req, res) => {
    // voce consegue fazer, apenas respire olhe os exemplos!
    const { 
         nome, 
         site = 'sem site', 
         categoria, 
         telefone, 
        
    } = req.body //estou explodindo as propriedade do json para as constantes


    if (nome === undefined) { // primeira camada Campos requeridos ou opcionais
        return res.status(400).send({
            "mensagem": "O campo nome não foi enviado"
        })
    }

    if (typeof nome != "string" || nome.length < 5 || nome.length > 50) { //camada 2 validação do tipo do dado
        return res.status(400).send({
            "mensagem": "O nome deve ser uma string com tamanho entre 5 e 50 caracteres"
        })
    }

    if (categoria === undefined) { // primeira camada Campos requeridos ou opcionais
        return res.status(400).send({
            "mensagem": "O campo categoria não foi enviado"
        })
    }

    if (!categoriasPermitidas.includes(categoria)) { //camada 2 validação do tipo do dado
        return res.status(400).send({
            "mensagem": "As categorias permitidas são: restaurante e hotel"
        })
    }
    
    const estabelecimento = {
        nome, 
        site, 
        categoria, 
        telefone, 
        
        
    }
    estabelecimento.id = models.novoIdEstabelecimento()
    models.estabelecimentos.push(estabelecimento)
 
     return res.status(201).send(estabelecimento)
}

const categoriasPermitidas = [
    "Atendimento",
    "Acolhimento",
]

const remove = (req, res) => {

    const data = models.estabelecimentos

    const { id } = req.params
    
    const estabelecimento = data.find(estabelecimento => {
        return estabelecimento.id == id
    })    
    
    if (estabelecimento == undefined) {
        return res.status(404).send({message: 'Estabelecimento não encontrado'})
    }    

    const index = data.indexOf(estabelecimento)

    data.splice(index, 1) // o jeito que o js tira nosso amigo do array

    return res.status(204).send({message: 'Estabelecimento deletado'})
}

const replace = (req, res) => {
    const { id } = req.params // é o mesmo que escrever const idRequerido = request.params.id
    
    const found = models.estabelecimentos.find(estabelecimento => {
        return estabelecimento.id == id 
    })
   
    if (found == undefined) {
        return res.status(404).send({message: 'Estabelecimento não encontrado'})
    }

    const { 
        nome, 
        site = 'sem site', 
        categoria, 
        telefone, 
        bairro, 
        cidade, 
        estado 
   } = req.body //estou explodindo as propriedade do json para as constantes

   if (nome === undefined) { // primeira camada Campos requeridos ou opcionais
       return res.status(400).send({
           "mensagem": "O campo nome não foi enviado"
       })
   }

   if (typeof nome !== "string" || nome.length < 5 || nome.length > 50) { //camada 2 validação do tipo do dado
       return res.status(400).send({
           "mensagem": "O nome deve ser uma string com tamanho entre 5 e 50 caracteres"
       })
   }

   if (categoria === undefined) { // primeira camada Campos requeridos ou opcionais
       return res.status(400).send({
           "mensagem": "O campo categoria não foi enviado"
       })
   }

   if (!categoriasPermitidas.includes(categoria)) { //camada 2 validação do tipo do dado
       return res.status(400).send({
           "mensagem": "As categorias permitidas são: restaurante e hotel"
       })
   }

   found.nome = nome
   found.site = site
   found.categoria = categoria
   found.telefone = telefone
   found.bairro = bairro
   found.cidade = cidade
   found.estado = estado

   return res.status(200).send(found)
}

const update = (req, res) => {
    const { id } = req.params // é o mesmo que escrever const idRequerido = request.params.id
    
    const found = models.estabelecimentos.find(estabelecimento => {
        return estabelecimento.id == id 
    })
   
    if (found == undefined) {
        return res.status(404).send({message: 'Estabelecimento não encontrado'})
    }
    
    const { nome, site, categoria, telefone, bairro, cidade, estado } = req.body
    
    if (nome != undefined && (typeof nome !== "string" || nome.length < 5 || nome.length > 50)) { //camada 2 validação do tipo do dado
        return res.status(400).send({
            "mensagem": "O nome deve ser uma string com tamanho entre 5 e 50 caracteres"
        })
    }

    if (categoria != undefined && !categoriasPermitidas.includes(categoria)) { //camada 2 validação do tipo do dado
        return res.status(400).send({
            "mensagem": "As categorias permitidas são: Atendimento e Acolhimento"
        })
    }

    found.nome = nome || found.nome
    found.site = site || found.site
    found.categoria = categoria || found.categoria
    found.telefone = telefone || found.telefone
    found.bairro = bairro || found.bairro
    found.cidade = cidade || found.cidade
    found.estado = estado || found.estado

    return res.status(200).send(found)

}

const like = (req, res) => {
    const { id } = req.params // é o mesmo que escrever const idRequerido = request.params.id
    
    const found = models.estabelecimentos.find(estabelecimento => {
        return estabelecimento.id == id 
    })
   
    if (found == undefined) {
        return res.status(404).send({message: 'Estabelecimento não encontrado'})
    }

    found.likes += 1
    return res.status(200).send(found)

    
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
    replace,
    update,
    like,    
}


