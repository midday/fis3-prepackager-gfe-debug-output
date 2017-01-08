# fis3-prepackager-gfe-debug-output
fis3-prepackager-gfe-debug-output


## INSTALL

```bash
npm install [-g] fis3-prepackager-gfe-debug-output
```

## USE

```js
fis.match('::package', {
    prepackager: fis.plugin('gfe-debug-output',{
    	debugDomain: '',默认值：//127.0.0.1
    	cssDomain: '//js.atguat.net.cn',//必须参数
    	jsDomain: '//css.atguat.com.cn'//必须参数
    })
});   


fis.match('**', {
    deploy: [
        fis.plugin('gfe-script-place'),//默认参数：insertBodyEndTagBefore=true
        fis.plugin('local-deliver') //must add a deliver, such as http-push, local-deliver
    ]
});
```