/* Sudoku Pencil: deterministic technique grading, unique seed generation. */
(function(root){
 'use strict';
 const ALL=511, bits=m=>{const a=[];for(let d=1;d<=9;d++)if(m&(1<<(d-1)))a.push(d);return a};
 const units=[];for(let r=0;r<9;r++)units.push(Array.from({length:9},(_,c)=>r*9+c));for(let c=0;c<9;c++)units.push(Array.from({length:9},(_,r)=>r*9+c));for(let b=0;b<9;b++)units.push(Array.from({length:9},(_,k)=>(Math.floor(b/3)*3+Math.floor(k/3))*9+(b%3)*3+k%3));
 const peers=Array.from({length:81},(_,i)=>[...new Set(units.filter(u=>u.includes(i)).flat())].filter(j=>j!==i));
 function mask(g,i){let m=ALL;for(const j of peers[i])if(g[j])m&=~(1<<(g[j]-1));return m}
 function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
 function solve(grid,limit=2,random=false){const g=[...grid];let count=0,solution=null;function visit(){let idx=-1,choices=null;for(let i=0;i<81;i++)if(!g[i]){const c=bits(mask(g,i));if(!c.length)return;if(!choices||c.length<choices.length){idx=i;choices=c;if(c.length===1)break}}if(idx<0){count++;solution=[...g];return}for(const d of random?shuffle(choices):choices){g[idx]=d;visit();g[idx]=0;if(count>=limit)return}}visit();return {count,solution}}
 function grade(puzzle, verifySolution=null){const g=[...puzzle],m=g.map((v,i)=>v?0:mask(g,i));const steps={fullHouse:0,boxSingle:0,lineSingle:0,naked:0,locked:0,pairs:0,hiddenPairs:0,triples:0};let bottlenecks=0;
 const put=(i,d)=>{g[i]=d;m[i]=0;for(const j of peers[i])m[j]&=~(1<<(d-1))};
 const finish=solved=>{const advanced=steps.locked+steps.pairs+steps.hiddenPairs+steps.triples;const easy=steps.lineSingle+steps.naked+advanced===0;const level=!solved?'Expert':easy?'Easy':steps.triples>0||advanced>=4?'Hard':'Medium';return {level,solved,remaining:g.filter(v=>!v).length,steps,bottlenecks,calibration:'newspaper-v1',technique:{Easy:'Relaxed scanning · box singles',Medium:'Candidate work · singles, occasional pairs',Hard:'Sustained deductions · pairs and triples',Expert:'Extra challenge · beyond this logical grader'}[level]}};
 while(g.includes(0)){
  if(m.some((v,i)=>!g[i]&&!v))throw Error('Contradiction while grading');
  if(verifySolution)for(let i=0;i<81;i++){if(g[i]&&g[i]!==verifySolution[i])throw Error('Invalid deduction');if(!g[i]&&!(m[i]&(1<<(verifySolution[i]-1))))throw Error('Invalid candidate elimination')}
  let changed=false;
  for(const u of units){const e=u.filter(i=>!g[i]);if(e.length===1){put(e[0],bits(m[e[0]])[0]);steps.fullHouse++;changed=true;break}}if(changed)continue;
  // Box scanning is prioritised, reflecting solving without exhaustive notes.
  scan:for(const indexes of [[18,27],[0,18]]){for(let u=indexes[0];u<indexes[1];u++)for(let d=1;d<=9;d++){const cells=units[u].filter(i=>!g[i]&&(m[i]&(1<<(d-1))));if(cells.length===1){put(cells[0],d);steps[u>=18?'boxSingle':'lineSingle']++;changed=true;break scan}}}if(changed)continue;
  for(let i=0;i<81;i++)if(!g[i]&&bits(m[i]).length===1){put(i,bits(m[i])[0]);steps.naked++;changed=true;break}if(changed)continue;
  bottlenecks++;
  locked:for(const a of units)for(let d=1;d<=9;d++){const cells=a.filter(i=>!g[i]&&(m[i]&(1<<(d-1))));if(cells.length<2)continue;for(const b of units){if(a===b||!cells.every(i=>b.includes(i)))continue;const targets=b.filter(i=>!a.includes(i)&&!g[i]&&(m[i]&(1<<(d-1))));if(targets.length){for(const i of targets)m[i]&=~(1<<(d-1));steps.locked++;changed=true;break locked}}}if(changed)continue;
  pairs:for(const u of units)for(const i of u){if(g[i]||bits(m[i]).length!==2)continue;const same=u.filter(j=>!g[j]&&m[j]===m[i]);if(same.length!==2)continue;const targets=u.filter(j=>!g[j]&&!same.includes(j)&&(m[j]&m[i]));if(targets.length){const pair=m[i];for(const j of targets)m[j]&=~pair;steps.pairs++;changed=true;break pairs}}if(changed)continue;
  hidden:for(const u of units)for(let a=1;a<9;a++)for(let b=a+1;b<=9;b++){const ma=1<<(a-1),mb=1<<(b-1),ca=u.filter(i=>!g[i]&&(m[i]&ma)),cb=u.filter(i=>!g[i]&&(m[i]&mb));if(ca.length!==2||cb.length!==2||!ca.every(i=>cb.includes(i)))continue;const pair=ma|mb;if(ca.some(i=>m[i]!==pair)){for(const i of ca)m[i]&=pair;steps.hiddenPairs++;changed=true;break hidden}}if(changed)continue;
  triples:for(const u of units){const cells=u.filter(i=>!g[i]&&bits(m[i]).length<=3);for(let a=0;a<cells.length-2;a++)for(let b=a+1;b<cells.length-1;b++)for(let c=b+1;c<cells.length;c++){const set=[cells[a],cells[b],cells[c]],union=set.reduce((v,i)=>v|m[i],0);if(bits(union).length!==3)continue;const targets=u.filter(i=>!g[i]&&!set.includes(i)&&(m[i]&union));if(targets.length){for(const i of targets)m[i]&=~union;steps.triples++;changed=true;break triples}}}if(changed)continue;
  return finish(false);
 }
 if(verifySolution&&g.some((v,i)=>v!==verifySolution[i]))throw Error('Invalid completed grid');return finish(true);
 }
 function seed(){const solution=solve(Array(81).fill(0),1,true).solution;const puzzle=[...solution];for(const i of shuffle(Array.from({length:81},(_,i)=>i))){const v=puzzle[i];puzzle[i]=0;if(solve(puzzle).count!==1)puzzle[i]=v}return {puzzle,solution}}
 function transform(seed){const order=()=>shuffle([0,1,2]).flatMap(b=>shuffle([0,1,2]).map(i=>b*3+i)),rows=order(),cols=order(),digits=[0,...shuffle([1,2,3,4,5,6,7,8,9])],transpose=Math.random()<.5;const map=g=>rows.flatMap(r=>cols.map(c=>digits[g[transpose?c*9+r:r*9+c]]));return {puzzle:map(seed.puzzle),solution:map(seed.solution)}}
 function makePuzzle(level,bank,previous=''){const pool=bank[level];if(!pool?.length)throw Error('No verified puzzles for '+level);for(let attempt=0;attempt<80;attempt++){const p=transform(pool[Math.floor(Math.random()*pool.length)]),rating=grade(p.puzzle);if(rating.level===level&&p.puzzle.join('')!==previous)return {...p,rating,score:Object.values(rating.steps).reduce((a,b)=>a+b,0)}}const p=pool.find(p=>p.puzzle.join('')!==previous)||pool[0];return {...p,puzzle:[...p.puzzle],solution:[...p.solution],rating:grade(p.puzzle),score:0}}
 const api={grade,solve,seed,transform,makePuzzle};if(typeof module!=='undefined')module.exports=api;else root.SudokuEngine=api;
})(globalThis);
