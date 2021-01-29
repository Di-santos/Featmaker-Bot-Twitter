/*
    Bot API:    Bot.método('rotaAPI',{
                        parâmetros
                    },
                    Callback Function{})
*/

/*  Local para Formatação dos versos
    Retira aspas e arruma as quebras de linha
    Clica na 1 linha, Alt + Shift, clica na última -> aspas no início
    Alt + Shift + I -> coloca o cursor no final 
*/

//--------------------------------------------------------- FEATMAKER BOT -------------------------------------------------------------//

// +++ Login +++
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
const fs = require( 'fs' );
const random = require('random-item');
const path = require( 'path' );

let artistas = ["Froid", "Duzz", "Xamã", "Dfideliz", "Mano Brown", "MC Brinquedo", "Pabllo Vittar",
"Chico Buarque", "Vitão", "Amado Batista", "É o Tchan", "Skank", "Ferrugem", "Caetano Veloso",
"Péricles", "Kamaitachi", "Raffa Moreira"] 

// Horários e Configurações
let horariosFeat = new scheduler.RecurrenceRule();
horariosFeat.hour = [11, 18, 22, 02];
horariosFeat.minute = 0;

let horariosSingle = new scheduler.RecurrenceRule();
horariosSingle.hour = [15, 20, 00];
horariosSingle.minute = 0;

var stream = Bot.stream('statuses/filter', { track: '#FeatmakerBot'})

// Agendamento de posts e respostas
scheduler.scheduleJob(horariosFeat, ()=>{

    console.log('\nFeat Iniciado!')
    let artista1 = ""
    let artista2 = ""
    let ids = []

    // Seleção dos Artistas
    artista1 = random(artistas)
    artista2 = random(artistas)

    while (artista1 == artista2){
        artista2 = random(artistas)
    }
    
    // Upload das fotos dos artistas
    fs.readdir( __dirname + '/images', function( err, files ){
        let cantor1 = musicas.find(versos => versos.artista == artista1)
        const imagePath1 = path.join( __dirname, '/images/' + `${cantor1.foto}`)
        let b64content1 = fs.readFileSync( imagePath1, { encoding: 'base64' } );
    
        
        Bot.post( 'media/upload', {
            media_data: b64content1
        },
        ( err, data, response ) => {
            
            if ( err ){
                console.log( 'error:', err );
            }
            
            else{
    
                console.log("Primeira Imagem Upada!")
                ids.push(data.media_id_string);
    
                let cantor2 = musicas.find(versos => versos.artista == artista2)
                const imagePath2 = path.join( __dirname, '/images/' + `${cantor2.foto}`)
                let b64content2 = fs.readFileSync( imagePath2, { encoding: 'base64' } );
    
                Bot.post( 'media/upload', {
                    media_data: b64content2
                },
                ( err, data, response ) => {
                    
                    if ( err ){
                        console.log( 'error:', err );
                    }
    
                    else {
                        console.log("Segunda Imagem Upada!")
                        ids.push(data.media_id_string);
    
                        Bot.post('statuses/update', {
                            status: makeFeat(artista1, artista2),
                            media_ids: new Array( ids )
                        },
                        (error, data, response) => {
            
                            if (error){
                                console.log(data)
                            }
                            else{
                                console.log("Feat Publicado!\n\n")
                            }
                        })
            }})
    
        }})
    
    })
})

scheduler.scheduleJob(horariosSingle, ()=>{

    console.log('\nSingle Iniciado!')
    let artista1 = ""
    let ids = []

    // Seleção dos Artistas
    artista1 = random(artistas)
    
    // Upload das fotos dos artistas
    fs.readdir( __dirname + '/images', function( err, files ){
        let cantor1 = musicas.find(versos => versos.artista == artista1)
        const imagePath1 = path.join( __dirname, '/images/' + `${cantor1.foto}`)
        let b64content1 = fs.readFileSync( imagePath1, { encoding: 'base64' } );
    
        
        Bot.post( 'media/upload', {
            media_data: b64content1
        },
        ( err, data, response ) => {
            
            if ( err ){
                console.log( 'error:', err );
            }
            
            else{
                console.log("Imagem upada!")
                ids.push(data.media_id_string);

                Bot.post('statuses/update', {
                    status: makeSingle(artista1),
                    media_ids: new Array( ids )
                },
                (error, data, response) => {
    
                    if (error){
                        console.log(data)
                    }
                    else{
                        console.log("Single Publicado!\n\n")
                    }
                })
            }})
    
        })
    
})

