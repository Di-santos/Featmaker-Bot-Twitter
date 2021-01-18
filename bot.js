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
const musicas = require('./musicas.json');
const scheduler = require('node-schedule');
const random = require('random-item');
const fs = require( 'fs' );
const path = require( 'path' );

let artistas = ["Froid", "Duzz", "Xamã", "Dfideliz", "Mano Brown", "MC Brinquedo", "Pabllo Vittar", "Chico Buarque"]
let artista1 = ""
let artista2 = ""

// +++ Ações programadas do Bot +++ 

// Feats
scheduler.scheduleJob({hour: 00, minute: 00 }, ()=>{

    // Seleção dos Artistas
    artista1 = random(artistas)
    artista2 = random(artistas)

    while (artista1 == artista2){
        artista2 = random(artistas)
    }
    
    // Upload das fotos dos artistas

    // Postagem do Feat
    Bot.post('statuses/update', {
        // Gerador de Feat
        status: makeFeat(artista1, artista2)
    },
    (error, data, response)=>{
        if (error){
            console.log(data)
        }
        else{
            console.log("Feat Publicado!")
        }
    })
    
})

// Singles

// +++ Funções +++

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

//////////////////////////////////////////             TESTE          ////////////////////////////////////////////////

artista1 = 'Froid'
artista2 = 'Duzz'

fs.readdir( __dirname + '/images', function( err, files ){
    let cantor1 = musicas.find(versos => versos.artista == artista1)
    const imagePath1 = path.join( __dirname, '/images/' + `${cantor1.foto}`)
    let b64content1 = fs.readFileSync( imagePath1, { encoding: 'base64' } );

    let cantor2 = musicas.find(versos => versos.artista == artista2)
    const imagePath2 = path.join( __dirname, '/images/' + `${cantor2.foto}`)
    let b64content2 = fs.readFileSync( imagePath2, { encoding: 'base64' } );

    Bot.post( 'media/upload', {
         media_data: b64content1,
         media_data: b64content2 
        },
        ( err, data, response ) => {

            if ( err ){
                console.log( 'error:', err );
            }

            else{
                console.log("Imagem Upada")

                Bot.post('statuses/update', {
                    status: makeFeat(artista1, artista2),
                    media_ids: new Array( data.media_id_string )
                },
                (error, data, response) => {

                    if (error){
                        console.log(data)
                    }
                    else{
                        console.log("Feat Publicado!")
                    }
                })

        }
    })

})