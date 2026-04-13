from fastapi import FastAPI;from models.m import P,U;from services.s import rd,wr,llm
from fastapi.middleware.cors import CORSMiddleware
a=FastAPI()
a.add_middleware(CORSMiddleware,allow_origins=["*"],allow_methods=["*"],allow_headers=["*"])
@a.get("/generate_research_prompt")
def g():return llm(f"Profile:{rd('data/user_profile.json')} Roadmap:{rd('data/roadmap.json')} Create highly specific Deep Research prompt for Gemini.")
@a.post("/ingest_research")
def i(b:P):
 r=llm(f"Output strict JSON list of dicts(id,title,description,priority(High Impact/Medium Relevance/Low Relevance),category,url,prerequisites[ids],status(pending/active)). Map prereqs. Text:{b.t}",1)
 c=rd("data/roadmap.json");c.extend(r);wr("data/roadmap.json",c);return r
@a.get("/roadmap")
def r():return rd("data/roadmap.json")
@a.post("/update_node")
def u(n:U):
 d=rd("data/roadmap.json")
 for x in d:
  if x["id"]==n.id:x["status"]=n.s
 for x in d:
  if x["status"]=="pending" and all(next((y["status"]=="completed" for y in d if y["id"]==p),0) for p in x.get("prerequisites",[])):x["status"]="active"
 wr("data/roadmap.json",d);return d