stream.on('tweet', (tweet) => {

    // Extração do Conteúdo
    console.log('\nTweet Encontrado!')

    let id = tweet.id_str
    let username = tweet.user.screen_name + '\n'
    console.log('@' + username)
    let msg = tweet.text.split(' / ')

    let artistaPedido1 = msg[1]
    let artistaPedido2 = msg[2]

    if (artistas.includes(artistaPedido1) && artistas.includes(artistaPedido2)) {


    let artista1 = ""
    let artista2 = ""
    let ids = []

    // atribuição dos artistas
    artista1 = artistaPedido1
    artista2 = artistaPedido2

    // Upload das fotos dos artistas
    fs.readdir( __dirname + '/images', ( err, files ) => {
        let cantor1 = musicas.find(versos => versos.artista == artista1)
        const imagePath1 = path.join( __dirname, '/images/' + `${cantor1.foto}`)
        let b64content1 = fs.readFileSync( imagePath1, { encoding: 'base64' } );

        Bot.post( 'media/upload', {
            media_data: b64content1
        },
        ( err, data, response ) => {
            
            if ( err ){
                console.log( 'error:', err );
            }
            
            else{

                console.log("Primeira imagem upada!")
                ids.push(data.media_id_string);

                let cantor2 = musicas.find(versos => versos.artista == artista2)
                const imagePath2 = path.join( __dirname, '/images/' + `${cantor2.foto}`)
                let b64content2 = fs.readFileSync( imagePath2, { encoding: 'base64' } );

                Bot.post( 'media/upload', {
                    media_data: b64content2
                },
                ( err, data, response ) => {
                    
                    if ( err ){
                        console.log( 'error:', err );
                    }

                    else {
                        console.log("Segunda imagem upada!")
                        ids.push(data.media_id_string);

                        // Postagem do feat
                        Bot.post('statuses/update', {
                            status: '@' + username + makeFeat(artista1, artista2),
                            media_ids: new Array( ids ),
                            in_reply_to_status_id: id
                        },
                        (error, data, response) => {
            
                            if (error){
                                console.log(data)
                            }
                            else{
                                console.log("Feat gerado e respondido!\n\n")
                            }
                        })
            }})

        }})

    })
    }

    else {
        Bot.post('statuses/update', {
            status: '@' + username + ' Ops, houve um erro de digitação ou estes artistas não estão cadastrados (acesse a lista de instruções na bio!)',
            in_reply_to_status_id: id
        },
        (error, data, response) => {

            if (error){
                console.log(data)
            }
            else{
                console.log("Erro de digitação, post respondido!\n\n")
            }
        })
    }
  
})

// +++ Funções +++
function makeFeat(artista1, artista2){

    let titulo = `Feat entre ${artista1} e ${artista2}:\n\n`
    let versosArtista1 = musicas.find(versos => versos.artista == artista1)
    let versosArtista2 = musicas.find(versos => versos.artista == artista2)
    let estrofe = []

    for (let i=0; i < 2; i++){
        estrofe.push(random(versosArtista1.versos))
        estrofe.push(random(versosArtista2.versos))
    }

    let feat = titulo.concat(estrofe)
    return feat.replace(/,/g , '')
}

function makeSingle(artista){

    let titulo = `Single novo: ${artista}\n\n`
    let versosArtista = musicas.find(versos => versos.artista == artista)
    let estrofe = []

    for (let i=0; i < 4; i++){
        estrofe.push(random(versosArtista.versos))
    }

    let feat = titulo.concat(estrofe) 
    return feat.replace(/,/g , '')
}