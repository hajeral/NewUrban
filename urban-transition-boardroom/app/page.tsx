"use client";
import { useEffect, useMemo, useState } from "react";
import { decisions, districts, evidence, initialRisks, metrics as baseMetrics, phases } from "@/lib/data";
import { Decision, District, Evidence, MetricKey, Risk } from "@/lib/types";

type State = {
 phase:number; read:string[]; explored:string[]; notes:Record<string,string>;
 selected:Record<string,string>; confirmed:Record<string,string>;
 priorities:string[]; riskStatus:Record<string,Risk["status"]>;
 events:Record<string,string>; reflections:Record<string,string>;
};

const initial:State={phase:1,read:[],explored:[],notes:{},selected:{},confirmed:{},priorities:[],riskStatus:{},events:{},reflections:{}};
const priorities=["Reduce heat exposure","Secure water resilience","Cut operational carbon","Increase circular construction","Improve equitable access and trust"];
const nav=["Programme","City lab","Evidence","Strategy lab","Technology matrix","Board decisions","Delivery events","Risk register","Dashboard","Final report"] as const;
type View=typeof nav[number];

export default function Home(){
 const [view,setView]=useState<View>("Programme");
 const [s,setS]=useState<State>(initial);
 const [doc,setDoc]=useState<Evidence|null>(null);
 const [district,setDistrict]=useState(districts[0]);
 const [layer,setLayer]=useState<keyof typeof districts[0]["scores"]>("heat");
 const [msg,setMsg]=useState("");
 useEffect(()=>{try{const x=localStorage.getItem("utb-v3");if(x)setS(JSON.parse(x))}catch{}},[]);
 useEffect(()=>localStorage.setItem("utb-v3",JSON.stringify(s)),[s]);

 const metrics=useMemo(()=>baseMetrics.map(m=>{
   let value=m.value;
   Object.entries(s.confirmed).forEach(([did,oid])=>{
     const o=decisions.find(d=>d.id===did)?.options.find(o=>o.id===oid);
     value+=o?.impacts[m.key]||0;
   });
   return {...m,value:Math.max(0,Math.min(100,value))};
 }),[s.confirmed]);

 const risks=useMemo(()=>{
   const r=[...initialRisks.map(x=>({...x,status:s.riskStatus[x.id]||x.status}))];
   Object.entries(s.confirmed).forEach(([did,oid])=>{
     const d=decisions.find(x=>x.id===did),o=d?.options.find(x=>x.id===oid);
     o?.risks.forEach((title,i)=>{const id=`D-${did}-${i+1}`;r.push({id,title,source:`Decision: ${d?.title}`,likelihood:3,impact:3,owner:"Executive Board",response:"Assign owner, treatment and review date.",status:s.riskStatus[id]||"Open"})});
   });
   return r;
 },[s.confirmed,s.riskStatus]);

 const done=(p:number)=>{
   if(p===1)return s.read.includes("mayor")&&!!s.confirmed.charter;
   if(p===2)return s.explored.length>=3&&s.read.includes("climate")&&!!s.notes.diagnosis;
   if(p===3)return s.read.includes("flows")&&!!s.confirmed.baseline;
   if(p===4)return s.priorities.length===3&&s.read.includes("community")&&!!s.notes.businesscase;
   if(p===5)return !!s.notes.requirements;
   if(p===6)return s.read.includes("tech")&&!!s.confirmed.technology;
   if(p===7)return s.read.includes("proc")&&!!s.confirmed.procurement;
   if(p===8)return s.read.includes("pilot")&&!!s.confirmed.pilot&&!!s.events.vendor;
   if(p===9)return s.read.includes("ops")&&!!s.confirmed.golive&&!!s.events.cyber;
   return s.read.includes("assurance")&&!!s.confirmed.scale&&!!s.reflections.final;
 };
 const progress=Math.round(phases.filter(p=>done(p.id)).length/10*100);
 const openEvidence=(e:Evidence)=>{setDoc(e);setS(x=>({...x,read:[...new Set([...x.read,e.id])]}))};
 const go=(v:View)=>{setView(v);window.scrollTo({top:0,behavior:"smooth"})};
 const update=(patch:Partial<State>)=>setS(x=>({...x,...patch}));
 const next=()=>{if(done(s.phase)){update({phase:Math.min(10,s.phase+1)});go("Programme")}else setMsg("Complete the required evidence, exercise and board decision before advancing.")};

 return <div className="shell">
  <aside>
   <div className="brand"><b>UTB</b><span>Urban Transition<br/><small>Boardroom</small></span></div>
   <div className="course">MASTER PROGRAMME<strong>Global Smart City Management</strong><small>Units 3 & 4 · End-to-end project</small></div>
   <div className="phasebox">ACTIVE PHASE <b>{s.phase}/10</b><span>{phases[s.phase-1].title}</span></div>
   <nav>{nav.map(n=><button className={view===n?"active":""} onClick={()=>go(n)} key={n}>{n}</button>)}</nav>
   <div className="sidefoot"><b>{progress}% complete</b><div className="bar"><i style={{width:`${progress}%`}}/></div><small>Board 1 · Al Noor City</small></div>
  </aside>
  <main>
   <header><div><small>AL NOOR CITY · LIVE EXECUTIVE SIMULATION</small><h1>{view}</h1></div><button className="ghost" onClick={()=>{if(confirm("Reset all simulation work?")){localStorage.removeItem("utb-v3");setS(initial);setView("Programme")}}}>Reset simulation</button></header>
   {msg&&<div className="message" onClick={()=>setMsg("")}>{msg}<b>×</b></div>}
   <section className="content">
    {view==="Programme"&&<Programme s={s} done={done} setPhase={p=>update({phase:p})} go={go} next={next}/>}
    {view==="City lab"&&<CityLab s={s} update={update} district={district} setDistrict={setDistrict} layer={layer} setLayer={setLayer} open={openEvidence}/>}
    {view==="Evidence"&&<EvidenceCentre s={s} open={openEvidence}/>}
    {view==="Strategy lab"&&<Strategy s={s} update={update}/>}
    {view==="Technology matrix"&&<TechMatrix s={s} update={update} open={openEvidence}/>}
    {view==="Board decisions"&&<BoardDecisions s={s} update={update} setMsg={setMsg}/>}
    {view==="Delivery events"&&<Events s={s} update={update}/>}
    {view==="Risk register"&&<RiskRegister risks={risks} updateStatus={(id,status)=>update({riskStatus:{...s.riskStatus,[id]:status}})}/>}
    {view==="Dashboard"&&<Dashboard metrics={metrics} s={s} risks={risks} progress={progress}/>}
    {view==="Final report"&&<FinalReport s={s} metrics={metrics} risks={risks} update={update}/>}
   </section>
   {doc&&<Modal e={doc} close={()=>setDoc(null)}/>}
  </main>
 </div>
}

