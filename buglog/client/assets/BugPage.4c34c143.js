import{r as t,x as e,c as a,p as l,e as s,j as o,d as c,o as n,a as i,b as d,t as u,g as r,w as b,f as g,v as m,F as y,h as f}from"./vendor.4052a4f5.js";import{b as p,P as x,n as v,A as h}from"./index.55cafa43.js";const k={setup(){const l=o(),s=t({bugId:l.params.bugId,createNote:{bugId:l.params.bugId}});return e((async()=>{try{await p.getBugById(s.bugId)}catch(t){x.toast(t,"error")}})),e((async()=>{try{await v.getNotesByBugId(s.bugId)}catch(t){x.toast(t,"error")}})),{state:s,account:a((()=>h.account)),bug:a((()=>h.thisBug)),notes:a((()=>h.notes)),async create(){try{await v.createNote(s.createNote),s.createNote={bugId:s.bugId},x.toast("Created Note Successfully","success")}catch(t){x.toast(t,"error")}},async closeBug(){try{await x.confirm("Are you sure you want to close this bug?","You won't be able to revert this!","warning","Yes, close it!")&&(await p.closeBug(s.bugId),x.toast("Closed Bug Successfully","success"))}catch(t){x.toast(t,"error")}}}}},w=f();l("data-v-c60416fe");const B={key:0,class:"home container-fluid flex-grow-1 bg-dark d-flex flex-column"},I={class:"row"},N={class:"col-12 pt-2 d-flex justify-content-between"},j={class:"text-left text-break"},C={key:0},S={key:1,class:"btn btn-secondary mobile-off","data-toggle":"modal","data-target":"#edit-bug",title:"Edit This Bug"},$={key:0,class:"col-12 d-flex justify-content-start"},A={key:1,class:"btn btn-secondary mobile-on","data-toggle":"modal","data-target":"#edit-bug",title:"Edit This Bug"},E={class:"col-12"},T={class:"row"},U={class:"col-12 pt-3 pb-2 padding-l-s"},D={key:0,class:"row text-left justify-content-between"},F={class:"col-md-6 col-lg-4 py-2 d-flex align-items-end"},M={class:"pl-2 text-break align-items-center justify-content-end"},Y=d("h5",{class:""},"Reported By",-1),_={class:""},q={class:"col-6 col-md-2 d-flex py-2 flex-column lign-items-center justify-content-end pt-2"},L=d("h5",{class:""},"Last Updated",-1),O={key:0,class:"col-6 col-md-2 d-flex align-items-center justify-content-end pt-2 .ml-md-auto"},P=d("div",{class:"text-right"},[d("h5",{class:""},[d("em",null,"Status")]),d("p",null,[d("i",null,"Closed")])],-1),R={key:1,class:"col-6 col-md-2 d-flex align-items-end justify-content-end pt-2 .ml-md-auto"},V={key:0,class:"d-flex"},z=d("h2",{class:"px-2 pb-3"},"🔴",-1),G=d("div",{class:"d-flex flex-column justify-content-end"},[d("h5",{class:" "},[d("em",null,"Status")]),d("p",{class:""},"Open")],-1),H={class:"col-12 py-4"},J={key:2,class:"col-12 d-flex justify-content-center"},K={class:"form-group"},Q=d("label",{class:"",for:"note-body"},"Add Note",-1),W={key:0,type:"submit",id:"create-note-button",class:"btn btn-success mr-3",title:"Submit note","aria-label":"Submit note"},X={class:"col-12"};s();const Z=w(((t,e,a,l,s,o)=>{const f=c("NoteThread"),p=c("EditBugModal"),x=c("AddBugModal");return n(),i(y,null,[l.bug?(n(),i("div",B,[d("div",I,[d("div",N,[d("h1",j,u(l.bug.title),1),l.account&&l.account.id&&l.bug.creator?(n(),i("div",C,[l.account&&l.account.id===l.bug.creator.id&&!l.bug.closed?(n(),i("button",{key:0,onClick:e[1]||(e[1]=(...t)=>l.closeBug&&l.closeBug(...t)),class:"btn btn-primary text-dark mr-2 mobile-off",title:`Close ${l.bug.title}`,"aria-label":`Close ${l.bug.title}`},"Close Bug",8,["title","aria-label"])):r("",!0),l.account&&l.account.id===l.bug.creator.id&&!l.bug.closed?(n(),i("button",S,"Edit")):r("",!0)])):r("",!0)]),l.account&&l.account.id&&l.bug.creator?(n(),i("div",$,[l.account&&l.account.id===l.bug.creator.id&&!l.bug.closed?(n(),i("button",{key:0,onClick:e[2]||(e[2]=(...t)=>l.closeBug&&l.closeBug(...t)),class:"btn btn-primary text-dark mr-2 mobile-on",title:`Close ${l.bug.title}`,"aria-label":`Close ${l.bug.title}`},"Close Bug",8,["title","aria-label"])):r("",!0),l.account&&l.account.id===l.bug.creator.id&&!l.bug.closed?(n(),i("button",A,"Edit")):r("",!0)])):r("",!0),d("div",E,[d("div",T,[d("div",U,[l.bug.creator?(n(),i("div",D,[d("div",F,[d("img",{class:"image-circle mr-2 creator-image",src:l.bug.creator.picture,alt:l.bug.creator.name},null,8,["src","alt"]),d("div",M,[Y,d("p",_,[d("em",null,u(l.bug.creator.name),1)])])]),d("div",q,[L,d("p",null,[d("em",null,u(new Intl.DateTimeFormat("en-US").format(new Date(l.bug.updatedAt))),1)])]),l.bug.closed?(n(),i("div",O,[d("h2",{class:"px-2",title:`${l.bug.title} is closed`,"aria-label":`${l.bug.title} is closed`}," 🟢",8,["title","aria-label"]),P])):(n(),i("div",R,[l.account.name===l.bug.creator.name?(n(),i("div",V,[z])):(n(),i("h2",{key:1,class:"px-2 pb-3",title:`${l.bug.title} is open`,"aria-label":`${l.bug.title} is open`},"🔴",8,["title","aria-label"])),G])),d("div",H,[d("p",null,u(l.bug.description),1)]),l.account.name&&!l.bug.closed?(n(),i("div",J,[d("form",{onSubmit:e[4]||(e[4]=b(((...t)=>l.create&&l.create(...t)),["prevent"]))},[d("div",K,[Q,g(d("textarea",{id:"note-body",class:"form-control",placeholder:"New note...",maxlength:"1000","onUpdate:modelValue":e[3]||(e[3]=t=>l.state.createNote.body=t),required:"",title:"Add text to create a new note","aria-label":"Add text to create a new note"},null,512),[[m,l.state.createNote.body]])]),d("div",null,[l.state.createNote.body?(n(),i("button",W," Save Note ")):r("",!0)])],32)])):r("",!0)])):r("",!0)])])]),d("div",X,[d(f,{notes:l.notes},null,8,["notes"])])])])):r("",!0),d(p),d(x)],64)}));k.render=Z,k.__scopeId="data-v-c60416fe";export default k;