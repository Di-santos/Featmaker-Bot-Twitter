// +++ Feat Bot +++
/*
    Bot API:    Bot.método('rotaAPI',{
                        parâmetros
                    },
                    Callback Function{})
*/

// +++ Login configs +++
const twit = require('twit');
require('dotenv').config();
const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:60*1000
})

// +++ Imports e Variáveis+++
const musicas = require('./musicas.json')
const random = require('random-item');
const scheduler = require('node-schedule')
let artistas = ["Froid", "Duzz", "Xamã", "Dfideliz", "Mano Brown", "MC Brinquedo"]
let artista1 = ""
let artista2 = ""
let stream = Bot.stream('user')
// +++ Ações programadas do Bot +++ 

// Feats
scheduler.scheduleJob({hour: 00, minute: 00 }, ()=>{
    artista1 = random(artistas)
    artista2 = random(artistas)

    while (artista1 == artista2){
        artista2 = random(artistas)
    }
    
    Bot.post('statuses/update', {
        status: makeFeat(artista1, artista2)
    },
    function (error, data, response){
        if (error){
            console.log(data)
        }
        else{
            console.log("Feat Publicado!")
        }
    })
    
    stream.on('tweet', )
})

// Singles

// +++ Funções +++
function makeRefrao(artista1, artista2) {
    let titulo = `Feat entre ${artista1} e ${artista2}:\n\nRefrão:\n\n`
    let versosArtista1 = musicas.find(versos => versos.artista == artista1)
    let versosArtista2 = musicas.find(versos => versos.artista == artista2)
    let estrofeArtista1 = []
    let estrofeArtista2 = []

    for (let i=0; i < 2; i++){
        estrofeArtista1.push(random(versosArtista1.versos))
        estrofeArtista2.push(random(versosArtista2.versos))
    }

    let feat = titulo.concat(estrofeArtista1, estrofeArtista2)
    return feat.replace(/,/g , '')
}

function makeFeat(artista1, artista2){

    let titulo = `Feat entre ${artista1} e ${artista2}:\n\n`
    let versosArtista1 = musicas.find(versos => versos.artista == artista1)
    let versosArtista2 = musicas.find(versos => versos.artista == artista2)
    let estrofeArtista1 = []
    let estrofeArtista2 = []

    for (let i=0; i < 2; i++){
        estrofeArtista1.push(random(versosArtista1.versos))
        estrofeArtista2.push(random(versosArtista2.versos))
    }

    let feat = titulo.concat(estrofeArtista1, estrofeArtista2)
    return feat.replace(/,/g , '')
}

function makeSong(artista){
    
}