function Programme({s,done,setPhase,go,next}:{s:State;done:(p:number)=>boolean;setPhase:(p:number)=>void;go:(v:View)=>void;next:()=>void}){
 const actions:Record<number,{label:string;view:View}[]>={
 1:[{label:"Read mandate",view:"Evidence"},{label:"Approve charter",view:"Board decisions"}],
 2:[{label:"Investigate districts",view:"City lab"},{label:"Write diagnosis",view:"City lab"}],
 3:[{label:"Review resource flows",view:"Evidence"},{label:"Choose baseline",view:"Board decisions"}],
 4:[{label:"Set priorities & business case",view:"Strategy lab"}],
 5:[{label:"Draft requirements",view:"Strategy lab"}],
 6:[{label:"Score technologies",view:"Technology matrix"},{label:"Select architecture",view:"Board decisions"}],
 7:[{label:"Review procurement memo",view:"Evidence"},{label:"Choose model",view:"Board decisions"}],
 8:[{label:"Respond to pilot event",view:"Delivery events"},{label:"Approve pilot",view:"Board decisions"}],
 9:[{label:"Respond to cyber event",view:"Delivery events"},{label:"Approve go-live",view:"Board decisions"}],
 10:[{label:"Review realised benefits",view:"Evidence"},{label:"Make scale decision",view:"Board decisions"},{label:"Write final reflection",view:"Final report"}]
 };
 return <>
  <div className="hero"><span>YOUR RESPONSIBILITY</span><h2>Execute Al Noor City's transformation from discovery to post-deployment assurance.</h2><p>This is not a reading website. Each phase requires evidence review, hands-on work, a board decision, consequences, risks and reflection. Your final dashboard is generated from your own actions.</p></div>
  <div className="journey">{phases.map(p=><article key={p.id} className={`${s.phase===p.id?"current":""} ${done(p.id)?"done":""}`} onClick={()=>setPhase(p.id)}>
   <div className="num">{String(p.id).padStart(2,"0")}</div><div><small>{p.unit}</small><h3>{p.title}</h3><p>{p.purpose}</p><b>Deliverable: {p.deliverable}</b></div><span>{done(p.id)?"COMPLETE":s.phase===p.id?"ACTIVE":"OPEN"}</span>
  </article>)}</div>
  <div className="workbench"><h3>Phase {s.phase} workbench</h3><p>Complete these actions in order. Your work is saved automatically.</p><div className="actionrow">{actions[s.phase].map(a=><button onClick={()=>go(a.view)} key={a.label}>{a.label} →</button>)}</div><button className="primary" onClick={next}>Validate phase and continue →</button></div>
 </>;
}

