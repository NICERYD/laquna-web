import{m as e,V as a}from"./VSelectionControl.baefa35f.js";import{b as t,u as l,c as s}from"./VInput.e74f3fca.js";import{p as i,g as o,q as n,aO as r,c as u,as as d,f as c,bF as v,r as f,h as m,l as p,bC as h}from"./index.72a7fa6d.js";import{b}from"./VBtn.55001947.js";const V=i({indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...t(),...e()},"v-switch"),g=o()({name:"VSwitch",inheritAttrs:!1,props:V(),emits:{"update:focused":e=>!0,"update:modelValue":()=>!0,"update:indeterminate":e=>!0},setup(e,t){let{attrs:i,slots:o}=t;const V=n(e,"indeterminate"),g=n(e,"modelValue"),{loaderClasses:w}=r(e),{isFocused:y,focus:C,blur:x}=l(e),B=u((()=>"string"==typeof e.loading&&""!==e.loading?e.loading:e.color)),k=d(),j=u((()=>e.id||`switch-${k}`));function S(){V.value&&(V.value=!1)}return c((()=>{const[t,l]=v(i),[n,r]=s.filterProps(e),[u,d]=a.filterProps(e),c=f();function k(e){var a,t;e.stopPropagation(),e.preventDefault(),null==(t=null==(a=c.value)?void 0:a.input)||t.click()}return m(s,p({class:["v-switch",{"v-switch--inset":e.inset},{"v-switch--indeterminate":V.value},w.value,e.class],style:e.style},t,n,{id:j.value,focused:y.value}),{...o,default:t=>{let{id:s,messagesId:i,isDisabled:n,isReadonly:r,isValid:d}=t;return m(a,p({ref:c},u,{modelValue:g.value,"onUpdate:modelValue":[e=>g.value=e,S],id:s.value,"aria-describedby":i.value,type:"checkbox","aria-checked":V.value?"mixed":void 0,disabled:n.value,readonly:r.value,onFocus:C,onBlur:x},l),{...o,default:()=>m("div",{class:"v-switch__track",onClick:k},null),input:a=>{let{textColorClasses:t,textColorStyles:l}=a;return m("div",{class:["v-switch__thumb",t.value],style:l.value},[e.loading&&m(h,{name:"v-switch",active:!0,color:!1===d.value?void 0:B.value},{default:e=>o.loader?o.loader(e):m(b,{active:e.isActive,color:e.color,indeterminate:!0,size:"16",width:"2"},null)})])}})}})})),{}}});export{g as V};
