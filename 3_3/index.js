let flow = require('nimble')

flow.series([
    function (cb) {
        setTimeout(function () {
            console.log('first')
            cb()
        },1000)
    },
    function (cb) {
        setTimeout(function () {
            console.log('secend')
            cb()
        },500)
    },
    function (cb) {
        setTimeout(function () {
            console.log('third')
            cb()
        },500)
    }
])