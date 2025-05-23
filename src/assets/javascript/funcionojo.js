// Verificar que el elemento exista antes de agregar el evento
const togglePasswordButton = document.getElementById('togglePassword');
if (togglePasswordButton) {
  togglePasswordButton.addEventListener('click', function () {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
      const inputType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      
      // Cambia el tipo del input
      passwordInput.setAttribute('type', inputType);
    
      // Cambia el estilo del ícono (opcional)
      this.classList.toggle('active');
    }
  });
}
  