
import { Decision, District, Evidence, Metric, Risk } from "./types";

export const phases = [
 {id:1,title:"Appointment & mandate",unit:"Unit 3",purpose:"Understand the city mandate, constraints and your accountability.",deliverable:"Board charter"},
 {id:2,title:"City discovery",unit:"Unit 3",purpose:"Investigate districts, stakeholders, pressures and opportunities.",deliverable:"City diagnosis"},
 {id:3,title:"Baseline & resource flows",unit:"Unit 3",purpose:"Build an evidence-based baseline for energy, water, mobility, materials and emissions.",deliverable:"Baseline workbook"},
 {id:4,title:"Strategy, KPIs & finance",unit:"Unit 3",purpose:"Set outcomes, targets, benefits, priorities and an investable programme.",deliverable:"Sustainability strategy"},
 {id:5,title:"Technology requirements",unit:"Unit 4",purpose:"Translate outcomes into functional, data, integration and operating requirements.",deliverable:"Requirements brief"},
 {id:6,title:"Technology assessment",unit:"Unit 4",purpose:"Use SCALEC to compare GIS, analytics, scanning, digital twin and operational systems.",deliverable:"Options appraisal"},
 {id:7,title:"Procurement & governance",unit:"Unit 4",purpose:"Define commercial model, standards, ownership, assurance and vendor accountability.",deliverable:"Procurement strategy"},
 {id:8,title:"Pilot & delivery",unit:"Unit 4",purpose:"Select a pilot, manage delivery events and decide whether to continue, change or stop.",deliverable:"Pilot decision"},
 {id:9,title:"Deployment & operations",unit:"Unit 4",purpose:"Approve readiness, transition to operations and establish service ownership.",deliverable:"Go-live decision"},
 {id:10,title:"Post-deployment assurance",unit:"Units 3+4",purpose:"Compare promised and realised benefits, learn, optimise and report honestly.",deliverable:"Final executive report"}
] as const;

export const metrics:Metric[] = [
 {key:"carbon",label:"Carbon pressure",value:72,unit:"/100",source:"Utility inventory + transport model + building benchmark",good:"low"},
 {key:"water",label:"Water stress",value:78,unit:"/100",source:"Dry-year secure supply compared with forecast demand",good:"low"},
 {key:"circularity",label:"Material circularity",value:18,unit:"%",source:"Recovered and reused construction material by mass",good:"high"},
 {key:"resilience",label:"Climate resilience",value:41,unit:"/100",source:"Critical systems assessed against heat, flood and outage scenarios",good:"high"},
 {key:"trust",label:"Public confidence",value:46,unit:"/100",source:"Resident and business survey",good:"high"},
 {key:"data",label:"Evidence readiness",value:34,unit:"/100",source:"Completeness, consistency, ownership and update frequency",good:"high"},
 {key:"budget",label:"Budget remaining",value:100,unit:"%",source:"AED 2.4bn approved programme envelope",good:"high"},
 {key:"schedule",label:"Schedule confidence",value:68,unit:"/100",source:"Integrated milestone and dependency review",good:"high"}
];

export const districts:District[] = [
 {id:"heritage",name:"Heritage Core",x:14,y:35,profile:"Dense historic district with ageing utilities and high pedestrian exposure.",issues:["Extreme heat on walking routes","24% non-revenue water","Retrofit constraints"],opportunities:["Shaded mobility spine","Targeted leak programme","Passive retrofit demonstrator"],people:"78,000 residents; many elderly households",scores:{heat:92,water:81,carbon:52,flood:44,assets:79}},
 {id:"cbd",name:"Central Business District",x:43,y:27,profile:"Commercial centre with high cooling loads and strong digital connectivity.",issues:["Peak electricity demand","Congestion","Fragmented building data"],opportunities:["District cooling optimisation","Retrofit finance","Mobility demand management"],people:"210,000 daily users",scores:{heat:75,water:55,carbon:94,flood:49,assets:28}},
 {id:"port",name:"Industrial Port",x:67,y:66,profile:"Logistics, desalination and manufacturing cluster exposed to coastal hazards.",issues:["Industrial emissions","Storm-surge exposure","Critical interdependencies"],opportunities:["Waste-heat recovery","Industrial symbiosis","Resilience monitoring"],people:"31,000 workers",scores:{heat:72,water:88,carbon:96,flood:91,assets:61}},
 {id:"growth",name:"New Growth Zone",x:18,y:70,profile:"Expansion district expected to absorb 35% of population growth by 2040.",issues:["Car-dependent design risk","Embodied carbon","Premature infrastructure commitment"],opportunities:["Transit-oriented code","Material passports","Net-zero district standard"],people:"24,000 now; 190,000 forecast",scores:{heat:70,water:74,carbon:84,flood:32,assets:20}},
 {id:"east",name:"Residential East",x:72,y:20,profile:"Family-oriented residential district with high water use and low transit access.",issues:["Outdoor water demand","Low public transport access","Limited shade"],opportunities:["Smart irrigation","Cool roofs","Neighbourhood mobility hubs"],people:"146,000 residents",scores:{heat:83,water:90,carbon:68,flood:35,assets:37}}
];

