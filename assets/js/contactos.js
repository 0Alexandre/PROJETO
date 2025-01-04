function validateForm() {
  let isValid = true;
  //Get dos campos do form pelo ID
  var inputName = document.getElementById('nome');
  var inputEmail = document.getElementById('email');
  var textareaMensagem = document.getElementById('mensagem');
  var inputTermos = document.getElementById('termos');

  // Validar o Nome
  if (inputName.value.length < 3) {
    showError('nome', 'Insira pelo menos 3 carateres!');
    isValid = false;
  } else {
    hideError('nome');
  }

  // Validar o Email
  if (!validateEmail(inputEmail.value)) {
    showError('email', 'Email inválido!');
    isValid = false;
  } else {
    hideError('email');
  }

  // Validar a Mensagem
  if (textareaMensagem.value.trim() === '') {
    showError('mensagem', 'Insira algo na mensagem!');
    isValid = false;
  } else {
    hideError('mensagem');
  }

  // Validar os termos
  if (!inputTermos.checked) {
    showError('termos', 'Erro na submissão dos termos!');
    isValid = false;
  } else {
    hideError('termos');
  }

  return isValid;
}

function validateEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function saveFormData() {
  var formData = {
    name: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    mensagem: document.getElementById('mensagem').value,
    termos: document.getElementById('termos').checked,
  };
}

// Mostrar e esconder mensagens de erro
function showError(fieldId, mensagem) {
  var divError = document.getElementById(`${fieldId}-error`);
  divError.textContent = mensagem;
  divError.style.display = 'block';
}

function hideError(fieldId) {
  var divError = document.getElementById(`${fieldId}-error`);
  divError.style.display = 'none';
}

// Submissão do formulário
document.getElementById('contact_form').addEventListener('submit', function (event) {
  // Previne o comportamento default de submissão de um form
  event.preventDefault();
  if (validateForm()) {
    saveFormData();
    var sucessoMensagem = document.getElementById('sucesso-message');
    sucessoMensagem.style.opacity = '1';
  }
});
