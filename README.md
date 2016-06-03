# automatic-version

自动给指定文件中的js css 添加版本号【例如：1.0.1.047ac20f】【主版本.次版本.修订.文件hash值前8位】

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install git@github.com:shunzizhan/automatic-version.git --save
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('automatic-version-increment');
```

## The "automatic" task

### Overview
In your project's Gruntfile, add a section named `automatic` to the data object passed into `grunt.initConfig()`.

```js
    grunt.initConfig({
        clean: {
            tests: ['tmp'],
        },
        automatic: {
            js: {
                options: {basicSrc: ["tmp/js/"]},
                assetUrl: ['*.js'],
                version:"1.0.3",
                files: {
                    'tmp': ['tmp/index.html'],
                },
            },
            css: {
                options: {basicSrc: ["tmp/css/"]},
                assetUrl: ['*.css'],
                version:"1.0.3",
                files: {
                    'tmp': ['tmp/index.html'],
                },
            },
        },
        copy: {
          dist: {
            files: [{
              expand: true,
              dot: true,
              cwd: 'demo',
              src: [
                '**/*',
                '!less/**'
              ],
              dest: 'tmp'
            }]
          }
        },
        nodeunit: {
            tests: ['test/*_test.js'],
        },
        rev: {
          international_options: {
            options: {
              encoding: 'utf8'
            },
            src: ['tmp/**/*.js','tmp/**/*.css']
          },
        },
    });
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-rev-master');
    
    grunt.registerTask('default', ['clean', 'copy','automatic']);
```



### Usage Examples

#### Default Options
In this example, we have index.html 
```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>test</title>
    <link rel="stylesheet" href="css/hello.css" />
    <link rel="stylesheet" href="css/hello1.css" />
    <link rel="stylesheet" href="https://assets-cdn.github.com/assets/frameworks-3514e6d8825ab9f55728f0030acba498e5da5b85ebc8abc35f0f466ac9d2bdda.css"/>
    <script type="text/javascript" src="js/hello.js"></script>
    <script type="text/javascript" src="js/hello1.js"></script>
    <script src="https://assets-cdn.github.com/assets/frameworks-ea5bbb2a837377ffde53e1099e5909c8df4d36cc5e90c05aeb3694b157df7e4d.js"></script>
</head>
<body>
    
</body>
</html>
```
In Gruntfile.js, write as below, then `grunt`, we can get the index.html 

```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>test</title>
    <link rel="stylesheet" href="css/hello.css?v=1.0.3.99819624" />
    <link rel="stylesheet" href="css/hello1.css?v=1.0.3.96811b45" />
    <link rel="stylesheet" href="https://assets-cdn.github.com/assets/frameworks-3514e6d8825ab9f55728f0030acba498e5da5b85ebc8abc35f0f466ac9d2bdda.css"/>
    <script type="text/javascript" src="js/hello.js?v=1.0.3.cefe2283"></script>
    <script type="text/javascript" src="js/hello1.js?v=1.0.3.cefe2283"></script>
    <script src="https://assets-cdn.github.com/assets/frameworks-ea5bbb2a837377ffde53e1099e5909c8df4d36cc5e90c05aeb3694b157df7e4d.js"></script>
</head>
<body>
</body>
</html>
```


## 说明
本插件是基于  [automatic-version-increment](https://github.com/noahxinhao/automatic-version-increment) 二次开发

