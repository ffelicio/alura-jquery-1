var frase = $('.frase').text();
var quantidadePalavras = frase.split(' ').length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(quantidadePalavras);