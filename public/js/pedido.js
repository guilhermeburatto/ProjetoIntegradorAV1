$( "#spinner" ).spinner({
    min:1,
    max:10
});

$('#id-form-novo-pedido').on('submit', function(event){
    event.preventDefault();
    const endereco_id = $('#id-selecao-endereco').val();
    // Cria uma requisição assíncrona
    $.ajax({
        type: "POST",
        url: `/pedido/${endereco_id}`, // /pedido/1 ou /pedido/null
        data: $(this).serialize(),
        dataType: 'json',
        // Quando o servidor consegue responder (mesmo que positivo ou negativo)
        success: function (response){
            $("#list-pedidos").html("");
            response.return.forEach(element => {
                $("#list-pedidos").append(`<a href="#" class="list-group-item list-group-item-action" data-toggle="list" value=${element.id}>Pedido ${element.id}</a>`);
            });
            $("#list-pedidos a:first-child").click();
            //console.log(response.success);
            //console.log(response.message);
            //console.log(response.return);
        },
        // Quando o servidor não consegue responder
        error: function(error){
            //console.log(error.responseJSON);
        }
    });
});

$("#id-selecao-tipo-produto").on('change', function(){
    const tipoProdutoId = $('#id-selecao-tipo-produto').val();
    $.ajax({
        type: "GET",
        url: `/pedidoproduto/getTodosProdutosDeTipo/${tipoProdutoId}`,
        data: null,
        dataType: 'json',
        success: function(response) {
            $('#id-selecao-produto').html("");
            response.return.forEach(element => {
                $('#id-selecao-produto').append(`<option value=${element.id}>${element.nome}</option>`);
            });
        },
        error: function(error) {
        }
    });
});