function CityLab({s,update,district,setDistrict,layer,setLayer,open}:{s:State;update:(p:Partial<State>)=>void;district:District;setDistrict:(d:District)=>void;layer:keyof District["scores"];setLayer:(l:keyof District["scores"])=>void;open:(e:Evidence)=>void}){
 const layers=["heat","water","carbon","flood","assets"] as const;
 const select=(d:District)=>{setDistrict(d);update({explored:[...new Set([...s.explored,d.id])]})};
 return <>
  <Title tag="PHASE 2 · HANDS-ON INVESTIGATION" title="Diagnose the city before proposing solutions." text="Select a pressure layer, click districts and record a defensible diagnosis. Inspect at least three districts."/>
  <div className="layerbar">{layers.map(l=><button className={layer===l?"sel":""} onClick={()=>setLayer(l)} key={l}>{l} pressure</button>)}</div>
  <div className="citygrid"><div className="map">{districts.map(d=><button key={d.id} className={district.id===d.id?"pin active":"pin"} style={{left:`${d.x}%`,top:`${d.y}%`}} onClick={()=>select(d)}><i style={{opacity:.25+d.scores[layer]/130}}/>{d.name}<small>{d.scores[layer]}/100</small></button>)}</div>
  <div className="inspector"><small>DISTRICT DOSSIER</small><h2>{district.name}</h2><p>{district.profile}</p><b>People</b><p>{district.people}</p><div className="two"><div><b>Issues</b>{district.issues.map((x:string)=><li key={x}>{x}</li>)}</div><div><b>Opportunities</b>{district.opportunities.map((x:string)=><li key={x}>{x}</li>)}</div></div></div></div>
  <div className="exercise"><div><h3>Exercise: write the board's city diagnosis</h3><p>Identify root causes, affected groups, priority districts and evidence gaps. Minimum 80 characters.</p></div><textarea value={s.notes.diagnosis||""} onChange={e=>update({notes:{...s.notes,diagnosis:e.target.value}})} placeholder="Our diagnosis is..."/><div className="exercisefoot"><span>{s.explored.length}/3 districts investigated · {s.notes.diagnosis?.length||0}/80 characters</span><button onClick={()=>open(evidence.find(x=>x.id==="climate")!)}>Open climate assessment</button></div></div>
 </>;
}

function EvidenceCentre({s,open}:{s:State;open:(e:Evidence)=>void}){return <><Title tag="CONTROLLED EVIDENCE RELEASE" title="Evidence must inform every decision." text="Open documents, inspect findings and answer the executive questions before deciding."/><div className="docs">{evidence.map(e=><article key={e.id}><small>PHASE {e.phase} · {e.type}</small><h3>{e.title}</h3><p>{e.summary}</p><button onClick={()=>open(e)}>{s.read.includes(e.id)?"Reviewed · reopen":"Open evidence"} →</button></article>)}</div></>}