export const evidence:Evidence[] = [
 {id:"mayor",phase:1,title:"Mayor's mandate",type:"Executive letter",summary:"Deliver measurable public value within 24 months while avoiding expensive technology lock-in.",findings:["AED 2.4bn envelope","Benefits must be visible within 24 months","Independent assurance at each stage gate","Equity and operational ownership are mandatory"],questions:["What does success mean?","What will the board refuse to compromise?"]},
 {id:"climate",phase:2,title:"Climate risk assessment",type:"Technical study",summary:"Heat, water scarcity and coastal exposure are unevenly distributed.",findings:["Heat-related emergency calls rose 19% in five years","Dry-year water deficit could reach 14% by 2035","Port assets face compound flood and outage risk","Low-income outdoor workers have the highest exposure"],questions:["Which districts require urgent action?","Where is citywide averaging misleading?"]},
 {id:"flows",phase:3,title:"Urban metabolism report",type:"Data workbook",summary:"Cooling, desalination, mobility and construction dominate resource demand.",findings:["Cooling drives 54% of summer electricity peak","Per-capita water use is 38% above the regional target","Construction creates 42% of city waste","Private cars account for 81% of passenger trips"],questions:["Which flows are controllable?","Which baseline gaps could distort investment?"]},
 {id:"community",phase:4,title:"Stakeholder consultation",type:"Consultation report",summary:"Residents support action but distrust technology-led programmes without visible local benefit.",findings:["72% prioritise shade and reliable public transport","Small businesses fear disruptive retrofits","Residents want transparent data use","Industrial operators support shared infrastructure if costs are fair"],questions:["Who benefits first?","What creates legitimacy?"]},
 {id:"tech",phase:6,title:"Technology capability assessment",type:"Options appraisal",summary:"No single platform solves the city's problems; capabilities must be assembled around use cases.",findings:["GIS is the minimum spatial foundation","Laser scanning is strongest when targeted","Digital twins require stable governance and operating ownership","Climate analytics produces value only when linked to decisions"],questions:["What decision will each technology improve?","What ongoing capability must the city fund?"]},
 {id:"proc",phase:7,title:"Procurement and lifecycle memo",type:"Commercial advice",summary:"Lifecycle cost, data rights and interoperability are more important than lowest purchase price.",findings:["Require open APIs and export rights","Separate platform ownership from vendor services","Use stage-gated payments","Include exit and transition obligations"],questions:["How will vendor lock-in be prevented?","Who owns derived models and data?"]},
 {id:"pilot",phase:8,title:"Pilot readiness review",type:"Assurance report",summary:"Two districts are viable, but data quality and operating ownership remain uneven.",findings:["Heritage Core offers strong public value but difficult integration","CBD offers faster measurable savings but weaker equity benefit","Operations team lacks model-management skills","Cyber review is incomplete"],questions:["Which pilot best tests the programme thesis?","What must be resolved before launch?"]},
 {id:"ops",phase:9,title:"Operational readiness report",type:"Go-live review",summary:"Technical deployment is ready; service ownership, training and incident response are only partially ready.",findings:["Three critical roles remain unfilled","Service desk processes are incomplete","Benefits dashboard is configured","Two high risks remain open"],questions:["Is technical readiness enough?","What conditions should attach to go-live?"]},
 {id:"assurance",phase:10,title:"Benefits realisation review",type:"Independent review",summary:"The pilot delivered mixed results: strong cooling savings, modest trust improvement and higher than expected support cost.",findings:["Cooling peak reduced 11%","Water savings reached 4% against an 8% target","Public confidence increased 6 points","Annual support cost is 17% above forecast"],questions:["Scale, optimise or stop?","How should shortfalls be reported?"]}
];

