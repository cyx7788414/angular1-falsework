define(function() {
    return [
        {
            name: 'index.fore',
            url: 'fore',
            //basePath: 'main/views/fore',
            viewList: [
                {
                    name: 'main',
                    basePath: 'main/views/fore',
                },
                {
                    name: 'header@index.fore',
                    basePath: 'main/views/foreheader'
                },
                {
                    name: 'body@index.fore',
                    basePath: 'main/views/foreindex'
                }
            ]
        },
        {
            name: 'index.fore.child',
            url: '/:page',
            //basePath: 'main/views/fore',
            viewList: [
                {
                    name: 'body@index.fore',
                    basePath: 'main/views/',
                    variables: ['page']
                }
            ]
        }
    ];
});