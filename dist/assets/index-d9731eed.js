import{u as e,b as l}from"./vue-router-e9849064.js";import{a}from"./time-b0f5d1b0.js";import{u as o,_ as s,d as t,G as i,S as n,i as r}from"./index-71a4f72c.js";import{d as u,r as d,j as m,A as c,ai as p,o as v,c as f,a as g,J as h,U as b,O as y,M as k,Q as _,I as j,T as w,u as x,Z as E,D as V,F as L,a8 as M,S as z,az as $,aA as I}from"./@vue-e00fec0c.js";import{b as S}from"./element-plus-98e240ff.js";import"./pinia-0f9e5c3f.js";import"./vue-i18n-45dee299.js";import"./@intlify-e89ab06e.js";import"./nprogress-53f8e7ed.js";import"./dayjs-db284eda.js";import"./js-cookie-8253c38e.js";import"./axios-7b293c88.js";import"./@element-plus-e9c266ce.js";import"./lodash-es-e58ab31e.js";import"./@vueuse-4436a003.js";import"./@popperjs-b696b006.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-96c4c0ad.js";const N={class:"slider-container"},T=s(u({__name:"SliderVerification",setup(e,{expose:l}){const a=d(0),s=d(null),t=d(!1);let i=!1,n=0,r=0,u=o();m((()=>{s.value&&(r=s.value.offsetWidth-41)}));const E=e=>{t.value||(i=!0,n=e.clientX,document.addEventListener("mousemove",V),document.addEventListener("mouseup",L))},V=e=>{if(!i)return;const l=e.clientX-n;a.value=Math.min(Math.max(0,l),r)},L=()=>{i&&(i=!1,document.removeEventListener("mousemove",V),document.removeEventListener("mouseup",L),a.value>=r?t.value=!0:a.value=0)};return l({verified:t}),c((()=>{document.removeEventListener("mousemove",V),document.removeEventListener("mouseup",L)})),(e,l)=>{const o=p("el-icon");return v(),f("div",N,[g("div",{class:j(["slider-track","dark"===x(u).theme?"slider-theme":""]),ref_key:"track",ref:s},[g("div",{class:"slider-handle",style:h({left:a.value+"px"}),onMousedown:E},[b(o,{style:{color:"#32363999"}},{default:y((()=>[(v(),k(_(t.value?"Check":"DArrowRight")))])),_:1})],36),g("div",{class:j(["slider-progress",t.value?"verified-color":""]),style:h({width:a.value+"px"})},w(t.value?e.$t("common.Verify"):""),7),g("div",null,[g("span",null,w(e.$t("common.SliderVerified")),1)])],2)])}}}),[["__scopeId","data-v-db1bcbdb"]]),U={class:"direction"},C={class:"popover-icon"},H=["onClick"],R=s(u({__name:"Direction",emits:["emitIcon"],setup(e,{emit:l}){let a=d("Notebook"),o=d(!1);const s=l,t=E([{icon:"Memo",name:"居左"},{icon:"Tickets",name:"居中"},{icon:"Notebook",name:"居右"}]);return(e,l)=>{const i=p("el-button"),n=p("el-popover");return v(),f("div",U,[b(n,{placement:"bottom",width:100,trigger:"click",visible:x(o)},{reference:y((()=>[b(i,{class:"c-p",size:"small",icon:x(a),circle:"",onClick:l[0]||(l[0]=e=>V(o)?o.value=!0:o=!0)},null,8,["icon"])])),default:y((()=>[g("div",C,[(v(!0),f(L,null,M(t,((e,l)=>(v(),f("div",{key:l,onClick:l=>(e=>{let{icon:l,name:t}=e;a.value=l,o.value=!1,s("emitIcon",l)})(e),class:j(x(a)==e.icon?"paint":"")},[b(i,{class:"c-p",size:"small",icon:e.icon,circle:""},null,8,["icon"]),z(" "+w(e.name),1)],10,H)))),128))])])),_:1},8,["visible"])])}}}),[["__scopeId","data-v-d7d3ae4c"]]),A=e=>($("data-v-101a89b5"),e=e(),I(),e),D={class:"d-flex ai-center p-a top-16 right-16 btn-top"},F={class:"login-box"},P=[A((()=>g("div",{class:"login-block2"},"1",-1)))],O={class:"login-right d-flex j-center pt-64"},W={class:"login-block"},X={class:"text-tips fs-14"},q={class:"sign-in d-flex j-between"},B={class:"other-login d-flex j-between ai-center"},G=A((()=>g("div",{class:"other-line"},null,-1))),J=A((()=>g("div",{class:"other-line"},null,-1))),Q=[A((()=>g("div",{class:"login-block2"},"1",-1)))],Z=s(u({__name:"index",setup(s){let u=d(!1),m=d(!1),c=d(!1),_=d("Notebook"),$=d(),I=E({authority:"Super",username:"admin",password:"123456"}),N=e(),U=l(),C=o();const H=t(),A=d(),Z={username:[{trigger:"change",validator:(e,l,a)=>{l.length>=5?a():a(new Error("账号长度至少五位"))}}],password:[{trigger:"change",validator:(e,l,a)=>{l.length>=6?a():a(new Error("密码长度至少六位"))}}]};let K=document.documentElement;"dark"==i("THEME")?(K.className="dark",u.value=!0):(K.className="",u.value=!1);const Y=()=>{u.value=!u.value,u.value?(K.className="dark",C.theme="dark",n("THEME","dark")):(K.className="",C.theme="light",n("THEME","light"))},ee=e=>{_.value=e},le=async()=>{if(await $.value.validate(),A.value.verified){c.value=!0;try{await H.userLogin({username:I.username,password:I.password,authority:I.authority}),setTimeout((()=>{c.value=!1;let e=N.query.redirect;U.push({path:e||"/overview"}),S({type:"success",message:"登录成功",title:`Hi,${a()}好`})}),1e3)}catch(e){S({type:"error",message:e.message})}}else S({type:"error",message:"请先拖动滑块验证"})};return(e,l)=>{const a=p("ThemeSwitch"),o=p("I18n"),s=p("el-option"),t=p("el-select"),i=p("el-form-item"),n=p("el-input"),d=p("el-checkbox"),E=p("el-button"),S=p("el-form");return v(),f("div",{class:j(["login","dark"===x(C).theme?"login-theme":""])},[g("div",D,[b(R,{onEmitIcon:ee}),b(a,{MoveRound:x(u),"onUpdate:themeSwitch":Y},null,8,["MoveRound"]),b(o)]),g("div",F,[g("div",{class:j(["login-left","Memo"==x(_)?"center-left":""])},P,2),g("div",O,[g("div",W,[g("h2",{class:"mr-10 text-36",style:h(x(u)?"color:#fff":"")},w(e.$t("common.WelcomeBack")),5),g("div",X,w(e.$t("common.LoginIntroduce")),1),b(S,{class:"login-form",model:x(I),rules:Z,ref_key:"loginForms",ref:$},{default:y((()=>[b(i,{prop:"authority"},{default:y((()=>[b(t,{modelValue:x(I).authority,"onUpdate:modelValue":l[0]||(l[0]=e=>x(I).authority=e),placeholder:"Select",style:{width:"100%"},size:"large"},{default:y((()=>[(v(!0),f(L,null,M(x(r),(e=>(v(),k(s,{key:e.value,label:e.label,value:e.label},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),b(i,{prop:"username"},{default:y((()=>[b(n,{"prefix-icon":e.User,modelValue:x(I).username,"onUpdate:modelValue":l[1]||(l[1]=e=>x(I).username=e),size:"large"},null,8,["prefix-icon","modelValue"])])),_:1}),b(i,{prop:"password"},{default:y((()=>[b(n,{type:"password","prefix-icon":e.Lock,modelValue:x(I).password,"onUpdate:modelValue":l[2]||(l[2]=e=>x(I).password=e),"show-password":"",size:"large"},null,8,["prefix-icon","modelValue"])])),_:1}),b(i,null,{default:y((()=>[b(T,{ref_key:"sliderVerification",ref:A},null,512)])),_:1}),b(i,{class:"login-select"},{default:y((()=>[b(d,{modelValue:x(m),"onUpdate:modelValue":l[3]||(l[3]=e=>V(m)?m.value=e:m=e),label:e.$t("common.RememberMe"),size:"large"},null,8,["modelValue","label"]),g("div",null,w(e.$t("common.ForgotPassword")),1)])),_:1}),b(i,null,{default:y((()=>[b(E,{class:"login_btn",type:"primary",onClick:le,loading:x(c),size:"default"},{default:y((()=>[z(w(e.$t("common.Login")),1)])),_:1},8,["loading"])])),_:1}),b(i,null,{default:y((()=>[g("div",q,[b(E,{plain:"",size:"default",style:{width:"47%"}},{default:y((()=>[z(w(e.$t("common.PhoneLogin")),1)])),_:1}),b(E,{plain:"",size:"default",style:{width:"47%"}},{default:y((()=>[z(w(e.$t("common.ScanPayLogin")),1)])),_:1})])])),_:1}),b(i,null,{default:y((()=>[g("div",B,[G,g("div",null,w(e.$t("common.OtherLogin")),1),J])])),_:1})])),_:1},8,["model"])])]),g("div",{class:"login-left",style:h({display:"Memo"==x(_)?"block":"none"})},Q,4)])],2)}}}),[["__scopeId","data-v-101a89b5"]]);export{Z as default};
