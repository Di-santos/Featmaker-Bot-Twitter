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


// +++ Horários e Configurações do bot +++
let horariosFeat = new scheduler.RecurrenceRule();
horariosFeat.hour = [11, 18];
horariosFeat.minute = 0;

let horariosSingle = new scheduler.RecurrenceRule();
horariosSingle.hour = [15, 00];
horariosSingle.minute = 0;

var stream = Bot.stream('statuses/filter', { track: '#FeatmakerBot'})

let artistas = ["Froid", "Duzz", "Xamã", "Dfideliz", "Mano Brown", "MC Brinquedo", "Pabllo Vittar",
"Chico Buarque", "Vitão", "Amado Batista", "É o Tchan", "Skank", "Ferrugem", "Caetano Veloso",
"Péricles", "Kamaitachi", "Raffa Moreira", "Projota", "Anitta", "Charlie Brown Jr"] 


// +++ Agendamento de posts e respostas +++
scheduler.scheduleJob(horariosFeat, ()=>{

    // Seleção dos artistas
    console.log('\nFeat Iniciado!')
    let artista1 = ""
    let artista2 = ""
    let ids_imagens = []

    artista1 = random(artistas)
    artista2 = random(artistas)

    while (artista1 == artista2){
        artista2 = random(artistas)
    }
    
    // Postagem do tweet
    postaFeat(artista1, artista2, ids_imagens)
    
})

scheduler.scheduleJob(horariosSingle, ()=>{

    // Seleção do artista
    console.log('\nSingle Iniciado!')
    let artista1 = ""
    let ids_imagens = []

    artista1 = random(artistas)

    //Postagem do tweet
    postaSingle(artista1, ids_imagens)
    
})

stream.on('tweet', (tweet) => {

    // Extração do Conteúdo
    console.log('\nTweet Encontrado!')

    let id_tweet = tweet.id_str
    let username = tweet.user.screen_name + '\n'
    console.log('@' + username)
    let msg = tweet.text.split(' / ')

    let artistaPedido1 = msg[1]
    let artistaPedido2 = msg[2]

    if (artistas.includes(artistaPedido1) && artistas.includes(artistaPedido2)) {

        // Atribuição dos artistas
        let artista1 = artistaPedido1
        let artista2 = artistaPedido2
        let ids_imagens = []
    
        // Posta o tweet
        postaFeat(artista1, artista2, ids_imagens, id_tweet, username)
    }

    else {
        Bot.post('statuses/update', {
            status: '@' + username + ' Ops, houve um erro de digitação ou estes artistas não estão cadastrados (acesse a lista de instruções na bio!)',
            in_reply_to_status_id: id_tweet
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

function postaSingle(artista1, ids_imagens){
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
                ids_imagens.push(data.media_id_string);

                Bot.post('statuses/update', {
                    status: makeSingle(artista1),
                    media_ids: new Array( ids_imagens )
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
}

function postaFeat(artista1, artista2, ids_imagens, id_tweet = "sem", username = "sem"){
    
    console.log(arguments.length)
    console.log(id_tweet)
    console.log(username)


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
                ids_imagens.push(data.media_id_string);
    
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
                        ids_imagens.push(data.media_id_string);
                        
                        if (id_tweet != "sem" && username != "sem"){
                            console.log(username)
                            console.log(id_tweet)
                            Bot.post('statuses/update', {
                                status: "@" + username + makeFeat(artista1, artista2),
                                in_reply_to_status_id: id_tweet,
                                media_ids: new Array( ids_imagens )
                            },
                            (error, data, response) => {
                
                                if (error){
                                    console.log(data)
                                }
                                else{
                                    console.log("Feat publicado e respondido!\n\n")
                                }
                            })

                        }
                        else{
                            Bot.post('statuses/update', {
                                status: makeFeat(artista1, artista2),
                                media_ids: new Array( ids_imagens )
                            },
                            (error, data, response) => {
                
                                if (error){
                                    console.log(data)
                                }
                                else{
                                    console.log("Feat publicado!\n\n")
                                }
                            })

                        }
            }})
    
        }})
    
    })
}