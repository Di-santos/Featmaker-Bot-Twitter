// +++ Feat Bot +++
/*
    Bot API:    Bot.método('rotaAPI',{
                        parâmetros
                    },
                    Callback Function{})
*/

// Local para Formatação dos versos
// Retira aspas e arruma as quebras de linha
// Clica na 1 linha, Alt + Shift, clica na última -> aspas no início
// Alt + Shift + I -> coloca o cursor no final

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

let artistas = ["Froid", "Duzz", "Xamã", "Dfideliz", "Mano Brown", "MC Brinquedo", "Pabllo Vittar",
                "Chico Buarque", "Vitão", "Amado Batista", "É o Tchan", "Skank"]


// +++ Ações programadas do Bot +++ 

// Feats ( 8:00 // 12:00 // 15:00 // 18:00 // 20:00 // 23:00 )  FUSO: +03:00
scheduler.scheduleJob({hour: 11, minute: 00 }, ()=>{

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
    
                console.log("Primeira Imagem Upada")
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
                        console.log("Segunda Imagem Upada")
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
                                console.log("Feat Publicado!")
                            }
                        })
            }})
    
        }})
    
    })
})

scheduler.scheduleJob({hour: 15, minute: 00 }, ()=>{

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
    
                console.log("Primeira Imagem Upada")
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
                        console.log("Segunda Imagem Upada")
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
                                console.log("Feat Publicado!")
                            }
                        })
            }})
    
        }})
    
    })
})

scheduler.scheduleJob({hour: 18, minute: 00 }, ()=>{

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
    
                console.log("Primeira Imagem Upada")
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
                        console.log("Segunda Imagem Upada")
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
                                console.log("Feat Publicado!")
                            }
                        })
            }})
    
        }})
    
    })
})

scheduler.scheduleJob({hour: 21, minute: 00 }, ()=>{

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
    
                console.log("Primeira Imagem Upada")
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
                        console.log("Segunda Imagem Upada")
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
                                console.log("Feat Publicado!")
                            }
                        })
            }})
    
        }})
    
    })
})

scheduler.scheduleJob({hour: 23, minute: 00 }, ()=>{

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
    
                console.log("Primeira Imagem Upada")
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
                        console.log("Segunda Imagem Upada")
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
                                console.log("Feat Publicado!")
                            }
                        })
            }})
    
        }})
    
    })
})

scheduler.scheduleJob({hour: 02, minute: 00 }, ()=>{

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
    
                console.log("Primeira Imagem Upada")
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
                        console.log("Segunda Imagem Upada")
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
                                console.log("Feat Publicado!")
                            }
                        })
            }})
    
        }})
    
    })
})

// Singles

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

