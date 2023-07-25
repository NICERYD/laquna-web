import{_ as e,r as t,aw as s,R as a,B as l,D as i,E as d,h as o,F as r,bB as n,S as c,bq as m,G as f,H as x,L as p,N as u,O as g}from"./index.72a7fa6d.js";import{c as b}from"./crm-lead.bf1eb679.js";import{T as v}from"./TableLite.4914c265.js";import{V as h}from"./VContainer.9865dee0.js";import{V as w,a as y}from"./VRow.9f03b413.js";import{V as k}from"./VDivider.d23a0936.js";import{V as _}from"./VBtn.55001947.js";const j="rgba(var(--v-theme-primary))",F={series:[{name:"Leads",data:[10,30,85,49,55,35,60]},{name:"Customers",data:[50,34,45,79,35,70,120]}],chartOptions:{chart:{height:250,width:"100%",type:"line",dropShadow:{enabled:!1,color:"#000",top:18,left:7,blur:10,opacity:.2},toolbar:{show:!1},stacked:!1},colors:[j,"#FFC675"],dataLabels:{enabled:!1},stroke:{curve:"smooth"},grid:{show:!1},markers:{size:1},xaxis:{axisBorder:{show:!1},axisTicks:{show:!1},categories:["Jan","Feb","Mar","Apr","May","Jun","Jul"],labels:{style:{colors:"#88A6C9",fontFamily:"Montserrat, sans-serif",fontWeight:500}}},yaxis:{axisBorder:{show:!1},axisTicks:{show:!1},labels:{style:{colors:"#88A6C9",fontFamily:"Montserrat, sans-serif",fontWeight:500}},min:5,max:120},legend:{position:"top",horizontalAlign:"center"}}},z={series:[44,55,41,17],chartOptions:{colors:["#E5F3FD","#FFC675","#8C8DFF","#FE8969"],chart:{type:"donut",height:"100%",width:"100%"},legend:{position:"bottom",background:"transparent",sparkline:{enabled:!0},fontFamily:"Montserrat, sans-serif",horizontalAlign:"center",fontSize:"13px",fontWeight:500},dataLabels:{enabled:!1},labels:["In Progress","On Hold","Upcoming","Completed"],responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}]}},L={series:[{name:"Inflation",data:[50,60,70,90,70,60,50]}],chartOptions:{colors:j,chart:{stacked:!0,height:280,width:"100%",toolbar:{show:!1},fontFamily:"Montserrat, sans-serif",type:"bar"},plotOptions:{bar:{columnWidth:"30%",borderRadius:8,dataLabels:{position:"top"}}},dataLabels:{enabled:!1,formatter:function(e){return e+"%"},offsetY:-20,style:{fontSize:"12px",colors:["#304758"]}},grid:{show:!1},xaxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],axisBorder:{show:!1},axisTicks:{show:!1},crosshairs:{fill:{type:"gradient",gradient:{colorFrom:"#D8E3F0",colorTo:"#BED1E6",stops:[0,100],opacityFrom:.4,opacityTo:.5}}},labels:{show:!1},tooltip:{enabled:!0}},yaxis:{axisBorder:{show:!1},axisTicks:{show:!1},labels:{show:!1,formatter:function(e){return e+"%"}}},title:{text:"",floating:!0,offsetY:330,align:"center",style:{color:"#444"}}}},O=e=>(u("data-v-195f7f21"),e=e(),g(),e),C={class:"d-flex justify-center justify-md-space-between"},S=O((()=>r("div",{class:"flex-1"},[r("div",{class:"text-body-2 font-weight-bold"},"Leads Converteds"),r("div",{class:"text-h5 text-primary font-weight-bold mb-4"},"80%"),r("div",{class:"d-flex align-center"},[r("div",{class:"bg-primary-lighten-5 d-inline-flex rounded-circle px-2 py-2 me-2"},[r("i",{class:"tio-chart_pie_1 text-primary"})]),r("div",{class:"body-text-2 f-600 text-primary"},"56 out of 70")])],-1))),E={class:"flex-1 d-none d-sm-block"},T={class:"d-flex justify-space-between flex-wrap align-center"},D=O((()=>r("div",{class:"d-flex align-center ma-3"},[r("div",{class:"rounded-lg me-3 bg-primary pa-2"},[r("i",{class:"text-white text-20 tio-"},"money")]),r("div",null,[r("div",{class:"body-text-2 f-600"},"Invoice Payments"),r("div",{class:"text-18 f-600 text-primary"},"80")])],-1))),P=O((()=>r("div",{class:"d-flex align-center ma-3"},[r("div",{class:"rounded-lg me-3 bg-info pa-2"},[r("i",{class:"text-white text-20 tio-"},"cloud_on")]),r("div",null,[r("div",{class:"body-text-2 f-600"},"Project In Progress"),r("div",{class:"text-18 f-600 text-info"},"150")])],-1))),A=O((()=>r("div",{class:"d-flex align-center ma-3"},[r("div",{class:"rounded-lg me-3 bg-error pa-2"},[r("i",{class:"text-white text-20 tio-"},"hourglass_quarter")]),r("div",null,[r("div",{class:"body-text-2 f-600"},"Task Not Finished"),r("div",{class:"text-18 f-600 text-error"},"22")])],-1))),M={class:"d-flex justify-space-between flex-wrap align-center"},V=O((()=>r("div",{class:"d-flex align-center ma-3"},[r("div",{class:"rounded-lg me-3 bg-primary pa-2",size:"36"},[r("i",{class:"text-white text-20 tio-"},"user_add")]),r("div",null,[r("div",{class:"body-text-2 f-600 text-secondary"}," New Leads "),r("div",{class:"text-18 f-600 text-primary"},"150")])],-1))),B=O((()=>r("div",{class:"d-flex align-center ma-3"},[r("div",{class:"rounded-lg me-3 bg-warning pa-2"},[r("i",{class:"text-white text-20 tio-"},"cloud_on")]),r("div",null,[r("div",{class:"body-text-2 f-600 text-secondary"}," Open Leads "),r("div",{class:"text-18 f-600 text-warning"},"200")])],-1))),N=O((()=>r("div",{class:"d-flex align-center ma-3"},[r("div",{class:"rounded-lg me-3 bg-info pa-2"},[r("i",{class:"text-white text-20 tio-"},"done")]),r("div",null,[r("div",{class:"body-text-2 f-600 text-secondary"}," Won Leads "),r("div",{class:"text-18 f-600 text-info"},"22")])],-1))),I=O((()=>r("div",{class:"d-flex align-center ma-3"},[r("div",{class:"rounded-lg me-3 bg-error pa-2"},[r("i",{class:"text-white text-20 tio-"},"error")]),r("div",null,[r("div",{class:"body-text-2 f-600 text-secondary"}," Lost Leads "),r("div",{class:"text-18 f-600 text-error"},"22")])],-1))),J={class:"d-flex flex-column"},R={class:"d-flex justify-center align-center w-100 h-100"},U=O((()=>r("div",{class:"d-flex flex-wrap justify-center justify-sm-space-between flex-wrap bg-white"},[r("div",{class:"ma-4"},[r("div",{class:"d-flex align-center p-3 mb-5"},[r("div",{class:"pa-1 bg-primary rounded-circle me-2"}),r("div",{class:"text-body-2 font-weight-bold"},"Invoice Overview")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3"},[r("p",{class:"text-primary text-caption font-weight-medium"},[f(" 6"),r("span",{class:"text-dark ms-2 text-caption font-weight-medium"},"Draft")]),r("div",{class:"text-dark text-caption font-weight-medium"},"42%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3"},[r("p",{class:"text-primary text-caption font-weight-medium"},[f(" 8"),r("span",{class:"text-dark ms-2 text-caption font-weight-medium"},"Not Sent")]),r("div",{class:"text-dark text-caption font-weight-medium"},"21%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3"},[r("p",{class:"text-primary text-caption font-weight-medium"},[f(" 3"),r("span",{class:"text-dark ms-2 text-caption font-weight-medium"},"Unpaid")]),r("div",{class:"text-caption font-weight-medium text-dark"},"14%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-primary"},[f(" 8"),r("span",{class:"text-dark ms-2"},"Overdue")]),r("div",{class:"text-dark"},"5%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-primary"},[f(" 6"),r("span",{class:"text-dark ms-2"},"Paid")]),r("div",{class:"text-dark"},"7%")])]),r("div",{class:"vertical-line h-100 d-none d-md-flex"}),r("div",{class:"ma-4"},[r("div",{class:"d-flex align-center p-3 mb-5"},[r("div",{class:"pa-1 bg-info rounded-circle me-2"}),r("div",{class:"text-body-2 font-weight-bold"}," Estimate Overview ")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-info"},[f(" 6"),r("span",{class:"text-dark ms-2"},"Draft")]),r("div",{class:"text-dark"},"42%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-info"},[f(" 8"),r("span",{class:"text-dark ms-2"},"Not Sent")]),r("div",{class:"text-dark"},"21%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-info"},[f(" 3"),r("span",{class:"text-dark ms-2"},"Unpaid")]),r("div",{class:"text-dark"},"14%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-info"},[f(" 8"),r("span",{class:"text-dark ms-2"},"Overdue")]),r("div",{class:"text-dark"},"5%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-info"},[f(" 6"),r("span",{class:"text-dark ms-2"},"Paid")]),r("div",{class:"text-dark"},"7%")])]),r("div",{class:"vertical-line h-100 d-none d-md-flex"}),r("div",{class:"ma-4"},[r("div",{class:"d-flex align-center p-3 mb-5"},[r("div",{class:"pa-1 bg-warning rounded-circle me-2"}),r("div",{class:"text-body-2 font-weight-bold"}," Proposal Overview ")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-warning"},[f(" 6"),r("span",{class:"text-dark ms-2"},"Draft")]),r("div",{class:"text-dark"},"42%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-warning"},[f(" 8"),r("span",{class:"text-dark ms-2"},"Not Sent")]),r("div",{class:"text-dark"},"21%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-warning"},[f(" 3"),r("span",{class:"text-dark ms-2"},"Unpaid")]),r("div",{class:"text-dark"},"14%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-warning"},[f(" 8"),r("span",{class:"text-dark ms-2"},"Overdue")]),r("div",{class:"text-dark"},"5%")]),r("div",{class:"d-flex justify-space-between flex-wrap mb-3 text-caption font-weight-medium"},[r("p",{class:"text-warning"},[f(" 6"),r("span",{class:"text-dark ms-2"},"Paid")]),r("div",{class:"text-dark"},"7%")])]),r("div",{class:"vertical-line h-100 d-none d-md-flex"})],-1))),W={class:"pa-4"},G=O((()=>r("div",{class:"d-flex flex-column justify-space-between align-center"},[r("div",{class:"text-caption f-600 text-primary mb-4"},"All"),r("div",{class:"text-h4 font-weight-bold text-primary"},"64"),r("div",{class:"text-caption f-600 text-primary mt-4"},"Tasks")],-1))),H={class:"bg-primary-lighten-4 flex-grow-1"},q={class:"d-flex align-center"},Y=["src"],Z={class:"text-caption f-600 text-secondary-darken-5"},K={class:"text-caption font-weight-medium text-secondary"},Q=O((()=>r("i",{class:"tio-edit text-primary text-18"},null,-1))),X=O((()=>r("i",{class:"tio-delete text-error text-18"},null,-1))),$=e({__name:"Crm",setup(e){const u=t(b),g=s({isLoading:!1,columns:[{label:"Name",field:"name",width:"20%",sortable:!1},{label:"Username",field:"username",width:"20%",sortable:!1},{label:"Email",field:"email",width:"20%",sortable:!1},{label:"Role",field:"role",width:"20%",sortable:!1},{label:"Edit",field:"edit",width:"20%",sortable:!1}],rows:[{name:{img:"/src/assets/images/faces/1.jpg",title:"Zachary Gomez"},username:"zachary-gomez",email:"zachary-gomez@gmail.com",role:"Editor"},{name:{img:"/src/assets/images/faces/2.jpg",title:"Amanda Montgomery"},username:"amanda-montgomery",email:"zachary-gomez@gmail.com",role:"Subscriber"},{name:{img:"/src/assets/images/faces/3.jpg",title:"Lester Holland"},username:"lester-holland",email:"lester75@gmail.com",role:"Subscriber"},{name:{img:"/src/assets/images/faces/4.jpg",title:"Zachary Gomez"},username:"zachary-gomez",email:"zachary-gomez@gmail.com",role:"Editor"}],totalRecordCount:0,sortable:{order:"id",sort:"asc"}});return(e,t)=>{const s=a("base-card"),b=a("apexchart"),j=a("perfect-scrollbar");return l(),i(h,null,{default:d((()=>[o(y,null,{default:d((()=>[o(w,{cols:"12",xl:"4",lg:"5"},{default:d((()=>[o(s,{class:"h-100 grid align-center"},{default:d((()=>[r("div",C,[S,r("div",E,[o(n,{class:"ms-auto","max-width":"180px",height:"100%",src:c(u)},null,8,["src"])])])])),_:1})])),_:1}),o(w,{cols:"12",xl:"8",lg:"7"},{default:d((()=>[o(s,{class:"h-100 grid"},{default:d((()=>[r("div",T,[D,o(k,{vertical:"",class:"text-secondary-lighten-4 flex-1 d-none d-md-block"}),P,o(k,{vertical:"",class:"text-secondary-lighten-4 d-none d-md-block"}),A])])),_:1})])),_:1}),o(w,{cols:"12",lg:"8"},{default:d((()=>[o(y,null,{default:d((()=>[o(w,{cols:"12"},{default:d((()=>[o(s,{class:"mb-0 h-100"},{default:d((()=>[o(m,{class:"pa-0 mb-4 text-body-2 f-600"},{default:d((()=>[f("Lead Vs Customer")])),_:1}),o(b,{type:"line",height:"350",options:c(F).chartOptions,series:c(F).series},null,8,["options","series"])])),_:1})])),_:1}),o(w,{cols:"12"},{default:d((()=>[o(s,{class:"h-100 grid"},{default:d((()=>[r("div",M,[V,o(k,{vertical:"",class:"text-secondary-lighten-4 flex-1 d-none d-md-flex"}),B,o(k,{vertical:"",class:"text-secondary-lighten-4 d-none d-md-flex"}),N,o(k,{vertical:"",class:"text-secondary-lighten-4 d-none d-md-flex"}),I])])),_:1})])),_:1})])),_:1})])),_:1}),o(w,{cols:"12",lg:"4"},{default:d((()=>[o(s,{class:"h-100 grid"},{default:d((()=>[r("div",J,[o(m,{class:"pa-0 mb-4 text-body-2 f-600"},{default:d((()=>[f("Project Status")])),_:1}),r("div",R,[o(b,{type:"donut",height:"400",options:c(z).chartOptions,series:c(z).series},null,8,["options","series"])])])])),_:1})])),_:1}),o(w,{cols:"12",lg:"8"},{default:d((()=>[o(s,{class:"h-100"},{default:d((()=>[U])),_:1})])),_:1}),o(w,{cols:"12",lg:"4"},{default:d((()=>[o(s,{class:"d-flex align-center flex-column flex-sm-row pa-0 h-100"},{default:d((()=>[r("div",W,[o(m,{class:"pa-0 mb-4 text-body-2 f-600"},{default:d((()=>[f("Project Status")])),_:1}),G]),r("div",H,[o(b,{type:"bar",height:"250",width:"100%",options:c(L).chartOptions,series:c(L).series},null,8,["options","series"])])])),_:1})])),_:1}),o(w,{cols:"12",lg:"12"},{default:d((()=>[o(s,{class:"pa-0 h-100"},{default:d((()=>[o(m,{class:"px-card mb-0 pb-0 text-body-2 f-600"},{default:d((()=>[f("Customer LIst")])),_:1}),o(j,{class:"table"},{default:d((()=>[o(c(v),{"has-checkbox":!0,"is-slot-mode":!0,columns:c(g).columns,rows:c(g).rows,total:c(g).totalRecordCount,"is-hide-paging":!0},{name:d((e=>[r("div",q,[o(x,{rounded:"",size:"46",class:"me-2"},{default:d((()=>[r("img",{src:e.value.name.img,alt:""},null,8,Y)])),_:2},1024),r("div",null,[r("div",Z,p(e.value.name.title),1),r("div",K,p(e.value.name.subTitle),1)])])])),edit:d((()=>[o(_,{flat:"",icon:"",class:"mr-2"},{default:d((()=>[Q])),_:1}),o(_,{flat:"",icon:""},{default:d((()=>[X])),_:1})])),_:1},8,["columns","rows","total"])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-195f7f21"]]);export{$ as default};
