var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var devicewidth = window.innerWidth;
var y = 10;
var v = 0;
var c = 110;
var a = g;
var aterrizado= false;
var velocidad = null;
var altura = null;
var combustible = null;
var dificultad = false;
var salir=true;


window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	window.onbeforeunload = function () {
		var respuesta;
		if (salir) {
			respuesta = confirm();
			if (respuesta) {
				window.onunload = function() {
					return true;
				}
			} else {
				return false;
				}
		}
	}

	document.getElementById("dificultad").onclick = function() {
		if (dificultad) {
			dificultad = false;
			document.getElementById("dificultad").src = "img/facil.png";
		} else {
			dificultad = true;
			document.getElementById("dificultad").src = "img/dificil.png";
		}
	}
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop()
		motorOff()
	}
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start()
		motorOff()
	}
	document.onclick = function () {
		if (devicewidth<961){
 			if (a==g){
  				motorOn();
 			} else {
  				motorOff();
			}
		}
	}
	document.onkeydown = function(event){
		if (event.keyCode==32){
			motorOn();
		}
	}
	document.onkeyup = motorOff;
	
	start();
}

function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	y +=v*dt;
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=y.toFixed(2);
	
	if (y<75){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else {
		if (dificultad) {
			if (v<=2){
				alert("Has aterrizado a salvo, felicidades.");
				stop();
				aterrizado=true;
				document.getElementById("nave1").src = "img/alien1.png";
			} else {
				alert("La has espichado, mala suerte");
				stop();
				aterrizado=true;
				document.getElementById("nave1").src = "img/alien4.png";
			}
		} else {
			if (v<=5){
				alert("Has aterrizado a salvo, felicidades");
				stop();
				aterrizado=true;
				document.getElementById("nave1").src = "img/alien1.png";
			} else {
				alert("La has espichado, mala suerte");
				stop();
				aterrizado=true;
				document.getElementById("nave1").src = "img/alien4.png";
			}
		}
		}
}
function motorOn(){
	if (c!=0) {
		if (aterrizado){
			motorOff()
			document.getElementById("nave1").src = "img/alien1.png"
		}
		else{
			a=-g;
			if (timerFuel==null)
			timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
			document.getElementById("nave1").src = "img/alien2.png"
		}
	}
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	document.getElementById("nave1").src = "img/alien1.png"
}
function actualizarFuel(){
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c.toFixed(2);	
}
