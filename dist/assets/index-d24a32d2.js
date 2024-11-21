import{g as e}from"./time-b0f5d1b0.js";import{u as a,_ as l}from"./index-76919292.js";import{d as t,b as u,k as s,j as i,e as n,ai as o,c as v,a as r,I as c,u as d,J as p,U as m,T as h,S as y,O as g,F as b,a8 as f,R as j,az as k,aA as w,o as x}from"./@vue-df0b898e.js";import"./element-plus-70432142.js";import"./lodash-es-e58ab31e.js";import"./@vueuse-e939f3e5.js";import"./@element-plus-84a1e3c8.js";import"./@popperjs-b696b006.js";import"./@ctrl-91de2ec7.js";import"./dayjs-db284eda.js";import"./async-validator-8d480e59.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-96c4c0ad.js";import"./vue-router-9646783a.js";import"./pinia-33633599.js";import"./vue-i18n-5303eb8e.js";import"./@intlify-0c9a9c9a.js";import"./nprogress-53f8e7ed.js";import"./js-cookie-8253c38e.js";import"./axios-d9fc56e3.js";const C=e=>(k("data-v-6d0ee119"),e=e(),w(),e),_={class:"video-player"},R=["src","loop"],E={class:"controls"},T={class:"btn-left"},P={class:"player-time"},I={class:"player-ptime"},L={class:"player-dtime"},M={class:"btn-right"},U={style:{position:"relative"}},S={class:""},V={class:"play-btn"},B=C((()=>r("span",null,"速度",-1))),F={class:"setting-toggle"},q={class:"setting-item"},z=C((()=>r("span",null,"洗脑循环",-1))),O={class:"setting-toggle"},A=["onClick"],W={class:"progress-box"},X=l(t({__name:"index",props:{videoSrc:{type:String,required:!0}},setup(l){const t=a(),k=u(null),w=u(!1),C=u(0),X=u(0),D=u(100),J=u(1),$=[.5,.75,"正常",1.25,1.5,2],G=u(!1),H=u(!1),K=u(!1),N=u(!1),Q=u(!1),Y=u(0),Z=u("1.25rem"),ee=u("1.25rem"),ae=u(!1),le=u(!1),te=u(!1),ue=s((()=>X.value>0?C.value/X.value*100+"%":"0%")),se=s((()=>Q.value?Y.value/X.value*100+"%":"0")),ie=s((()=>e(Y.value)));i((()=>{k.value&&(k.value.onloadedmetadata=()=>{var e;X.value=(null==(e=k.value)?void 0:e.duration)||0},k.value.volume=Math.round(D.value/100),k.value.playbackRate=J.value)})),n(C,(e=>{k.value&&Math.abs(k.value.currentTime-e)>.1&&(k.value.currentTime=e)}));const ne=()=>{k.value&&(ae.value=!ae.value,le.value=!1,N.value=!1)},oe=()=>{k.value&&(ae.value=!0,le.value=!le.value)},ve=()=>{k.value&&(w.value?k.value.pause():k.value.play(),w.value=!w.value)},re=()=>{k.value&&(C.value=k.value.currentTime)},ce=e=>{if(!k.value)return;const a=e.currentTarget,l=a.getBoundingClientRect(),t=e.clientX-l.left,u=Math.min(Math.max(t/a.clientWidth,0),1);C.value=u*X.value,k.value.currentTime=C.value},de=()=>{Q.value=!1},pe=e=>{if(!k.value)return;const a=e.currentTarget,l=a.getBoundingClientRect(),t=e.clientX-l.left,u=Math.min(Math.max(t/a.clientWidth,0),1);Y.value=u*X.value,Q.value=!0},me=()=>{G.value||(w.value=!1,C.value=0)},he=()=>{k.value&&(N.value=!N.value,ae.value&&(ae.value=!1),le.value=!1)},ye=()=>{k.value&&(k.value.volume=D.value/100,0==D.value?te.value=!0:te.value=!1)},ge=async()=>{if(k.value)try{K.value?await document.exitPictureInPicture():await k.value.requestPictureInPicture()}catch(e){console.error("Failed to toggle Picture-in-Picture:",e)}},be=()=>{K.value=null!==document.pictureInPictureElement};document.addEventListener("enterpictureinpicture",be),document.addEventListener("leavepictureinpicture",be);const fe=()=>{var e,a,l;const t=null==(e=k.value)?void 0:e.parentElement;t&&(H.value?null==(l=document.exitFullscreen)||l.call(document):null==(a=t.requestFullscreen)||a.call(t),H.value=!H.value)};return document.addEventListener("fullscreenchange",(()=>{H.value=!!document.fullscreenElement})),(a,u)=>{const s=o("SvgIcon"),i=o("el-slider"),n=o("ArrowRight"),J=o("el-icon"),H=o("el-switch");return x(),v("div",_,[r("video",{ref_key:"videoPlayer",ref:k,src:l.videoSrc,onTimeupdate:re,onEnded:me,loop:G.value,onClick:ve,class:c(["video-element","dark"===d(t).theme?"video-theme":""]),style:p({height:K.value?"":"100%"})},null,46,R),r("div",E,[r("div",T,[r("button",{class:"play-btn",onClick:ve},[m(s,{class:"play-btn-icon",name:w.value?"play-pause":"play-back",width:Z.value,height:ee.value},null,8,["name","width","height"])]),r("span",P,[r("span",I,h(d(e)(C.value)),1),y("/ "),r("span",L,h(d(e)(X.value)),1)])]),r("div",M,[r("div",U,[r("button",{class:"play-btn",onClick:he},[m(s,{class:"play-btn-icon",name:te.value?"sound-off":"audio",width:Z.value,height:ee.value},null,8,["name","width","height"])]),r("div",{class:c(["audio-box",N.value?"active-audio":""])},[m(i,{modelValue:D.value,"onUpdate:modelValue":u[0]||(u[0]=e=>D.value=e),vertical:"",height:"100px",onInput:ye},null,8,["modelValue"])],2)]),r("div",S,[r("button",V,[m(s,{onClick:ne,class:"play-btn-icon",name:"setting",width:Z.value,height:ee.value},null,8,["width","height"])]),r("div",{class:c(["setting-box",ae.value?"active-setting":"",le.value?"active-speed-box":""])},[r("div",{class:c(["setting-panel",le.value?" active-speed":""])},[r("div",{class:"setting-item",onClick:oe},[B,r("div",F,[m(J,{style:{color:"#fff"}},{default:g((()=>[m(n)])),_:1})])]),r("div",q,[z,r("div",O,[m(H,{modelValue:G.value,"onUpdate:modelValue":u[1]||(u[1]=e=>G.value=e)},null,8,["modelValue"])])])],2),r("div",{class:"setting-speed",style:p({display:le.value?"block":"none"})},[(x(),v(b,null,f($,((e,a)=>r("div",{class:"setting-speed-item",key:a,onClick:a=>(e=>{k.value&&(k.value.playbackRate="正常"==e?1:e,le.value=!1,ae.value=!1)})(e)},[r("span",null,h(e),1)],8,A))),64))],4)],2)]),r("div",null,[r("button",{onClick:ge,class:"play-btn"},[m(s,{class:"play-btn-icon",name:"picture-in-picture",width:Z.value,height:ee.value},null,8,["width","height"])])]),r("div",null,[r("button",{onClick:fe,class:"play-btn"},[m(s,{class:"play-btn-icon",name:"full-screen",width:Z.value,height:ee.value},null,8,["width","height"])])])]),r("div",W,[r("div",{class:"progress-container",onClick:ce,onMousemove:pe,onMouseleave:de},[r("div",{class:"progress-bar",style:p({width:ue.value})},null,4),Q.value?(x(),v("div",{key:0,class:"progress-thumb",style:p({left:se.value})},h(ie.value),5)):j("",!0)],32)])])])}}}),[["__scopeId","data-v-6d0ee119"]]),D=""+new URL("dance-351321f4.mp4",import.meta.url).href,J=(e,a)=>{const l=document.createElement("a");l.href=e,l.download=a,l.style.display="none",document.body.appendChild(l),l.click(),document.body.removeChild(l)},$={class:"video-btn"},G={class:"mt-30"},H=l(t({__name:"index",setup(e){const l=a(),t=()=>{(async(e,a)=>{try{const l=await fetch(e);if(!l.ok)throw new Error(`视频文件获取失败: ${l.statusText}`);const t=await l.arrayBuffer(),u=new Blob([t],{type:"video/mp4"}),s=URL.createObjectURL(u);J(s,a),URL.revokeObjectURL(s)}catch(l){const e=l instanceof Error?l.message:"未知错误";console.error("视频下载失败:",e)}})(D,"downloadTest")};return(e,a)=>{const u=o("el-button");return x(),v("div",{class:c(["videoPlayback","dark"===d(l).theme?"video-theme":""])},[m(X,{videoSrc:d(D)},null,8,["videoSrc"]),r("div",$,[r("div",null,[m(u,{type:"primary",onClick:a[0]||(a[0]=e=>t())},{default:g((()=>[y("下载")])),_:1})]),r("div",G,[m(u,{type:"primary"},{default:g((()=>[y("随机视频")])),_:1})])])],2)}}}),[["__scopeId","data-v-c228576e"]]);export{H as default};
