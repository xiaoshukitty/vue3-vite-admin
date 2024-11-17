import{b as e,u as t}from"./vue-router-d38bbf22.js";import{u as l,a,s,_ as o,b as n,t as i,G as r,c,S as d,d as u,e as m}from"./index-5033e026.js";import{d as h,u as v,o as p,c as f,a as b,T as k,J as _,I as g,R as y,_ as x,ai as w,a8 as C,F as j,M as L,O as M,U as R,Q as I,b as V,e as E,W as D,n as S,k as T,az as B,aA as z,S as U,P as $,V as F,a2 as H,j as P,ae as q}from"./@vue-a21e81cd.js";import{a as A}from"./js-cookie-8253c38e.js";import{a as N,E as X}from"./element-plus-83115361.js";import{u as G}from"./vue-i18n-d0c7eaaf.js";import{d as O}from"./pinia-50921885.js";import"./nprogress-6f80ecd0.js";import"./dayjs-d97fcf3a.js";import"./axios-7b293c88.js";import"./@element-plus-01464a9f.js";import"./lodash-es-e58ab31e.js";import"./@vueuse-bc52eeb5.js";import"./@popperjs-b696b006.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-96c4c0ad.js";import"./@intlify-e89ab06e.js";const W=["src"],J=o(h({name:"Logo",setup(e){const t=l();let o=a();return(e,l)=>v(s).logoHidden?(p(),f("div",{key:0,class:g(["logo","dark"===v(t).theme?"logo-theme":""])},[b("img",{src:v(s).logo,alt:""},null,8,W),b("p",{style:_(v(o).fold?"display:none":"display:block")},k(v(s).title),5)],2)):y("",!0)}}),[["__scopeId","data-v-e09183e6"]]),Q=h({name:"Menu",props:["menuList"],setup(t){const{addLabelRoute:l}=n(),{labelIndex:a}=x(n());e();return(e,s)=>{const o=w("el-icon"),n=w("el-menu-item"),i=w("Menu"),r=w("el-sub-menu");return p(!0),f(j,null,C(t.menuList,(e=>(p(),f(j,{key:e.path},[e.children?y("",!0):(p(),f(j,{key:0},[e.meta.hidden?y("",!0):(p(),L(n,{key:0,index:e.path,onClick:t=>(e=>{a.value=e.path,l(e)})(e)},{title:M((()=>[b("span",null,k(e.meta.title),1)])),default:M((()=>[R(o,null,{default:M((()=>[(p(),L(I(e.meta.icon)))])),_:2},1024)])),_:2},1032,["index","onClick"]))],64)),e.children&&e.children.length>0?(p(),L(r,{key:1,index:e.path},{title:M((()=>[R(o,null,{default:M((()=>[(p(),L(I(e.meta.icon)))])),_:2},1024),b("span",null,k(e.meta.title),1)])),default:M((()=>[R(i,{menuList:e.children},null,8,["menuList"])])),_:2},1032,["index"])):y("",!0)],64)))),128)}}}),Y=o(h({__name:"index",setup(e){let t=a(),l=V(!0);return E((()=>t.refsh),(()=>{l.value=!1,S((()=>{l.value=!0}))})),(e,t)=>{const a=w("router-view");return p(),L(a,null,{default:M((({Component:e})=>[R(D,{name:"fade"},{default:M((()=>[v(l)?(p(),L(I(e),{key:0})):y("",!0)])),_:2},1024)])),_:1})}}}),[["__scopeId","data-v-b16348d9"]]),K=e=>(B("data-v-3a8501b8"),e=e(),z(),e),Z={class:"content"},ee={key:0,class:"content-list"},te=K((()=>b("h3",null,"主题",-1))),le=K((()=>b("div",null,"主题",-1))),ae={class:"built-theme"},se=K((()=>b("h3",null,"内置主题",-1))),oe={class:"theme-color"},ne=["onClick"],ie={class:"theme-text"},re=o(h({__name:"index",props:{isDrawer:{type:Boolean,default:!1}},emits:["close"],setup(e,{emit:t}){let a=l();const s=V("rtl"),o=V(!1),n=V("25%");let u=V(0),m=V(0),h=V(!1);const x=e,I=V("外观"),D=t;E((()=>x.isDrawer),(e=>{o.value=e}),{immediate:!0});const S=T((()=>({"--background-color-hover":i[u.value].color})));let B=document.documentElement;"dark"==r("THEME")?(B.className="dark",h.value=!0):(B.className="",h.value=!1);const z=e=>{h.value=!h.value;const t=document.startViewTransition((()=>{h.value?(B.className="dark",a.theme="dark",d("THEME","dark")):(B.className="",a.theme="light",d("THEME","light"))})),l=e.clientX,s=e.clientY,o=Math.hypot(Math.max(l,window.innerWidth-l),Math.max(s,window.innerHeight-s));t.ready.then((()=>{document.documentElement.animate({clipPath:[`circle(0% at ${l}px ${s}px)`,`circle(${o}px at  ${l}px ${s}px)`]},{duration:600,pseudoElement:"::view-transition-new(root)"})}))},U=()=>{D("close",!1)};return(e,t)=>{const l=w("el-segmented"),r=w("ThemeSwitch"),d=w("el-drawer");return p(),L(d,{modelValue:o.value,"onUpdate:modelValue":t[1]||(t[1]=e=>o.value=e),direction:s.value,"close-on-click-modal":"",onClose:U,size:n.value,class:g(["dark"===v(a).theme?"drawer-theme":""])},{header:M((()=>[b("h4",{class:g(["dark"===v(a).theme?"h4-theme":""])},"主题配置",2)])),default:M((()=>[b("div",Z,[b("div",{class:g(["tab-border","dark"===v(a).theme?"tab-theme":""])},[R(l,{modelValue:I.value,"onUpdate:modelValue":t[0]||(t[0]=e=>I.value=e),options:v(c),class:"custom-style"},null,8,["modelValue","options"])],2),b("div",null,[0==v(m)?(p(),f("div",ee,[b("div",null,[te,b("div",{class:g(["line","dark"===v(a).theme?"line-theme":""])},[le,R(r,{MoveRound:v(h),"onUpdate:themeSwitch":z},null,8,["MoveRound"])],2)]),b("div",ae,[se,b("div",oe,[(p(!0),f(j,null,C(v(i),((e,t)=>(p(),f("div",{id:"weight-theme",class:"theme-list",key:t},[b("div",{class:g(["theme-item",v(u)==t?"active-color":"","dark"===v(a).theme?"theme-item-theme":""]),style:_([{border:v(u)==t?"2px solid "+e.color:""},S.value]),onClick:e=>(e=>{u.value=e})(t)},[b("div",{class:"theme-item-box",style:_({background:e.color})},null,4)],14,ne),b("div",ie,k(e.name),1)])))),128))])])])):y("",!0)])])])),_:1},8,["modelValue","direction","size","class"])}}}),[["__scopeId","data-v-3a8501b8"]]),ce={class:"lock-dialog"},de={class:"lock-img"},ue=["src"],me=(e=>(B("data-v-f9ceb3db"),e=e(),z(),e))((()=>b("div",{class:"lock-name"}," 小小舒 ",-1))),he={class:"lock-ipt"},ve={class:"lock-btn"},pe=o(h({__name:"index",props:{isLockDialog:{type:Boolean,default:!1}},emits:["close"],setup(l,{emit:a}){const o=V(""),n=V(!1),i=e(),r=t(),c=l,d=a;E((()=>c.isLockDialog),(e=>{n.value=e}),{immediate:!0});const u=()=>{d("close",!1)},m=()=>{o.value&&(A.set("lastLockscreen",r.fullPath),A.set("lockStatus","1"),i.push({path:"/lockscreen",query:{unlockPassword:o.value}}))};return(e,t)=>{const l=w("el-input"),a=w("el-button"),i=w("el-dialog");return p(),L(i,{modelValue:n.value,"onUpdate:modelValue":t[1]||(t[1]=e=>n.value=e),title:"锁定屏幕",width:"500","before-close":u,onClose:u,style:{"border-radius":"1.25rem"}},{default:M((()=>[b("div",ce,[b("div",de,[b("img",{src:v(s).logo,alt:"Logo"},null,8,ue)]),me,b("div",he,[R(l,{type:"password","prefix-icon":e.Lock,modelValue:o.value,"onUpdate:modelValue":t[0]||(t[0]=e=>o.value=e),"show-password":"",placeholder:"请输入锁屏密码"},null,8,["prefix-icon","modelValue"])]),b("div",ve,[R(a,{type:"primary",style:{width:"100%"},onClick:m},{default:M((()=>[U(" 确定 ")])),_:1})])])])),_:1},8,["modelValue"])}}}),[["__scopeId","data-v-f9ceb3db"]]),fe=e=>(B("data-v-ce32dde1"),e=e(),z(),e),be={class:"icon-btn"},ke={class:""},_e={class:"d-flex ai-center"},ge=["src"],ye=fe((()=>b("span",null,null,-1))),xe={class:"user-info"},we={class:"user-img"},Ce=["src"],je=fe((()=>b("span",null,null,-1))),Le=fe((()=>b("div",{class:g(["user-name","d-flex","j-center","f-cloumn","ml-10"])},[b("div",{class:"fw-500"},"Xiaoshu"),b("div",{style:{color:"#71717a","font-size":".75rem","line-height":"1rem"}},"https:xiaoshukitty")],-1))),Me=o(h({name:"Setting",setup(a){let o=l(),n=e(),i=t();const r=V(!1),c=u();let d=V(!1);const m=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},h=()=>{d.value=!0},k=e=>{d.value=e},_=()=>{N.confirm("是否退出登录?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((()=>{c.logout(),sessionStorage.removeItem("visited"),n.push({path:"/",query:{redirect:i.path}}),X({type:"success",message:"Delete completed"})})).catch((()=>{X({type:"info",message:"Delete canceled"})}))},y=()=>{r.value=!0},x=e=>{r.value=e};return(e,t)=>{const l=w("FullScreen"),a=w("el-icon"),n=w("Aim"),i=w("SwitchFilled"),c=w("Lock"),u=w("SwitchButton"),C=w("el-dropdown");return p(),f(j,null,[b("div",be,[b("div",{class:g(["icon-hover","mr-5","dark"===v(o).theme?"breadcriumb-theme":""]),onClick:m},[R(a,{class:"fs-18"},{default:M((()=>[R(l)])),_:1})],2),b("div",{class:g(["icon-hover","dark"===v(o).theme?"breadcriumb-theme":""]),onClick:y},[R(a,{class:"fs-18"},{default:M((()=>[R(n)])),_:1})],2)]),b("div",ke,[R(C,{trigger:"click"},{dropdown:M((()=>[b("div",xe,[b("div",{class:g(["user-top","d-flex","ai-center","b-bottom","dark"===v(o).theme?"setting-theme":""])},[b("div",we,[b("img",{src:v(s).logo,alt:""},null,8,Ce),je]),Le],2),b("div",{class:g(["user-bottom","b-bottom","dark"===v(o).theme?"setting-theme":""])},[b("div",{class:g(["user-bottom-line ","d-flex ai-center","dark"===v(o).theme?"user-hover":""])},[R(a,{class:"mr-5"},{default:M((()=>[R(i)])),_:1}),U("Github ")],2),b("div",{class:g(["user-bottom-line ","d-flex ai-center","dark"===v(o).theme?"user-hover":""]),onClick:h},[R(a,{class:"mr-5"},{default:M((()=>[R(c)])),_:1}),U("锁定屏幕 ")],2)],2),b("div",{class:g(["user-bottom","b-bottom","dark"===v(o).theme?"setting-theme":""])},[b("div",{class:g(["user-bottom-line ","d-flex ai-center","dark"===v(o).theme?"user-hover":""]),onClick:_},[R(a,{class:"mr-5"},{default:M((()=>[R(u)])),_:1}),U("退出登录")],2)],2)])])),default:M((()=>[b("div",_e,[b("div",{class:g(["img-hover","dark"===v(o).theme?"img-hover-theme":""])},[b("img",{src:v(s).logo,alt:""},null,8,ge),ye],2)])])),_:1})]),R(re,{isDrawer:r.value,onClose:x},null,8,["isDrawer"]),R(pe,{isLockDialog:v(d),onClose:k},null,8,["isLockDialog"])],64)}}}),[["__scopeId","data-v-ce32dde1"]]),Re={class:"icon-btn"},Ie={class:"d-flex ai-center"},Ve=o(h({name:"Breadcrumb",setup(e){let s=l(),o=a();t(),V(!1);const n=()=>{o.fold=!o.fold},i=()=>{o.refsh=!o.refsh};return(e,t)=>{const l=w("el-icon"),a=w("el-breadcrumb-item"),o=w("el-breadcrumb");return p(),f(j,null,[b("div",Re,[b("div",{class:g(["icon-hover","mr-5","dark"===v(s).theme?"breadcriumb-theme":""]),onClick:n},[R(l,{class:"fs-18"},{default:M((()=>[(p(),L(I("Operation")))])),_:1})],2),b("div",{class:g(["icon-hover","dark"===v(s).theme?"breadcriumb-theme":""]),onClick:i},[R(l,{class:"fs-18"},{default:M((()=>[(p(),L(I("Refresh")))])),_:1})],2)]),R(o,{"separator-icon":"ArrowRight"},{default:M((()=>[(p(!0),f(j,null,C(e.$route.matched,((e,t)=>$((p(),L(a,{key:t,onClick:e=>{},to:e.path},{default:M((()=>[b("div",Ie,[R(l,{class:"fs-18"},{default:M((()=>[(p(),L(I(e.meta.icon)))])),_:2},1024),b("span",{class:g(["dark"===v(s).theme?"breadcriumb-theme-span":""]),style:{margin:"0 .3125rem",color:"#71717a"}},k(e.meta.title),3)])])),_:2},1032,["onClick","to"])),[[F,e.meta.title]]))),128))])),_:1})],64)}}}),[["__scopeId","data-v-78c97fbf"]]),Ee={class:"tabbar"},De={class:"tabbar_left"},Se={class:"tabbar_right"},Te=o(h({name:"Tabbar",setup:e=>(e,t)=>(p(),f("div",Ee,[b("div",De,[R(Ve)]),b("div",Se,[R(Me)])]))}),[["__scopeId","data-v-51728df8"]]),Be={class:"label-page"},ze={class:"left-lable fs-14"},Ue={class:"d-flex left-lable-content"},$e=["onClick","onContextmenu"],Fe=(e=>(B("data-v-4aa53323"),e=e(),z(),e))((()=>b("div",{class:"right-labl"},"右",-1))),He=o(h({__name:"index",setup(e){const{closeLabelRoute:t,skipRouter:a}=n(),{labelIndex:s,labelRouteList:o}=x(n());G();let i=l();const r=V();let c=V("");return(e,l)=>{const n=w("el-icon"),d=w("Close"),u=w("ContextMenu");return p(),f(j,null,[b("div",Be,[b("div",ze,[b("div",Ue,[(p(!0),f(j,null,C(v(o),((e,l)=>(p(),f("div",{key:l,onClick:t=>(e=>{a(e)})(e),onContextmenu:t=>{return a=e,(l=t).preventDefault(),r.value.showMenu(l,a),void(c.value="labelPage");var l,a},class:g(["left-lable-text","d-flex","ai-center","label-hover","dark"===v(i).theme?"label-theme-hover":"",v(s)===e.path?"dark"===v(i).theme?"label-theme-active":"label-active":""])},[R(n,{class:"fs-16 mr-5"},{default:M((()=>[(p(),L(I(e.meta.icon)))])),_:2},1024),U(" "+k(e.meta.title)+" ",1),v(o).length>1?(p(),L(n,{key:0,class:"label-page-icon",onClick:H((l=>(e=>{t(e)})(e)),["stop"])},{default:M((()=>[R(d)])),_:2},1032,["onClick"])):y("",!0)],42,$e)))),128))])]),Fe]),R(u,{ref_key:"contextMenu",ref:r,routerType:v(c)},null,8,["routerType"])],64)}}}),[["__scopeId","data-v-4aa53323"]]),Pe={class:"copyright"},qe=o(h({__name:"index",setup(e){const t=l();return(e,l)=>(p(),f("div",Pe,[b("div",{class:g(["copyright-center","dark"===v(t).theme?"copyright-theme":""])}," Copyright © 2024 Xiao Shu All Rights Reserved ",2)]))}}),[["__scopeId","data-v-27583a6b"]]),Ae=O("menu",{state:()=>({menuRoutes:[]}),actions:{generateMenus(e){const t=Ne(m,e);this.menuRoutes=t}}}),Ne=(e,t)=>e.map((e=>(e.children&&(e.children=Ne(e.children,t)),e.meta&&e.meta.roles&&!e.meta.roles.includes(t)?null:e))).filter(Boolean),Xe=Ae,Ge={class:"layout_container"},Oe={class:"layout_box"},We={class:"layout-header"},Je={style:{flex:"1 1 auto"},class:"layout_main_content"},Qe={style:{flex:"0 0 auto"}},Ye=o(h({name:"Layout",setup(e){const s=l(),o=Xe(),i=u();let r=a();const{addLabelRoute:c}=n(),{labelIndex:d}=x(n());let m=t(),h=V([]);P((()=>{d.value=m.path,c(q(m)),o.generateMenus(i.userRole),h.value=o.menuRoutes}));const k=T((()=>"dark"===s.theme?"#1c1e23":"#fff")),_=T((()=>"dark"===s.theme?"#fafafa":"#323639")),y=T((()=>"dark"===s.theme?"#ffd04b":"#006be6"));return(e,t)=>{const l=w("el-menu"),a=w("el-scrollbar");return p(),f("div",Ge,[b("div",{class:g(["layout_slider","dark"===v(s).theme?"slider-theme":""])},[R(J),R(a,{class:"scrollbar"},{default:M((()=>[R(l,{class:"el-menu-vertical-demo",collapse:!!v(r).fold,"default-active":v(m).path,"background-color":k.value,"text-color":_.value,"active-text-color":y.value,router:"","unique-opened":!0},{default:M((()=>[R(Q,{menuList:v(h)},null,8,["menuList"])])),_:1},8,["collapse","default-active","background-color","text-color","active-text-color"])])),_:1})],2),b("div",Oe,[b("div",We,[b("header",{class:g(["layout_tabbar","dark"===v(s).theme?"header-theme":""])},[R(Te)],2),b("section",{class:g(["layout-label","dark"===v(s).theme?"label-theme":""])},[R(He)],2)]),b("main",{class:g(["layout_main","dark"===v(s).theme?"":"main-theme"])},[b("div",Je,[R(Y)]),b("div",Qe,[R(qe)])],2)])])}}}),[["__scopeId","data-v-3e73bf34"]]);export{Ye as default};