export const decisions:Decision[] = [
 {id:"charter",phase:1,title:"Approve the programme charter",prompt:"Which board doctrine will guide the entire programme?",requires:["mayor"],options:[
  {id:"balanced",title:"Balanced public-value doctrine",rationale:"Balance climate outcomes, equity, finance and delivery realism.",benefits:["Broad legitimacy","Supports adaptive trade-offs"],tradeoffs:["Slower consensus","Requires strong governance"],impacts:{trust:5,schedule:-3},risks:["Decision latency"],score:82},
  {id:"tech",title:"Technology-led acceleration",rationale:"Use visible technology deployment to create momentum.",benefits:["Fast mobilisation","Strong political visibility"],tradeoffs:["Risk of solutionism","Higher lock-in exposure"],impacts:{data:7,budget:-8,trust:-4},risks:["Technology before need","Vendor lock-in"],score:58},
  {id:"resilience",title:"Climate-risk first",rationale:"Prioritise heat, water and critical infrastructure resilience.",benefits:["Clear urgency","Strong risk reduction"],tradeoffs:["Narrower economic narrative"],impacts:{resilience:8,budget:-4},risks:["Benefits concentration"],score:76}
 ]},
 {id:"baseline",phase:3,title:"Commission the baseline",prompt:"Which evidence approach should establish the city baseline?",requires:["climate","flows"],options:[
  {id:"rapid",title:"Rapid executive baseline",rationale:"Use existing departmental reports and reconcile later.",benefits:["Fast","Low initial cost"],tradeoffs:["Weak comparability","Hidden gaps"],impacts:{data:5,budget:-2,schedule:6},risks:["Weak comparability","Hidden data gaps"],score:55},
  {id:"geo",title:"Integrated geospatial baseline",rationale:"Reconcile GIS, planning, asset and sustainability data around common geography.",benefits:["Traceable","Supports district comparison"],tradeoffs:["Needs governance effort"],impacts:{data:15,budget:-6,schedule:-3,resilience:3},risks:["Data stewardship capacity"],score:88},
  {id:"scan",title:"Citywide laser-scan first",rationale:"Capture a detailed 3D model before setting priorities.",benefits:["Detailed geometry"],tradeoffs:["Expensive","Captures detail before use cases"],impacts:{data:9,budget:-16,schedule:-8},risks:["Unnecessary capture","High refresh cost"],score:42}
 ]},
 {id:"technology",phase:6,title:"Select the urban intelligence architecture",prompt:"Which architecture best supports the approved outcomes?",requires:["tech"],options:[
  {id:"foundation",title:"GIS + analytics + operational integration",rationale:"Build a strong data foundation and connect use cases to operations.",benefits:["Lower lifecycle burden","Clear decision use"],tradeoffs:["Less visually impressive"],impacts:{data:14,budget:-10,resilience:5},risks:["Integration capability gap"],score:90},
  {id:"federated",title:"Federated digital twin pathway",rationale:"Create a phased twin using existing systems and priority models.",benefits:["Cross-system scenarios","Scalable"],tradeoffs:["Governance and operating burden"],impacts:{data:10,budget:-17,resilience:7,schedule:-5},risks:["Model governance","Operating cost escalation"],score:80},
  {id:"platform",title:"Single-vendor citywide twin",rationale:"Procure an integrated platform covering all districts and systems.",benefits:["Fast vendor-led integration","Unified interface"],tradeoffs:["Lock-in","High lifecycle cost"],impacts:{data:12,budget:-27,schedule:-7,trust:-3},risks:["Vendor lock-in","Licence escalation","Opaque models"],score:49}
 ]},
 {id:"procurement",phase:7,title:"Approve procurement model",prompt:"How should the city buy and govern the capability?",requires:["proc"],options:[
  {id:"modular",title:"Modular outcome-based procurement",rationale:"Procure interoperable capabilities in stages with outcome gates.",benefits:["Flexibility","Exit options"],tradeoffs:["More integration responsibility"],impacts:{budget:-8,data:5,trust:3},risks:["Client integration capability"],score:91},
  {id:"turnkey",title:"Turnkey prime contractor",rationale:"One supplier owns delivery and integration.",benefits:["Single accountability"],tradeoffs:["Reduced transparency","Higher dependency"],impacts:{budget:-13,schedule:4,data:2},risks:["Prime contractor dependency"],score:67},
  {id:"lowest",title:"Lowest compliant bid",rationale:"Maximise immediate affordability.",benefits:["Low purchase price"],tradeoffs:["Weak lifecycle assurance"],impacts:{budget:-5,data:-4,trust:-4},risks:["Lifecycle cost shock","Quality erosion"],score:38}
 ]},
 {id:"pilot",phase:8,title:"Select pilot and launch conditions",prompt:"Where and how should the programme be tested?",requires:["pilot"],options:[
  {id:"heritage",title:"Heritage Core public-value pilot",rationale:"Test heat, water and public-space outcomes in a vulnerable district.",benefits:["High equity value","Complex learning"],tradeoffs:["Integration difficulty"],impacts:{resilience:8,trust:8,budget:-10,schedule:-6},risks:["Heritage approval delay"],score:86},
  {id:"cbd",title:"CBD performance pilot",rationale:"Target measurable cooling and mobility savings.",benefits:["Fast data","Clear financial benefits"],tradeoffs:["Lower equity value"],impacts:{carbon:-8,budget:-7,schedule:5,trust:2},risks:["Benefits concentration"],score:79},
  {id:"citywide",title:"Immediate citywide rollout",rationale:"Avoid pilot delay and move directly to scale.",benefits:["Political visibility"],tradeoffs:["Uncontrolled uncertainty"],impacts:{budget:-24,schedule:-10,trust:-6},risks:["Unproven scale","Operational overload"],score:31}
 ]},
 {id:"golive",phase:9,title:"Approve go-live",prompt:"What is the responsible deployment decision?",requires:["ops"],options:[
  {id:"conditional",title:"Conditional go-live",rationale:"Launch only after named owners, cyber closure and service readiness.",benefits:["Balances momentum and control"],tradeoffs:["Short delay"],impacts:{resilience:5,trust:4,schedule:-3},risks:["Condition slippage"],score:92},
  {id:"go",title:"Immediate go-live",rationale:"Proceed because technical deployment is complete.",benefits:["Avoids delay"],tradeoffs:["Operations not ready"],impacts:{schedule:6,trust:-5,resilience:-4},risks:["Service failure","Unowned incidents"],score:45},
  {id:"delay",title:"Full delay pending perfect readiness",rationale:"Do not launch until every issue is closed.",benefits:["Maximum control"],tradeoffs:["Lost momentum and benefits"],impacts:{schedule:-12,budget:-5,trust:-2},risks:["Programme fatigue"],score:61}
 ]},
 {id:"scale",phase:10,title:"Post-deployment decision",prompt:"How should the board respond to mixed realised benefits?",requires:["assurance"],options:[
  {id:"optimise",title:"Optimise then scale selectively",rationale:"Fix water and support-cost shortfalls before expanding proven use cases.",benefits:["Evidence-led growth","Controls cost"],tradeoffs:["Slower expansion"],impacts:{water:-6,carbon:-4,trust:5,budget:-5},risks:["Delayed political benefits"],score:94},
  {id:"scaleall",title:"Scale citywide now",rationale:"Cooling success justifies immediate expansion.",benefits:["Fast benefits capture"],tradeoffs:["Replicates unresolved issues"],impacts:{carbon:-8,budget:-18,trust:-3},risks:["Support cost escalation","Water underperformance"],score:52},
  {id:"stop",title:"Stop after pilot",rationale:"Mixed performance does not justify further investment.",benefits:["Protects budget"],tradeoffs:["Loses proven value and learning"],impacts:{budget:4,trust:-6,resilience:-3},risks:["Stranded capability"],score:40}
 ]}
];

export const initialRisks:Risk[] = [
 {id:"R-01",title:"Extreme heat exceeds current design assumptions",source:"Climate assessment",likelihood:4,impact:5,owner:"Chief Sustainability Officer",response:"Update heat scenarios and prioritise vulnerable districts.",status:"Open"},
 {id:"R-02",title:"Departmental data cannot be reconciled",source:"Baseline review",likelihood:4,impact:4,owner:"Chief Digital Officer",response:"Adopt common identifiers, metadata and quality gates.",status:"Open"},
 {id:"R-03",title:"Programme benefits exclude vulnerable groups",source:"Stakeholder consultation",likelihood:3,impact:5,owner:"Community Director",response:"Use equity criteria in prioritisation and benefits tracking.",status:"Open"}
];
