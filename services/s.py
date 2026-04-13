import json,requests
def rd(f):return json.load(open(f))
def wr(f,d):json.dump(d,open(f,'w'))
def llm(p,j=0):
 r=requests.post("http://localhost:11434/api/generate",json={"model":"mistral","prompt":p,"stream":False,"format":"json" if j else ""}).json().get("response","")
 return json.loads(r) if j else r
