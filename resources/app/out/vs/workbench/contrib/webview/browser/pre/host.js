/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
!function(){const e=document.location.search.match(/\bid=([\w-]+)/)[1],a=/platform=electron/.test(document.location.search),r=new class{constructor(){this.handlers=new Map,window.addEventListener("message",e=>{if(e.data&&("onmessage"===e.data.command||"do-update-state"===e.data.command))return void this.postMessage(e.data.command,e.data.data);const a=e.data.channel,r=this.handlers.get(a);r?r(e,e.data.args):console.log("no handler for ",e)})}postMessage(a,r){window.parent.postMessage({target:e,channel:a,data:r},"*")}onMessage(e,a){this.handlers.set(e,a)}};function s(e){console.error(`Webview fatal error: ${e}`),r.postMessage("fatal-error",{message:e})}const o=new Promise(async e=>{if(a)return e();if(!function(){try{return!!navigator.serviceWorker}catch(e){return!1}}())return s("Service Workers are not enabled in browser. Webviews will not work."),e();navigator.serviceWorker.register("service-worker.js").then(async a=>{await navigator.serviceWorker.ready;const r=s=>{
if("version"===s.data.channel)return navigator.serviceWorker.removeEventListener("message",r),1===s.data.version?e():a.update().then(()=>navigator.serviceWorker.ready).finally(e)};navigator.serviceWorker.addEventListener("message",r),a.active.postMessage({channel:"version"})},a=>{s(`Could not register service workers: ${a}.`),e()});const o=e=>{r.onMessage(e,a=>{navigator.serviceWorker.ready.then(r=>{r.active.postMessage({channel:e,data:a.data.args})})})};o("did-load-resource"),o("did-load-localhost"),navigator.serviceWorker.addEventListener("message",e=>{["load-resource","load-localhost"].includes(e.data.channel)&&r.postMessage(e.data.channel,e.data)})});const t={postMessage:r.postMessage.bind(r),onMessage:r.onMessage.bind(r),ready:o,fakeLoad:!a,rewriteCSP:a?e=>e.replace(/vscode-resource:(?=(\s|;|$))/g,"vscode-webview-resource:"):(e,a)=>{const r=new URL(a);return e.replace(/(vscode-webview-resource|vscode-resource):(?=(\s|;|$))/g,r.origin)}};window.createWebviewManager(t)}();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/8e872f41d4ba7807e58938bbf861ca6a22d534aa/core/vs/workbench/contrib/webview/browser/pre/host.js.map
