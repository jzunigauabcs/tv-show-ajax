// const API = 'http://api.tvmaze.com/search/shows?q='


const loadLogin = function () {
	const btnLogin = document.querySelector('#btnLogin')
	btnLogin.addEventListener('click', function() {
		window.location.href = 'home.html'
	})
}