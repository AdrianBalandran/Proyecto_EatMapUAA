document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('passwordInput');
    const inputType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    // Cambia el tipo del input
    passwordInput.setAttribute('type', inputType);
  
    // Cambia el estilo del ícono (opcional)
    this.classList.toggle('active');
  });
  