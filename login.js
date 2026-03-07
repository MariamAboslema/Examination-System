
  const EMAIL_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+\-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;


  if (localStorage.getItem('loggedIn') === 'true') {
    window.location.href = 'exam.html';
  }

  document.getElementById('email').addEventListener('input', function() {
    const input = document.getElementById('email');
    const error = document.getElementById('emailErr');
    const value = this.value.trim();
    document.getElementById('globalErr').classList.remove('show');
    document.getElementById('noAccountBanner').classList.remove('show');
    if (!value) { 
        input.classList.remove('is-error'); 
        error.classList.remove('show'); 
        return; 
    }
    const ok = EMAIL_REGEX.test(value.toLowerCase());
    input.classList.toggle('is-error', !ok);
    error.classList.toggle('show', !ok);
  });

  document.getElementById('password').addEventListener('input', function() {
    const input = document.getElementById('password');
    const error = document.getElementById('passwordErr');
    document.getElementById('globalErr').classList.remove('show');
    if (!this.value) { 
        input.classList.remove('is-error'); 
        error.classList.remove('show'); 
        return; 
    }
    input.classList.remove('is-error');
    error.classList.remove('show');
  });

  function login() {
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    
    document.getElementById('globalErr').classList.remove('show');
    document.getElementById('noAccountBanner').classList.remove('show');

    let valid = true;

    
    const emailEl  = document.getElementById('email');
    const emailErr = document.getElementById('emailErr');
    if (!email || !EMAIL_REGEX.test(email)) {
      emailEl.classList.add('is-error');
      emailErr.classList.add('show');
      valid = false;
    } else {
      emailEl.classList.remove('is-error');
      emailErr.classList.remove('show');
    }

    
    const pwEl  = document.getElementById('password');
    const pwErr = document.getElementById('passwordErr');
    if (!password) {
      pwEl.classList.add('is-error');
      pwErr.classList.add('show');
      valid = false;
    } else {
      pwEl.classList.remove('is-error');
      pwErr.classList.remove('show');
    }

    if (!valid) return;

    
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (currentUser && currentUser.email && !users.find(u => u.email === currentUser.email)) {
      users.push(currentUser);
      localStorage.setItem('users', JSON.stringify(users)); 
    }

    const matchedUser = users.find(u => u.email === email);

    if (!matchedUser) {
      
      document.getElementById('noAccountBanner').classList.add('show');
      emailEl.classList.add('is-error');
      return;
    }

    if (matchedUser.password !== password) {
      
      document.getElementById('globalErr').classList.add('show');
      pwEl.classList.add('is-error');
      return;
    }

    
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(matchedUser));
    window.location.href = 'exam.html';
  }

  document.addEventListener('keydown', e => { if (e.key === 'Enter') login(); });
