

class URLSearchParams {
    constructor(url) {
        this.url = url;
        this.map = new Map();
        let params = url.slice(url.indexOf('?') + 1);
        params = params.split('&');
        for (let param of params) {
            this.map.set(param.split('=')[0], param.split('=')[1]);
        }
        console.log(this.map);
    }
    get(key) {
        return this.map.get(key);
    }
}

let url = new URLSearchParams('https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx');