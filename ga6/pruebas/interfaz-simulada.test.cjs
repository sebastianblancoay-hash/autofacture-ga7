(async function(){
/* DOM mínimo simulado: comprueba render y conexión con el modelo. No es un navegador. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');const M=require('../js/modelo.js');
class Elemento{
 constructor(tag,text=''){this.tagName=tag;this.children=[];this.attrs={};this.listeners={};this._text=text;this.value='';this.hidden=false;this.files=[];}
 set value(v){this._value=String(v);}get value(){return this._value||'';}
 set textContent(v){this._text=String(v);this.children=[];}get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}
 setAttribute(k,v){this.attrs[k]=String(v);if(k==='id')this.id=v;if(k==='hidden')this.hidden=true;if(k==='class')this.className=v;if(k==='href')this.href=v;}
 removeAttribute(k){delete this.attrs[k];if(k==='hidden')this.hidden=false;}
 get dataset(){return Object.fromEntries(Object.entries(this.attrs).filter(([k])=>k.startsWith('data-')).map(([k,v])=>[k.slice(5),v]));}
 append(...cs){for(let c of cs){if(typeof c==='string')c=new Elemento('#text',c);c.parent=this;this.children.push(c);}}
 replaceChildren(...cs){this._text='';this.children=[];this.append(...cs);}
 replaceWith(n){const i=this.parent.children.indexOf(this);this.parent.children[i]=n;n.parent=this.parent;}
 remove(){if(this.parent)this.parent.children=this.parent.children.filter(c=>c!==this);}
 focus(){this.focused=true;}addEventListener(t,fn){(this.listeners[t]??=[]).push(fn);}
 querySelectorAll(s){const out=[];function match(n){if(s[0]==='#')return n.id===s.slice(1);if(s[0]==='.')return(n.className||'').split(' ').includes(s.slice(1));if(s[0]==='[')return s.slice(1,-1)in n.attrs;return n.tagName===s;}function walk(n){for(const c of n.children){if(match(c))out.push(c);walk(c);}}walk(this);return out;}
 querySelector(s){return this.querySelectorAll(s)[0]||null;}
 click(){for(const f of this.listeners.click||[])f({preventDefault(){}});}
 async submit(){for(const f of this.listeners.submit||[])await f({preventDefault(){}});}
}
const datos=new Map(),ses=new Map();const store=map=>({getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)});
function abrir(pagina,actor='auxr',search=''){
 if(actor)ses.set('autofacture-identidad',actor);else ses.delete('autofacture-identidad');
 const body=new Elemento('body');body.attrs['data-pagina']=pagina;for(const id of ['vista','mensaje','restablecer','salir','identidad-actual']){const n=new Elemento('div');n.id=id;body.append(n);}const doc={body,createElement:t=>new Elemento(t),createTextNode:t=>new Elemento('#text',t),getElementById:id=>body.querySelector('#'+id),querySelectorAll:s=>body.querySelectorAll(s)};
 const loc={search,protocol:'http:',href:'http://ejemplo.local/'};const ctx={AutoFactureModelo:M,document:doc,localStorage:store(datos),sessionStorage:store(ses),location:loc,window:{addEventListener(){}},URLSearchParams,Intl,Blob,URL,confirm:()=>true,setTimeout:fn=>fn(),console};vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../js/aplicacion.js'),'utf8'),ctx);return{doc,loc,body};
}
function state(){return JSON.parse(datos.get('autofacture-ga6-v1'));}
let verificadas=0;
for(const [actor,paginas]of [['auxr',['P01','P02','P03','P04','P05','P06','P07','P08','P09','P10','P12','P13','P14']],['auxr-autorizado',['P14','P15']],['lina',['P02','P03','P05','P07','P11','P12','P13']],['coda',['P02','P03','P05','P06','P07','P09','P12','P13','P14']]]){
 for(const p of paginas){const search=['P03','P04','P10','P12'].includes(p)?'?id='+(actor==='lina'?'F-102':'F-101'):'';const page=abrir(p,actor,search);assert(!page.body.textContent.includes('No se pudo iniciar'),p);assert(!page.doc.getElementById('vista').textContent.includes('No disponible para este recorrido'),actor+' '+p);const todos=[];(function walk(n){for(const c of n.children){todos.push(c);walk(c);}})(page.body);const ids=todos.filter(x=>x.id).map(x=>x.id);assert.equal(ids.length,new Set(ids).size,actor+' '+p+' IDs');const etiquetas=todos.filter(x=>x.tagName==='label').map(x=>x.attrs.for);for(const c of todos.filter(x=>['input','select','textarea'].includes(x.tagName)))assert(etiquetas.includes(c.id),actor+' '+p+' etiqueta '+c.id);for(const c of todos)for(const attr of ['aria-describedby','aria-labelledby'])if(c.attrs[attr])for(const id of c.attrs[attr].split(' '))assert(ids.includes(id),actor+' '+p+' ARIA '+id);verificadas++;}}
let page=abrir('P01',null);page.doc.getElementById('identidad').value='auxr';page.doc.querySelectorAll('form')[0].submit();assert.equal(ses.get('autofacture-identidad'),'auxr');assert.equal(page.loc.href,'bandeja.html');
page=abrir('P03','auxr','?id=F-101');page.doc.getElementById('resultado').value='Validada ficticia';page.doc.getElementById('motivo').value='Resultado ficticio UI';page.doc.querySelectorAll('form')[0].submit();assert(M.vigente(state().facturas[0]));
page=abrir('P04','auxr','?id=F-101');page.doc.getElementById('responsable').value='lina';page.doc.getElementById('motivo').value='Asignación UI';page.doc.querySelectorAll('form')[0].submit();assert.equal(state().facturas[0].responsable,'lina');
page=abrir('P10','auxr','?id=F-101');page.doc.getElementById('oc').value='OC-UI';page.doc.getElementById('motivo').value='Cambio UI';page.doc.querySelectorAll('form')[0].submit();assert.equal(state().facturas[0].version,2);assert.equal(M.actual(state().facturas[0]).oc,'OC-UI');
page=abrir('P02','coda');page.doc.getElementById('buscar').value='Gamma';page.doc.querySelectorAll('form')[0].submit();assert(page.doc.getElementById('vista').textContent.includes('FE-DEMO-103'));assert(!page.doc.getElementById('vista').textContent.includes('FE-DEMO-101 /'));
page=abrir('P15','coda');assert(page.body.textContent.includes('Solo AUXR autorizado'));assert.equal(page.doc.querySelectorAll('form').length,0);
page=abrir('P11','lina');assert(page.doc.getElementById('vista').textContent.includes('FE-DEMO-102'));assert(!page.doc.getElementById('vista').textContent.includes('FE-DEMO-103'));
page=abrir('P05','coda');assert(page.doc.getElementById('vista').textContent.includes('OC-UI')===false);assert(page.doc.getElementById('vista').textContent.includes('Versión 2'));
page=abrir('P02','auxr');page.doc.getElementById('restablecer').click();assert.equal(state().facturas.length,3);assert.equal(state().facturas[0].version,1);assert.deepEqual(M.totales(state().facturas),{COP:2023000});
page=abrir('P08','auxr');page.doc.getElementById('archivo').files=[{name:'valido.json',size:500,text:async()=>fs.readFileSync(require('node:path').join(__dirname,'../muestras/valido.json'),'utf8')}];await page.doc.querySelectorAll('form')[0].submit();assert.equal(state().facturas.length,4);
page=abrir('P08','auxr');page.doc.getElementById('archivo').files=[{name:'roto.json',size:10,text:async()=>'{roto'}];await page.doc.querySelectorAll('form')[0].submit();assert.equal(state().facturas.length,4);assert.equal(page.doc.getElementById('error-archivo').hidden,false);assert(state().recepciones.at(-1).resultado==='Incidencia');
page=abrir('P02','auxr');const base=state();base.revision++;datos.set('autofacture-ga6-v1',JSON.stringify(base)); // Otra pestaña modificó el almacenamiento.
page=abrir('P03','auxr','?id=F-101');const externo=state();externo.revision++;datos.set('autofacture-ga6-v1',JSON.stringify(externo));page.doc.getElementById('resultado').value='Validada ficticia';page.doc.getElementById('motivo').value='Prueba de concurrencia';await page.doc.querySelectorAll('form')[0].submit();assert(page.doc.getElementById('mensaje').textContent.includes('otra página'));
const mal=M.inicial();M.importar(mal,'auxr',JSON.stringify({facturas:[{numero:'FE-ATAQUE',proveedor:'<img src=x onerror=alert(1)>',nit:'DEMO-999',total:1,moneda:'COP'}]}),'texto.json');datos.set('autofacture-ga6-v1',JSON.stringify(mal));page=abrir('P02','coda');assert(page.body.textContent.includes('<img src=x onerror=alert(1)>'));assert.equal(page.body.querySelectorAll('img').length,0);
// Regresión conectada con la pantalla P03 y la persistencia compartida.
datos.set('autofacture-ga6-v1',JSON.stringify(M.inicial()));
page=abrir('P03','auxr','?id=F-103');assert(page.body.textContent.includes('Número de factura'));assert(page.body.textContent.includes('NIT informado'));assert(page.body.textContent.includes('Total informado'));assert(page.body.textContent.includes('238.000'));assert(page.body.textContent.includes('COP'));
page.doc.getElementById('resultado').value='Validada ficticia';page.doc.getElementById('motivo').value='Revisión repetida sin modificar versión';await page.doc.querySelectorAll('form')[0].submit();assert.equal(state().facturas[2].estado,'En trámite');assert.equal(state().facturas[2].version,1);
for(const pantalla of ['P02','P05']){page=abrir(pantalla,'coda');assert(page.doc.querySelectorAll('form')[0].className.includes('formulario-filtros'));assert(page.doc.getElementById('vista').textContent.includes('En trámite'));}
page=abrir('P03','auxr','?id=F-103');page.doc.getElementById('resultado').value='';await page.doc.querySelectorAll('form')[0].submit();assert.equal(page.doc.getElementById('error-resultado').hidden,false);assert(page.doc.getElementById('resultado').focused);assert.equal(state().facturas[2].estado,'En trámite');
const largo=M.inicial();M.importar(largo,'auxr',JSON.stringify({facturas:[{numero:'FE-LARGO',proveedor:'x'.repeat(4000),nit:'',total:1,moneda:'COP'}]}),'largo.json');datos.set('autofacture-ga6-v1',JSON.stringify(largo));page=abrir('P06','auxr','?incidencia='+largo.recepciones.at(-1).id);assert(page.doc.querySelectorAll('pre').some(x=>x.textContent.includes('x'.repeat(4000))));assert.equal(page.doc.querySelectorAll('script').length,0);
console.log(verificadas+' combinaciones de pantalla/identidad renderizadas y recorrido de revisión/asignación/corrección/reinicio comprobado en DOM simulado. No prueba visual.');

})().catch(e=>{console.error(e);process.exitCode=1;});
