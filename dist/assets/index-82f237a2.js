import{u as a,h as s,_ as r}from"./index-5033e026.js";import{d as e,Z as t,b as o,c as i,a as l,F as n,a8 as m,I as p,u as d,o as g,J as u,T as c}from"./@vue-a21e81cd.js";import"./element-plus-83115361.js";import"./lodash-es-e58ab31e.js";import"./@vueuse-bc52eeb5.js";import"./@element-plus-01464a9f.js";import"./@popperjs-b696b006.js";import"./@ctrl-91de2ec7.js";import"./dayjs-d97fcf3a.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-96c4c0ad.js";import"./vue-router-d38bbf22.js";import"./pinia-50921885.js";import"./vue-i18n-d0c7eaaf.js";import"./@intlify-e89ab06e.js";import"./nprogress-6f80ecd0.js";import"./js-cookie-8253c38e.js";import"./axios-7b293c88.js";const v={class:"drag-list"},j=["onDragstart","onDrop","onDragenter"],D=r(e({__name:"index",setup(r){const e=a(),D=t(Array.from({length:32},((a,r)=>({id:r+1,bgColor:s()})))),f=o(null);return(a,s)=>(g(),i("div",{class:p(["cardDrag","dark"===d(e).theme?"cardDrag-theme":""])},[l("div",v,[(g(!0),i(n,null,m(D,((a,r)=>(g(),i("div",{class:"drag-item",key:a.id,draggable:!0,onDragstart:a=>((a,s)=>{var r,e;f.value=s,null==(r=a.dataTransfer)||r.setData("text/plain",s.toString()),null==(e=a.target)||e.classList.add("dragging")})(a,r),onDragover:s[0]||(s[0]=a=>{a.preventDefault()}),onDrop:a=>((a,s)=>{if(a.preventDefault(),null!==f.value&&f.value!==s){const a=D[f.value];D.splice(f.value,1),D.splice(s,0,a)}f.value=null})(a,r),onDragenter:a=>(a=>{a.preventDefault();const s=a.target;s&&s.classList.contains("drag-item")&&s.classList.add("drag-over")})(a),onDragleave:s[1]||(s[1]=a=>(a=>{const s=a.target;s&&s.classList.contains("drag-item")&&s.classList.remove("drag-over")})(a)),onDragend:s[2]||(s[2]=a=>(a=>{const s=a.target;null==s||s.classList.remove("dragging"),document.querySelectorAll(".drag-item").forEach((a=>a.classList.remove("drag-over")))})(a)),style:u({backgroundColor:a.bgColor})},[l("span",null,"按住拖拽"+c(a.id),1)],44,j)))),128))])],2))}}),[["__scopeId","data-v-a1aa114a"]]);export{D as default};
