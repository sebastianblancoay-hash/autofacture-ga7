"""Comprobaciones estáticas sin navegador ni dependencias externas."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re, json, subprocess, zipfile
raiz=Path(__file__).resolve().parents[1]
class Pagina(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.refs=[]; self.css=[]; self.etiquetas=[]; self.campos=[]; self.aria=[]; self.estilos=[]
    def handle_starttag(self,t,attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if t=='style' or 'style' in a: self.estilos.append(t)
        if t in ['input','select','textarea']: self.campos.append(a.get('id'))
        if t=='label': self.etiquetas.append(a.get('for'))
        for k in ['aria-describedby','aria-labelledby']:
            if a.get(k): self.aria.extend(a[k].split())
        if t in ['a','link'] and a.get('href'): self.refs.append(a['href'])
        if t=='script' and a.get('src'): self.refs.append(a['src'])
        if t=='link' and a.get('rel')=='stylesheet': self.css.append(a['href'])
meta=json.loads((raiz/'prototipo/pantallas.json').read_text())
assert [x[0]for x in meta]==[f'P{i:02d}'for i in range(1,16)]
files=list(raiz.glob('*.html'))+list((raiz/'prototipo').glob('*.html'))
referencias=0
for f in files:
    s=f.read_text();q=Pagina();q.feed(s)
    assert len(q.ids)==len(set(q.ids)),(f,'ID repetido')
    assert set(q.campos)<=set(q.etiquetas),(f,'Sin label')
    assert set(q.aria)<=set(q.ids),(f,'ARIA sin destino')
    assert not q.estilos,(f,'CSS incrustado')
    assert len(q.css) == 1, (f, 'Se esperaba una hoja de estilos')
    hoja = urlsplit(q.css[0])
    assert not hoja.scheme and not hoja.netloc, (f, 'La hoja debe ser local')
    ruta_hoja = (f.parent / unquote(hoja.path)).resolve()
    assert ruta_hoja == raiz / 'styles.css', (f, q.css[0])
    assert not re.search(r'<(?:script|link)[^>]+(?:src|href)=["\']https?://',s),(f,'Recurso externo')
    for raw in q.refs:
        u=urlsplit(raw)
        if u.scheme: continue
        dest=(f.parent/unquote(u.path)).resolve()if u.path else f
        assert dest.is_file(),(f,raw)
        if u.fragment and dest.suffix=='.html':
            target=Pagina();target.feed(dest.read_text());assert u.fragment in target.ids,(f,raw)
        referencias+=1
for id,t,file,rf,hu in meta:
    s=(raiz/file).read_text()
    assert f'data-pagina="{id}"' in s and rf in s and hu in s
    assert all(v in s for v in ['js/modelo.js','js/aplicacion.js','styles.css'])
for f in (raiz/'js').glob('*.js'):
    subprocess.run(['node','--check',str(f)],check=True)
for f in ['modelo.js','aplicacion.js']:
    s=(raiz/'js'/f).read_text();assert not re.search(r'\.innerHTML\s*=|eval\s*\(|document\.write\s*\(',s),f
for f in (raiz/'muestras').glob('*.json'):json.loads(f.read_text())
r=(raiz/'docs/requisitos.md').read_text()
rows=[x for x in r.splitlines()if re.match(r'\| RF\d{2} \|',x)];assert len(rows)==25
for line in rows:
    c=[v.strip()for v in line.split('|')[1:-1]];n=int(c[0][2:]);assert c[4]==('Media'if n in [7,9,16,21,22,25]else'Alta'),line
    if n==24:assert c[3]=='HU-001'
    if n==25:assert 'HU-006'not in c[3]
assert len(re.findall(r'^## HU-\d{3}',(raiz/'docs/historias.md').read_text(),re.M))==8
print(f'{len(files)} HTML, {referencias} referencias locales, 15 códigos, prioridades, sintaxis y fuentes seguras comprobados estáticamente. No revisión visual.')
