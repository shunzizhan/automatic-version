/*
 * automatic-version-increment
 * https://github.com/noahxinhao/automatic-version-increment
 *
 * Copyright (c) 2014 lxh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    function getNewUrl(_name, version) {

        var newurl = '';
        if(!version){
          version = '1.0.0';
        }
        version += '.' + new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate();
        if(_name.indexOf('?v')>0){
          newurl = _name.split('v=')[0] + 'v=' + version;
        }else{
          newurl = _name.split('v=')[0] + '?v=' + version;
        }
        return newurl;
    }

    function doReplaceUrl(fileSrc, assetUrls, options, version) {

        if (grunt.file.exists(fileSrc)) {

            var basicSrc_list = options.basicSrc;

            var assetUrl_list = assetUrls;

            basicSrc_list.forEach(function (basic) {

                assetUrl_list.forEach(function (assetUrl) {

                    grunt.file.expandMapping(basic + assetUrl).forEach(function (f) {

                        var data = grunt.file.read(fileSrc);

                        assetUrl = f.src + "";

                        if (grunt.file.exists(assetUrl)) {

                            var assetData = grunt.file.read(assetUrl);

                            assetUrl = assetUrl.substring(assetUrl.lastIndexOf('/'), assetUrl.length);

                            if (data.indexOf(assetUrl) >= 0) {

                                var reg = new RegExp('".*' + assetUrl + '.*"', 'g');

                                var fullAssetUrl = reg.exec(data).toString();

                                var _name = null;

                                var _url = fullAssetUrl.substring(fullAssetUrl.indexOf(assetUrl), fullAssetUrl.length - 1);
                                
                                var newurl = getNewUrl(_url, version);

                                var newdata = data.replace(_url, newurl);
                                
                                if (grunt.file.write(fileSrc, newdata)) {
                                    grunt.log.success(fileSrc + ' add js or css version successfully');
                                }
                            } else {
                                //grunt.log.warn('asset not found in file ' + fileSrc);
                            }
                        } else {
                            //grunt.log.warn("file not found:" + assetUrl);
                        }
                    })
                })
            });
        }
    }

    function replaceMethod(){

    }

    grunt.registerMultiTask('automatic', 'The best Grunt plugin to add js or css version .', function () {
        var options = this.options({});

        var assetUrl = this.data.assetUrl;

        var version = this.data.version;

        this.files.forEach(function (f) {
            var src = f.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    grunt.log.success('Source file "' + filepath + '" found.');
                    doReplaceUrl(filepath, assetUrl, options, version);
                    return true;
                }
            });
        });
    });
};
