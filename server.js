var express = require('express');
var app = express();
var fs = require('fs');
var glob = require('glob');
var os = require('os');

var movies = [];
var exts = ['mkv', 'mp4', 'ogg'];

for (var h = 0; h < exts.length; h++){
    glob('**/*.' + exts[h], (er, files) => {
        for (var i = 0; i < files.length; i++){
        movies.push(files[i]);
        }
    })

}

app.get('/', (req, res) => {
    res.render('index.ejs', {movies: movies});
});

app.get('/Movies/:movie', (req, res) => {
    if (movies[req.params.movie].substring(-3) == 'mkv'){
        res.set('Content-Type', 'video/mkv');
    }else{
        res.set('Content-Type', 'video/mp4');
    }
    var mov = fs.createReadStream(movies[req.params.movie]);
    mov.pipe(res);
})

app.listen(8080 , () => {
    console.log('visit on 8080');
})
