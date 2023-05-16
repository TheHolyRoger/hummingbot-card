function t(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r}const e=window,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new o(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,_={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:p};let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{s?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((s=>{const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=v){var i;const n=this.constructor._$Ep(t,s);if(void 0!==n&&!0===s.reflect){const o=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:_).toAttribute(e,s.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:_;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var g;m.finalized=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:m}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.1");const f=window,b=f.trustedTypes,y=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,$="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,A="?"+w,x=`<${A}>`,S=document,E=()=>S.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,k="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,H=/>/g,U=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,R=/"/g,T=/^(?:script|style|textarea|title)$/i,M=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),q=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),I=new WeakMap,D=S.createTreeWalker(S,129,null,!1),L=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":"",r=P;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,d=0;for(;d<s.length&&(r.lastIndex=d,l=r.exec(s),null!==l);)d=r.lastIndex,r===P?"!--"===l[1]?r=j:void 0!==l[1]?r=H:void 0!==l[2]?(T.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=U):void 0!==l[3]&&(r=U):r===U?">"===l[0]?(r=null!=n?n:P,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?U:'"'===l[3]?R:N):r===R||r===N?r=U:r===j||r===H?r=P:(r=U,n=void 0);const h=r===U&&t[e+1].startsWith("/>")?" ":"";o+=r===P?s+x:c>=0?(i.push(a),s.slice(0,c)+$+s.slice(c)+w+h):s+w+(-2===c?(i.push(void 0),e):h)}const a=o+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(a):a,i]};class B{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=L(t,e);if(this.el=B.createElement(l,s),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=D.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith($)||e.startsWith(w)){const s=c[o++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+$).split(w),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?Q:"@"===e[1]?F:K})}else a.push({type:6,index:n})}for(const e of t)i.removeAttribute(e)}if(T.test(i.tagName)){const t=i.textContent.split(w),e=t.length-1;if(e>0){i.textContent=b?b.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],E()),D.nextNode(),a.push({type:2,index:++n});i.append(t[e],E())}}}else if(8===i.nodeType)if(i.data===A)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(w,t+1));)a.push({type:7,index:n}),t+=w.length-1}n++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function V(t,e,s=t,i){var n,o,r,a;if(e===q)return e;let l=void 0!==i?null===(n=s._$Co)||void 0===n?void 0:n[i]:s._$Cl;const c=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,s,i)),void 0!==i?(null!==(r=(a=s)._$Co)&&void 0!==r?r:a._$Co=[])[i]=l:s._$Cl=l),void 0!==l&&(e=V(t,l._$AS(t,e.values),l,i)),e}class W{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:s},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(s,!0);D.currentNode=n;let o=D.nextNode(),r=0,a=0,l=i[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new J(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new X(o,this,t)),this.u.push(e),l=i[++a]}r!==(null==l?void 0:l.index)&&(o=D.nextNode(),r++)}return n}p(t){let e=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class J{constructor(t,e,s,i){var n;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cm=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),C(t)?t===z||null==t||""===t?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==q&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}g(t){this._$AH!==z&&C(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=B.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.p(s);else{const t=new W(n,this),e=t.v(this.options);t.p(s),this.T(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new B(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new J(this.S(E()),this.S(E()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,s,i,n){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=V(this,t,e,0),o=!C(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=V(this,i[s+r],e,r),a===q&&(a=this._$AH[r]),o||(o=!C(a)||a!==this._$AH[r]),a===z?t=z:t!==z&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}o&&!i&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}}const G=b?b.emptyScript:"";class Q extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==z?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class F extends K{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=V(this,t,e,0))&&void 0!==s?s:z)===q)return;const i=this._$AH,n=t===z&&i!==z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==z&&(i===z||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const Y=f.litHtmlPolyfillSupport;null==Y||Y(B,J),(null!==(g=f.litHtmlVersions)&&void 0!==g?g:f.litHtmlVersions=[]).push("2.7.0");var tt,et;class st extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,n;const o=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new J(e.insertBefore(E(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return q}}st.finalized=!0,st._$litElement$=!0,null===(tt=globalThis.litElementHydrateSupport)||void 0===tt||tt.call(globalThis,{LitElement:st});const it=globalThis.litElementPolyfillSupport;null==it||it({LitElement:st}),(null!==(et=globalThis.litElementVersions)&&void 0!==et?et:globalThis.litElementVersions=[]).push("3.3.0");const nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(s){s.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function ot(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):nt(t,e)}var rt;null===(rt=window.HTMLSlotElement)||void 0===rt||rt.prototype.assignedElements;const at=1,lt=t=>(...e)=>({_$litDirective$:t,values:e});let ct=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const dt=lt(class extends ct{constructor(t){var e;if(super(t),t.type!==at||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var s,i;if(void 0===this.nt){this.nt=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(s=this.st)||void 0===s?void 0:s.has(t))&&this.nt.add(t);return this.render(e)}const n=t.element.classList;this.nt.forEach((t=>{t in e||(n.remove(t),this.nt.delete(t))}));for(const t in e){const s=!!e[t];s===this.nt.has(t)||(null===(i=this.st)||void 0===i?void 0:i.has(t))||(s?(n.add(t),this.nt.add(t)):(n.remove(t),this.nt.delete(t)))}return q}}),ht=lt(class extends ct{constructor(t){var e;if(super(t),t.type!==at||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,s)=>{const i=t[s];return null==i?e:e+`${s=s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`}),"")}update(t,[e]){const{style:s}=t.element;if(void 0===this.vt){this.vt=new Set;for(const t in e)this.vt.add(t);return this.render(e)}this.vt.forEach((t=>{null==e[t]&&(this.vt.delete(t),t.includes("-")?s.removeProperty(t):s[t]="")}));for(const t in e){const i=e[t];null!=i&&(this.vt.add(t),t.includes("-")?s.setProperty(t,i):s[t]=i)}return q}});function ut(){return document.querySelector("hc-main")?document.querySelector("hc-main").hass:document.querySelector("home-assistant")?document.querySelector("home-assistant").hass:void 0}const _t="lovelace-player-device-id";function pt(){if(!localStorage[_t]){const t=()=>Math.floor(1e5*(1+Math.random())).toString(16).substring(1);window.fully&&"function"==typeof fully.getDeviceId?localStorage[_t]=fully.getDeviceId():localStorage[_t]=`${t()}${t()}-${t()}${t()}`}return localStorage[_t]}let vt=pt();const mt=new URLSearchParams(window.location.search);var gt;function ft(t,e,s=null){if((t=new Event(t,{bubbles:!0,cancelable:!1,composed:!0})).detail=e||{},s)s.dispatchEvent(t);else{var i=function(){var t=document.querySelector("hc-main");return t?(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("hc-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-view")||t.querySelector("hui-panel-view"):(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=document.querySelector("home-assistant"))&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root"))&&t.shadowRoot)&&t.querySelector("ha-app-layout"))&&t.querySelector("#view"))&&t.firstElementChild}();i&&i.dispatchEvent(t)}}mt.get("deviceID")&&null!==(gt=mt.get("deviceID"))&&("clear"===gt?localStorage.removeItem(_t):localStorage[_t]=gt,vt=pt());const bt="custom:";let yt=window.cardHelpers;const $t=new Promise((async(t,e)=>{yt&&t();const s=async()=>{yt=await window.loadCardHelpers(),window.cardHelpers=yt,t()};window.loadCardHelpers?s():window.addEventListener("load",(async()=>{!async function(){if(customElements.get("hui-view"))return!0;await customElements.whenDefined("partial-panel-resolver");const t=document.createElement("partial-panel-resolver");if(t.hass={panels:[{url_path:"tmp",component_name:"lovelace"}]},t._updateRoutes(),await t.routerOptions.routes.tmp.load(),!customElements.get("ha-panel-lovelace"))return!1;const e=document.createElement("ha-panel-lovelace");e.hass=ut(),void 0===e.hass&&(await new Promise((t=>{window.addEventListener("connection-status",(e=>{console.log(e),t()}),{once:!0})})),e.hass=ut()),e.panel={config:{mode:null}},e._fetchConfig()}(),window.loadCardHelpers&&s()}))}));function wt(t,e){const s={type:"error",error:t,origConfig:e},i=document.createElement("hui-error-card");return customElements.whenDefined("hui-error-card").then((()=>{const t=document.createElement("hui-error-card");t.setConfig(s),i.parentElement&&i.parentElement.replaceChild(t,i)})),$t.then((()=>{ft("ll-rebuild",{},i)})),i}function At(t,e){if(!e||"object"!=typeof e||!e.type)return wt(`No ${t} type configured`,e);let s=e.type;if(s=s.startsWith(bt)?s.substr(bt.length):`hui-${s}-${t}`,customElements.get(s))return function(t,e){let s=document.createElement(t);try{s.setConfig(JSON.parse(JSON.stringify(e)))}catch(t){s=wt(t,e)}return $t.then((()=>{ft("ll-rebuild",{},s)})),s}(s,e);const i=wt(`Custom element doesn't exist: ${s}.`,e);i.style.display="None";const n=setTimeout((()=>{i.style.display=""}),2e3);return customElements.whenDefined(s).then((()=>{clearTimeout(n),ft("ll-rebuild",{},i)})),i}async function xt(t,e,s=!1){let i=t;"string"==typeof e&&(e=e.split(/(\$| )/)),""===e[e.length-1]&&e.pop();for(const[t,n]of e.entries())if(n.trim().length){if(!i)return null;i.localName&&i.localName.includes("-")&&await customElements.whenDefined(i.localName),i.updateComplete&&await i.updateComplete,i="$"===n?s&&t==e.length-1?[i.shadowRoot]:i.shadowRoot:s&&t==e.length-1?i.querySelectorAll(n):i.querySelector(n)}return i}async function St(t,e=!1){const s=document.querySelector("hc-main")||document.querySelector("home-assistant");ft("hass-more-info",{entityId:t},s);const i=await async function(t,e,s=!1,i=1e4){return Promise.race([xt(t,e,s),new Promise(((t,e)=>setTimeout((()=>e(new Error("timeout"))),i)))]).catch((t=>{if(!t.message||"timeout"!==t.message)throw t;return null}))}(s,"$ ha-more-info-dialog");return i&&(i.large=e),i}var Et="0.0.1";window.cardMod_template_cache=window.cardMod_template_cache||{};const Ct=window.cardMod_template_cache;async function Ot(t,e,s){const i=ut().connection,n=JSON.stringify([e,s]);let o=Ct[n];o?(o.callbacks.has(t)||kt(t),t(o.value),o.callbacks.add(t)):(kt(t),t(""),s=Object.assign({user:ut().user.name,browser:vt,hash:location.hash.substr(1)||""},s),Ct[n]=o={template:e,variables:s,value:"",callbacks:new Set([t]),unsubscribe:i.subscribeMessage((t=>function(t,e){const s=Ct[t];s&&(s.value=e.result,s.callbacks.forEach((t=>t(e.result))))}(n,t)),{type:"render_template",template:e,variables:s})})}async function kt(t){let e;for(const[s,i]of Object.entries(Ct))if(i.callbacks.has(t)){i.callbacks.delete(t),0==i.callbacks.size&&(e=i.unsubscribe,delete Ct[s]);break}e&&await(await e)()}const Pt=["hummingbot_entity"],jt="hummingbot_",Ht="strategy_running",Ut="strategy_status",Nt="binary_sensor",Rt="sensor",Tt=/_\([^)]*\)/g,Mt=(t,e)=>e.replace(Tt,(e=>t.localize(e.substring(2,e.length-1))||e)),qt=t=>"on"==t.state?"orange":"var(--state-inactive-color)",zt=t=>"on"==t.state?"mdi:check-circle":"mdi:circle-outline",It=t=>"unavailable"!=t.state&&"unknown"!=t.state,Dt=t=>It(t)?"orange":"var(--state-inactive-color)";class Lt extends st{constructor(){super(...arguments),this._strategy_name_input_state=""}static getConfigElement(){return document.createElement("hummingbot-card-editor")}static getStubConfig(t,e,s){console.log("stub");let i="";for(const e of Object.keys(t.states))if(e.includes(`${Rt}.${jt}`)&&e.includes(Ut)){i=e;break}return console.log(i),{type:"custom:hummingbot-card",hummingbot_entity:i}}setConfig(t){this._config=Object.assign({},t),this.config=Object.assign({},this._config);for(const s of Pt)this._config[s]&&(e=this._config[s],String(e).includes("{%")||String(e).includes("{{")?Ot((t=>{const e=Object.assign({},this.config);"string"==typeof t&&(t=Mt(ut(),t)),e[s]=t,this.config=e}),this._config[s],{config:t}):"string"==typeof this._config[s]&&(this.config[s]=Mt(ut(),this._config[s])));var e}firstUpdated(){console.log("updated"),this._loadCards()}_binary_sensor_entity(t){return`${Nt}.${jt}${this._hb_base}_${t}`}_sensor_entity(t){return`${Rt}.${jt}${this._hb_base}_${t}`}_button_entity(t){return`button.${jt}${this._hb_base}_${t}`}_loadCards(){var t,e,s,i,n;this._hb_base&&this._known_root_id==this.config.hummingbot_entity||this._hass&&this.config&&(console.info("load hb card"),this._known_root_id=this.config.hummingbot_entity,this._hb_base=this.config.hummingbot_entity&&this.config.hummingbot_entity.indexOf(jt)>=0&&this.config.hummingbot_entity.indexOf(`_${Ut}`)>=0?this.config.hummingbot_entity.split(jt)[1].split(`_${Ut}`)[0]:void 0,this._instance_id=null===(e=null===(t=this._hass.states[this._sensor_entity(Ut)])||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.instance_id,this._strategy_name_input_state=null!==(n=null===(i=null===(s=this._hass.states[this._sensor_entity(Ut)])||void 0===s?void 0:s.attributes)||void 0===i?void 0:i.last_imported_strategy)&&void 0!==n?n:"",this._card_button_import=void 0)}_handleClick(t){St(t)}_handleImportClick(t){console.log("clicked")}_render_info_box(t){let e=M``;t.extra_state_info&&It(t.stateObj)&&(e=M`
      <div class="sensor-box state-info">
        <div class="state">${t.extra_state_info.state}</div>
        ${t.extra_state_info.unit?M`
        <div class="state-unit">${t.extra_state_info.unit}</div>
        `:""}
      </div>
      `);const s=t.clickable?()=>this._handleClick(t.entityId):void 0;return M`
    <ha-card @click=${s}>
      <div class="${dt({"sensor-box":!0,"sensor-heading":!!t.extra_state_info})}">
        <div class="sensor-title">${t.title}</div>
        <div class="sensor-icon">
          <ha-state-icon
            .icon=${t.icon}
            .state=${t.stateObj}
            data-domain=${(t=>null!=t?t:z)(t.domain)}
            data-state=${t.stateObj.state}
            style=${t.styles}
          ></ha-state-icon>
        </div>
      </div>
      ${e}
    </ha-card>
    `}_create_button_box(t){var e;const s=(i={type:"entity-button",tap_action:null!==(e=t.tap_action)&&void 0!==e?e:{action:"toggle"},name:t.name,entity:t.entity,icon:t.icon},yt?yt.createCardElement(i):At("card",i));var i;return s.hass=this._hass,s}_render_import_button(){const t={entity:this._button_entity("strategy_import"),icon:"mdi:import",name:"Import",tap_action:{action:"call-service",service:"hummingbot.import_strategy",data:{instance_id:this._instance_id,strategy_name:this._strategy_name_input_state}}};if(this._card_button_import)return this._card_button_import.setConfig(t),this._card_button_import;this._card_button_import=this._create_button_box(t)}_render_start_button(){if(this._card_button_start)return this._card_button_start;this._card_button_start=this._create_button_box({entity:this._button_entity("strategy_start"),icon:"mdi:play",name:"Start"})}_render_stop_button(){if(this._card_button_stop)return this._card_button_stop;this._card_button_stop=this._create_button_box({entity:this._button_entity("strategy_stop"),icon:"mdi:stop",name:"Stop"})}_render_binary_sensor_box(t,e){const s=ht({color:qt(e)});return this._render_info_box({title:t,icon:zt(e),styles:s,stateObj:e,domain:Nt})}_render_sensor_box(t,e,s){const i=ht({color:Dt(s)});return this._render_info_box({title:t,icon:e,styles:i,stateObj:s,domain:Rt,extra_state_info:{state:s.state}})}_render_special_sensor_box(t){const e=ht({color:Dt(t.stateObj)});return this._render_info_box({title:t.title,icon:t.icon,styles:e,stateObj:t.stateObj,domain:Rt,extra_state_info:t.extra_state_info})}_get_orders_list(t){const e=(null==t?void 0:t.attributes.orders)?Object.keys(t.attributes.orders):void 0;return e&&e.length>0?e.map((e=>Object.assign(Object.assign({},t.attributes.orders[e]),{oid:e}))):void 0}_get_state_order_amount(t){if(!t)return"No Active Orders";let e=0;for(const s of t)e+=Number(s.a);return`${e}`}_render_orders(t){if(!t||!t.length)return"";const[e,s]=(t=>{const e=t.split("-");return[e[0],e[1]]})(t[0].tp);return t.map((t=>M`
      <div class="order-info hb-grid cols-2">
        <div>${t.a} <span class="order-unit">${e}</span></div>
        <div>${t.p} <span class="order-unit">${s}</span></div>
      </div>
      `))}_strategy_name_input_changed(t){const e=t.target.value;this._strategy_name_input_state=e,console.log(this._strategy_name_input_state)}_render_strategy_name_text_box(){return M`
    <ha-card class="text-field-card">
      <ha-textfield
        .label=${"Strategy Name"}
        .value=${this._strategy_name_input_state}
        @change=${this._strategy_name_input_changed}
        placeholder="Strategy Name"
      >/ha-textfield>
    </ha-card>
    `}_render_content(){var t,e,s,i,n,o,r,a,l;const c=this._hass.states[this._binary_sensor_entity(Ht)],d=this._hass.states[this._binary_sensor_entity("strategy_imported")],h=this._hass.states[this._sensor_entity(Ut)],u=null==h?void 0:h.attributes,_=this._hass.states[this._sensor_entity("active_orders")],p=this._get_orders_list(_),v=p?p.filter((t=>"buy"==t.s)):void 0,m=p?p.filter((t=>"sell"==t.s)):void 0,g=this._get_state_order_amount(p);return M`
    <div class="hb-grid cols-1">
      ${this._render_strategy_name_text_box()}
    </div>
    <div class="hb-grid cols-3">
      ${this._render_import_button()}
      ${this._render_start_button()}
      ${this._render_stop_button()}
    </div>
    <div class="hb-grid cols-2">
      ${this._render_binary_sensor_box("Strategy Running",c)}
      ${this._render_binary_sensor_box("Strategy Imported",d)}
    </div>
    ${u.asset_base?M`
    <div class="hb-grid cols-2">
      ${this._render_special_sensor_box({title:"Base Asset",icon:"mdi:bitcoin",stateObj:h,extra_state_info:{state:null==u?void 0:u.asset_base}})}
      ${this._render_special_sensor_box({title:"Quote Asset",icon:"mdi:currency-usd",stateObj:h,extra_state_info:{state:null==u?void 0:u.asset_quote}})}
    </div>
    `:""}
    ${"unknown"!=_.state&&"unavailable"!=_.state&&"on"==(null==c?void 0:c.state)?M`
    <div class="hb-grid cols-2">
      ${this._render_sensor_box("Active Orders","mdi:reorder-horizontal",_)}
      ${this._render_special_sensor_box({title:"Amount In Orders",icon:"mdi:bitcoin",stateObj:_,extra_state_info:{state:g,unit:null==u?void 0:u.asset_base}})}
    </div>
    `:""}
    ${(null!==(e=null===(t=null==u?void 0:u.balances)||void 0===t?void 0:t.total.base)&&void 0!==e?e:0)>0?M`
    <div class="hb-grid cols-2">
      ${this._render_special_sensor_box({title:"Available Balance",icon:"mdi:cash",stateObj:h,extra_state_info:{state:null===(s=u.balances)||void 0===s?void 0:s.available.base,unit:null==u?void 0:u.asset_base}})}
      ${this._render_special_sensor_box({title:"Total Balance",icon:"mdi:cash",stateObj:h,extra_state_info:{state:null===(i=u.balances)||void 0===i?void 0:i.total.base,unit:null==u?void 0:u.asset_base}})}
    </div>
    `:""}
    ${(null!==(o=null===(n=null==u?void 0:u.market_prices)||void 0===n?void 0:n.bid)&&void 0!==o?o:0)>0?M`
    <div class="hb-grid cols-3">
      ${this._render_special_sensor_box({title:"Bid Price",icon:"mdi:cash",stateObj:h,extra_state_info:{state:null===(r=u.market_prices)||void 0===r?void 0:r.bid,unit:null==u?void 0:u.asset_quote}})}
      ${this._render_special_sensor_box({title:"Ask Price",icon:"mdi:cash",stateObj:h,extra_state_info:{state:null===(a=u.market_prices)||void 0===a?void 0:a.ask,unit:null==u?void 0:u.asset_quote}})}
      ${this._render_special_sensor_box({title:"Mid Price",icon:"mdi:cash",stateObj:h,extra_state_info:{state:null===(l=u.market_prices)||void 0===l?void 0:l.mid,unit:null==u?void 0:u.asset_quote}})}
    </div>
    `:""}
    ${p?M`
      <div class="hb-grid cols-2">
        <ha-card class="orders-list">
          <div class="header"><div class="order-list-heading">Buy Orders</div></div>
          <div class="content">${this._render_orders(v)}</div>
        </ha-card>
        <ha-card class="orders-list">
          <div class="header"><div class="order-list-heading">Sell Orders</div></div>
          <div class="content">${this._render_orders(m)}</div>
        </ha-card>
      </div>`:""}
    `}_render_offline(){return M`
    <div class="hb-grid cols-1">
      <ha-card>
        <div class="sensor-box sensor-heading offline">
          <div class="sensor-title offline">Offline</div>
        </div>
      </ha-card
    </div>
    `}_check_availability(){if(!this._hb_base)return!1;const t=this._hass.states[this._binary_sensor_entity(Ht)];return!(!t||"unavailable"==t.state||"unknown"==t.state)}render(){return M`
    <div id="root">
      <ha-card class="wrapper">
        <div class="header">
          <h1 class="card-title">Hummingbot ${this._instance_id}</h1>
        </div>
        <div class="content">
          ${this._check_availability()?this._render_content():this._render_offline()}
        </div>
      </ha-card>
    </div>
    `}set hass(t){this._hass=t,this._card_button_import&&(this._card_button_import.hass=t),this._card_button_start&&(this._card_button_start.hass=t),this._card_button_stop&&(this._card_button_stop.hass=t),this._card_strategy_name_input&&(this._card_strategy_name_input.hass=t)}static get styles(){var t;return[null===(t=customElements.get("hui-generic-entity-row"))||void 0===t?void 0:t.styles,r`
        :host {
          display: inline;
        }

        .wrapper {
          background: none;
        }

        ha-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          outline: none;
          width: 100%;
        }

        .card-title {
          color: var(--ha-card-header-color,--primary-text-color);
          font-size: 24px;
          line-height: 1.2;
        }

        .header {
          display: flex;
          padding: 8px 8px 0;
          justify-content: space-between;
        }

        .content {
          display: grid;
          padding: 8px 4px 0;
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }

        .orders-list .content {
          padding: 4px 16px 8px;
        }

        .sensor-box {
          display: flex;
          justify-content: space-between;
          padding: 8px 16px;
        }

        .sensor-title, .order-list-heading {
          color: var(--secondary-text-color);
          line-height: 30px;
          font-weight: 500;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .order-unit, .state-unit {
          color: var(--secondary-text-color);
          font-weight: 500;
          font-size: 10px;
        }

        .sensor-icon {
          color: var(--paper-item-icon-color, #44739e);
          line-height: 30px;
        }

        .hb-grid {
          display: grid;
          grid-gap: var(--grid-card-gap, 8px);
          padding: 0px 0px 4px 0px;
          width: 100%;
        }

        .hb-grid.cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .hb-grid.cols-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .grid-break {
          flex-basis: 100%;
          width: 0;
        }

        .state {
          font-size: 22px;
          font-weight: 600;
          line-height: 1.5;
          text-align: center;
          width: 100%;
        }

        .sensor-box.sensor-heading {
          padding: 0px 16px 0px;
        }

        .sensor-box.sensor-heading.offline {
          padding: 30px;
        }

        .sensor-title.offline {
          font-size: 20px;
          text-align: center;
          width: 100%;
        }

        .sensor-box.state-info {
          padding: 0px 16px 8px;
        }

        .text-field-card {
          padding: 8px 16px
        }
      `]}}t([ot()],Lt.prototype,"_config",void 0),t([ot()],Lt.prototype,"_hass",void 0),t([ot()],Lt.prototype,"_hb_base",void 0),t([ot()],Lt.prototype,"_known_root_id",void 0),t([ot()],Lt.prototype,"_instance_id",void 0),t([ot()],Lt.prototype,"config",void 0),t([ot()],Lt.prototype,"_action",void 0),t([ot()],Lt.prototype,"_card_button_import",void 0),t([ot()],Lt.prototype,"_card_button_start",void 0),t([ot()],Lt.prototype,"_card_button_stop",void 0),t([ot()],Lt.prototype,"_card_strategy_name_input",void 0),t([ot()],Lt.prototype,"_strategy_name_input_id",void 0),t([ot()],Lt.prototype,"_strategy_name_input_state",void 0),customElements.get("hummingbot-card")||(customElements.define("hummingbot-card",Lt),window.customCards=window.customCards||[],window.customCards.push({type:"hummingbot-card",name:"Hummingbot Card",preview:!0,description:"Hummingbot Card."}),console.info(`%cHUMMINGBOT-CARD ${Et} IS INSTALLED`,"color: green; font-weight: bold",""));const Bt=[{name:"hummingbot_entity",selector:{entity:{domain:"sensor",integration:"hummingbot",device_class:"enum"}}}];class Vt extends st{static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config=t}_valueChanged(t){const e=t.detail.value;this._config=e;const s=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){if(!this.hass||!this._config)return M``;const t=Object.assign({},this._config);return M`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${Bt}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}}t([ot()],Vt.prototype,"_config",void 0),t([ot()],Vt.prototype,"hass",void 0),customElements.define("hummingbot-card-editor",Vt);
