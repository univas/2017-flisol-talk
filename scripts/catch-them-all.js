    
function catchPokemon(pokemonNumber) {
    var http = require('http'), 
        fs = require('fs');
        
    var options = {
        host: 'assets.pokemon.com', 
        port: 80,
        path: '/assets/cms2/img/pokedex/full/' + pokemonNumber + '.png'
    };

    var request = http.get(options, function(res) {

        if(res.headers['content-type'] != 'image/png') {
            return null;
        }

        var chunks = [];
        res.on('data', function(chunk){
            chunks.push(chunk);
        });

        res.on('end', function(){
            var buffer = Buffer.concat(chunks);
            fs.writeFile('src/images/pokemons/' + pokemonNumber + '.png', buffer, function(err) {
                if (err) {
                    console.log("Missed Pokemon #" + pokemonNumber);
                    return;
                }
                console.log('Caught Pokemon #' + pokemonNumber);
            });
        });
    });
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

for(var index = 1; index < 252; index++) {
    var pokemonNumber = pad(index, 3); 
    catchPokemon(pokemonNumber);
}