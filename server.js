var express = require('express');
var app = express();
var glob = require('glob');

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

app.listen(8080, () => {
    console.log('listening on 8080');
})
