require.config({
    baseUrl: "/public/js",
    waitSeconds: 200,
    paths: {        
        'jquery': 'vendor/jquery/jquery.min',
        'jqueryui': 'vendor/jquery/jquery-ui.min',
        'semanticuijs': 'vendor/semantic-ui/build/packaged/javascript/semantic.min'
    },
    shim: {
        'semanticuijs': {
            deps: ['jquery'],
            exports: 'semanticuijs'
        }
    },
    //urlArgs: "bust=" + (new Date()).getTime()
    urlArgs: "bust=v9"
});