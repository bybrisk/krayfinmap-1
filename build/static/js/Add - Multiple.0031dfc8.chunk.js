(this.webpackJsonpbybrisk=this.webpackJsonpbybrisk||[]).push([[2],{285:function(e,t){},427:function(e,t){},428:function(e,t){},430:function(e,t,a){e.exports=a.p+"static/media/excelDemo.9af5988d.jpg"},501:function(e,t,a){"use strict";a.r(t);var n=a(2),l=a.n(n),r=a(5),i=a(155),o=a(0),c=a.n(o),s=a(468),d=a(125),m=a(490),u=a(56),p=a.n(u),g=a(160),f=a(50),b=a(185),h=a.n(b),y=a(123),E=a(122),x=a(482),v=a(483),C=a(478),j=a(481),w=a(499),O=a(479),k=a(52),S=a(159),P=a(173),L=a(238),N=a(476),F=a(429),A=a.n(F),I=a(23),D=(a(85),a(161)),R=a(283),W=a.n(R);const T=Object(E.a)(e=>({root:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1),padding:"0 30px",display:"flex",justifyContent:"space-between",alignItems:"center",[e.breakpoints.down("xs")]:{justifyContent:"center",flexDirection:"column",alignItems:"flex-start"}},reactbutton:{display:"flex",alignItems:"center",justifyContent:"center"},root1:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1),padding:"0 30px"},btn:{maxWidth:220,width:"100%",backgroundColor:e.palette.secondary.main,border:"none",outline:"none",height:49,borderRadius:49,color:"#fff",textTransform:"uppercase",fontWeight:"600",margin:"10px 0",cursor:"pointer",transition:"0.5s","&:hover":{backgroundColor:e.palette.secondary.light},[e.breakpoints.down("sm")]:{maxWidth:180,height:42}},title:{flex:"1 1 100%"}}));var U=e=>{const t=e.rows,a=T(),n=c.a.useState(!1),l=Object(i.a)(n,2);l[0],l[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement(N.a,{className:a.root},c.a.createElement(d.a,{variant:"h5"},"Failed Deliveries"),c.a.createElement(D.a,{width:"140px",padding:".5rem",style:{},className:a.reactbutton,onClick:()=>{const e={Sheets:{data:W.a.utils.json_to_sheet(t)},SheetNames:["data"]},a=W.a.write(e,{bookType:"xlsx",type:"array"}),n=new Blob([a],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"}),l=document.createElement("a");console.log(n),l.href=URL.createObjectURL(n),l.download="FailedDeliveries.xlsx",document.body.appendChild(l),l.click(),console.log(l)}},c.a.createElement(A.a,{style:{fontSize:"25px",marginTop:"4px"}}))))};const B=Object(E.a)(e=>({root:{width:"100%",padding:e.spacing(3)},paper:{width:"100%",marginBottom:e.spacing(2),paddingTop:20},table:{minWidth:750},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1},avatar:{color:"#ffffff",backgroundColor:h.a[700]}}));function M(e){const t=e.rows,a=B(),n=c.a.useState("asc"),l=Object(i.a)(n,2),r=l[0],s=l[1],d=c.a.useState("AgentID"),m=Object(i.a)(d,2),u=m[0],p=m[1],g=c.a.useState(0),f=Object(i.a)(g,2),b=f[0],h=f[1],E=c.a.useState(10),N=Object(i.a)(E,2),F=N[0],A=N[1],I=Object(o.useRef)(null),D=F-Math.min(F,t.length-b*F);return console.log(t,"llllflflflflflflflflflflfls"),c.a.createElement(c.a.Fragment,null,c.a.createElement(S.a,null,c.a.createElement("title",null,"Failed Deliveries"),c.a.createElement("meta",{name:"description",content:"List of Deliveries failed while uploading "})),c.a.createElement(o.Suspense,{fallback:c.a.createElement(k.a,null)},c.a.createElement("div",{className:a.root},c.a.createElement(y.a,{className:a.paper},c.a.createElement(U,{rows:t}),c.a.createElement(j.a,null,c.a.createElement(x.a,{className:a.table,"aria-labelledby":"Agents","aria-label":"Agent Data"},c.a.createElement(L.a,{classes:a,order:r,orderBy:u,onRequestSort:(e,t)=>{s(u===t&&"asc"===r?"desc":"asc"),p(t)},rowCount:t.length,headCells:[{id:"CustomerName",numeric:!1,disablePadding:!1,label:"Name"},{id:"Locality",numeric:!1,disablePadding:!1,label:"Locality"},{id:"Landmark",numeric:!1,disablePadding:!1,label:"Landmark"},{id:"City",numeric:!1,disablePadding:!1,label:"City"},{id:"Pin",numeric:!1,disablePadding:!1,label:"Pin"},{id:"phone",numeric:!0,disablePadding:!1,label:"Mobile"},{id:"itemWeight",numeric:!0,disablePadding:!1,label:"Item Weight"},{id:"Amount",numeric:!0,disablePadding:!1,label:"Payment"}]}),c.a.createElement(v.a,null,t&&(null===t||void 0===t?void 0:t.map(e=>c.a.createElement(c.a.Fragment,null,c.a.createElement(P.b,{tabIndex:-1,key:e["Customer Name"],ref:I,style:{cursor:"pointer"}},c.a.createElement(P.a,{align:"center"},e["Customer Name"]),c.a.createElement(P.a,{align:"center"},e.Locality),c.a.createElement(P.a,{align:"center"},e.Landmark),c.a.createElement(P.a,{align:"center"},e.City),c.a.createElement(P.a,{align:"center"},e.Pincode),c.a.createElement(P.a,{align:"center"},e.Phone),c.a.createElement(P.a,{align:"center"},e["Item Weight"]),c.a.createElement(P.a,{align:"center"},e.Amount))))),D>0&&c.a.createElement(O.a,null,c.a.createElement(C.a,{colSpan:6}))))),c.a.createElement(w.a,{rowsPerPageOptions:[5,10,25],component:"div",count:t.length,rowsPerPage:F,page:b,onChangePage:(e,t)=>{h(t)},onChangeRowsPerPage:e=>{A(parseInt(e.target.value,10)),h(0)}})))))}var q=a(49),J=a(430),_=a.n(J);a(181);p.a.create({baseURL:"https://bybriskbackend.herokuapp.com",withCredentials:!0,credentials:"include"});function G(e){return c.a.createElement(m.a,{position:"relative",display:"inline-flex"},c.a.createElement(s.a,Object.assign({variant:"determinate"},e)),c.a.createElement(m.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},c.a.createElement(d.a,{variant:"caption",component:"div",style:{color:"#ffffff"}},"".concat(Math.round(e.value),"%"))))}t.default=e=>{const t=c.a.useState(0),a=Object(i.a)(t,2),n=a[0],s=a[1],d=(Object(f.b)().enqueueSnackbar,Object(o.useState)(!1)),m=Object(i.a)(d,2),u=m[0],b=m[1];const h=Object(I.c)(e=>e.bybId),y=Object(o.useState)([]),E=Object(i.a)(y,2),x=E[0],v=E[1],C=Object(o.useState)(!1),j=Object(i.a)(C,2),w=j[0],O=j[1],k=p.a.CancelToken.source(),S=Object(o.useState)([]),P=Object(i.a)(S,2),L=P[0],N=P[1],F=function(){var t=Object(r.a)(l.a.mark((function t(){var a,n,i;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("started final step",u),a=[],console.log(L,k,"enyered ifinanfjfj"),n=L.map(e=>JSON.stringify({CustomerAddress:e.Locality+", "+e.Landmark+", "+e.City,itemWeight:e["Item Weight"],phone:e.Phone.toString(),CustomerName:e["Customer Name"],paymentStatus:!e.Amount,amount:e.Amount||0,pincode:e.Pincode.toString(),BybID:h})),(i=function(){var t=Object(r.a)(l.a.mark((function t(r){var o;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r>=n.length)){t.next=3;break}return 0!==x.length?O(!0):e.closeModal(),t.abrupt("return");case 3:return o=Object(q.b)({article:n[r],setFailedDeliveries:v,failedDeliveries:x}),s(r/L.length*100),a.push(o),i(r+1),t.abrupt("return");case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())(0),Promise.allSettled(a).then(e=>e.forEach((e,t)=>{"GEOCODING FAILED"===e.data.message&&x.push(L[t])}));case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),A=t=>{b(!0);const a=new Promise((e,a)=>{const n=new FileReader;n.readAsArrayBuffer(t),n.onload=t=>{const a=t.target.result,n=W.a.read(a,{type:"buffer"}),l=n.SheetNames[0],r=n.Sheets[l],i=W.a.utils.sheet_to_json(r);e(i)},n.onerror=e=>{a(e)}});N(L),a.then(t=>{t[0].Latitude?(t=>{let a=[];console.log(t,"entered into apirequestwithout latitude"),t.map((e,n)=>{const l=JSON.stringify({CustomerAddress:e.Locality+", "+e.Landmark+", "+e.City,itemWeight:e["Item Weight"],phone:e.Phone.toString(),latitude:e.Latitude,longitude:e.Longitude,CustomerName:e["Customer Name"],paymentStatus:!e.Amount,amount:e.Amount||0,pincode:e.Pincode.toString(),BybID:h});Object(q.c)({article:l,source:k,responseArray:a}),s(n/t.length*100)}),console.log(p.a.isCancel(),"---------------------------------"),Promise.all(a).then(t=>{e.closeModal(),t.forEach(e=>console.log(e,"from item"))}),p.a.isCancel()&&(b(!1),console.log("0f0f0f0f0f0"))})(t):F(t)})};return c.a.createElement(c.a.Fragment,null,w?c.a.createElement(c.a.Fragment,null,c.a.createElement(M,{rows:x})):c.a.createElement(g.d,{className:"wrapper",style:{padding:"30px 30px",justifyContent:"flex-start"}},c.a.createElement("img",{src:_.a,style:{width:"50%"},alt:"excel file demo"}),c.a.createElement("div",null,c.a.createElement("input",{type:"file",onChange:e=>{const t=e.target.files[0];A(t)},id:"excelUpload",accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",style:{display:"none"}}),c.a.createElement("label",{htmlFor:"excelUpload"},c.a.createElement("div",{style:{background:"#FF6F1F",borderRadius:"10rem",border:"10px",color:"#ffffff",margin:"0",padding:"1rem",width:"300px",height:"3.5rem",textAlign:"center",cursor:"pointer"}},u?c.a.createElement(G,{value:n}):"Upload Excel File")),c.a.createElement("div",{style:{marginTop:50},onClick:()=>k.cancel("axios request cancelled")},"Cancel"))))}}}]);
//# sourceMappingURL=Add - Multiple.0031dfc8.chunk.js.map