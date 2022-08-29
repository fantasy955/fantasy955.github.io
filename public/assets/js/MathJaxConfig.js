(function(res){
    console.log('config mathjax');
    console.log(res);
    // ƒ (){
    //     return 1;
    // }
    let el = document.getElementById('article-body');
    MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']]
        }
    });
    // 指定生效的element
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, el]);
})(function(){
    return 1;
});