(this.webpackJsonpbybrisk=this.webpackJsonpbybrisk||[]).push([[2],{279:function(e,t){},419:function(e,t){},420:function(e,t){},422:function(e,t,a){e.exports=a.p+"static/media/excelDemo.9af5988d.jpg"},493:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a.n(n),l=a(5),o=a(151),i=a(0),c=a.n(i),s=a(460),d=a(121),u=a(482),m=a(156),p=a(49),g=a(181),f=a.n(g),b=a(119),h=a(118),y=a(474),x=a(475),E=a(470),v=a(473),j=a(491),w=a(471),k=a(51),C=a(155),O=a(169),S=a(232),P=a(468),F=a(421),L=a.n(F),N=a(23),D=(a(80),a(157)),I=a(277),A=a.n(I);const W=Object(h.a)(e=>({root:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1),padding:"0 30px",display:"flex",justifyContent:"space-between",alignItems:"center",[e.breakpoints.down("xs")]:{justifyContent:"center",flexDirection:"column",alignItems:"flex-start"}},reactbutton:{display:"flex",alignItems:"center",justifyContent:"center"},root1:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1),padding:"0 30px"},btn:{maxWidth:220,width:"100%",backgroundColor:e.palette.secondary.main,border:"none",outline:"none",height:49,borderRadius:49,color:"#fff",textTransform:"uppercase",fontWeight:"600",margin:"10px 0",cursor:"pointer",transition:"0.5s","&:hover":{backgroundColor:e.palette.secondary.light},[e.breakpoints.down("sm")]:{maxWidth:180,height:42}},title:{flex:"1 1 100%"}}));var R=e=>{const t=e.rows,a=W(),n=c.a.useState(!1),r=Object(o.a)(n,2);r[0],r[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement(P.a,{className:a.root},c.a.createElement(d.a,{variant:"h5"},"Failed Deliveries"),c.a.createElement(D.a,{width:"140px",padding:".5rem",style:{},className:a.reactbutton,onClick:()=>{const e={Sheets:{data:A.a.utils.json_to_sheet(t)},SheetNames:["data"]},a=A.a.write(e,{bookType:"xlsx",type:"array"}),n=new Blob([a],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"}),r=document.createElement("a");console.log(n),r.href=URL.createObjectURL(n),r.download="FailedDeliveries.xlsx",document.body.appendChild(r),r.click(),console.log(r)}},c.a.createElement(L.a,{style:{fontSize:"25px",marginTop:"4px"}}))))};const B=Object(h.a)(e=>({root:{width:"100%",padding:e.spacing(3)},paper:{width:"100%",marginBottom:e.spacing(2),paddingTop:20},table:{minWidth:750},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1},avatar:{color:"#ffffff",backgroundColor:f.a[700]}}));function U(e){const t=e.rows,a=B(),n=c.a.useState("asc"),r=Object(o.a)(n,2),l=r[0],s=r[1],d=c.a.useState("AgentID"),u=Object(o.a)(d,2),m=u[0],p=u[1],g=c.a.useState(0),f=Object(o.a)(g,2),h=f[0],P=f[1],F=c.a.useState(10),L=Object(o.a)(F,2),N=L[0],D=L[1],I=Object(i.useRef)(null),A=N-Math.min(N,t.length-h*N);return console.log(t,"llllflflflflflflflflflflfls"),c.a.createElement(c.a.Fragment,null,c.a.createElement(C.a,null,c.a.createElement("title",null,"Failed Deliveries"),c.a.createElement("meta",{name:"description",content:"List of Deliveries failed while uploading "})),c.a.createElement(i.Suspense,{fallback:c.a.createElement(k.a,null)},c.a.createElement("div",{className:a.root},c.a.createElement(b.a,{className:a.paper},c.a.createElement(R,{rows:t}),c.a.createElement(v.a,null,c.a.createElement(y.a,{className:a.table,"aria-labelledby":"Agents","aria-label":"Agent Data"},c.a.createElement(S.a,{classes:a,order:l,orderBy:m,onRequestSort:(e,t)=>{s(m===t&&"asc"===l?"desc":"asc"),p(t)},rowCount:t.length,headCells:[{id:"CustomerName",numeric:!1,disablePadding:!1,label:"Name"},{id:"Locality",numeric:!1,disablePadding:!1,label:"Locality"},{id:"Landmark",numeric:!1,disablePadding:!1,label:"Landmark"},{id:"City",numeric:!1,disablePadding:!1,label:"City"},{id:"Pin",numeric:!1,disablePadding:!1,label:"Pin"},{id:"phone",numeric:!0,disablePadding:!1,label:"Mobile"},{id:"itemWeight",numeric:!0,disablePadding:!1,label:"Item Weight"},{id:"Amount",numeric:!0,disablePadding:!1,label:"Payment"}]}),c.a.createElement(x.a,null,t&&(null===t||void 0===t?void 0:t.map(e=>c.a.createElement(c.a.Fragment,null,c.a.createElement(O.b,{tabIndex:-1,key:e["Customer Name"],ref:I,style:{cursor:"pointer"}},c.a.createElement(O.a,{align:"center"},e["Customer Name"]),c.a.createElement(O.a,{align:"center"},e.Locality),c.a.createElement(O.a,{align:"center"},e.Landmark),c.a.createElement(O.a,{align:"center"},e.City),c.a.createElement(O.a,{align:"center"},e.Pincode),c.a.createElement(O.a,{align:"center"},e.Phone),c.a.createElement(O.a,{align:"center"},e["Item Weight"]),c.a.createElement(O.a,{align:"center"},e.Amount))))),A>0&&c.a.createElement(w.a,null,c.a.createElement(E.a,{colSpan:6}))))),c.a.createElement(j.a,{rowsPerPageOptions:[5,10,25],component:"div",count:t.length,rowsPerPage:N,page:h,onChangePage:(e,t)=>{P(t)},onChangeRowsPerPage:e=>{D(parseInt(e.target.value,10)),P(0)}})))))}var M=a(48),T=a(422),q=a.n(T);a(177);function J(e){return c.a.createElement(u.a,{position:"relative",display:"inline-flex"},c.a.createElement(s.a,Object.assign({variant:"determinate"},e)),c.a.createElement(u.a,{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},c.a.createElement(d.a,{variant:"caption",component:"div",style:{color:"#ffffff"}},"".concat(Math.round(e.value),"%"))))}t.default=e=>{const t=c.a.useState(0),a=Object(o.a)(t,2),n=a[0],s=a[1],d=(Object(p.b)().enqueueSnackbar,Object(i.useState)(!1)),u=Object(o.a)(d,2),g=u[0],f=u[1];let b={status:!1};const h=Object(N.c)(e=>e.bybId),y=Object(i.useState)([]),x=Object(o.a)(y,2),E=x[0],v=x[1],j=Object(i.useState)(!1),w=Object(o.a)(j,2),k=w[0],C=w[1],O=function(){var t=Object(l.a)(r.a.mark((function t(a){var n,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("started final step",g),console.log(a,b.status,"enyered ifinanfjfj"),n=a.map(e=>JSON.stringify({CustomerAddress:e.Locality+", "+e.Landmark+", "+e.City,itemWeight:e["Item Weight"],phone:e.Phone.toString(),CustomerName:e["Customer Name"],paymentStatus:!e.Amount,amount:e.Amount||0,pincode:e.Pincode.toString(),BybID:h})),console.log(g),o=function(){var t=Object(l.a)(r.a.mark((function t(l){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(b.status,"from request maker"),!(!0===b.status||l>=n.length)){t.next=5;break}return 0!==E.length?C(!0):e.closeModal(),console.log(k),t.abrupt("return");case 5:return t.next=7,Object(M.b)({article:n[l],setFailedDeliveries:v,failedDeliveries:E});case 7:return"GEOCODING FAILED"===t.sent.data.message&&(console.log(E,"before pushing",a[l]),E.push(a[l]),console.log(E,"'settong faoledk clelc")),s(l/a.length*100),o(l+1),t.abrupt("return");case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),t.next=7,o(0);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),S=function(){var t=Object(l.a)(r.a.mark((function t(a){var n,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("started final step",g),console.log(a,b.status,"enyered ifinanfjfj"),n=a.map(e=>JSON.stringify({CustomerAddress:e.Locality+", "+e.Landmark+", "+e.City,itemWeight:e["Item Weight"],phone:e.Phone.toString(),latitude:e.Latitude,longitude:e.Longitude,CustomerName:e["Customer Name"],paymentStatus:!e.Amount,amount:e.Amount||0,pincode:e.Pincode.toString(),BybID:h})),console.log(g),o=function(){var t=Object(l.a)(r.a.mark((function t(l){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(b.status,"from request maker"),!(!0===b.status||l>=n.length)){t.next=4;break}return 0!==E.length?C(!0):e.closeModal(),t.abrupt("return");case 4:return t.next=6,Object(M.c)({article:n[l],setFailedDeliveries:v,failedDeliveries:E});case 6:return t.sent,s(l/a.length*100),o(l+1),t.abrupt("return");case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),t.next=7,o(0);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return console.log(E,"from global "),c.a.createElement(c.a.Fragment,null,k?c.a.createElement(c.a.Fragment,null,c.a.createElement(U,{rows:E})):c.a.createElement(m.d,{className:"wrapper",style:{padding:"30px 30px",justifyContent:"flex-start"}},c.a.createElement("img",{src:q.a,style:{width:"50%"},alt:"excel file demo"}),c.a.createElement("div",null,c.a.createElement("input",{type:"file",onChange:e=>{(e=>{f(!0),console.log(g,"----------independent"),console.log("reading excel file",g);const t=new Promise((t,a)=>{const n=new FileReader;n.readAsArrayBuffer(e),n.onload=e=>{const a=e.target.result,n=A.a.read(a,{type:"buffer"}),r=n.SheetNames[0],l=n.Sheets[r],o=A.a.utils.sheet_to_json(l);t(o)},n.onerror=e=>{a(e)}});console.log("read excel file",g),t.then(e=>{e[0].Latitude?S(e):O(e)})})(e.target.files[0])},id:"excelUpload",accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",style:{display:"none"}}),c.a.createElement("label",{htmlFor:"excelUpload"},c.a.createElement("div",{style:{background:"#FF6F1F",borderRadius:"10rem",border:"10px",color:"#ffffff",margin:"0",padding:"1rem",width:"300px",height:"3.5rem",textAlign:"center",cursor:"pointer"}},console.log(g,"inside me"),g?c.a.createElement(J,{value:n}):"Upload Excel File")))))}}}]);
//# sourceMappingURL=Add - Multiple.29839f33.chunk.js.map