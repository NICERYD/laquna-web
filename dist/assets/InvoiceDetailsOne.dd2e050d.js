import{_ as t,aw as e,R as a,B as s,D as i,E as o,h as l,F as n,bB as c,S as d,P as r,G as m,L as x,N as p,O as f}from"./index.72a7fa6d.js";import{T as u}from"./TableLite.4914c265.js";import{V as v}from"./VContainer.9865dee0.js";import{a as b,V as g}from"./VRow.9f03b413.js";import{V as y}from"./VBtn.55001947.js";const h=t=>(p("data-v-334ac87f"),t=t(),f(),t),w={class:"d-flex justify-space-between flex-wrap align-center flex-wrap mb-8"},D=h((()=>n("div",{class:"mb-3"},[n("div",{class:"text-18 f-600"},"Invoice #"),n("div",{class:"text-caption text-secondary-darken-1 text-end"}," 3682303 ")],-1))),_=h((()=>n("div",{class:"d-flex justify-space-between flex-wrap align-center mb-5"},[n("div",{class:"me-5"},[n("div",{class:"text-caption mb-2"},"Bill to:"),n("div",{class:"text-body-2 f-600 mb-2"},"Pixy Krovasky"),n("div",{class:"text-caption text-secondary"}," 8692 Wild Rose Drive Livonia, MI 48150 ")]),n("div",{class:"text-caption text-secondary"}," 45 Roker Terrace Latheronwheel KW5 8NW, London United Kingdom ")],-1))),P=h((()=>n("div",{class:"text-caption f-600 mb-2"},[m(" Issue Date: "),n("span",{class:"text-secondary font-weight-regular"},"03/10/2018")],-1))),k=h((()=>n("div",{class:"text-caption f-600 mb-10"},[m(" Due Date: "),n("span",{class:"text-secondary font-weight-regular"},"03/10/2023")],-1))),$={class:"d-flex align-center text-caption font-weight-medium"},j={class:"text-caption f-600 text-secondary-darken-4"},I={class:"d-flex justify-end flex-column align-end mt-4"},B=h((()=>n("div",{class:"d-flex mb-3"},[n("div",{class:"text-caption font-weight-medium me-3"},"Subtotal:"),n("div",{class:"text-caption font-weight-medium"},"$ 20,600.00")],-1))),L=h((()=>n("div",{class:"d-flex mb-3"},[n("div",{class:"text-caption font-weight-medium me-3"},"Vat 0%:"),n("div",{class:"text-caption font-weight-medium"},"$ 00.00")],-1))),V=h((()=>n("div",{class:"d-flex mb-3"},[n("div",{class:"text-caption font-weight-medium me-3"}," Sub total 0%: "),n("div",{class:"text-caption font-weight-medium"},"$ 20,600.00")],-1))),N=h((()=>n("div",{class:"d-flex mb-4"},[n("div",{class:"text-caption font-weight-medium me-3"},"Total:"),n("div",{class:"text-caption font-weight-medium"},"$ 20,600.00")],-1))),R={class:"d-flex align-items-center"},T=h((()=>n("i",{class:"tio-"},"download_to ",-1))),A=h((()=>n("span",{class:"text-caption f-600"},"PDF",-1))),C={class:"p-card bg-secondary-lighten-5 h-100 rounded"},S=h((()=>n("div",{class:"px-3 py-2 bg-success-lighten-4 d-inline-flex rounded me-2 mb-5"},[n("span",{class:"f-600 text-caption text-success"},"Approved")],-1))),W=h((()=>n("div",{class:"px-3 py-2 bg-error-lighten-5 d-inline-flex rounded me-2 mb-5"},[n("span",{class:"f-600 text-caption text-error"},"Pending Payment")],-1))),F=h((()=>n("div",{class:"text-18 f-600 mb-6"},"Payment Details:",-1))),K=h((()=>n("div",{class:"text-caption text-secondary"},"Paypal:",-1))),M=h((()=>n("div",{class:"text-caption f-600 text-secondary-darken-1 mb-6"}," UI.lib@gmail.com ",-1))),O=h((()=>n("div",{class:"text-caption text-secondary"},"Account:",-1))),U=h((()=>n("div",{class:"text-caption f-600 text-secondary-darken-1 mb-6"}," Nl24IBAN34553477847370033 AMB NLANBZTC ",-1))),z=h((()=>n("div",{class:"text-caption text-secondary"},"Payment Term:",-1))),E=h((()=>n("div",{class:"text-caption f-600 text-secondary-darken-1 mb-6"},[m(" 14 Days . "),n("span",{class:"text-error"},"Due in 7 days")],-1))),H=h((()=>n("div",{class:"text-18 f-600 mb-6"},"Payment Details:",-1))),G=h((()=>n("div",{class:"text-caption text-secondary"},"Project Name:",-1))),Z={class:"text-caption f-600 text-secondary-darken-1 mb-6"},q=h((()=>n("div",{class:"text-caption text-secondary"},"Completed By:",-1))),J=h((()=>n("div",{class:"text-caption f-600 text-secondary-darken-1 mb-6"}," UI.lib ",-1))),Q=h((()=>n("div",{class:"text-caption text-secondary"},"Time Spent:",-1))),X=h((()=>n("div",{class:"text-caption f-600 text-secondary-darken-1 mb-6"},[m(" 120 Hours . "),n("span",{class:"text-success"},"20$ / h rate")],-1))),Y=t({__name:"InvoiceDetailsOne",setup(t){const p=e({isLoading:!1,columns:[{label:"Description",field:"description",width:"30%",sortable:!1},{label:"Hours",field:"hours",width:"20%",sortable:!1},{label:"Rate",field:"rate",width:"20%",sortable:!1},{label:"Amount",field:"amount",width:"30%",sortable:!1}],rows:[{description:{color:"bg-primary",title:"Minimal Design"},hours:80,rate:"$40.00",amount:"$3200.00"},{description:{color:"bg-warning",title:"Logo Design"},hours:32,rate:"$50.00",amount:"$2200.00"},{description:{color:"bg-error",title:"Web Development"},hours:120,rate:"$80.00",amount:"$1,2200.00"}],totalRecordCount:0,sortable:{order:"id",sort:"asc"}});return(t,e)=>{const f=a("perfect-scrollbar"),h=a("router-link"),Y=a("base-card");return s(),i(v,null,{default:o((()=>[l(Y,null,{default:o((()=>[l(b,null,{default:o((()=>[l(g,{cols:"12",lg:"6"},{default:o((()=>[n("div",w,[l(c,{"max-width":"75",height:"auto",src:"@/assets/images/delivery/FedEx.svg",alt:""}),D]),_,P,k,l(f,{class:"table"},{default:o((()=>[l(d(u),{"is-slot-mode":!0,columns:d(p).columns,rows:d(p).rows,total:d(p).totalRecordCount,"is-hide-paging":!0},{description:o((t=>[n("div",$,[n("span",{class:r([t.value.description.color,"pa-1 rounded-circle me-2"])},null,2),m(" "+x(t.value.description.title),1)])])),amount:o((t=>[n("div",j,x(t.value.amount),1)])),_:1},8,["columns","rows","total"])])),_:1}),n("div",I,[B,L,V,N,n("div",R,[l(y,{class:"text-capitalize border-secondary me-2",flat:""},{default:o((()=>[T,A])),_:1}),l(y,{class:"text-capitalize",flat:"",color:"primary"},{default:o((()=>[m(" Print Invoice ")])),_:1})])])])),_:1}),l(g,{cols:"12",lg:"6"},{default:o((()=>[n("div",C,[S,W,F,K,M,O,U,z,E,H,G,n("div",Z,[m(" Octavia Dashboard "),l(h,{to:"#",class:"text-primary ms-4 text-decoration-none"},{default:o((()=>[m("View Project")])),_:1})]),q,J,Q,X])])),_:1})])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-334ac87f"]]);export{Y as default};
