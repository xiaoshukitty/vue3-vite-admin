import{u as e,b as l}from"./vue-router-519119dd.js";import{a}from"./time-1f223f1a.js";import{u as s,_ as o,d as t,G as r,S as i,g as n}from"./index-3b5a06ae.js";import{d as u,b as d,j as m,A as c,ai as p,o as v,c as f,a as g,J as h,U as y,O as j,M as w,Q as _,I as b,T as k,u as x,Z as V,az as E,aA as L,F as $,a8 as z,D as M,S}from"./@vue-7d1b35cf.js";import{b as U}from"./element-plus-e2d1136e.js";import"./pinia-3624b2fa.js";import"./vue-i18n-9d70433a.js";import"./@intlify-e89ab06e.js";import"./nprogress-6f80ecd0.js";import"./dayjs-d97fcf3a.js";import"./js-cookie-8253c38e.js";import"./axios-7b293c88.js";import"./@element-plus-cdeb115f.js";import"./lodash-es-e58ab31e.js";import"./@vueuse-63aee19d.js";import"./@popperjs-b696b006.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-96c4c0ad.js";const T={class:"slider-container"},I=o(u({__name:"SliderVerification",setup(e,{expose:l}){const a=d(0),o=d(null),t=d(!1);let r=!1,i=0,n=0,u=s();m((()=>{o.value&&(n=o.value.offsetWidth-41)}));const V=e=>{t.value||(r=!0,i=e.clientX,document.addEventListener("mousemove",E),document.addEventListener("mouseup",L))},E=e=>{if(!r)return;const l=e.clientX-i;a.value=Math.min(Math.max(0,l),n)},L=()=>{r&&(r=!1,document.removeEventListener("mousemove",E),document.removeEventListener("mouseup",L),a.value>=n?t.value=!0:a.value=0)};return l({verified:t}),c((()=>{document.removeEventListener("mousemove",E),document.removeEventListener("mouseup",L)})),(e,l)=>{const s=p("el-icon");return v(),f("div",T,[g("div",{class:b(["slider-track","dark"===x(u).theme?"slider-theme":""]),ref_key:"track",ref:o},[g("div",{class:"slider-handle",style:h({left:a.value+"px"}),onMousedown:V},[y(s,{style:{color:"#32363999"}},{default:j((()=>[(v(),w(_(t.value?"Check":"DArrowRight")))])),_:1})],36),g("div",{class:b(["slider-progress",t.value?"verified-color":""]),style:h({width:a.value+"px"})},k(t.value?e.$t("common.Verify"):""),7),g("div",null,[g("span",null,k(e.$t("common.SliderVerified")),1)])],2)])}}}),[["__scopeId","data-v-db1bcbdb"]]),H=e=>(E("data-v-6ce787a4"),e=e(),L(),e),N={class:"login"},R={class:"d-flex ai-center p-a top-16 right-16"},A={class:"login-box"},F=H((()=>g("div",{class:"login-left"},[g("div",{class:"login-block2"},"1")],-1))),P={class:"login-right d-flex j-center pt-64"},C={class:"login-block"},D={class:"text-tips fs-14"},O={class:"sign-in d-flex j-between"},W={class:"other-login d-flex j-between ai-center"},X=H((()=>g("div",{class:"other-line"},null,-1))),q=H((()=>g("div",{class:"other-line"},null,-1))),B=o(u({__name:"index",setup(o){let u=d(!1),m=d(!1),c=d(!1),_=d(),b=V({authority:"User",username:"admin",password:"123456"}),E=e(),L=l(),T=s();const H=t(),B=d(),G={username:[{trigger:"change",validator:(e,l,a)=>{l.length>=5?a():a(new Error("账号长度至少五位"))}}],password:[{trigger:"change",validator:(e,l,a)=>{l.length>=6?a():a(new Error("密码长度至少六位"))}}]};let J=document.documentElement;"dark"==r("THEME")?(J.className="dark",u.value=!0):(J.className="",u.value=!1);const Q=()=>{u.value=!u.value,u.value?(J.className="dark",T.theme="dark",i("THEME","dark")):(J.className="",T.theme="light",i("THEME","light"))},Z=async()=>{if(await _.value.validate(),B.value.verified){c.value=!0;try{await H.userLogin({username:b.username,password:b.password,authority:b.authority}),setTimeout((()=>{c.value=!1;let e=E.query.redirect;L.push({path:e||"/overview"}),U({type:"success",message:"登录成功",title:`Hi,${a()}好`})}),1e3)}catch(e){U({type:"error",message:e.message})}}else U({type:"error",message:"请先拖动滑块验证"})};return(e,l)=>{const a=p("ThemeSwitch"),s=p("I18n"),o=p("el-option"),t=p("el-select"),r=p("el-form-item"),i=p("el-input"),d=p("el-checkbox"),V=p("el-button"),E=p("el-form");return v(),f("div",N,[g("div",R,[y(a,{MoveRound:x(u),"onUpdate:themeSwitch":Q},null,8,["MoveRound"]),y(s)]),g("div",A,[F,g("div",P,[g("div",C,[g("h2",{class:"mr-10 text-36",style:h(x(u)?"color:#fff":"")},k(e.$t("common.WelcomeBack")),5),g("div",D,k(e.$t("common.LoginIntroduce")),1),y(E,{class:"login-form",model:x(b),rules:G,ref_key:"loginForms",ref:_},{default:j((()=>[y(r,{prop:"authority"},{default:j((()=>[y(t,{modelValue:x(b).authority,"onUpdate:modelValue":l[0]||(l[0]=e=>x(b).authority=e),placeholder:"Select",style:{width:"100%"},size:"large"},{default:j((()=>[(v(!0),f($,null,z(x(n),(e=>(v(),w(o,{key:e.value,label:e.label,value:e.label},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),y(r,{prop:"username"},{default:j((()=>[y(i,{"prefix-icon":e.User,modelValue:x(b).username,"onUpdate:modelValue":l[1]||(l[1]=e=>x(b).username=e),size:"large"},null,8,["prefix-icon","modelValue"])])),_:1}),y(r,{prop:"password"},{default:j((()=>[y(i,{type:"password","prefix-icon":e.Lock,modelValue:x(b).password,"onUpdate:modelValue":l[2]||(l[2]=e=>x(b).password=e),"show-password":"",size:"large"},null,8,["prefix-icon","modelValue"])])),_:1}),y(r,null,{default:j((()=>[y(I,{ref_key:"sliderVerification",ref:B},null,512)])),_:1}),y(r,{class:"login-select"},{default:j((()=>[y(d,{modelValue:x(m),"onUpdate:modelValue":l[3]||(l[3]=e=>M(m)?m.value=e:m=e),label:e.$t("common.RememberMe"),size:"large"},null,8,["modelValue","label"]),g("div",null,k(e.$t("common.ForgotPassword")),1)])),_:1}),y(r,null,{default:j((()=>[y(V,{class:"login_btn",type:"primary",onClick:Z,loading:x(c),size:"default"},{default:j((()=>[S(k(e.$t("common.Login")),1)])),_:1},8,["loading"])])),_:1}),y(r,null,{default:j((()=>[g("div",O,[y(V,{plain:"",size:"default",style:{width:"47%"}},{default:j((()=>[S(k(e.$t("common.PhoneLogin")),1)])),_:1}),y(V,{plain:"",size:"default",style:{width:"47%"}},{default:j((()=>[S(k(e.$t("common.ScanPayLogin")),1)])),_:1})])])),_:1}),y(r,null,{default:j((()=>[g("div",W,[X,g("div",null,k(e.$t("common.OtherLogin")),1),q])])),_:1})])),_:1},8,["model"])])])])])}}}),[["__scopeId","data-v-6ce787a4"]]);export{B as default};
