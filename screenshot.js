/* Local printed-digit reader. Images never leave the browser. */
(function(root){'use strict';
const N=32;
function normalize(canvas){
 const w=canvas.width,h=canvas.height,data=canvas.getContext('2d').getImageData(0,0,w,h).data;
 const mask=new Uint8Array(w*h),seen=new Uint8Array(w*h);for(let i=0;i<mask.length;i++)mask[i]=data[i*4+3]>100&&data[i*4]*.299+data[i*4+1]*.587+data[i*4+2]*.114<155?1:0;
 // Coloured highlights (e.g. an orange selected square) are light by luminance, so they are not read as ink.
 // A thin or sparse piece touching the crop edge (a line, or a corner of the border) is not a digit.
 let largest=[];for(let i=0;i<mask.length;i++){if(!mask[i]||seen[i])continue;const q=[i];seen[i]=1;let x0=w,x1=0,y0=h,y1=0;for(let k=0;k<q.length;k++){const p=q[k],x=p%w,y=Math.floor(p/w);if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const xx=x+dx,yy=y+dy,j=yy*w+xx;if(xx>=0&&xx<w&&yy>=0&&yy<h&&mask[j]&&!seen[j]){seen[j]=1;q.push(j)}}}const edge=x0===0||y0===0||x1===w-1||y1===h-1,thin=x1-x0<w*.12||y1-y0<h*.12,sparse=q.length<(x1-x0+1)*(y1-y0+1)*.12;if(edge&&(thin||sparse))continue;if(q.length>largest.length)largest=q}
 if(largest.length<Math.max(5,w*h*.003))return null;
 const xs=largest.map(i=>i%w),ys=largest.map(i=>Math.floor(i/w)),left=Math.min(...xs),top=Math.min(...ys),bw=Math.max(...xs)-left+1,bh=Math.max(...ys)-top+1;
 if(bh<h*.23)return null;const scale=24/Math.max(bw,bh),ox=(N-bw*scale)/2,oy=(N-bh*scale)/2,out=new Uint8Array(N*N);
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){const sx=Math.floor((x-ox)/scale+left),sy=Math.floor((y-oy)/scale+top);if(sx>=left&&sx<left+bw&&sy>=top&&sy<top+bh)out[y*N+x]=mask[sy*w+sx]}
 return out;
}
function distance(a,b){let best=1;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){let inter=0,total=0;for(let y=0;y<N;y++)for(let x=0;x<N;x++){const v=a[y*N+x],xx=x+dx,yy=y+dy,z=xx<0||yy<0||xx>=N||yy>=N?0:b[yy*N+xx];inter+=v*z;total+=v+z}best=Math.min(best,1-2*inter/(total||1))}return best}
let templates;
function read(canvas,rect){
 if(!templates){templates=[];for(const font of ['Arial','Helvetica','Georgia','Times New Roman','system-ui'])for(const weight of [400,600,700])for(let digit=1;digit<=9;digit++){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle='white';x.fillRect(0,0,64,64);x.fillStyle='black';x.font=`${weight} 44px ${font}`;x.textAlign='center';x.textBaseline='middle';x.fillText(digit,32,33);templates.push({digit,bitmap:normalize(c)})}}
 const digits=[],uncertain=[];for(let i=0;i<81;i++){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),cw=rect.w/9,ch=rect.h/9;x.fillStyle='white';x.fillRect(0,0,64,64);x.drawImage(canvas,rect.x+(i%9+.12)*cw,rect.y+(Math.floor(i/9)+.12)*ch,cw*.76,ch*.76,0,0,64,64);const a=normalize(c);if(!a){digits.push(0);continue}const ranks=Array.from({length:9},(_,k)=>({digit:k+1,score:1}));for(const t of templates)ranks[t.digit-1].score=Math.min(ranks[t.digit-1].score,distance(a,t.bitmap));ranks.sort((a,b)=>a.score-b.score);digits.push(ranks[0].digit);if(ranks[0].score>.25||ranks[1].score-ranks[0].score<.045)uncertain.push(i)}return {digits,uncertain};
}
// Finds the puzzle in a screenshot: the largest square with dark edges on all four sides and a mostly
// light inside. Dark rows of the 3x3 boxes at the thirds make a candidate win over other squares.
function findGrid(canvas){
 const w=canvas.width,h=canvas.height,d=canvas.getContext('2d').getImageData(0,0,w,h).data,dark=new Uint8Array(w*h);
 for(let i=0;i<w*h;i++)dark[i]=(d[i*4]*299+d[i*4+1]*587+d[i*4+2]*114)/1000<150?1:0;
 const minLen=Math.round(Math.min(w,h)*.25),tol=Math.max(3,Math.round(Math.min(w,h)*.012));
 // Dark runs along each row (or column), allowing gaps of 2px for anti-aliasing, merged into bands.
 function bands(count,len,at){const out=[];for(let a=0;a<count;a++){let s=-1,last=-1;for(let b=0;b<=len;b++){if(b<len&&at(a,b)){if(s<0)s=b;last=b}else if(s>=0&&(b===len||b-last>2)){if(last-s+1>=minLen){const band=out.find(k=>a-k.a1<=2&&Math.abs(k.s-s)<=tol&&Math.abs(k.e-last)<=tol);if(band){band.a1=a;band.s=Math.min(band.s,s);band.e=Math.max(band.e,last)}else out.push({a0:a,a1:a,s,e:last})}s=-1}}}return out}
 const H=bands(h,w,(y,x)=>dark[y*w+x]),V=bands(w,h,(x,y)=>dark[y*w+x]);
 const near=(list,pos,s,e)=>list.some(k=>pos>=k.a0-tol&&pos<=k.a1+tol&&k.s<=s+tol&&k.e>=e-tol);
 let best=null;
 for(const t of H)for(const b of H){if(b.a0<=t.a1||Math.abs(t.s-b.s)>tol||Math.abs(t.e-b.e)>tol)continue;
  const x0=Math.min(t.s,b.s),x1=Math.max(t.e,b.e),y0=t.a0,y1=b.a1,sw=x1-x0+1,sh=y1-y0+1;
  if(sw<minLen||Math.abs(sw-sh)>sw*.06||!near(V,x0,y0,y1)||!near(V,x1,y0,y1))continue;
  let ink=0,n=0;const m=Math.round(sw*.04);for(let y=y0+m;y<y1-m;y+=2)for(let x=x0+m;x<x1-m;x+=2){ink+=dark[y*w+x];n++}if(!n||ink/n>.35)continue;
  const thirds=[1,2].every(k=>near(H,Math.round(y0+sh*k/3),x0,x1)&&near(V,Math.round(x0+sw*k/3),y0,y1));
  const score=sw+(thirds?1e5:0);if(!best||score>best.score)best={score,x:x0,y:y0,w:sw,h:sh,thirds}}
 return best&&{x:best.x,y:best.y,w:best.w,h:best.h,boxes:best.thirds};
}
function validate(puzzle){
 if(!Array.isArray(puzzle)||puzzle.length!==81||puzzle.some(v=>!Number.isInteger(v)||v<0||v>9))throw Error('Use only digits 1–9, or leave a cell blank.');
 const peers=Array.from({length:81},(_,i)=>Array.from({length:81},(_,j)=>j).filter(j=>i!==j&&(Math.floor(i/9)===Math.floor(j/9)||i%9===j%9||(Math.floor(i/27)===Math.floor(j/27)&&Math.floor(i%9/3)===Math.floor(j%9/3)))));
 for(let i=0;i<81;i++)if(puzzle[i]&&peers[i].some(j=>puzzle[j]===puzzle[i]))throw Error('Some givens conflict in a row, column or box. Check the preview against your screenshot.');
 if(!puzzle.includes(0))throw Error('This grid is already filled. Import an unplayed puzzle with blank cells.');
 const g=[...puzzle];let count=0,solution,nodes=0;
 function visit(){if(++nodes>200000)throw Error('This grid needs more checking. Check for missing or misread givens, then try again.');let index=-1,choices;
 for(let i=0;i<81;i++)if(!g[i]){const used=new Set(peers[i].map(j=>g[j])),c=[1,2,3,4,5,6,7,8,9].filter(d=>!used.has(d));if(!c.length)return;if(!choices||c.length<choices.length){choices=c;index=i;if(c.length===1)break}}
 if(index<0){count++;solution=[...g];return}for(const d of choices){g[index]=d;visit();g[index]=0;if(count>=2)return}}
 visit();if(count!==1)throw Error(count?'This grid has more than one solution. Check for missing or misread givens.':'This grid has no solution. Check the preview against your screenshot.');return solution;
}
const api={read,validate,findGrid};if(typeof module!=='undefined')module.exports=api;else root.SudokuScreenshot=api;
})(globalThis);
