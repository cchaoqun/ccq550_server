const config = require('./config.json')
const mysql = require('mysql');
const async = require('async');
const { query } = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//# IMDB: id, cover(url), title, year, original_title, duration, language, description, avg_vote
//# BoxOffice: movie_id, world
//# Bechdel: movie_id, rating
//# Oscar: movie_id, winner
//# Actors: movie_id, name            SIMPLE ROUTE EXAMPLE
// ********************************************
// Route  (query movie_info)



function getData(sql,isOne=false){
    return  new Promise((reslove,reject)=>{
        connection.query(sql,function (error, results, fields) {
            if(error){
                reject(error)
            }else{
                reslove(results)
            }
        })
    })
}

function format(data,isOne) {
    if(isOne){
        return {code:1,success:true,data:data[0] || {}}
    }else{
        return {code:1,success:true,data:data}
    }
}


function movie_list(req, res) {
    var sql = `select id, url, title, year, avg_vote as vote from IMDB where url != '' order by year desc limit 100`
    connection.query(sql,function (error, results, fields) {
        console.log(11111,results)
        res.send({results:results})
    })
}

async function actor_list(req, res) {
    let id = req.query.id
    var sql = `select url as actor_url, name as actor_name from Actors where movie_id =  '${id}' and url != ''  limit 2 ` 
    const a = await getData(sql)
    res.send(format(a))
}

async function movie_info(req, res) {
    let id = req.query.id
    var sql = `select url as movie_url, title as movie_title, year, original_title, duration, language, description, avg_vote as vote from IMDB where id = '${id}' `
    const a = await getData(sql)
    res.send(format(a,true))
}

async function rating(req, res) {
    let id = req.query.id
    var sql = `select rating as score from Bechdel where movie_id =  '${id}' `
    const a = await getData(sql)
    res.send(format(a,true))

}
async function winner(req, res) {
    let id = req.query.id
    var sql = `select winner from Oscar where movie_id =  '${id}' `
    const a = await getData(sql)
    res.send(format(a,true))

}

async function box_office(req, res) {
    let id = req.query.id
    var sql = `select world as boxOffice from BoxOffice where movie_id =  '${id}' `
    const a = await getData(sql)
    res.send(format(a,true))

}

async function director(req, res) {
    let id = req.query.id
    var sql = `select url as director_url, director as director_name from Director where movie_id =  '${id}' `
    const a = await getData(sql)
    res.send(format(a,true))

}


module.exports = {
    movie_info,
    actor_list,
    rating,
    winner,
    movie_list,
    box_office,
    director,
}