import{_ as t}from"./nike.5dd78b8d.js";/* empty css                                                                    */import{_ as e,aw as a,R as s,B as l,D as i,E as o,h as c,bq as d,G as r,S as n,F as u,H as m,N as p,O as f}from"./index.72a7fa6d.js";import{T as x}from"./TableLite.4914c265.js";import{V as b}from"./VContainer.9865dee0.js";import{V as g,a as _}from"./VRow.9f03b413.js";import{c as v,V as h}from"./VBtn.55001947.js";import{V as w}from"./VDivider.d23a0936.js";const y=t=>(p("data-v-308c27c9"),t=t(),f(),t),k=y((()=>u("div",{class:"d-flex align-center mb-7"},[u("div",{class:"bg-primary-lighten-5 px-3 py-2 rounded me-3 d-inline-block"},[u("i",{class:"tio- text-primary text-18"},"shopping")]),u("div",{class:"text-subtitle-2 f-600"},"Checkout")],-1))),z=y((()=>u("ul",{class:"step-wizard-list"},[u("li",{class:"step-wizard-item active"},[u("span",{class:"progress-label text-primary f-600"},"Cart")]),u("li",{class:"step-wizard-item current-item"},[u("span",{class:"progress-label f-600"},"Billing & address")]),u("li",{class:"step-wizard-item"},[u("span",{class:"progress-label f-600"},"Payment")])],-1))),j=y((()=>u("span",{class:"text-secondary ms-1"}," (3 item) ",-1))),C={class:"d-flex align-items-center"},V=y((()=>u("img",{class:"w-full",src:t,alt:""},null,-1))),S=y((()=>u("div",null,[u("div",{class:"text-caption f-600 text-truncate"}," Nike Air Jordan "),u("div",{class:"text-secondary text-caption"},[r(" Color: "),u("span",{class:"text-secondary-darken-4"},"White")]),u("div",{class:"text-grey-500 text-caption"},[r(" Size: "),u("span",{class:"text-secondary-darken-4"},"09")])],-1))),$=y((()=>u("i",{class:"tio-"},"remove",-1))),A=y((()=>u("span",{class:"mx-3 d-flex align-center"},"1",-1))),N=y((()=>u("i",{class:"tio-"},"add",-1))),P={class:"d-flex"},R=y((()=>u("i",{class:"tio- text-18 text-secondary"},"clear",-1))),W=y((()=>u("i",{class:"tio-"},"back_ui",-1))),q={class:"p-card"},B=y((()=>u("div",{class:"d-flex justify-space-between mb-4"},[u("div",{class:"text-caption font-weight-medium"},"Subtotal:"),u("div",{class:"text-caption font-weight-medium"},"$230")],-1))),D=y((()=>u("div",{class:"d-flex justify-space-between mb-4"},[u("div",{class:"text-caption font-weight-medium"},"Vat 0%:"),u("div",{class:"text-caption font-weight-medium"},"-")],-1))),J=y((()=>u("div",{class:"d-flex justify-space-between mb-4"},[u("div",{class:"text-caption font-weight-medium"},"Sub total:"),u("div",{class:"text-caption font-weight-medium"},"$230")],-1))),L=y((()=>u("div",{class:"d-flex justify-space-between mb-9"},[u("div",{class:"text-caption font-weight-medium"},"Subtotal:"),u("div",{class:"text-caption text-error font-weight-medium"},"$230")],-1))),O=y((()=>u("i",{class:"tio- me-2"},"shopping_cart",-1))),T=e({__name:"Checkout",setup(t){const e=a({isLoading:!1,columns:[{label:"Product",field:"product",width:"40%",sortable:!0},{label:"Quantity",field:"quantity",width:"20%",sortable:!0},{label:"Price",field:"price",width:"20%",sortable:!0},{label:"Action",field:"action",width:"20%",sortable:!0}],rows:[{product:{img:"/sr",title:"Nike Air Jordan",color:"White",size:"09"},price:"$230"},{product:{img:"/sr",title:"Addidas",color:"White",size:"09"},price:"$230"},{product:{img:"/sr",title:"asd Air Jordan",color:"White",size:"09"},price:"$230"}],totalRecordCount:0,sortable:{order:"id",sort:"asc"}});return(t,a)=>{const p=s("perfect-scrollbar"),f=s("base-card"),y=s("router-link");return l(),i(b,null,{default:o((()=>[k,c(_,null,{default:o((()=>[c(g,{cols:"12",lg:"8"},{default:o((()=>[c(_,null,{default:o((()=>[c(g,{cols:"12"},{default:o((()=>[z])),_:1}),c(g,{cols:"12"},{default:o((()=>[c(f,{class:"pa-0"},{default:o((()=>[c(d,{class:"mb-0 pb-0 border-bottom text-body-2 font-weight-medium"},{default:o((()=>[r("Cart "),j])),_:1}),c(p,{class:"table"},{default:o((()=>[c(n(x),{"is-slot-mode":!0,columns:n(e).columns,rows:n(e).rows,total:n(e).totalRecordCount,"is-hide-paging":!0},{product:o((()=>[u("div",C,[c(m,{size:"64",class:"me-2 rounded flex-shrink-0"},{default:o((()=>[V])),_:1}),S])])),quantity:o((()=>[c(v,{class:"product-btn-group me-2 d-inline-flex",modelValue:t.toggle_exclusive,"onUpdate:modelValue":a[0]||(a[0]=e=>t.toggle_exclusive=e),mandatory:""},{default:o((()=>[c(h,{flat:""},{default:o((()=>[$])),_:1}),A,c(h,{flat:""},{default:o((()=>[N])),_:1})])),_:1},8,["modelValue"])])),action:o((()=>[u("div",P,[c(h,{class:"text-capitalize",size:"small",flat:"",icon:""},{default:o((()=>[R])),_:1})])])),_:1},8,["columns","rows","total"])])),_:1})])),_:1})])),_:1}),c(g,{cols:"12"},{default:o((()=>[c(y,{to:"/ecommerce/shop",class:"text-decoration-none text-secondary-darken-5 f-600"},{default:o((()=>[W,r(" Continue Shopping ")])),_:1})])),_:1})])),_:1})])),_:1}),c(g,{cols:"12",lg:"4"},{default:o((()=>[c(f,{class:"pa-0","card-title":"Order Summery"},{default:o((()=>[u("div",q,[B,D,J,c(w,{class:"line-color my-4"}),L,c(h,{class:"text-capitalize mb-3 bg-secondary-lighten-5",flat:"",block:""},{default:o((()=>[r("Discount Coupon")])),_:1}),c(h,{class:"text-capitalize",to:"/ecommerce/billing-address",color:"primary",flat:"",block:""},{default:o((()=>[O,r(" Checkout Now ")])),_:1})])])),_:1})])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-308c27c9"]]);export{T as default};
