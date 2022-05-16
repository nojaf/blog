"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[503],{417:function(e,t,r){var n=r(7294),a=r(4839),o=r(5697);function l(e){return e.split(/\s+/)}function i(e){return e.children?n.Children.only(e.children):null}i.displayName="BodyClassName",i.cache=[],i.propTypes={className:o.string.isRequired},e.exports=a((function(e){return e.map((function(e){return e.className})).filter((function(e,t,r){return r.indexOf(e)===t})).join(" ")}),(function(e){var t=l(document.body.className).filter((function(e){return-1===i.cache.indexOf(e)})),r=l(e);i.cache=r,document.body.className=t.concat(r).join(" ").trim()}))(i)},3219:function(e,t){function r(e){return function(e){if(Array.isArray(e))return a(e)}(e)||o(e)||n(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){if(e){if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=new Date(e);if(!Number.isNaN(t.valueOf()))return t;var a=String(e).match(/\d+/g);if(null==a||a.length<=2)return t;var l=a.map((function(e){return parseInt(e)})),i=function(e){if(Array.isArray(e))return e}(d=l)||o(d)||n(d)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),c=i[0],u=i[1],s=i.slice(2),m=[c,u-1].concat(r(s));return new Date(Date.UTC.apply(Date,r(m)));var d}},1881:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){return e+" "+(1!==e?t+"s":t)+" "+r}},2503:function(e,t,r){function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}t.Z=function(e){var t=e.date,r=e.formatter,n=void 0===r?o.default:r,c=e.component,u=void 0===c?"time":c,m=e.live,f=void 0===m||m,y=e.minPeriod,j=void 0===y?0:y,N=e.maxPeriod,L=void 0===N?g:N,E=e.title,T=e.now,O=void 0===T?function(){return Date.now()}:T,v=function(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}(e,i),D=(S=p((0,a.useState)(0),2),S[0],z=S[1],(0,a.useCallback)((function(){z((function(e){return e+1}))}),[]));var S,z;(0,a.useEffect)((function(){if(f){var e;return function r(n){var a=(0,l.default)(t).valueOf();if(a){var o=O(),i=Math.round(Math.abs(o-a)/1e3),c=i<60?1e3:i<M?6e4:i<h?36e5:6048e5,u=Math.min(Math.max(c,1e3*j),1e3*L);u&&(e&&clearTimeout(e),e=setTimeout(r,u)),n||D()}else console.warn("[react-timeago] Invalid Date provided")}(!0),function(){clearTimeout(e)}}}),[t,D,f,L,j,O]);var C=u,I=(0,l.default)(t).valueOf();if(!I)return null;var k=O(),P=Math.round(Math.abs(k-I)/1e3),A=I<k?"ago":"from now",x=p(P<60?[Math.round(P),"second"]:P<M?[Math.round(P/60),"minute"]:P<h?[Math.round(P/M),"hour"]:P<g?[Math.round(P/h),"day"]:P<b?[Math.round(P/g),"week"]:P<w?[Math.round(P/b),"month"]:[Math.round(P/w),"year"],2),F=x[0],Y=x[1],U=void 0===E?"string"==typeof t?t:(0,l.default)(t).toISOString().substr(0,16).replace("T"," "):E,Z="time"===C?d(d({},v),{},{dateTime:(0,l.default)(t).toISOString()}):v,Q=o.default.bind(null,F,Y,A);return a.createElement(C,s({},Z,{title:U}),n(F,Y,A,I,Q,O))};var a=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!=typeof e)return{default:e};var r=u(t);if(r&&r.has(e))return r.get(e);var a={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in e)if("default"!==l&&Object.prototype.hasOwnProperty.call(e,l)){var i=o?Object.getOwnPropertyDescriptor(e,l):null;i&&(i.get||i.set)?Object.defineProperty(a,l,i):a[l]=e[l]}a.default=e,r&&r.set(e,a);return a}(r(7294)),o=c(r(1881)),l=c(r(3219)),i=["date","formatter","component","live","minPeriod","maxPeriod","title","now"];function c(e){return e&&e.__esModule?e:{default:e}}function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(u=function(e){return e?r:t})(e)}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){f(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null==r)return;var n,a,o=[],l=!0,i=!1;try{for(r=r.call(e);!(l=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);l=!0);}catch(c){i=!0,a=c}finally{try{l||null==r.return||r.return()}finally{if(i)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var M=3600,h=86400,g=7*h,b=30*h,w=365*h},9792:function(e,t,r){r.d(t,{Z:function(){return l}});var n=r(2503),a=r(1597),o=r(7294),l=function(e){var t=e.path,r=e.title,l=e.image,i=e.tags,c=e.date,u="https://blog.nojaf.com/"+t,s=r+" by @verdonckflorian";return o.createElement("header",{style:{backgroundImage:"url("+l+")"},className:"cover"},o.createElement("div",{className:"inner"}),o.createElement("div",{className:"content"},o.createElement("div",{className:"container"},o.createElement("div",{className:"row"},o.createElement("div",{className:"d-none d-md-block col col-md-3 col-lg-2 meta"},c&&o.createElement("strong",null,"Published"),c&&o.createElement(n.Z,{date:c,className:"timeago"}),i&&o.createElement("strong",{className:"pt-2"},"Tags"),i&&o.createElement("ul",{className:"list-unstyled"},i.map((function(e,t){return o.createElement("li",{key:t},o.createElement(a.Link,{key:e,to:"/tag/"+e+"/"},e))})))),o.createElement("div",{className:"col col-md-9 col-lg-10 d-flex align-content-center flex-wrap"},o.createElement("div",{className:"py-5 ms-md-5"},o.createElement("h1",null,r),t&&o.createElement("a",{className:"share d-flex align-items-center pt-1",href:"https://twitter.com/share?text="+s+";url="+u},o.createElement("span",null,"Share this on "),o.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDMxMCAzMTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxMCAzMTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGcgaWQ9IlhNTElEXzgyNl8iPgoJPHBhdGggZmlsbD0iI0ZGRiIgaWQ9IlhNTElEXzgyN18iIGQ9Ik0zMDIuOTczLDU3LjM4OGMtNC44NywyLjE2LTkuODc3LDMuOTgzLTE0Ljk5Myw1LjQ2M2M2LjA1Ny02Ljg1LDEwLjY3NS0xNC45MSwxMy40OTQtMjMuNzMKCQljMC42MzItMS45NzctMC4wMjMtNC4xNDEtMS42NDgtNS40MzRjLTEuNjIzLTEuMjk0LTMuODc4LTEuNDQ5LTUuNjY1LTAuMzljLTEwLjg2NSw2LjQ0NC0yMi41ODcsMTEuMDc1LTM0Ljg3OCwxMy43ODMKCQljLTEyLjM4MS0xMi4wOTgtMjkuMTk3LTE4Ljk4My00Ni41ODEtMTguOTgzYy0zNi42OTUsMC02Ni41NDksMjkuODUzLTY2LjU0OSw2Ni41NDdjMCwyLjg5LDAuMTgzLDUuNzY0LDAuNTQ1LDguNTk4CgkJQzEwMS4xNjMsOTkuMjQ0LDU4LjgzLDc2Ljg2MywyOS43Niw0MS4yMDRjLTEuMDM2LTEuMjcxLTIuNjMyLTEuOTU2LTQuMjY2LTEuODI1Yy0xLjYzNSwwLjEyOC0zLjEwNCwxLjA1LTMuOTMsMi40NjcKCQljLTUuODk2LDEwLjExNy05LjAxMywyMS42ODgtOS4wMTMsMzMuNDYxYzAsMTYuMDM1LDUuNzI1LDMxLjI0OSwxNS44MzgsNDMuMTM3Yy0zLjA3NS0xLjA2NS02LjA1OS0yLjM5Ni04LjkwNy0zLjk3NwoJCWMtMS41MjktMC44NTEtMy4zOTUtMC44MzgtNC45MTQsMC4wMzNjLTEuNTIsMC44NzEtMi40NzMsMi40NzMtMi41MTMsNC4yMjRjLTAuMDA3LDAuMjk1LTAuMDA3LDAuNTktMC4wMDcsMC44ODkKCQljMCwyMy45MzUsMTIuODgyLDQ1LjQ4NCwzMi41NzcsNTcuMjI5Yy0xLjY5Mi0wLjE2OS0zLjM4My0wLjQxNC01LjA2My0wLjczNWMtMS43MzItMC4zMzEtMy41MTMsMC4yNzYtNC42ODEsMS41OTcKCQljLTEuMTcsMS4zMi0xLjU1NywzLjE2LTEuMDE4LDQuODRjNy4yOSwyMi43NiwyNi4wNTksMzkuNTAxLDQ4Ljc0OSw0NC42MDVjLTE4LjgxOSwxMS43ODctNDAuMzQsMTcuOTYxLTYyLjkzMiwxNy45NjEKCQljLTQuNzE0LDAtOS40NTUtMC4yNzctMTQuMDk1LTAuODI2Yy0yLjMwNS0wLjI3NC00LjUwOSwxLjA4Ny01LjI5NCwzLjI3OWMtMC43ODUsMi4xOTMsMC4wNDcsNC42MzgsMi4wMDgsNS44OTUKCQljMjkuMDIzLDE4LjYwOSw2Mi41ODIsMjguNDQ1LDk3LjA0NywyOC40NDVjNjcuNzU0LDAsMTEwLjEzOS0zMS45NSwxMzMuNzY0LTU4Ljc1M2MyOS40Ni0zMy40MjEsNDYuMzU2LTc3LjY1OCw0Ni4zNTYtMTIxLjM2NwoJCWMwLTEuODI2LTAuMDI4LTMuNjctMC4wODQtNS41MDhjMTEuNjIzLTguNzU3LDIxLjYzLTE5LjM1NSwyOS43NzMtMzEuNTM2YzEuMjM3LTEuODUsMS4xMDMtNC4yOTUtMC4zMy01Ljk5OAoJCUMzMDcuMzk0LDU3LjAzNywzMDUuMDA5LDU2LjQ4NiwzMDIuOTczLDU3LjM4OHoiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",alt:"Twitter icon"}))))))))}},8434:function(e,t,r){r.r(t),r.d(t,{default:function(){return s}});var n=r(7294),a=r(417),o=r.n(a),l=r(9008),i=r(262),c=r.p+"static/public-speaking-nojaf-com-72a21d6a57d8153a8c6c490b9ca8ec1e.jpg",u=r(9792),s=function(e){return n.createElement(o(),{className:"post-template page-template page"},n.createElement(l.Z,{location:e.location,title:"Public speaking at blog.nojaf.com"},n.createElement(i.Z,{title:"Public speaking at blog.nojaf.com",keywords:["blog","blog.nojaf.com"]}),n.createElement(u.Z,{image:c,title:"Public Speaking"}),n.createElement("main",{className:"py-5 container page"},n.createElement("article",null,n.createElement("div",{className:"container"},n.createElement("h2",{id:"intro"},"Straight from the heart"),n.createElement("p",null,"Over the years, I've had the opportunity to participate in various shapes of Public speaking.",n.createElement("br",null),"From webinars to online and physical conferences, I've seen a fair share and wish to keep track of these wonderful occasions.",n.createElement("br",null),"Each and every one of them has been about a topic that is dear to me. My goal is to inspire, educate and help projects grow by doing these things.",n.createElement("br",null),"And the best is yet to come!"),n.createElement("h2",{id:"ndc-olso-2021"},"Formatting F# code, There and Back Again"),n.createElement("h3",null,"December 2021 at NDC Oslo (Norway)"),n.createElement("p",null,'In recent years code formatters have done wonders in many languages. They can help a language by making it easier for newcomers on the "how should it look like". And overall, they can avoid pointless arguments in teams. In a perfect world, a formatter is available with the first release of the language. For F# this wasn\'t the case. In recent years the Fantomas project is rising to empty that void. And given the state of the language and ecosystem, it can be a tough climb.'),n.createElement("p",null,n.createElement("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/R9Ob5Vp4a9c",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})),n.createElement("h2",{id:"fsharp-exchange-2021"},"Fantomas V: The One that Will Format the F# Compiler"),n.createElement("h3",null,"October 2021 at F# eXchange (Online)"),n.createElement("p",null,"Showcasing the grand plan for the next major version of Fantomas."),n.createElement("p",null,n.createElement("a",{href:"https://skillsmatter.com/skillscasts/17236-fantomas-v"},"Watch on skills matter")),n.createElement("h2",{id:"dotnet-summit-2020"},"Formatting F# source code"),n.createElement("h3",null,"August 2020 at .NET Summit (Online)"),n.createElement("p",null,n.createElement("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/DiRYHD-HiF8",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})),n.createElement("h2",{id:"fsharpconf-2020"},"Formatting F# source code"),n.createElement("h3",null,"June 2020 at fsharpConf (Online)"),n.createElement("p",null,"This video cannot be embedded but you can ",n.createElement("a",{href:"https://youtu.be/ybkYHYKYeNw?t=4481"},"watch it on YouTube"),"."),n.createElement("h2",{id:"jetbrains-dotnetdays-2020"},"Formatting F# Code"),n.createElement("h3",null,"May 2020 at JetBrains .NET Days (Online)"),n.createElement("p",null,"If you format F# code in Rider, a tool called Fantomas will be called to process this. Fantomas is open source and I am one of the maintainers of this project. In this session I explained how Fantomas's high-level works, how I got involved in this project, and how it is wired into the FSharp support for Rider."),n.createElement("p",null,n.createElement("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/9kK57hMDLvU",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})),n.createElement("h2",{id:"youtube"},"YouTube"),n.createElement("h3",null,"Est. 2020"),n.createElement("p",null,"I also have a ",n.createElement("a",{href:"https://www.youtube.com/user/nojaf/videos"},"YouTube channel")," where I post some more niche technical content."),n.createElement("h2",{id:"fable-conf-2019"},"A Journey into the Compiler and Tooling"),n.createElement("h3",null,"September 2019 at FableConf Antwerp (Belgium)"),n.createElement("p",null,"When I wanted to add the capability of compiling F# scripts to Fable, I had to explore the infrastructure of the compiler as well as its JS clients, like fable-loader and fable-splitter. In this talk we will do this journey together to understand how all the pieces fit together so, maybe in the future, you can contribute a new feature to the compiler too."),n.createElement("p",null,n.createElement("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/KDPfc9SZNL4",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})),n.createElement("h2",{id:"webinar-jetbrains-2019"},"From F# to JavaScript with Fable"),n.createElement("h3",null,"August 2019 @ Webinar for JetBrains (Online)"),n.createElement("p",null,"Fable is an F# to JavaScript compiler powered by Babel, designed to produce readable and standard code. It has an active community and can be used across the entire JavaScript spectrum"),n.createElement("p",null,n.createElement("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/5191ytFmG_A",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})),n.createElement("h2",{id:"techorama-2018"},"Introduction to Fable"),n.createElement("h3",null,"2018 @ Techorama (Belgium) ",n.createElement("small",null,"(Partner Stage)")),n.createElement("p",null,"My first taste of giving a talk at conference. In this short lighting talk I've talked about ",n.createElement("a",{href:"https://fable.io"},"Fable"),", the F# to JavaScript compiler."))))))}}}]);
//# sourceMappingURL=component---src-pages-public-speaking-js-e252be9d9543745df683.js.map