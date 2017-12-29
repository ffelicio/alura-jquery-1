var campo = $('.campo-digitacao');
var tempoInicial = $("#tempo-digitacao").text();
var botaoReiniciar = $("#botao-reiniciar");

$(function() {
    jogo.atualizarTamanhoFrase();
    jogo.inicializarContadores();
    jogo.inicializarCronometro();
    botaoReiniciar.click(jogo.reiniciarJogo);
});

var jogo = {
    atualizarTamanhoFrase : () => {
        var frase = $(".frase").text();
        var numPalavras  = frase.split(" ").length;
        var tamanhoFrase = $("#tamanho-frase");
        tamanhoFrase.text(numPalavras);
    },
    inicializarContadores : () => {
        /**
         * O evento 'input' mapeia tudo que o usuário está digitando.
         */
        campo.on("input", function() {
            var conteudo = campo.val();

            /**
             * Para contar mais precisamente temos que utilizar uma expressão regular no lugar do espaço vazio,
             * uma expressão regular que busca qualquer caractere, exceto espaço vazio, essa expressão é mostrada abaixo.
             *
             * Agora os espaços não são mais considerados como palavras, mas a contagem sempre mostra a quantidade de palavras mais uma,
             * para resolver isso vamos subtrair um do length do conteúdo.
             */
            var qtdPalavras = conteudo.split(/\S+/).length;
            $("#contador-palavras").text(qtdPalavras);
    
            var qtdCaracteres = conteudo.length;
            $("#contador-caracteres").text(qtdCaracteres);
        });
    },
    inicializarCronometro : () => {
        var tempoRestante = $("#tempo-digitacao").text();

        /**
         * Na função abaixo não foi utilizado o evento 'click', porque o mesmo não mapeia o campo caso o usuário acesse o input através
         * do 'TAB'(tabulação). No caso, optou-se pelo evento 'focus', porque ele é usado para detectar quando o usuário entra em um campo,
         * não necessariamente digitando.
         *
         * No campo está sendo executada a função 'one'. Ela serve para escutar o evento somente uma vez.
         * A função .one() possuí a mesma sintaxe da função .on().
         * A função 'on' não seria a melhor alternativa, porque se o campo perdesse o foco e retornasse o foco no mesmo, a função
         * seria executada a todo momento, podendo acarretar outros bugs.
         */
        campo.one("focus", function() {
            botaoReiniciar.attr("disabled", true);

            /**
             * A função 'setInterval' é própria do Javascript.
             * Ela faz com que uma determinada ação (passada como primeiro parâmetro),
             * seja executada em um intervalo de tempo (passado como segundo parâmetro, no nosso caso, 1 segundo, ou 1000 milissegundos).
             *
             * Toda função 'setInterval' *retorna o seu próprio id*.
             * No caso, iremos utilizar a referência da mesma, para parar a sua execução quando o tempo tiver terminado.
             */
            var cronometroID = setInterval(function() {
                tempoRestante--;
                $("#tempo-digitacao").text(tempoRestante);

                // Verifica se o tempo acabou para poder desabilitar o textarea.
                if (tempoRestante < 1) {
                    /**
                     * Abaixo é utilizada a função 'attr'. Ela serve para resgatar alguma propriedade ou setar algum valor no campo.
                     * Exemplo de resgate do atributo 'rows': campo.attr("rows");
                     * Exemplo de alteração no atributo 'rows' do textarea: campo.attr("rows", 500);
                     */
                    campo.attr("disabled", true);

                    /**
                     * A função abaixo serve para parar a execução da função 'setInterval'.
                     * Ela recebe como argumento, o id da função 'setInterval'.
                     */
                    clearInterval(cronometroID);

                    botaoReiniciar.removeAttr('disabled');
                }
            }, 1000);
        });
    },
    reiniciarJogo : () => {
        campo.attr("disabled", false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);

        // Reinicia o cronômetro.
        jogo.inicializarCronometro();
    }
}