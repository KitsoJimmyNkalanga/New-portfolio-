var MAIL=["jimmynkalanga","gmail.com"].join("@");

(function(){
  var map=["..RRRR..",".RRRRRR.","BBBBBBBB","BWKBWKBB","BBBBBBBB","BBKKKKBB",".BBBBBB.","..R..R.."];
  var col={R:"#7a1020",B:"#2447c9",W:"#ffffff",K:"#111111"};
  var s=document.getElementById("sprite"),h="";
  map.forEach(function(row,y){for(var x=0;x<8;x++){var c=row[x];if(c!==".")h+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+col[c]+'"/>';}});
  s.innerHTML=h;
  var xp=document.getElementById("xp");
  function u(){var d=document.documentElement,m=d.scrollHeight-window.innerHeight;xp.style.width=(m>0?(window.scrollY/m)*100:0)+"%";}
  window.addEventListener("scroll",u,{passive:true});u();
})();

(function(){
  var cv=document.getElementById("game"),c=cv.getContext("2d"),W=320,H=240;
  var st="idle",px=152,bugs=[],score=0,lives=3,t=0,best=0,k={l:0,r:0};
  function css(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}
  function reset(){px=152;bugs=[];score=0;lives=3;t=0;st="play";}
  function mv(x){var r=cv.getBoundingClientRect();px=Math.max(0,Math.min(W-16,(x-r.left)/r.width*W-8));}
  cv.addEventListener("pointerdown",function(e){if(st!=="play")reset();else mv(e.clientX);});
  cv.addEventListener("pointermove",function(e){if(st==="play")mv(e.clientX);});
  window.addEventListener("keydown",function(e){
    var d=e.key==="ArrowLeft"||e.key==="a"?"l":e.key==="ArrowRight"||e.key==="d"?"r":"";
    if(d){k[d]=1;if(st==="play")e.preventDefault();}
  });
  window.addEventListener("keyup",function(e){
    if(e.key==="ArrowLeft"||e.key==="a")k.l=0;
    if(e.key==="ArrowRight"||e.key==="d")k.r=0;
  });
  function tx(s,x,y,col,al){c.fillStyle=col;c.textAlign=al||"center";c.fillText(s,x,y);}
  function draw(){
    var bg=css("--panel"),ink=css("--ink"),red=css("--red"),blue=css("--blue");
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    c.font="8px 'Press Start 2P',monospace";
    bugs.forEach(function(b){c.fillStyle=red;c.fillRect(b.x,b.y,12,12);c.fillStyle=ink;c.fillRect(b.x+2,b.y+3,2,2);c.fillRect(b.x+8,b.y+3,2,2);});
    c.fillStyle=blue;c.fillRect(px,208,16,16);c.fillStyle="#fff";c.fillRect(px+3,212,3,3);c.fillRect(px+10,212,3,3);
    c.fillStyle=ink;c.fillRect(0,224,W,2);
    tx("SCORE "+score,8,16,ink,"left");
    tx("♥".repeat(Math.max(lives,0)),W-8,16,red,"right");
    if(st==="idle")tx("TAP TO START",W/2,110,ink);
    if(st==="over"){tx("GAME OVER",W/2,100,red);tx("BEST "+best,W/2,122,ink);tx("TAP TO RETRY",W/2,144,blue);}
  }
  function loop(){
    if(st==="play"){
      t++;
      px=Math.max(0,Math.min(W-16,px+(k.r-k.l)*4));
      if(t%Math.max(14,40-Math.floor(t/200))===0)bugs.push({x:Math.random()*(W-12),y:-12,v:1.5+Math.random()+t/1500});
      for(var i=bugs.length-1;i>=0;i--){
        var b=bugs[i];b.y+=b.v;
        if(b.y+12>208&&b.y<224&&b.x+12>px&&b.x<px+16){
          bugs.splice(i,1);lives--;
          if(lives<=0){st="over";best=Math.max(best,score);}
        }else if(b.y>H){bugs.splice(i,1);score++;}
      }
    }
    draw();requestAnimationFrame(loop);
  }
  loop();
})();

