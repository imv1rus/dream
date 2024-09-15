document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('form-login');
    const uploadSection = document.getElementById('upload-section');
    const loginContainer = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const addFileModal = document.getElementById('add-file-modal');
    const addFileBtn = document.getElementById('add-file-btn');
    const closeModalBtn = document.querySelector('.close');

    // Função para mostrar a seção de upload após login
    function showUploadSection() {
        loginContainer.style.display = 'none';
        uploadSection.style.display = 'block';
    }

    // Lógica de Login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulando requisição ao backend
        if (username === 'admin' && password === 'senhaSegura') {
            showUploadSection();
        } else {
            loginError.style.display = 'block';
        }
    });

    // Lógica para abrir e fechar o modal de adicionar arquivos
    addFileBtn.addEventListener('click', function () {
        addFileModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function () {
        addFileModal.style.display = 'none';
    });

    // Lógica para envio de arquivos
    const addFileForm = document.getElementById('add-file-form');
    addFileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const fileName = document.getElementById('file-name').value;
        const fileCategory = document.getElementById('file-category').value;
        const fileDescription = document.getElementById('file-description').value;
        const fileUpload = document.getElementById('file-upload').files[0];

        // Simulando envio de arquivo para o backend
        console.log('Enviando arquivo:', fileName, fileCategory, fileDescription, fileUpload);

        // Aqui você faria o envio real para o backend usando AJAX ou fetch()
        alert('Arquivo enviado com sucesso!');
        addFileModal.style.display = 'none';
    });
});