function Strategy({s,update}:{s:State;update:(p:Partial<State>)=>void}){
 const toggle=(p:string)=>update({priorities:s.priorities.includes(p)?s.priorities.filter(x=>x!==p):s.priorities.length<3?[...s.priorities,p]:s.priorities});
 return <><Title tag="PHASES 4–5 · STRATEGY LAB" title="Define outcomes first; specify technology second." text="Choose exactly three priorities, then write the business case and technology requirements."/>
 <div className="cards">{priorities.map(p=><button className={s.priorities.includes(p)?"choice selected":"choice"} onClick={()=>toggle(p)} key={p}><b>{p}</b><span>{s.priorities.includes(p)?"SELECTED":"Select priority"}</span></button>)}</div>
 <div className="exercise"><h3>Business case exercise</h3><p>Explain expected benefits, beneficiaries, cost logic, risks and how success will be measured.</p><textarea value={s.notes.businesscase||""} onChange={e=>update({notes:{...s.notes,businesscase:e.target.value}})} placeholder="The programme will create value by..."/><span>{s.notes.businesscase?.length||0}/120 characters recommended</span></div>
 <div className="exercise"><h3>Technology requirements brief</h3><p>Write requirements as decisions or outcomes, not product names. Example: “compare district heat interventions using trusted spatial and asset data.”</p><textarea value={s.notes.requirements||""} onChange={e=>update({notes:{...s.notes,requirements:e.target.value}})} placeholder="The solution must enable the city to..."/><span>{s.notes.requirements?.length||0}/120 characters recommended</span></div></>;
}

const techs=[
 {id:"gis",name:"GIS & geospatial intelligence",S:5,C:4,A:5,L:4,E:5,cost:2,fit:"Foundation for district evidence and common identifiers."},
 {id:"scan",name:"Targeted laser scanning",S:3,C:5,A:3,L:2,E:3,cost:4,fit:"Strong for specific retrofit and asset use cases."},
 {id:"twin",name:"Federated digital twin",S:4,C:4,A:3,L:2,E:3,cost:5,fit:"Valuable after governance, data and operating ownership mature."},
 {id:"climate",name:"Climate analytics",S:5,C:4,A:4,L:3,E:4,cost:3,fit:"Directly supports heat, flood and water decisions."},
 {id:"asset",name:"Asset management integration",S:4,C:4,A:4,L:5,E:5,cost:3,fit:"Converts insight into accountable maintenance and investment."}
];
function TechMatrix({s,update,open}:{s:State;update:(p:Partial<State>)=>void;open:(e:Evidence)=>void}){
 const [weights,setWeights]=useState({S:25,C:20,A:20,L:20,E:15});
 const score=(t:any)=>Math.round((t.S*weights.S+t.C*weights.C+t.A*weights.A+t.L*weights.L+t.E*weights.E)/5);
 return <><Title tag="PHASE 6 · SCALEC MATRIX" title="Test technology choices against strategy and lifecycle reality." text="Adjust the criteria weights. Scores recalculate live; they support judgement but do not replace it."/>
 <div className="weights">{Object.entries(weights).map(([k,v])=><label key={k}><b>{k}</b><input type="range" min="0" max="40" value={v} onChange={e=>setWeights({...weights,[k]:+e.target.value})}/><span>{v}%</span></label>)}</div>
 <div className="matrix"><div className="mhead"><b>Capability</b><span>S</span><span>C</span><span>A</span><span>L</span><span>E</span><span>Cost</span><b>Weighted score</b></div>{techs.map(t=><div className="mrow" key={t.id}><div><b>{t.name}</b><small>{t.fit}</small></div><span>{t.S}</span><span>{t.C}</span><span>{t.A}</span><span>{t.L}</span><span>{t.E}</span><span>{t.cost}</span><strong>{score(t)}/100</strong></div>)}</div>
 <button className="primary" onClick={()=>open(evidence.find(x=>x.id==="tech")!)}>Review technical evidence →</button>
 </>;
}

