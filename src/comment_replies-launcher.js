/* Comments for people reading the source of this script (gday!)

* The <script> tag can happily be placed in the <head> of your
  blog for pages that show comments.

*/
// Badge created when DOM loaded, not during.
// Thx http://www.kryogenix.org/days/2007/09/26/shortloaded
(function(i) {var u =navigator.userAgent;var e=/*@cc_on!@*/false; var st =
setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;
if(dr=="loaded"||dr=="complete"){i()}else{st(arguments.callee,10);}},10);}
else if((/mozilla/i.test(u)&&!/(compati)/.test(u)) || (/opera/i.test(u))){
document.addEventListener("DOMContentLoaded",i,false); } else if(e){     (
function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');
i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}})(
function(){
  var script = document.createElement("script");
  script.src = 'dist/comment_replies.js';
  script.type= "text/javascript";
  document.getElementsByTagName('head')[0].appendChild(script);
});
