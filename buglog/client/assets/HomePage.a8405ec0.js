import{b as e,P as s,A as l}from"./index.55cafa43.js";import{r as t,x as a,c as o,p as n,e as i,d as c,o as d,a as r,b as u,t as b,g as p,F as g,h as f}from"./vendor.4052a4f5.js";const m={setup(){const n=t({isOpen:!1});return a((async()=>{try{await e.getAll()}catch(l){s.toast(l,"error")}})),{state:n,account:o((()=>l.account)),bugs:o((()=>l.bugs)),filterOpen(){n.isOpen=!n.isOpen}}}},v=f();n("data-v-bbe078ee");const O={class:"home container-fluid bg-dark flex-grow-1 d-flex flex-column"},w={class:"row"},y={class:"my-2 col-12 py-3 px-4"},x={class:"row justify-content-between"},B=u("div",{class:"col-md-3 pb-2"},[u("h2",{class:"text-left"},"Bugs")],-1),h={class:"col-6 col-md-2"},A={class:"col-6 col-md-2"},k={key:0,class:"btn btn-secondary","data-toggle":"modal","data-target":"#create-bug",title:"Create New Bug"},V=u("div",{class:"mobile-off col-md-4 pb-2"},[u("h3",null,[u("b",null,"Title")])],-1),j=u("div",{class:"mobile-off col-md-4 pb-2"},[u("h3",null,[u("b",null,"Reported By")])],-1),F=u("div",{class:"mobile-off col-md-4 pb-2"},[u("h3",null,[u("b",null,"Last Updated")])],-1),C={class:"col-12"},T={key:0},_={key:1};i();const I=v(((e,s,l,t,a,o)=>{const n=c("BugThread"),i=c("AddBugModal");return d(),r(g,null,[u("div",O,[u("div",w,[u("div",y,[u("div",x,[B,u("div",h,[u("button",{class:"btn btn-primary text-dark",onClick:s[1]||(s[1]=(...e)=>t.filterOpen&&t.filterOpen(...e)),title:"Filter to "+(t.state.isOpen?"View All":"View Open Bugs"),"aria-label":"Filter to "+(t.state.isOpen?"View All":"View Open Bugs")},b(t.state.isOpen?"View All":"View Open Bugs"),9,["title","aria-label"])]),u("div",A,[t.account.name?(d(),r("button",k,"Add Bug")):p("",!0)])])]),V,j,F,u("div",C,[t.state.isOpen?(d(),r("div",T,[u(n,{bugs:t.bugs.filter((e=>!e.closed))},null,8,["bugs"])])):(d(),r("div",_,[u(n,{bugs:t.bugs},null,8,["bugs"])]))])])]),u(i)],64)}));m.render=I,m.__scopeId="data-v-bbe078ee";export default m;
