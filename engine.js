/* Sudoku Pencil: deterministic technique grading, unique seed generation. */
(function(root){
 'use strict';
 const ALL=511, bits=m=>{const a=[];for(let d=1;d<=9;d++)if(m&(1<<(d-1)))a.push(d);return a};
 const units=[];for(let r=0;r<9;r++)units.push(Array.from({length:9},(_,c)=>r*9+c));for(let c=0;c<9;c++)units.push(Array.from({length:9},(_,r)=>r*9+c));for(let b=0;b<9;b++)units.push(Array.from({length:9},(_,k)=>(Math.floor(b/3)*3+Math.floor(k/3))*9+(b%3)*3+k%3));
 const peers=Array.from({length:81},(_,i)=>[...new Set(units.filter(u=>u.includes(i)).flat())].filter(j=>j!==i));
 function mask(g,i){let m=ALL;for(const j of peers[i])if(g[j])m&=~(1<<(g[j]-1));return m}
 function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
 function solve(grid,limit=2,random=false){const g=[...grid];let count=0,solution=null;function visit(){let idx=-1,choices=null;for(let i=0;i<81;i++)if(!g[i]){const c=bits(mask(g,i));if(!c.length)return;if(!choices||c.length<choices.length){idx=i;choices=c;if(c.length===1)break}}if(idx<0){count++;solution=[...g];return}for(const d of random?shuffle(choices):choices){g[idx]=d;visit();g[idx]=0;if(count>=limit)return}}visit();return {count,solution}}
 function grade(puzzle){const g=[...puzzle],m=g.map((v,i)=>v?0:mask(g,i)),steps={naked:0,hidden:0,locked:0,pairs:0};let tier=0;
 function put(i,d){g[i]=d;m[i]=0;for(const j of peers[i])m[j]&=~(1<<(d-1))}
 while(g.includes(0)){
  if(m.some((v,i)=>!g[i]&&!v))throw Error('Contradiction while grading');
  let changed=false;
  for(let i=0;i<81;i++)if(!g[i]&&bits(m[i]).length===1){put(i,bits(m[i])[0]);steps.naked++;changed=true;break}if(changed)continue;
  outer:for(const u of units)for(let d=1;d<=9;d++){const cells=u.filter(i=>!g[i]&&(m[i]&(1<<(d-1))));if(cells.length===1){put(cells[0],d);steps.hidden++;tier=Math.max(tier,1);changed=true;break outer}}if(changed)continue;
  // Pointing and claiming: a digit confined to the intersection of two units.
  locked:for(const a of units)for(let d=1;d<=9;d++){const cells=a.filter(i=>!g[i]&&(m[i]&(1<<(d-1))));if(cells.length<2)continue;for(const b of units){if(a===b||!cells.every(i=>b.includes(i)))continue;const targets=b.filter(i=>!a.includes(i)&&!g[i]&&(m[i]&(1<<(d-1))));if(targets.length){for(const i of targets)m[i]&=~(1<<(d-1));steps.locked++;tier=2;changed=true;break locked}}}if(changed)continue;
  pairs:for(const u of units)for(const i of u){if(g[i]||bits(m[i]).length!==2)continue;const same=u.filter(j=>!g[j]&&m[j]===m[i]);if(same.length!==2)continue;const targets=u.filter(j=>!g[j]&&!same.includes(j)&&(m[j]&m[i]));if(targets.length){const pair=m[i];for(const j of targets)m[j]&=~pair;steps.pairs++;tier=2;changed=true;break pairs}}if(changed)continue;
  return {level:'Expert',solved:false,remaining:g.filter(v=>!v).length,steps,technique:'Beyond singles, locked candidates and naked pairs'};
 }
 return {level:['Easy','Medium','Hard'][tier],solved:true,remaining:0,steps,technique:['Naked singles','Hidden singles','Locked candidates or naked pairs'][tier]};
 }
 function seed(){const solution=solve(Array(81).fill(0),1,true).solution;const puzzle=[...solution];for(const i of shuffle(Array.from({length:81},(_,i)=>i))){const v=puzzle[i];puzzle[i]=0;if(solve(puzzle).count!==1)puzzle[i]=v}return {puzzle,solution}}
 function transform(seed){const order=()=>shuffle([0,1,2]).flatMap(b=>shuffle([0,1,2]).map(i=>b*3+i)),rows=order(),cols=order(),digits=[0,...shuffle([1,2,3,4,5,6,7,8,9])],transpose=Math.random()<.5;const map=g=>rows.flatMap(r=>cols.map(c=>digits[g[transpose?c*9+r:r*9+c]]));return {puzzle:map(seed.puzzle),solution:map(seed.solution)}}
 function makePuzzle(level,bank,previous=''){const pool=bank[level];if(!pool?.length)throw Error('No verified puzzles for '+level);for(let attempt=0;attempt<80;attempt++){const p=transform(pool[Math.floor(Math.random()*pool.length)]),rating=grade(p.puzzle);if(rating.level===level&&p.puzzle.join('')!==previous)return {...p,rating,score:Object.values(rating.steps).reduce((a,b)=>a+b,0)}}const p=pool.find(p=>p.puzzle.join('')!==previous)||pool[0];return {...p,puzzle:[...p.puzzle],solution:[...p.solution],rating:grade(p.puzzle),score:0}}
 const api={grade,solve,seed,transform,makePuzzle};if(typeof module!=='undefined')module.exports=api;else root.SudokuEngine=api;
})(globalThis);
