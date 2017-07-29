define(function() {
    return [
        {
            name: 'index.fore',
            url: 'fore',
            //basePath: 'main/views/fore',
            viewList: [
                {
                    name: 'main@index',
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
        },
        {
            name: 'index.major',
            url: 'major',
            viewList: [
                {
                    name: 'main@index',
                    basePath: 'main/views/major',
                },
                {
                    name: 'header@index.major',
                    basePath: 'main/views/majorheader',
                },
                {
                    name: 'body@index.major',
                    basePath: 'main/views/majorbody',
                },
                {
                    name: 'content@index.major',
                    basePath: 'main/views/dashboard'
                }
                // {
                //     name: 'sidebar@index.major',
                //     basePath: 'main/views/sidebar'
                // },
                // {
                //     name: 'content@index.major',
                //     basePath: 'main/views/dashboard'
                // }
            ]
        },
        {
            name: 'index.major.child',
            url: '/:page',
            viewList: [
                {
                    name: 'content@index.major',
                    basePath: 'main/views/',
                    variables: ['page']
                }
            ]
        },
    ];
});