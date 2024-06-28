document.addEventListener('DOMContentLoaded', function() {
  const signinButton1 = document.getElementById('signin-btn-google');
  const signinButton2 = document.getElementById('signin-btn-ms');

  signinButton1.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'http://localhost:3000/auth/google';
  });

  signinButton2.addEventListener('click', function(event) {
    event.preventDefault();
    // Uncomment below line when ready to handle Microsoft sign-in
    // window.location.href = 'http://localhost:3000/outlook/signin';
  });
});