(function(){
  var a=document.getElementById("mail");
  a.href="mailto:"+MAIL;a.textContent=MAIL;
})();

(function(){
  var b=document.getElementById("save"),m=document.getElementById("savemsg");
  var RESUME=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Kitso Nkalanga — Resume</title>
<style>body{font-family:Arial,sans-serif;font-size:11pt;color:#111;max-width:780px;margin:30px auto;padding:0 24px;line-height:1.5}
h1{margin:0;font-size:24pt}h2{font-size:10pt;letter-spacing:.1em;text-transform:uppercase;border-bottom:2px solid #7a1020;color:#7a1020;margin-top:22px}
.s{color:#555;margin-bottom:8px}li{margin-bottom:3px}.r{display:flex;justify-content:space-between;font-weight:bold}</style></head><body>
<h1>Kitso Nkalanga</h1><div class="s">Software Developer · Gaborone, Botswana</div>
<div>${MAIL} · github.com/KitsoJimmyNkalanga</div>
<h2>Profile</h2><p>Software developer with experience shipping production mobile apps and USSD backends in Botswana. Comfortable from systems-level Rust and C to React and NestJS. Focused on offline-first, distributed and privacy-focused software. Exploring game development with Raylib.</p>
<h2>Experience</h2>
<div class="r"><span>Software Developer — Maru Quick (Pty) Ltd</span><span>Mar 2026 – Jun 2026</span></div>
<ul><li>Built and shipped the mobile app for a Botswana fintech platform</li><li>Developed and deployed the USSD backend giving feature phones access to financial services</li></ul>
<div class="r"><span>Industrial Attachment, Data Analyst — Technology Affiliates Group</span><span>Jan 2025 – Jul 2025</span></div>
<ul><li>Seven-month attachment as part of the UB Computer Science programme: data analysis and internal technology projects</li></ul>
<h2>Projects</h2>
<p><b>ShieldMesh</b> (Rust) — Offline-first peer-to-peer encrypted mesh messaging. Final year project.</p>
<p><b>Payment Ledger System</b> (Rust) — Pix/Visa-style payment system with a double-entry ledger and transaction engine.</p>
<p><b>Project Chronos</b> (Rust, UniFFI) — Android and iOS app sharing one Rust core.</p>
<p><b>Raylib Game Development</b> (C) — Rendering, game loops and graphics from first principles. In progress.</p>
<h2>Skills</h2>
<p><b>Languages:</b> Rust, C, Java, Python, TypeScript, SQL<br><b>Web and mobile:</b> React, NestJS, Node.js, Android, USSD, REST<br><b>Infrastructure:</b> PostgreSQL, Redis, Docker, GitHub Actions, AWS, Linux</p>
<h2>Education</h2><p><b>BSc Computer Science</b>, University of Botswana — fourth year completed</p>
<h2>Courses</h2><p>Red Hat System Administration I and II · Red Hat OpenShift with Podman · Red Hat Python Programming · Introduction to Cybersecurity (Cisco)</p>
</body></html>`;
  function blobSave(){
    var u=URL.createObjectURL(new Blob([RESUME],{type:"text/html"}));
    var a=document.createElement("a");
    a.href=u;a.download="Fish_Nkalanga_Resume.html";
    document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
    m.textContent="GAME SAVED \u2713";
  }
  function standalone(){b.hidden=false;b.addEventListener("click",blobSave);}
  if(window.claude&&window.claude.use){
    window.claude.use("downloads").then(function(d){
      if(!d){standalone();return;}
      b.hidden=false;
      b.addEventListener("click",function(){
        d.save({filename:"Fish_Nkalanga_Resume.html",data:RESUME}).then(function(){m.textContent="GAME SAVED \u2713";}).catch(function(e){m.textContent=e&&e.code==="declined"?"SAVE CANCELLED":"SAVE UNAVAILABLE HERE";});
      });
    }).catch(standalone);
  }else{standalone();}
})();
