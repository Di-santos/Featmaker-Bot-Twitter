// +++ Feat Bot +++

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

// +++ Imports +++
const musicas = require('./musicas.json')
const random = require('random-item');
const scheduler = require('node-schedule')

let stream = Bot.stream('user')
let artista1 = "Dfideliz"
let artista2 = "Xamã"

// +++ Ações do Bot +++
//Bot.{método}('{evento}', mensagem, callback)
Bot.post('statuses/update', {
    status: makeFeat(artista1, artista2)
},
function (error, data, response){
    if (error){
        console.log(data)
    }
    else{
        console.log("Tweet Publicado!)
    }
})

// +++ Funções +++

// Recebe os artistas e retorna um feat entre os mesmos
function makeFeat(artista1, artista2){

    let titulo = `Feat entre ${artista1} e ${artista2}:\n`
    let versosArtista1 = musicas.find(versos => versos.artista == artista1)
    let versosArtista2 = musicas.find(versos => versos.artista == artista2)
    let estrofeArtista1 = []
    let estrofeArtista2 = []

    for (let i=0; i < 3; i++){
        estrofeArtista1.push(random(versosArtista1.versos))
        estrofeArtista2.push(random(versosArtista2.versos))
    }
    let feat = titulo.concat(estrofeArtista1, estrofeArtista2)
    return feat
}

// Recebe um artista e retorna uma música gerada aleatoriamente
function makeSong(artista){

}