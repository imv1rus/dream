// Função principal para realizar a busca
function realizarBusca() {
    try {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();

        // Validação da pesquisa
        if (!query) {
            exibirAlerta('Por favor, insira um termo de pesquisa.');
            return;
        }

        // Exibir feedback ao usuário de que a busca está em andamento
        animacaoCarregamento();

        // Simulação de resultado de pesquisa (substituir por chamada de API futuramente)
        const resultadosSimulados = simularResultadosDePesquisa();

        // Filtra os resultados com base na pesquisa
        const resultadosFiltrados = filtrarResultados(resultadosSimulados, query);

        // Armazenar resultados no localStorage
        salvarResultadosNoLocalStorage(resultadosFiltrados);

        // Após a animação, redirecionar para página de resultados
        setTimeout(() => {
            window.location.href = 'resultados.html';
        }, 2000);

    } catch (error) {
        console.error('Erro ao realizar a busca:', error);
        exibirAlerta('Ocorreu um erro durante a busca. Tente novamente mais tarde.');
    }
}

// Função para simular resultados de pesquisa
function simularResultadosDePesquisa() {
    return [
        'Arquivo1.pdf',
        'Documento_Importante.docx',
        'Imagem_Rara.png',
        'Video_Pirata.mp4',
        'Arquivo_Secreto.zip',
        'Trabalho_Final.doc',
        'Foto_Proibida.jpeg'
    ];
}

// Função para filtrar os resultados com base no termo de pesquisa
function filtrarResultados(resultados, query) {
    return resultados.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// Função para salvar resultados no localStorage
function salvarResultadosNoLocalStorage(resultados) {
    localStorage.setItem('resultadosPesquisa', JSON.stringify(resultados));
}

// Função para exibir resultados na página de resultados
function exibirResultados() {
    try {
        const resultadosDiv = document.getElementById('resultados');
        const resultadosArmazenados = JSON.parse(localStorage.getItem('resultadosPesquisa'));

        // Verifica se há resultados armazenados
        if (!resultadosArmazenados || resultadosArmazenados.length === 0) {
            resultadosDiv.innerHTML = '<p>Nenhum resultado encontrado para a pesquisa.</p>';
            return;
        }

        // Exibe os resultados
        let html = '<ul>';
        resultadosArmazenados.forEach(resultado => {
            html += `<li>${resultado}</li>`;
        });
        html += '</ul>';

        resultadosDiv.innerHTML = html;

    } catch (error) {
        console.error('Erro ao exibir os resultados:', error);
        exibirAlerta('Erro ao exibir os resultados.');
    }
}

// Função para exibir um alerta amigável ao usuário
function exibirAlerta(mensagem) {
    alert(mensagem);  // Pode ser substituído por um modal mais estilizado
}

// Animação de feedback ao usuário durante a busca
function animacaoCarregamento() {
    const botaoBuscar = document.getElementById('search-btn');
    botaoBuscar.innerText = 'Buscando...';
    botaoBuscar.disabled = true;

    setTimeout(() => {
        botaoBuscar.innerText = 'Buscar';
        botaoBuscar.disabled = false;
    }, 2000); // Simula um delay de 2 segundos na busca
}

// Função para definir o comportamento do formulário de upload (opcional)
function configurarUpload() {
    const formUpload = document.getElementById('add-file-form');
    if (formUpload) {
        formUpload.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validação simples do arquivo (pode ser expandido)
            const inputFile = document.getElementById('file-upload');
            if (!inputFile || !inputFile.files.length) {
                exibirAlerta('Nenhum arquivo selecionado.');
                return;
            }

            alert('Arquivo enviado com sucesso!');
            // Lógica de upload pode ser integrada a um servidor backend futuramente
        });
    }
}

// Função inicializadora para configurar os eventos
function init() {
    // Configura o evento de clique no botão de busca
    const searchButton = document.getElementById('search-btn');
    if (searchButton) {
        searchButton.addEventListener('click', realizarBusca);
    }

    // Verifica se a página de resultados está carregada
    const resultadosDiv = document.getElementById('resultados');
    if (resultadosDiv) {
        exibirResultados();
    }

    // Configura o formulário de upload (se presente)
    configurarUpload();
}

// Inicializa o script quando a página é carregada
document.addEventListener('DOMContentLoaded', init);
