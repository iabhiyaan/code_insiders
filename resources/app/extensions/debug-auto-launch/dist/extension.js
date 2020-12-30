!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=require("path")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const o=n(2),a=n(3),r=n(5),s=a.loadMessageBundle(n(0).join(__dirname,"extension.ts")),i=s(0,null),c=s(1,null);let u,l=Promise.resolve({state:0,transitionData:null});function d(){const e=o.workspace.getConfiguration("debug.node");if(e){let t=e.get("autoAttach");t="on"===t?"off":"on";const n=e.inspect("autoAttach");let a=o.ConfigurationTarget.Global;n&&(n.workspaceFolderValue?a=o.ConfigurationTarget.WorkspaceFolder:n.workspaceValue?a=o.ConfigurationTarget.Workspace:n.globalValue?a=o.ConfigurationTarget.Global:n.defaultValue&&o.workspace.workspaceFolders&&(a=o.ConfigurationTarget.Workspace)),e.update("autoAttach",t,a)}}function f(){return o.workspace.getConfiguration("debug.javascript").get("usePreviewAutoAttach",!1)}function g(e){return u?u.show():(u=o.window.createStatusBarItem(o.StatusBarAlignment.Left),u.command="extension.node-debug.toggleAutoAttach",u.tooltip=s(2,null),u.show(),e.subscriptions.push(u)),u}async function p(e){await e.workspaceState.update("jsDebugIpcState",void 0),await o.commands.executeCommand("extension.js-debug.clearAutoAttachVariables")}t.activate=function(e){e.subscriptions.push(o.commands.registerCommand("extension.node-debug.toggleAutoAttach",d));const t=["debug.node.autoAttach","debug.javascript.usePreviewAutoAttach"];e.subscriptions.push(o.workspace.onDidChangeConfiguration(n=>{t.some(e=>n.affectsConfiguration(e))&&m(e)})),m(e)},t.deactivate=async function(){var e,t;const{state:n,transitionData:o}=await l;await(null===(t=(e=v[n]).exit)||void 0===t?void 0:t.call(e,o))};const v={0:{async enter(e){null==u||u.hide(),await p(e)}},1:{enter(e){g(e).text=c}},3:{async enter(e){const t=g(e),n=process.env.VSCODE_PID,a=n?parseInt(n):0;await o.commands.executeCommand("extension.node-debug.startAutoAttach",a),t.text=i},async exit(){await o.commands.executeCommand("extension.node-debug.stopAutoAttach")}},2:{async enter(e){const t=await async function(e){var t,n;const a=e.workspaceState.get("jsDebugIpcState"),r=(null===(t=o.extensions.getExtension("ms-vscode.js-debug-nightly"))||void 0===t?void 0:t.extensionPath)||(null===(n=o.extensions.getExtension("ms-vscode.js-debug"))||void 0===n?void 0:n.extensionPath);if(a&&a.jsDebugPath===r)return a.ipcAddress;const s=await o.commands.executeCommand("extension.js-debug.setAutoAttachVariables");if(!s)return;const i=s.ipcAddress;return await e.workspaceState.update("jsDebugIpcState",{ipcAddress:i,jsDebugPath:r}),i}(e);if(!t)return{context:e};const n=await new Promise((e,n)=>{const a=r.createServer(e=>{let t=[];e.on("data",e=>t.push(e)),e.on("end",async()=>{try{await o.commands.executeCommand("extension.js-debug.autoAttachToProcess",JSON.parse(Buffer.concat(t).toString()))}catch(e){console.error(e)}})}).on("error",n).listen(t,()=>e(a))}).catch(console.error);return g(e).text=i,{server:n,context:e}},async exit({server:e,context:t}){e&&await new Promise(t=>e.close(t)),f()||await p(t)}}};function m(e){const t=function(){switch(o.workspace.getConfiguration("debug.node").get("autoAttach")){case"off":return 1;case"on":return f()?2:3;case"disabled":default:return 0}}();l=l.then(async({state:n,transitionData:o})=>{var a,r,s,i;if(t===n)return{state:n,transitionData:o};await(null===(r=(a=v[n]).exit)||void 0===r?void 0:r.call(a,o));const c=await(null===(i=(s=v[t]).enter)||void 0===i?void 0:i.call(s,e));return{state:t,transitionData:c}})}},function(e,t){e.exports=require("vscode")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,a,r,s,i,c=n(0),u=n(4),l=Object.prototype.toString;function d(e){return void 0!==e}function f(e){return"[object Number]"===l.call(e)}function g(e){return"[object String]"===l.call(e)}function p(e){return JSON.parse(u.readFileSync(e,"utf8"))}function v(e,t){return i&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===t.length?e:e.replace(/\{(\d+)\}/g,(function(e,n){var o=n[0],a=t[o],r=e;return"string"==typeof a?r=a:"number"!=typeof a&&"boolean"!=typeof a&&null!=a||(r=String(a)),r}))}function m(e){return function(t,n){for(var o=[],a=2;a<arguments.length;a++)o[a-2]=arguments[a];return f(t)?t>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: "+new Error("").stack):v(e[t],o):g(n)?(console.warn("Message "+n+" didn't get externalized correctly."),v(n,o)):void console.error("Broken localize call found. Stacktrace is\n: "+new Error("").stack)}}function b(e,t){for(var n=[],o=2;o<arguments.length;o++)n[o-2]=arguments[o];return v(t,n)}function h(e,t){return r[e]=t,t}function y(e,t){var n,o,a,r=c.join(s.cacheRoot,e.id+"-"+e.hash+".json"),i=!1,l=!1;try{return n=JSON.parse(u.readFileSync(r,{encoding:"utf8",flag:"r"})),o=r,a=new Date,u.utimes(o,a,a,(function(){})),n}catch(e){if("ENOENT"===e.code)l=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: "+e.message+"."),u.unlink(r,(function(e){e&&console.error("Deleting corrupted bundle "+r+" failed.")})),i=!0}}if(!(n=function(e,t){var n=s.translationsConfig[e.id];if(n){var o=p(n).contents,a=p(c.join(t,"nls.metadata.json")),r=Object.create(null);for(var i in a){var u=a[i],l=o[e.outDir+"/"+i];if(l){for(var d=[],f=0;f<u.keys.length;f++){var v=u.keys[f],m=l[g(v)?v:v.key];void 0===m&&(m=u.messages[f]),d.push(m)}r[i]=d}else r[i]=u.messages}return r}}(e,t))||i)return n;if(l)try{u.writeFileSync(r,JSON.stringify(n),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return n;throw e}return n}function x(e){try{return function(e){var t=p(c.join(e,"nls.metadata.json")),n=Object.create(null);for(var o in t){var a=t[o];n[o]=a.messages}return n}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function S(e,t){var n;if(!0===s.languagePackSupport&&void 0!==s.cacheRoot&&void 0!==s.languagePackId&&void 0!==s.translationsConfigFile&&void 0!==s.translationsConfig)try{n=y(e,t)}catch(e){console.log("Load or create bundle failed ",e)}if(!n){if(s.languagePackSupport)return x(t);var o=function(e){for(var t=s.locale;t;){var n=c.join(e,"nls.bundle."+t+".json");if(u.existsSync(n))return n;var o=t.lastIndexOf("-");t=o>0?t.substring(0,o):void 0}if(void 0===t){n=c.join(e,"nls.bundle.json");if(u.existsSync(n))return n}}(t);if(o)try{return p(o)}catch(e){console.log("Loading in the box message bundle failed.",e)}n=x(t)}return n}function w(e){if(!e)return b;var t=c.extname(e);if(t&&(e=e.substr(0,e.length-t.length)),s.messageFormat===o.both||s.messageFormat===o.bundle){var n=function(e){for(var t,n=c.dirname(e);t=c.join(n,"nls.metadata.header.json"),!u.existsSync(t);){var o=c.dirname(n);if(o===n){t=void 0;break}n=o}return t}(e);if(n){var a=c.dirname(n),l=r[a];if(void 0===l)try{var f=JSON.parse(u.readFileSync(n,"utf8"));try{var g=S(f,a);l=h(a,g?{header:f,nlsBundle:g}:null)}catch(e){console.error("Failed to load nls bundle",e),l=h(a,null)}}catch(e){console.error("Failed to read header file",e),l=h(a,null)}if(l){var v=e.substr(a.length+1).replace(/\\/g,"/"),y=l.nlsBundle[v];return void 0===y?(console.error("Messages for file "+e+" not found. See console for details."),function(){return"Messages not found."}):m(y)}}}if(s.messageFormat===o.both||s.messageFormat===o.file)try{var x=p(function(e){var t;if(s.cacheLanguageResolution&&t)t=t;else{if(i||!s.locale)t=".nls.json";else for(var n=s.locale;n;){var o=".nls."+n+".json";if(u.existsSync(e+o)){t=o;break}var a=n.lastIndexOf("-");a>0?n=n.substring(0,a):(t=".nls.json",n=null)}s.cacheLanguageResolution&&(t=t)}return e+t}(e));return Array.isArray(x)?m(x):d(x.messages)&&d(x.keys)?m(x.messages):(console.error("String bundle '"+e+"' uses an unsupported format."),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file "+e),function(){return"Failed to load message bundle. See console for details."}}!function(e){e.file="file",e.bundle="bundle",e.both="both"}(o=t.MessageFormat||(t.MessageFormat={})),function(e){e.is=function(e){var t=e;return t&&d(t.key)&&d(t.comment)}}(a||(a={})),function(){if(s={locale:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:o.bundle},g(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG);if(g(e.locale)&&(s.locale=e.locale.toLowerCase()),(!0===(t=e._languagePackSupport)||!1===t)&&(s.languagePackSupport=e._languagePackSupport),g(e._cacheRoot)&&(s.cacheRoot=e._cacheRoot),g(e._languagePackId)&&(s.languagePackId=e._languagePackId),g(e._translationsConfigFile)){s.translationsConfigFile=e._translationsConfigFile;try{s.translationsConfig=p(s.translationsConfigFile)}catch(t){e._corruptedFile&&u.writeFile(e._corruptedFile,"corrupted","utf8",(function(e){console.error(e)}))}}}catch(e){}var t;i="pseudo"===s.locale,void 0,r=Object.create(null)}(),t.loadMessageBundle=w,t.config=function(e){return e&&(g(e.locale)&&(s.locale=e.locale.toLowerCase(),void 0,r=Object.create(null)),void 0!==e.messageFormat&&(s.messageFormat=e.messageFormat)),i="pseudo"===s.locale,w}},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("net")}]));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/8e872f41d4ba7807e58938bbf861ca6a22d534aa/extensions/debug-auto-launch/dist/extension.js.map