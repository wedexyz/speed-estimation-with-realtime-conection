
var model
var video 
var localstream


//waktu1=-----timer 1----------   
var c1=0;
var t1;
var timer_is_on1=0;

//waktu1=-----timer 2----------   
var c2=0;
var t2;
var timer_is_on2=0;

 //waktu1=-----timer 3----------  
 var c3=0;
 var t3;
 var timer_is_on3=0;

function timedCount1(){
      document.getElementById('txt1').value=c1;
      c1=c1+1000;
      timer_is_on1=1;
    }

function stopCount1(){
      clearTimeout(t1);
      timer_is_on1=0;
      document.getElementById('txt1').value=c1;
      c1=0;
    }
  
 
 function timedCount2(){
  document.getElementById('txt2').value=c2;
  c2=c2+1000;
  timer_is_on2=1;
}

function stopCount2(){
  clearTimeout(t2);
  timer_is_on2=0;
  document.getElementById('txt2').value=c2;
  c2=0;
}

 function timedCount3(){
  document.getElementById('txt3').value=c3;
  c3=c3+1000;
  timer_is_on3=1;
}

function stopCount3(){
  clearTimeout(t3);
  timer_is_on3=0;
  document.getElementById('txt3').value=c3;
  c3=0;
}


console.log('loading coco-ssd model...')
cocoSsd.load().then(function(res){
model = res
console.log('done')
document.getElementById("model").value="model berhasil didownload";
});

function drawVideoPredictions(predictions){
    const c = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    c.width = 700;
    c.height = 500;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);
    
/*
    
   // penambahan garis batas
  // var hitung1=document.getElementById("cepat1").value;
 //  var hitung2=document.getElementById("cepat2").value;
 //  var hitung3=document.getElementById("cepat3").value;

   ctx.fillStyle = "#151c1fad";
   ctx.fillRect(0,400,700,55);
   ctx.font = "30px Verdana";
   // Create gradient
   var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
   gradient.addColorStop("0", "magenta");
   gradient.addColorStop("0.5", "blue");
   gradient.addColorStop("1.0", "red");
   
   // Fill with gradient
  // ctx.strokeStyle = gradient;
  // ctx.strokeText(hitung1+"Kmh",10,450,700,55);
  // ctx.strokeText(hitung2+"Kmh",30,450,700,55);
  // ctx.strokeText(hitung3+"Kmh",70,450,700,55);

*/
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach(prediction => {

     var x = prediction.bbox[0];
     var y = prediction.bbox[1];
     var width = prediction.bbox[2];
     var height = prediction.bbox[3];
   
    //logika zona
      var z1 = document.getElementById("speed1").value;
      var z2 =document.getElementById("speed2").value;
      var z3 =document.getElementById("speed3").value;
      var baca1;
      var baca2;
      var baca3;
      //logika zona 1--------------------
      if (z1 === "zone: 0 status: true"){
        timedCount1();
        baca1="zona aktif";
      }
      if (z1 === "zone: 0 status: false"){
        stopCount1();
        baca1="zona off";
      }
      //logika zona 2-------------------
      if (z2 === "zone: 1 status: true"){
        timedCount2();
        baca2="zona aktif";
      }
      if (z2 === "zone: 1 status: false"){
        stopCount2();
        baca2="zona off";
      } 
      //logika zona 3------------------
      if (z3 === "zone: 2 status: true"){
        timedCount3();
        baca3="zona aktif";
      }
      if (z3 === "zone: 2 status: false"){
        stopCount3();
        baca3="zona off";
      } 
      document.getElementById("zona1").value=baca1;
      document.getElementById("zona2").value=baca2;
      document.getElementById("zona3").value=baca3;

      //deteksi object batas----------------------
      var str = (prediction.class)
      var res = str.valueOf();
      var text;
      document.getElementById("myInput").value=res;
     


      if(res=== "mobil"){
        text="deteksi";
    
      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
/*
      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);
      }
      
      );
     */

  

      document.getElementById('lebar').value 	= width.toFixed(0);
      document.getElementById('tinggi').value	= height.toFixed(0);
      }else {
        //deteksi
      text="kosong";
      document.getElementById('lebar').value 	= 0;
      document.getElementById('tinggi').value	= 0;
      }
      document.getElementById("hasil").value = text;
      var L=width.toFixed(0);
      var T=height.toFixed(0);

      var t1= document.getElementById('txt1').value ;
      var t2= document.getElementById('txt2').value ;
      var t3= document.getElementById('txt3').value ;

      var hitung1;
      var hitung2;
      var hitung3;

      hitung1=L*T/t1;
      hitung2=L*T/t2;
      hitung3=L*T/t3;

      document.getElementById("cepat1").value = hitung1.toFixed(0);
      document.getElementById("cepat2").value = hitung2.toFixed(0);
      document.getElementById("cepat3").value = hitung3.toFixed(0);

    });
/*
   
    */
}

function detectFrame() {
    model.detect(video).then(predictions => {
        drawVideoPredictions(predictions)
        console.log(predictions);
        if(video.srcObject.active){
            requestAnimationFrame(detectFrame)
           
        }
    })
  }

function load_webcam(){
    video = document.getElementById("remoteVideo")
    navigator.mediaDevices.getUserMedia(
      {audio:false,
        video: {
          facingMode: "user",
          width: 700,
          height: 500
        }
      })
      .then(stream => {
        video.srcObject = stream
        localstream = stream
        video.onloadedmetadata = () => {
          video.play()
          detectFrame()
        }
      })
}




