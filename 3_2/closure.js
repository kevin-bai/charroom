function anyncChange(cb) {
    setTimeout(cb,200)
}

var color = 'blue';

// anyncChange(function () {
//     console.log('color : '+ color)
// })

(function (color) {
    anyncChange(function () {
        console.log('color : '+ color)
    })
})(color)

color = 'green'
