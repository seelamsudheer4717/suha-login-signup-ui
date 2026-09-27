const tabs = {login: document.getElementById('login-tab'), signup: document.getElementById('signup-tab')};
const panels = {login: document.getElementById('login-panel'), signup: document.getElementById('signup-panel')};
const notice = document.getElementById('notice');

function showTab(name) {
  for (const key of Object.keys(tabs)) {
    const selected = key === name;
    tabs[key].classList.toggle('active', selected);
    tabs[key].setAttribute('aria-selected', String(selected));
    panels[key].hidden = !selected;
  }
  notice.hidden = true;
  tabs[name].focus();
}

for (const [name, tab] of Object.entries(tabs)) tab.addEventListener('click', () => showTab(name));
document.querySelectorAll('.switch').forEach(button => button.addEventListener('click', () => showTab(button.dataset.tab)));
document.querySelector('.tabs').addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  showTab(document.activeElement === tabs.login ? 'signup' : 'login');
});

document.querySelectorAll('.reveal').forEach(button => button.addEventListener('click', () => {
  const input = document.getElementById(button.dataset.target);
  const showing = input.type === 'password';
  input.type = showing ? 'text' : 'password';
  button.textContent = showing ? 'Hide' : 'Show';
  button.setAttribute('aria-label', showing ? 'Hide password' : 'Show password');
  button.setAttribute('aria-pressed', String(showing));
}));

function setError(id, message) {
  const input = document.getElementById(id);
  document.getElementById(`${id}-error`).textContent = message;
  input.setAttribute('aria-invalid', String(Boolean(message)));
}
function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
function showNotice(message) { notice.textContent = message; notice.hidden = false; }

document.getElementById('login-form').addEventListener('submit', event => {
  event.preventDefault(); notice.hidden = true;
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  setError('login-email', validEmail(email) ? '' : 'Enter a valid email address.');
  setError('login-password', password ? '' : 'Enter your password.');
  if (!validEmail(email) || !password) return;
  showNotice('Form looks good! This is a front-end demo, so no login request was sent.');
});

document.getElementById('signup-form').addEventListener('submit', event => {
  event.preventDefault(); notice.hidden = true;
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const terms = document.getElementById('terms').checked;
  setError('signup-name', name.length >= 2 ? '' : 'Enter your name (at least 2 characters).');
  setError('signup-email', validEmail(email) ? '' : 'Enter a valid email address.');
  setError('signup-password', password.length >= 8 ? '' : 'Use at least 8 characters.');
  document.getElementById('terms-error').textContent = terms ? '' : 'Please check the box to continue.';
  if (name.length < 2 || !validEmail(email) || password.length < 8 || !terms) return;
  showNotice('Form looks good! This is a front-end demo, so no account was created.');
});

document.getElementById('forgot-button').addEventListener('click', () => showNotice('Password reset is a visual demo. Connect a real authentication service to enable it.'));
