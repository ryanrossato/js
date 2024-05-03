    //formulário USUÁRIO
    
    function validarCPF(cpf){
        return true;
    }
    
    function validarCEP(cep){
        return true;
    }
    
    document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault();
            
            const nomeCompleto = document.getElementById('nomeCompleto').value;
            const cpf = document.getElementById('cpf').value;
            const cep = document.getElementById('cep').value;
            const telefone = document.getElementById('telefone').value;
            const nomeCompletoExibicao = document.getElementById('nomeCompletoExibicao').textContent = nomeCompleto;
            const cpfExibicao = document.getElementById('cpfExibicao').textContent = cpf;
            const cepExibicao = document.getElementById('cepExibicao').textContent = cep;
            const telefoneExibicao = document.getElementById('telefoneExibicao').textContent = telefone;
            
                  
            const cpfValido = validarCPF(cpf);
            const cepValido = validarCEP(cep);
            
            if (cepValido && cpfValido){
                console.log('Nome Completo', nomeCompleto);
                console.log('CPF', cpf);
                console.log('CEP', cep);
                console.log('Telefone', telefone);
            }else{
                alert("Por favor, preencha todos os campos corretamente!");
             }
          });
    
    
        //formulário CEP
        
        function limpa_formulário_cep() {
                //Limpa valores do formulário de cep.
                document.getElementById('rua').value=("");
                document.getElementById('bairro').value=("");
                document.getElementById('cidade').value=("");
                document.getElementById('uf').value=("");
                
        }
    
        function meu_callback(conteudo) {
            if (!("erro" in conteudo)) {
                //Atualiza os campos com os valores.
                document.getElementById('rua').value=(conteudo.logradouro);
                document.getElementById('bairro').value=(conteudo.bairro);
                document.getElementById('cidade').value=(conteudo.localidade);
                document.getElementById('uf').value=(conteudo.uf);
               
            } //end if.
            else {
                //CEP não Encontrado.
                limpa_formulário_cep();
                alert("CEP não encontrado.");
            }
        }
            
        function pesquisacep(valor) {
    
            //Nova variável "cep" somente com dígitos.
            var cep = valor.replace(/\D/g, '');
    
            //Verifica se campo cep possui valor informado.
            if (cep !== "") {
    
                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;
    
                //Valida o formato do CEP.
                if(validacep.test(cep)) {
    
                    //Preenche os campos com "..." enquanto consulta webservice.
                    document.getElementById('rua').value="...";
                    document.getElementById('bairro').value="...";
                    document.getElementById('cidade').value="...";
                    document.getElementById('uf').value="...";
                    
    
                    //Cria um elemento javascript.
                    var script = document.createElement('script');
    
                    //Sincroniza com o callback.
                    script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
    
                    //Insere script no documento e carrega o conteúdo.
                    document.body.appendChild(script);
    
                } //end if.
                else {
                    //cep é inválido.
                    limpa_formulário_cep();
                    alert("Formato de CEP inválido.");
                }
            } //end if.
            else {
                //cep sem valor, limpa formulário.
                limpa_formulário_cep();
            }
        }
    
       /* function resumoCadastro(){
            window.location = "resumo.html"
        }
*/
function exibirDados() {
    // Obtenha os valores dos campos de entrada
    var nome = document.getElementById('nomeCompleto').value;
    var telefone = document.getElementById('telefone').value;
    var cpf = document.getElementById('cpf').value;
    var cep = document.getElementById('cep').value;

    // Crie uma mensagem com os dados coletados
    var mensagem = "Nome: " + nome + "<br>Telefone: " + telefone + "<br>CPF: " + cpf + "<br>CEP: " + cep;

    // Atualize o conteúdo do elemento 'dadosColetados' com a mensagem
    document.getElementById('dadosColetados').innerHTML = mensagem;
}

function limparFormulario() {
    document.getElementById('nomeCompleto').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('numeroRua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
}
function resumoCadastro() {
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const cpf = document.getElementById('cpf').value;
    const cep = document.getElementById('cep').value;
    const telefone = document.getElementById('telefone').value;
    const rua = document.getElementById('rua').value;
    const numeroRua = document.getElementById('numeroRua').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const uf = document.getElementById('uf').value;

    const dadosCadastro = {
        nomeCompleto: nomeCompleto,
        cpf: cpf,
        cep: cep,
        telefone: telefone,
        endereco: {
            rua: rua,
            numeroRua: numeroRua,
            bairro: bairro,
            cidade: cidade,
            uf: uf
        }
    };

    // Cria um vetor para armazenar os dados do formulário, caso não exista ainda
    if (!localStorage.dadosFormulario) {
        localStorage.dadosFormulario = JSON.stringify([]);
    }

    // Adiciona os dados do formulário ao vetor
    const vetorDados = JSON.parse(localStorage.dadosFormulario);
    vetorDados.push(dadosCadastro);

    // Salva o vetor atualizado na memória local
    localStorage.dadosFormulario = JSON.stringify(vetorDados);

}

function coletarDados() {
    exibirDados();
    limparFormulario();
}
