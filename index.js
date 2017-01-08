'use strict';

/**
 * 输出一份用于debug的页面
 * @param  {Object} ret      一个包含处理后源码的结构
 * @param  {Object} conf     一般不需要关心，自动打包配置文件
 * @param  {Object} settings 插件配置属性
 * @param  {Object} opt      命令行参数
 */
module.exports = function(ret, conf, settings, opt) {
    var src = ret.src;
    //debug域名
    var debugDomain = settings.debugDomain ? settings.debugDomain : '//127.0.0.1:10000';
    //css域名
    var cssDomain = settings.cssDomain;
    //js域名
    var jsDomain = settings.jsDomain;
    //link标签和script标签正则表达式
    var linkAndScriptTagRegExp = /(<link[^>]*?href\s*=\s*('[^']*'|"[^"]*")[^>]*?\/?>)|(<script[^>]*?src=('[^']*'|"[^"]*")[^>]*?>\s*<\s*\/script\s*>)/gi;

    Object.keys(src).forEach(function(key) {
        var fileInfo = src[key];
        var fileExt = fileInfo.rExt;
        var fileContent = fileInfo._content;
        var isEntryFile = (~fileContent.indexOf('/html') || ~fileContent.indexOf('/HTML')) && (~fileContent.indexOf('/head') || ~fileContent.indexOf('/HEAD')) && (~fileContent.indexOf('/body') || ~fileContent.indexOf('/BODY'));

        if (/\.(html|ftl)/.test(fileExt) && isEntryFile) {
            var pkg = fis.file.wrap(fileInfo.realpathNoExt + '-debug' + fileExt);
            //替换js域名或css域名为debug域名
            fileContent = fileContent.replace(linkAndScriptTagRegExp, function(matchTag) {
                return matchTag.replace(cssDomain, debugDomain).replace(jsDomain, debugDomain);
            });

            pkg.setContent(fileContent);
            ret.pkg[pkg.subpath] = pkg;
        }
    });
};
