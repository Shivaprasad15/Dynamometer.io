'use strict';


let dev = false;
//let t0 = 0;
//let t1 = 0;

	 







     var c = document.getElementById("canvas");
        c.width = 500;
        c.height =550;

        var ctx = c.getContext("2d");

        //Rescale the size
        ctx.scale(1,1);

        var speedGradient = ctx.createLinearGradient(0, 500, 0, 0);
        speedGradient.addColorStop(0, '#00b8fe');
        speedGradient.addColorStop(1, '#41dcf4');

        var rpmGradient = ctx.createLinearGradient(0, 500, 0, 0);
       rpmGradient.addColorStop(0, '#f7b733');
        rpmGradient.addColorStop(1, '#fc4a1a');
       //rpmGradient.addColorStop(1, '#EFfff6');
	   
	   
	   
	   

	   
	   
	   
	   
	   
	   

        function speedNeedle(rotation) {
            ctx.lineWidth = 2;

            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(rotation);
            ctx.strokeRect(-130 / 2 + 170, -1 / 2, 135, 1);
            ctx.restore();

            rotation += Math.PI / 180;
        }

        function rpmNeedle(rotation) {
            ctx.lineWidth = 2;

            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(rotation);
            ctx.strokeRect(-130 / 2 + 170, -1 / 2, 135, 1);
            ctx.restore();

            rotation += Math.PI / 180;
        }

        function drawMiniNeedle(rotation, width, speed) {
            ctx.lineWidth = width;

            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(rotation);
            ctx.strokeStyle = "#333";
            ctx.fillStyle = "#333";
            ctx.strokeRect(-20 / 2 + 220, -1 / 2, 20, 1);
            ctx.restore();

            let x = (250 + 180 * Math.cos(rotation));
            let y = (250 + 180 * Math.sin(rotation));

            ctx.font = "20px MuseoSans_900-webfont";
            ctx.fillText(speed, x, y);

            rotation += Math.PI / 180;
        }

        function calculateSpeedAngle(x, a, b) {
            let degree = (a - b) * (x) + b;
            let radian = (degree * Math.PI) / 180;
            return radian <= 1.45 ? radian : 1.45;
        }

        function calculateRPMAngel(x, a, b) {
            let degree = (a - b) * (x) + b;
            let radian = (degree * Math.PI) / 180;
            return radian >= -0.46153862656807704 ? radian : -0.46153862656807704;
        }
		
		
		

        function drawSpeedo(speed, gear, rpm, topSpeed) {
            if (speed == undefined) {
                return false;
            } else {
                speed = Math.floor(speed);
                rpm = rpm * 10;
            }

            ctx.clearRect(0, 0, 500, 500);

            ctx.beginPath();
            ctx.fillStyle = 'rgba(0, 0, 0, .9)';
            ctx.arc(250, 250, 240, 0, 2 * Math.PI);
            ctx.fill();
            ctx.save()
            ctx.restore();
            ctx.fillStyle = "#FFF";
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "#333";
            ctx.lineWidth = 10;
            ctx.arc(250, 250, 100, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(250, 250, 240, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.font = "italic 90px Digital-7";
			ctx.fillStyle = "#2CC814";
            ctx.textAlign = "center";
            ctx.fillText(speed, 250, 250);

            ctx.font = "bold 16px sans-serif";
            ctx.fillText("Kmph", 250, 270);

            if (gear == 0) {
                ctx.fillStyle = "#F32A24";
                ctx.font = "70px Digital-7";
                ctx.fillText('N', 250, 460);

                ctx.fillStyle = "#333";
                ctx.font = "50px Digital-7";
                ctx.fillText('R', 210, 460);

                ctx.font = "50px Digital-7";
                ctx.fillText(parseInt(gear) + 1, 290, 460);
            } else if (gear - 1 <= 0) {
                ctx.fillStyle = "#F32A24";
                ctx.font = "70px sans-serif";
                ctx.fillText(gear, 250, 460);

                ctx.fillStyle = "#333";
                ctx.font = "50px MuseoSans_900-webfont";
                ctx.fillText('R', 210, 460);

                ctx.font = "50px MuseoSans_900-webfont";
                ctx.fillText(parseInt(gear) + 1, 290, 460);
            } else {
                ctx.font = "70px Digital-7";
                ctx.fillStyle = "#F32A24";
                ctx.fillText(gear, 250, 460);

                ctx.font = "50px Digital-7";
                ctx.fillStyle = "#333";
                ctx.fillText(gear - 1, 210, 460);
                if (parseInt(gear) + 1 < 7) {
                    ctx.font = "50px Digital-7";
                    ctx.fillText(parseInt(gear) + 1, 290, 460);
                }
            }

            ctx.fillStyle = "#FFF";
            for (var i = 10; i <= Math.ceil(topSpeed / 20) * 20; i += 10) {
                console.log();
                drawMiniNeedle(calculateSpeedAngle(i / topSpeed, 83.07888, 34.3775) * Math.PI, i % 20 == 0 ? 3 : 1, i%20 == 0 ? i : '');
                
                if(i<=100) { 
                    drawMiniNeedle(calculateSpeedAngle(i / 47, 0, 22.9183) * Math.PI, i % 20 == 0 ? 3 : 1, i % 20 ==
                    0 ?
                    i / 10 : '');
                }
            }
			
			
			

            ctx.beginPath();
            ctx.strokeStyle = "#41dcf4";
            ctx.lineWidth = 22;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#00c6ff";

            ctx.strokeStyle = speedGradient;
            ctx.arc(250, 250, 228, .6 * Math.PI, calculateSpeedAngle(speed / topSpeed, 83.07888, 34.3775) * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 17;
            ctx.strokeStyle = rpmGradient;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#f7b733";

            ctx.arc(250, 250, 228, .4 * Math.PI, calculateRPMAngel(rpm / 4.7, 0, 22.9183) * Math.PI, true);
            ctx.stroke();
            ctx.shadowBlur = 0;


            ctx.strokeStyle = '#41dcf4';
            speedNeedle(calculateSpeedAngle(speed / topSpeed, 83.07888, 34.3775) * Math.PI);

            ctx.strokeStyle = rpmGradient;
            rpmNeedle(calculateRPMAngel(rpm / 4.7, 0, 22.9183) * Math.PI);

            ctx.strokeStyle = "#000";
        }
        var s=0;
        
		var r=0.1, t1,t2;
		
		
		
		function downspeed(){
			

			if(s<2){
				window.clearInterval(t2);
				 

			}
			else{
			s-=2;
			if(r>0.18){
			r-=0.055;}
			
			drawSpeedo(s,0, r, 180);
			
			}
			
			
			
		}
		
		
		
		
		
		function setSpeed(){
			
			
			
			if(s>176){
				window.clearInterval(t1);
				t2= window.setInterval(downspeed, 50);
				 renderCanvas();

			}
			
			else{
			
			s+=2;
			if(r<=1){
			r+=0.04;}
			drawSpeedo(s,0, r, 180);
		
			}
			
			
			
		}
		


document.addEventListener('DOMContentLoaded', function() {
	//drawSpeedo(180,5, .2, 240);
   t1= window.setInterval(setSpeed, 50);
	
    renderCanvas();
	
    
	
}, false);