function BoardDecisions({s,update,setMsg}:{s:State;update:(p:Partial<State>)=>void;setMsg:(m:string)=>void}){
 const available=decisions.filter(d=>d.phase<=s.phase);
 const confirm=(d:Decision)=>{const oid=s.selected[d.id];if(!oid)return setMsg("Select a provisional option first.");const missing=d.requires.filter(r=>!s.read.includes(r));if(missing.length)return setMsg(`Review required evidence first: ${missing.join(", ")}`);update({confirmed:{...s.confirmed,[d.id]:oid}});setMsg("Decision confirmed. Metrics and risks have been recalculated. You may reopen it.");};
 const reopen=(id:string)=>{const x={...s.confirmed};delete x[id];update({confirmed:x});};
 return <><Title tag="EXECUTIVE STEERING COMMITTEE" title="Decide only after evidence and exercises." text="Compare options, record a provisional view, confirm collectively, then reopen later if new evidence changes your judgement."/>
 {available.map(d=><article className="decision" key={d.id}><div className="decisionhead"><div><small>PHASE {d.phase}</small><h2>{d.title}</h2><p>{d.prompt}</p></div><span>{s.confirmed[d.id]?"CONFIRMED":"OPEN"}</span></div><div className="options">{d.options.map(o=><button className={s.selected[d.id]===o.id?"option picked":"option"} onClick={()=>!s.confirmed[d.id]&&update({selected:{...s.selected,[d.id]:o.id}})} key={o.id}><div><b>{o.title}</b><em>Quality score {o.score}/100</em></div><p>{o.rationale}</p><strong>Benefits</strong>{o.benefits.map(x=><li key={x}>{x}</li>)}<strong>Trade-offs</strong>{o.tradeoffs.map(x=><li key={x}>{x}</li>)}</button>)}</div><div className="decisionfoot">{s.confirmed[d.id]?<button onClick={()=>reopen(d.id)}>Reopen and change decision</button>:<button className="primary" onClick={()=>confirm(d)}>Confirm board decision</button>}<span>Required evidence: {d.requires.join(", ")}</span></div></article>)}</>;
}

function Events({s,update}:{s:State;update:(p:Partial<State>)=>void}){
 const events=[
  {id:"vendor",phase:8,title:"Vendor delay and missing asset data",story:"Week 7: the supplier reports a six-week delay. Twenty-two percent of priority assets lack reliable identifiers.",opts:["Accept delay and fund data cleansing","Reduce pilot scope to critical use cases","Launch anyway and correct data later"]},
  {id:"cyber",phase:9,title:"Cyber assurance condition",story:"Five days before go-live, assurance finds incomplete privileged-access monitoring and no tested incident handover.",opts:["Conditional delay until controls are evidenced","Go live with a temporary waiver","Cancel deployment"]},
  {id:"public",phase:10,title:"Public challenge after launch",story:"Residents praise cooling improvements but question why water savings missed target and support costs rose.",opts:["Publish the gap and recovery plan","Report only successful benefits","Pause expansion pending independent review"]}
 ];
 return <><Title tag="LIVE DELIVERY" title="The programme changes while you deliver it." text="Respond to real project events. Your choices are recorded as part of the board's accountability trail."/><div className="events">{events.filter(e=>e.phase<=s.phase).map(e=><article key={e.id}><small>PHASE {e.phase} EVENT</small><h2>{e.title}</h2><p>{e.story}</p>{e.opts.map(o=><button className={s.events[e.id]===o?"selected":""} onClick={()=>update({events:{...s.events,[e.id]:o}})} key={o}>{o}</button>)}{s.events[e.id]&&<div className="consequence"><b>Recorded response</b><p>{s.events[e.id]}</p><span>Consequence: this response will be reviewed in the final assurance report.</span></div>}</article>)}</div></>;
}

function RiskRegister({risks,updateStatus}:{risks:Risk[];updateStatus:(id:string,s:Risk["status"])=>void}){
 const exposure=risks.reduce((a,r)=>a+r.likelihood*r.impact,0);
 return <><Title tag="TRACEABLE PROGRAMME CONTROL" title="Risks arise from evidence, decisions and delivery events." text={`Current total exposure: ${exposure}. Every risk shows its source, owner and treatment.`}/><div className="riskmatrix"><div className="axis">Impact →</div>{[5,4,3,2,1].map(i=><div className="riskrow" key={i}>{[1,2,3,4,5].map(l=><div className={`cell heat${Math.ceil(l*i/5)}`} key={l}>{risks.filter(r=>r.likelihood===l&&r.impact===i).map(r=><b key={r.id}>{r.id}</b>)}</div>)}</div>)}</div>
 <div className="risks">{risks.map(r=><article key={r.id}><b>{r.id}</b><div><h3>{r.title}</h3><p>Source: {r.source} · Owner: {r.owner}</p><small>{r.response}</small></div><span>L{r.likelihood} × I{r.impact} = {r.likelihood*r.impact}</span><select value={r.status} onChange={e=>updateStatus(r.id,e.target.value as any)}><option>Open</option><option>Mitigating</option><option>Closed</option></select></article>)}</div></>;
}

