const API = 'http://api.tvmaze.com/search/shows?q='


const loadLogin = function () {
	const btnLogin = document.querySelector('#btnLogin')
	btnLogin.addEventListener('click', function() {
		saveUserName(document.querySelector('#username').value)
		window.location.href = 'home.html'
	})
}

const saveUserName = function (username) {
	localStorage.setItem('username', username)
}
const getUserName = function () {
	return localStorage.getItem('username')
}
const removeUserName = function () {
	localStorage.removeItem('username')
}


const init = function () {
	showUsername()
	const btnSearch = document.querySelector('#btnSearch')
	btnSearch.addEventListener('click', () => {
		let query = document.querySelector('#search')
		search(query.value)
	})
	const btnLogout = document.querySelector('.logout')
	btnLogout.addEventListener('click', (e) => {
		e.preventDefault()
		removeUserName()
		window.location.href = 'index.html'
	})

}

const showUsername = function () {
	const username = document.querySelector('.username')
	const usernameText = document.createTextNode(getUserName())
	username.appendChild(usernameText)

}

const renderShows = function (shows) {
	const showContainer = document.querySelector('#showContainer')
	showContainer.innerHTML = ''
	showContainer.innerHTML = shows
}

const search  = function (q) {
	let loading = document.querySelector('.load')
	$.ajax({
		type: 'GET',
		url: `${API}${q}`,
		dataType: 'json',
		beforeSend: function () {
			loading.classList.remove('hidden')
		}
	})
	.done(data => {
		let shows = data.map(data => {
			const show = new Show(data.show)
			return show.template()
		})
		renderShows(shows.join(''))
	})
	.fail((jqXHR, textStatus, errorThrown) => {
		console.log(errorThrown)
	})
	.always(() => {
		loading.classList.add('hidden')
	})
}
