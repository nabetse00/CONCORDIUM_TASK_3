import{e as x,f,j as e}from"./index-81a7a782.js";import{r as i,d as p}from"./wallet-0d6fe0b8.js";import{g as d,o as c,p as b,L as j}from"./ui-bc4a4294.js";import{B as h}from"./Balance-0ce33a3f.js";import{N as I}from"./NoAccount-a8956654.js";import{b as y}from"./main-3987a949.js";import"./icons-ffceca67.js";function C(){const{connection:s,account:o,network:t}=x(),[n,a]=i.useState(),[A,l]=i.useState(""),u=f(),m=(t==null?void 0:t.ccdScanBaseUrl)+"/?dcount=1&dentity=account&daddress="+(n==null?void 0:n.accountAddress);return i.useEffect(()=>{(!s||!o)&&u(y),s&&a(void 0),s&&o&&(a(void 0),p.withJsonRpcClient(s,r=>r.getAccountInfo(o)).then(r=>{a(r),l("")}).catch(r=>{a(void 0),l(r)}))},[s,o]),e.jsx(i.Suspense,{fallback:e.jsx(d,{}),children:n?e.jsxs(c,{title:"Account Info",column:1,bordered:!0,children:[e.jsx(c.Item,{label:"Status",span:1,children:e.jsx(b,{status:t?"success":"error",text:t?e.jsx(e.Fragment,{children:"connected to "+(t==null?void 0:t.name)}):"no network"})}),e.jsx(c.Item,{label:"Address",children:e.jsx(j,{copyable:{text:n.accountAddress},href:m,target:"_blank",rel:"noopener noreferrer",children:n.accountAddress})}),e.jsx(c.Item,{label:"Balance (price form kucoin)",children:e.jsx(h,{balance:n.accountAmount,currency:"USD",size:14})}),e.jsx(c.Item,{label:"Nonce",children:Number(n.accountNonce)}),e.jsx(c.Item,{label:"Index",children:Number(n.accountIndex)}),e.jsx(c.Item,{label:"Public key for credentials",children:n.accountCredentials[0].value.contents.credentialPublicKeys.keys[0].verifyKey}),e.jsx(c.Item,{label:"Encryption key",children:n.accountEncryptionKey})]}):o?e.jsx(d,{}):e.jsx(I,{network:t==null?void 0:t.name})})}export{C as AccountInfoPage};
