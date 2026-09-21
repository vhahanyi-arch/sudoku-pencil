/* Local printed-digit reader. Images never leave the browser. */
(function(root){'use strict';
const N=32;
function normalize(canvas){
 const w=canvas.width,h=canvas.height,data=canvas.getContext('2d').getImageData(0,0,w,h).data;
 const mask=new Uint8Array(w*h),seen=new Uint8Array(w*h);for(let i=0;i<mask.length;i++)mask[i]=data[i*4+3]>100&&(data[i*4]+data[i*4+1]+data[i*4+2])/3<155?1:0;
 let largest=[];for(let i=0;i<mask.length;i++){if(!mask[i]||seen[i])continue;const q=[i];seen[i]=1;for(let k=0;k<q.length;k++){const p=q[k],x=p%w,y=Math.floor(p/w);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const xx=x+dx,yy=y+dy,j=yy*w+xx;if(xx>=0&&xx<w&&yy>=0&&yy<h&&mask[j]&&!seen[j]){seen[j]=1;q.push(j)}}}if(q.length>largest.length)largest=q}
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
const api={read,validate};if(typeof module!=='undefined')module.exports=api;else root.SudokuScreenshot=api;
})(globalThis);
