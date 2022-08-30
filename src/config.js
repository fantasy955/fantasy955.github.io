const max_file_items = 5;
const user_name = 'Fantasy955';
const real_name = 'WeiJL';
const github = 'https://github.com/fantasy995';
const cityName = "长沙";
const smallScreenSize = 785;
const globalParams = {
    max_file_items,
    user_name,
    real_name,
    github,
    smallScreenSize,
    cityName,
}

export default {
    max_file_items,
    user_name,
    real_name,
    github,
    smallScreenSize,
    cityName,
    install: (app, options) => {
        app.config.globalProperties.$globalParams = globalParams;
    }
}