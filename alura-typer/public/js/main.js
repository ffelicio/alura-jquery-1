var frase = $('.frase').text();
var quantidadePalavras = frase.split(' ').length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(quantidadePalavras);

var campo = $('.campo-digitacao');

/**
 * O evento 'input' mapeia tudo que o usuário digitou.
 */
campo.on('input', function() {
    var conteudo = campo.val();

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);

    /**
     * Para contar mais precisamente temos que utilizar uma expressão regular no lugar do espaço vazio,
     * uma expressão regular que busca qualquer caractere, exceto espaço vazio, essa expressão é mostrada abaixo.
     * 
     * Agora os espaços não são mais considerados como palavras, mas a contagem sempre mostra a quantidade de palavras mais uma,
     * para resolver isso vamos subtrair um do length do conteúdo.
     */
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);
});