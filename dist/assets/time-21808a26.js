const e=()=>{let e="",t=(new Date).getHours();return e=t<=9?"早上":t<=12?"上午":t<=18?"下午":"晚上",e},t=(e,t)=>({"yyyy-MM-dd":()=>{const e=a();if(t)return(new Date).toLocaleDateString().replace(/\//g,"-")+" "+e},"yyyy-MM-dd HH:mm:ss":()=>(new Date).toLocaleString().replace(/\//g,"-")}[e]()),a=()=>["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][(new Date).getDay()];export{t as a,e as g};
