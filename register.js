
(function () {
  'use strict';

  if (localStorage.getItem('loggedIn') === 'true') {
    window.location.replace('exam.html');
  }

var REGEX = {
  name:     /^[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0600-\u06FF'-]{2,50}$/,
  email:    /^[a-zA-Z0-9][a-zA-Z0-9._%+\-]*@[a-zA-Z0-9][a-zA-Z0-9\-]*\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
};

  
  function setField(inputId, iconId, errorId, isValid) {
    var input  = document.getElementById(inputId);
    var icon = document.getElementById(iconId);
    var error = document.getElementById(errorId);
    var hasValue = input.value.length > 0;

    
    input.classList.toggle('is-invalid', !isValid && hasValue);
    input.classList.toggle('is-valid',    isValid && hasValue);

    icon.textContent = isValid ? '✅' : (hasValue ? '❌' : '');
    icon.classList.toggle('show', hasValue);
    error.classList.toggle('show', !isValid && hasValue);
    return isValid;
  }

  function resetField(inputId, iconId, errorId) {
    var input  = document.getElementById(inputId);
    var icon = document.getElementById(iconId);
    var error = document.getElementById(errorId);
    input.classList.remove('is-invalid', 'is-valid');
    icon.classList.remove('show');
    error.classList.remove('show');
  }

  function showError(errorId) {
    document.getElementById(errorId).classList.add('show');
  }


  document.getElementById('firstName').addEventListener('input', function () {
    var value = this.value.trim();
    if (!value) { resetField('firstName', 'iconFN', 'firstNameErr'); return; }
    setField('firstName', 'iconFN', 'firstNameErr', REGEX.name.test(value));
  });

  document.getElementById('lastName').addEventListener('input', function () {
    var value = this.value.trim();
    if (!value) { resetField('lastName', 'iconLN', 'lastNameErr'); return; }
    setField('lastName', 'iconLN', 'lastNameErr', REGEX.name.test(value));
  });

  
  document.getElementById('regEmail').addEventListener('input', function () {
    document.getElementById('alertDuplicate').classList.remove('show');
    var value = this.value.trim();
    if (!value) { resetField('regEmail', 'iconEM', 'emailErr'); return; }
    setField('regEmail', 'iconEM', 'emailErr', REGEX.email.test(value.toLowerCase()));
  });

  
  document.getElementById('regPassword').addEventListener('input', function () {
    var password = this.value;
    if (!password) {
      resetField('regPassword', 'iconPW', 'passwordErr');
      return;
    }

    setField('regPassword', 'iconPW', 'passwordErr', REGEX.password.test(password));

    if (document.getElementById('regRePassword').value) validateConfirm();
  });


  function validateConfirm() {
    var password = document.getElementById('regPassword').value;
    var repassword = document.getElementById('regRePassword').value;
    if (!repassword) { resetField('regRePassword', 'iconRP', 'rePasswordErr'); return false; }
    return setField('regRePassword', 'iconRP', 'rePasswordErr', password === repassword);
  }

  document.getElementById('regRePassword').addEventListener('input', validateConfirm);


  function register() {
    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    var email = document.getElementById('regEmail').value.trim().toLowerCase();
    var password = document.getElementById('regPassword').value;
    var repassword = document.getElementById('regRePassword').value;

    var v1 = firstName ? setField('firstName','iconFN','firstNameErr',REGEX.name.test(firstName)):(showError('firstNameErr'),false);
    var v2 = lastName ? setField('lastName','iconLN','lastNameErr',REGEX.name.test(lastName)):(showError('lastNameErr'),false);
    var v3 = email ? setField('regEmail','iconEM','emailErr',REGEX.email.test(email)):(showError('emailErr'),false);
    var v4 = password ? setField('regPassword','iconPW', 'passwordErr',REGEX.password.test(password)):(showError('passwordErr'),false);
    var v5 = repassword ? setField('regRePassword','iconRP', 'rePasswordErr',password === repassword):(showError('rePasswordErr'),false);

    if (!v1 || !v2 || !v3 || !v4 || !v5) return;

//check if old user is not saved in users list and add him
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser && currentUser.email) {
      if (!users.some(function (u) { return u.email === currentUser.email; })) {
        users.push(currentUser);
      }
    }
    localStorage.setItem('users', JSON.stringify(users));

//duplicate check
    if (users.some(function (u) { return u.email === email; })) {
      document.getElementById('alertDuplicate').classList.add('show');
      var emailEl = document.getElementById('regEmail');
      emailEl.classList.add('is-invalid');
      emailEl.classList.remove('is-valid');
      document.getElementById('iconEM').textContent = '❌';
      document.getElementById('alertDuplicate').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

// add new user
    var newUser = { firstName: firstName, lastName: lastName, email: email, password: password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    window.location.replace('login.html');
  }

  document.getElementById('registerBtn').addEventListener('click', register);
  document.addEventListener('keydown', function (e) { if (e.key === 'Enter') register(); });

}());
