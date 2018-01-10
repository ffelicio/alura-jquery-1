var placar = {
    inserir : () => {
        /**
         * A função .find() recebe como parâmetro seletores CSS, e busca em seus filhos algum elemento que atenda aquela busca.
         */
        var corpoTabela = $(".placar").find("tbody");
        var usuario = "Fernando";
        var linha = placar.montarLinha(usuario);

        /**
         * A função .append adiciona a string ou elemento HTML que é passada como parâmetro,
         * como último filho do elemento em qual ela for chamada.
         */
        // corpoTabela.append(linha);

        /**
         * A função .prepend adiciona a string ou elemento HTML que é passada como parâmetro,
         * como primeiro filho do elemento em qual ela for chamada.
         */
        corpoTabela.prepend(linha);

        placar.remover();
    },
    montarLinha : (usuario) => {
        /**
         * Realizará a criação dos elementos das linhas da tabela diretamente com jQuery, para poder criar efetivamente
         * o html, ou seja, guardando na memória para poder utilizar posteriormente.
         */
        var linha = $("<tr>");
        var colunaUsuario = $("<td>").text(usuario);
        var colunaCaracteres = $("<td>").text($("#contador-caracteres").text());
        var colunaPalavras = $("<td>").text($("#contador-palavras").text());
        var colunaData = $("<td>").text(placar.data());
        var colunaRemover = $("<td>");

        var link = $("<a>").attr("href", "#").addClass("botao-remover");
        var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

        // Icone dentro do <a>
        link.append(icone);

        // <a> dentro do <td>
        colunaRemover.append(link);

        linha.append(colunaUsuario);
        linha.append(colunaCaracteres);
        linha.append(colunaPalavras);
        linha.append(colunaData);
        linha.append(colunaRemover);

        return linha;
    },
    remover : () => {
        $('.botao-remover').click(function(event) {
            event.preventDefault();

            /**
             * Remove a linha da tabela, mas neste caso deverá subir a árvore do DOM para chegar a linha da tabela.
             * $(this) -> botão de remoção
             *  .parent() -> td (coluna) que engloba o botão de remoção
             *  .parent() -> tr (linha) da tabela
             *  .remove() -> instrução para remover a linha.
             */

            /**
             * Remove a linha da tabela.
             * Neste caso, está sendo utilizada a função .closest. Ela é responsável por buscar o elemento mais próximo do objeto
             * instanciado, no nosso caso a instrução "$(this)" que se refere ao botão de excluir.
             * No mesmo pode ser incluídos elemento html, id ou classe.
             */
            $(this).closest('tr').remove();
        });
    },
    data : () => {
        var date = new Date();
        var dia = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        var mes = date.getMonth() + 1;
            mes = (mes < 10 ? '0' + mes : mes);
        var ano = date.getFullYear();

        return (dia + '/' + mes + '/' + ano);
    }
}