function Dashboard({metrics,s,risks,progress}:{metrics:any[];s:State;risks:Risk[];progress:number}){
 const score=Math.round((Object.entries(s.confirmed).reduce((a,[d,o])=>a+(decisions.find(x=>x.id===d)?.options.find(x=>x.id===o)?.score||0),0)/Math.max(1,Object.keys(s.confirmed).length)));
 return <><Title tag="GENERATED FROM YOUR WORK" title="Executive programme dashboard" text="Nothing here is pre-decided: values combine sourced baselines with confirmed scenario impacts. They are estimates until post-deployment evidence is reviewed."/><div className="kpis"><div className="bigscore"><span>Decision quality</span><b>{score||0}</b><small>/100 average option reasoning score</small></div>{metrics.map(m=><article key={m.key}><small>{m.label}</small><b>{m.value}{m.unit}</b><div className="bar"><i style={{width:`${m.value}%`}}/></div><p>{m.source}</p></article>)}</div>
 <div className="summarygrid"><article><small>PROJECT PROGRESS</small><b>{progress}%</b><p>{Object.keys(s.confirmed).length} formal decisions · {s.read.length} evidence packs reviewed · {s.explored.length} districts investigated</p></article><article><small>ACTIVE RISK EXPOSURE</small><b>{risks.filter(r=>r.status!=="Closed").reduce((a,r)=>a+r.likelihood*r.impact,0)}</b><p>{risks.filter(r=>r.status==="Open").length} open risks require board attention</p></article><article><small>PROGRAMME DNA</small><b>{s.confirmed.charter||"Not selected"}</b><p>Established by the board's first formal decision</p></article></div></>;
}

function FinalReport({s,metrics,risks,update}:{s:State;metrics:any[];risks:Risk[];update:(p:Partial<State>)=>void}){
 return <><Title tag="PHASE 10 · ACCOUNTABILITY" title="Final executive programme report" text="Your report records what you discovered, decided, delivered, learned and would change."/>
 <div className="report"><section><h3>1. City diagnosis</h3><p>{s.notes.diagnosis||"Not completed"}</p></section><section><h3>2. Strategic priorities</h3><p>{s.priorities.join(" · ")||"Not completed"}</p></section><section><h3>3. Business case</h3><p>{s.notes.businesscase||"Not completed"}</p></section><section><h3>4. Technology requirements</h3><p>{s.notes.requirements||"Not completed"}</p></section><section><h3>5. Decisions</h3>{Object.entries(s.confirmed).map(([d,o])=><p key={d}><b>{decisions.find(x=>x.id===d)?.title}:</b> {decisions.find(x=>x.id===d)?.options.find(x=>x.id===o)?.title}</p>)}</section><section><h3>6. Residual risk</h3><p>{risks.filter(r=>r.status!=="Closed").length} risks remain open or mitigating.</p></section></div>
 <div className="exercise"><h3>Board reflection and final recommendation</h3><p>Explain whether the programme should scale, what evidence changed your view, which benefits were not achieved and who remains accountable.</p><textarea value={s.reflections.final||""} onChange={e=>update({reflections:{...s.reflections,final:e.target.value}})} placeholder="Our final recommendation is..."/><span>{s.reflections.final?.length||0}/180 characters recommended</span></div>
 <button className="primary" onClick={()=>window.print()}>Print / save executive report</button></>;
}

function Modal({e,close}:{e:Evidence;close:()=>void}){return <div className="overlay" onClick={close}><div className="modal" onClick={x=>x.stopPropagation()}><button className="x" onClick={close}>×</button><small>{e.type} · PHASE {e.phase}</small><h1>{e.title}</h1><p className="lead">{e.summary}</p><h3>Key findings</h3>{e.findings.map(x=><div className="finding" key={x}>{x}</div>)}<h3>Board questions</h3>{e.questions.map(x=><div className="question" key={x}>{x}</div>)}<button className="primary" onClick={close}>Mark reviewed and return</button></div></div>}
function Title({tag,title,text}:{tag:string;title:string;text:string}){return <div className="title"><small>{tag}</small><h2>{title}</h2><p>{text}</p></div>}
