Function.prototype.myCall = function (context) {
    context = context || window;
    context.fn = this;
    console.log(this);
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    var result = context.fn(...args);
    delete context.fn;
    return result;
}

var person1 = { firstName: 'John', lastName: 'Doe' };
var person2 = { firstName: 'Jane', lastName: 'Doe' };

function greet(greeting) {
    console.log(greeting + ', ' + this.firstName + ' ' + this.lastName);
}

greet.myCall(person1, 'Hello'); // 输出 "Hello, John Doe"
greet.myCall(person2, 'Hi'); // 输出 "Hi, Jane Doe"