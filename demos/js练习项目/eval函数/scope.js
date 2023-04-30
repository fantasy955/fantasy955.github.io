function fun() {
    var x = 3;
    eval('console.log(x)');
}

var x = 'window'
function windowRun() {
    window.eval('console.log(x)');
}

function newRun() {
    var x = 3;
    this.eval('console.log(x)');
    // this.eval is not a function
}

new newRun();