/* script.js */
document.addEventListener('DOMContentLoaded', () => {

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Profile Dropdown Toggle
  const profileCircle = document.getElementById('profile-circle');
  const profileDropdown = document.getElementById('profile-dropdown');
  if (profileCircle && profileDropdown) {
    profileCircle.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => {
      profileDropdown.classList.remove('show');
    });
  }

  // Registration Page Toggle Logic (Volunteer vs Organization Forms)
  const registerToggle = document.getElementById('register-toggle');
  if (registerToggle) {
    const regBtns = registerToggle.querySelectorAll('.toggle-btn');
    const volunteerForm = document.getElementById('volunteer-form');
    const orgForm = document.getElementById('organization-form');

    regBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        regBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (volunteerForm && orgForm) {
          volunteerForm.style.display = 'none';
          orgForm.style.display = 'none';

          const targetFormId = btn.getAttribute('data-target');
          const targetForm = document.getElementById(targetFormId);
          if (targetForm) targetForm.style.display = 'block';
        }
      });
    });
  }

  // Show/Hide Password Toggle
  const togglePwdBtns = document.querySelectorAll('.toggle-pwd');
  togglePwdBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.previousElementSibling;
      if (input && input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Hide';
      } else if (input) {
        input.type = 'password';
        btn.textContent = 'Show';
      }
    });
  });

  // Form Validation & Smart Auto-Routing
  const forms = document.querySelectorAll('.validate-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop default HTTP POST to prevent 405 error

      let isValid = true;
      const inputs = form.querySelectorAll('input[required]');
      
      inputs.forEach(input => {
        const errorMsg = input.parentElement.querySelector('.error-msg') || input.parentElement.parentElement.querySelector('.error-msg');
        
        if (errorMsg) errorMsg.style.display = 'none';
        input.style.borderColor = 'var(--light-gray)';

        if (!input.value.trim()) {
          showError(input, errorMsg, 'This field is required');
          isValid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          showError(input, errorMsg, 'Please enter a valid email address');
          isValid = false;
        } else if (input.type === 'password' && input.name === 'password' && input.value.length < 8) {
          showError(input, errorMsg, 'Password must be at least 8 characters');
          isValid = false;
        }
      });

      const pwd = form.querySelector('input[name="password"]');
      const confirmPwd = form.querySelector('input[name="confirm_password"]');
      if (pwd && confirmPwd && pwd.value !== confirmPwd.value) {
        const errorMsg = confirmPwd.parentElement.parentElement.querySelector('.error-msg');
        showError(confirmPwd, errorMsg, 'Passwords do not match');
        isValid = false;
      }

      // Smart Account Type Routing
      if (isValid) {
        if (form.id === 'volunteer-form') {
          alert('Volunteer account created successfully!');
          window.location.href = 'dashboard.html';
        } else if (form.id === 'organization-form') {
          alert('Organization registered successfully!');
          window.location.href = 'org_dashboard.html';
        } else if (form.id === 'login-form') {
          const emailInput = form.querySelector('#login-email').value.toLowerCase();

          // Auto-detect role based on email keyword (for front-end testing)
          // If email contains "org", "ngo", "admin", or "group", it opens Org Dashboard
          if (emailInput.includes('org') || emailInput.includes('ngo') || emailInput.includes('admin') || emailInput.includes('group')) {
            window.location.href = 'org_dashboard.html';
          } else {
            window.location.href = 'dashboard.html';
          }
        }
      }
    });
  });

  function showError(input, errorElement, message) {
    input.style.borderColor = 'var(--error-red)';
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }
});