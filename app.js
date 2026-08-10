function rupiah(n){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n)}
function saveTx(tx){let a=JSON.parse(localStorage.getItem("qpay_history")||"[]");a.unshift(tx);localStorage.setItem("qpay_history",JSON.stringify(a))}
function demoScan(){localStorage.setItem("qpay_merchant","Toko Demo QRIS");location.href="confirm.html"}
document.addEventListener("DOMContentLoaded",()=>{
 const merchant=localStorage.getItem("qpay_merchant")||"Toko Demo QRIS";
 const m1=document.getElementById("merchant"),m2=document.getElementById("merchant2");
 if(m1)m1.textContent=merchant;if(m2)m2.textContent=merchant;
 if(document.getElementById("reader") && typeof Html5Qrcode!=="undefined"){
   const scanner=new Html5Qrcode("reader");
   scanner.start({facingMode:"environment"},{fps:10,qrbox:{width:250,height:250}},
    text=>{localStorage.setItem("qpay_merchant","QRIS Merchant");scanner.stop().then(()=>location.href="confirm.html").catch(()=>location.href="confirm.html")},
    ()=>{}
   ).catch(()=>{document.getElementById("scanStatus").textContent="Kamera tidak tersedia. Gunakan QR Demo."});
 }
 const list=document.getElementById("historyList");
 if(list){const a=JSON.parse(localStorage.getItem("qpay_history")||"[]");
   list.innerHTML=a.length?a.map(x=>`<div class="history-item"><div class="history-icon">✓</div><div class="history-info"><b>${x.merchant}</b><small>${x.time}</small></div><div class="history-amount">${rupiah(x.amount)}</div></div>`).join(""):'<div class="text-center text-muted py-5">Belum ada transaksi.</div>'}
 const sa=document.getElementById("successAmount");
 if(sa){sa.textContent=rupiah(Number(localStorage.getItem("qpay_amount")||0));document.getElementById("successMerchant").textContent=merchant;document.getElementById("successTime").textContent=localStorage.getItem("qpay_time")||"-"}
});
function pay(){
 const input=document.getElementById("amount"),amount=Number(input.value);
 if(!amount||amount<1000){alert("Masukkan nominal minimal Rp1.000");return}
 const merchant=localStorage.getItem("qpay_merchant")||"Toko Demo QRIS",time=new Date().toLocaleString("id-ID");
 localStorage.setItem("qpay_amount",amount);localStorage.setItem("qpay_time",time);
 saveTx({merchant,amount,time});location.href="success.html";
}