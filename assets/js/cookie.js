if (localStorage.getItem('cookies-accepted') === 'true') {
    console.log('Cookies already accepted.');
  } else {
    var modal = document.getElementById('cookieConsentModal');
    modal.classList.add('show');
  }

  document.getElementById('acceptCookies').addEventListener('click', function() {
    localStorage.setItem('cookies-accepted', 'true');
    var modal = document.getElementById('cookieConsentModal');
    modal.classList.remove('show');
    console.log('Cookies accepted.');
  });

  document.getElementById('declineCookies').addEventListener('click', function() {
    localStorage.setItem('cookies-accepted', 'false');
    var modal = document.getElementById('cookieConsentModal');
    modal.classList.remove('show');
    console.log('Cookies declined.');
  });