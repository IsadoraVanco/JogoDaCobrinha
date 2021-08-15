function jogar(){
    botao.hidden = true;
    passoX = 20;
	posicaoFrutaX = selecionaPosicao(largura);
	posicaoFrutaY = selecionaPosicao(altura);
	
	corpoCobraX.push(posicaoCobraX);
	corpoCobraY.push(posicaoCobraY);

	divMensagem.innerHTML = "";
	divPontuacao.innerHTML = "";
}

function desenhaTelaFundo(){
    pincel.fillStyle = "CadetBlue";
	pincel.fillRect(0,0,1000,1000);
    pincel.fillStyle = "DarkTurquoise";
	pincel.fillRect(margem, margem, (largura - 2 * margem), (altura - 2 * margem));
	pincel.fillStyle = "Turquoise";
	var vez = 1;
	for(var x = margem; x < largura - margem; x += tamanhoCobrinha){
		if(vez % 2 == 0){
			for(var y = margem; y < altura - margem; y += 2 * tamanhoCobrinha){
				pincel.fillRect(x, y, tamanhoCobrinha, tamanhoCobrinha);
			}
		}else{
			for(var y = margem + tamanhoCobrinha; y < altura - margem; y += 2 * tamanhoCobrinha){
				pincel.fillRect(x, y, tamanhoCobrinha, tamanhoCobrinha);
			}
		}
		vez++;
	}

	pincel.strokeStyle = "SlateGrey";
	pincel.strokeRect(margem, margem, (largura - 2 * margem), (altura - 2 * margem));
    pincel.fillStyle = "DarkTurquoise";
	pincel.strokeRect(2,2, (largura - 4), (altura - 4));

	pincel.font = "15px Tahoma";
	pincel.fillStyle = "white";
	pincel.fillText("Pontos: " + pontos, margem, margem - 5);
}

function desenhaCobrinha(x, y){
    pincel.fillStyle = "PaleGoldenrod";
	pincel.beginPath();
	pincel.arc(x, y, tamanhoCobrinha /2, 0, 2 * Math.PI);
	pincel.fill();
	pincel.strokeStyle = "Cornsilk";
	pincel.beginPath();
	pincel.arc(x, y, tamanhoCobrinha /2, 0, 2 * Math.PI);
	pincel.stroke();
}

function andaCobrinha(){
	if(posicaoCobraX + passoX == posicaoFrutaX && posicaoCobraY + passoY == posicaoFrutaY){
		corpoCobraX.push(posicaoCobraX);
		corpoCobraY.push(posicaoCobraY);
	}

    posicaoCobraX += passoX;
    posicaoCobraY += passoY;

	corpoCobraX.push(posicaoCobraX);
	corpoCobraY.push(posicaoCobraY);
	corpoCobraX.splice(0, 1);
	corpoCobraY.splice(0, 1);

	var bateu = false;

	for(var i = 1; i < corpoCobraX.length - 1; i++){
		if((corpoCobraX[i] == posicaoCobraX) && (corpoCobraY[i] == posicaoCobraY) ){
			bateu = true;
		}
	}
	
	if(posicaoCobraX >= largura - margem || posicaoCobraX <= margem){
		terminaJogo();
	}else if(posicaoCobraY >= altura - margem || posicaoCobraY <= margem){
		terminaJogo();
	}else if(bateu){
		terminaJogo();
	}else{
		if(corpoCobraX.length >= 1 ){
			for(var i = (corpoCobraX.length - 1); i >= 0; i--){
				desenhaCobrinha(corpoCobraX[i], corpoCobraY[i]);
				if(i > 0){
					var proximoX = corpoCobraX[i] + ((corpoCobraX[i - 1] - corpoCobraX[i]) /2);
					var proximoY = corpoCobraY[i] + ((corpoCobraY[i - 1] - corpoCobraY[i]) /2);
					desenhaCobrinha(proximoX, proximoY);
				}
			}
		}else{
			desenhaCobrinha(posicaoCobraX, posicaoCobraY);
		}
	}
}

