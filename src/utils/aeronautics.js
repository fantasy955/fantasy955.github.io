window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

export const initAeronautics = function (canvas, width, height) {
    const _w = width;
    const _h = height;
    var sc = 8;

    var noise = function (w, h) {
        var img = [];
        for (var i = 0; i < h; i++) {
            img[i] = [];
            for (var j = 0; j < w; j++) {
                img[i][j] = (Math.random() * 2) | 0;
            }
        }
        return img;
    }
    var go = function ($, img) {
        var w = img[0].length,
            h = img.length;
        var id = $.createImageData(w, h);
        for (var i = 0; i < h; i++) {
            for (var j = 0; j < w; j++) {
                var val = img[i][j] * 255;
                id.data[0 + j * 4 + i * id.width * 4] = val;
                id.data[1 + j * 4 + i * id.width * 4] = val;
                id.data[2 + j * 4 + i * id.width * 4] = val;
                id.data[3 + j * 4 + i * id.width * 4] = val;
            }
        }
        $.putImageData(id, 0, 0);
    }

    var c = document.getElementById(canvas);
    var c1 = c.cloneNode(true);
    var c2 = c.cloneNode(true);
    var $, $$, $$$;
    $ = c.getContext("2d");
    $$ = c1.getContext("2d");
    $$$ = c2.getContext("2d");
    $$.globalCompositeOperation = "lighter";

    var n = 0;
    var cloud = function () {
        $$$.clearRect(0, 0, _w, _h);
        $$$.drawImage(c1, 0, 0, _w, _h, 0, 0, _w, _h);

        $$.clearRect(0, 0, _w, _h);
        $$.globalAlpha = 0.8;
        $$.drawImage(c2, 0, 0, _w, _h, 0, 0, _w, _h);

        $$.globalAlpha = 0.2 / sc;
        var iw = 32,
            ih = 64;
        var w = iw,
            h = ih;
        for (var s = 0; s < sc; s++) {
            w = (w / 2);
            h = (h / 2);
            if (w < 1 || h < 1) break;
            var img = noise(w, h);
            go($$$, img);
            $$.drawImage(c2, 0, 0, w, h, 0, 0, _w, _h);
        }
        n++;
    }

    var ms = {
        x: 0,
        y: 0
    };

    window.addEventListener("load", function () {
        (function draw() {
            $$$.clearRect(0, 0, _w, _h);
            $$$.drawImage(c, 0, 0, _w, _h, 0, 0, _w, _h);
            $.clearRect(0, 0, _w, _h);
            $.globalAlpha = 0.9;
            $.drawImage(c2, 0, 0, _w, _h, -10 + ms.x, -10 + ms.y, _w + 20, _h + 20);
            cloud();
            $.globalCompositeOperation = "lighter";
            if (n === 1)
                $.globalAlpha = 1;
            else {
                $.globalAlpha = 0.3;
            }
            $.drawImage(c1, 0, 0, _w, _h, 0, 0, _w, _h);
            $.globalCompositeOperation = "source-over";

            window.requestAnimFrame(draw);
        })();
    }, true);
}
