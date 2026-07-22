
export type PhaseId = 1|2|3|4|5|6|7|8|9|10;
export type MetricKey = "carbon"|"water"|"circularity"|"resilience"|"trust"|"data"|"budget"|"schedule";
export type Metric = { key:MetricKey; label:string; value:number; unit:string; source:string; good:"high"|"low" };
export type Evidence = { id:string; phase:PhaseId; title:string; type:string; summary:string; findings:string[]; questions:string[] };
export type District = { id:string; name:string; x:number; y:number; profile:string; issues:string[]; opportunities:string[]; people:string; scores:Record<"heat"|"water"|"carbon"|"flood"|"assets",number> };
export type Option = { id:string; title:string; rationale:string; benefits:string[]; tradeoffs:string[]; impacts:Partial<Record<MetricKey,number>>; risks:string[]; score:number };
export type Decision = { id:string; phase:PhaseId; title:string; prompt:string; requires:string[]; options:Option[] };
export type Risk = { id:string; title:string; source:string; likelihood:number; impact:number; owner:string; response:string; status:"Open"|"Mitigating"|"Closed" };