function desenhaFruta() {
	pincel.fillStyle = "Salmon";
	pincel.beginPath();
	pincel.arc(posicaoFrutaX, posicaoFrutaY, tamanhoFrutinha /2, 0, 2 * Math.PI);
	pincel.fill();
	pincel.strokeStyle = "IndianRed";
	pincel.beginPath();
	pincel.arc(posicaoFrutaX, posicaoFrutaY, tamanhoFrutinha /2, 0, 2 * Math.PI);
	pincel.stroke();		
} 

function analisaPosicao(){
	if(posicaoCobraX == posicaoFrutaX && posicaoCobraY == posicaoFrutaY){
		pontos += 10;
		velocidade -= 10;
		posicaoFrutaX = selecionaPosicao(largura);
		posicaoFrutaY = selecionaPosicao(altura);
	}else{
		desenhaFruta();
	}
}

function sorteiaPosicaoAleatoria(maximo) {
	var numero = Math.floor(Math.random() * maximo);

	while((numero + (tamanhoCobrinha/2)) < (margem + (tamanhoCobrinha/2))  || numero > (maximo - margem - (tamanhoCobrinha/2))){
		numero = Math.floor(Math.random() * maximo);
	}
	return numero;		
}

function selecionaPosicao(maximo){
	var numero = sorteiaPosicaoAleatoria(maximo);

	while(numero % tamanhoCobrinha != 0){
		numero = sorteiaPosicaoAleatoria(maximo);
	}
	return numero + (tamanhoCobrinha/2);
}

function movimentarCobrinha(evento) {
	if(passoX != 0){
		if(evento.keyCode == cima){
			passoY = -20;
			passoX = 0;
		}else if(evento.keyCode == baixo){
			passoY = 20;
			passoX = 0;
		}
	}else if(passoY != 0){
		if(evento.keyCode == esquerda){
			passoY = 0;
			passoX = -20;
		}else if(evento.keyCode == direita){
			passoY = 0;
			passoX = 20;
		}
	}
}

function terminaJogo(){
	divMensagem.innerHTML = "GAME OVER";
	if(pontos > 0){
		divPontuacao.innerHTML = "SUA PONTUAÇÃO FINAL FOI DE " + pontos + " PONTOS";
	}else{
		divPontuacao.innerHTML = "VOCÊ NÃO FEZ NENHUM PONTO";
	}	
	botao.hidden = false;
	posicaoCobraX = (larguraJogo  + margem) /2;
	posicaoCobraY = (alturaJogo  + margem) /2;
	passoX = 0;
	passoY = 0;
	pontos = 0;
	velocidade = 1500;
	posicaoFrutaX = NaN;
	posicaoFrutaY = NaN;
	corpoCobraX = [];
	corpoCobraY = [];
}

function atualizaTela(){
    desenhaTelaFundo();
	andaCobrinha();
	analisaPosicao();
}

var botao = document.getElementById("btnJogar");
var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
var divMensagem = document.getElementById("mensagem");
var divPontuacao = document.getElementById("pontuacao");

var altura = 440;
var largura = 640;
var margem = 20;
var alturaJogo = altura - (2* margem);
var larguraJogo = largura - (2* margem);
var tamanhoCobrinha = 20;
var tamanhoFrutinha = 10;

var posicaoCobraX = (larguraJogo + margem) /2;
var posicaoCobraY = (alturaJogo  + margem) /2;
var passoX = 0;
var passoY = 0;
var corpoCobraX = [];
var corpoCobraY = [];

var posicaoFrutaX;
var posicaoFrutaY;

var pontos = 0;
var velocidade = 500;

var esquerda = 37;
var cima = 38;
var direita = 39;
var baixo = 40;
var espaco = 32;

document.onkeydown = movimentarCobrinha;

setInterval(atualizaTela, velocidade);