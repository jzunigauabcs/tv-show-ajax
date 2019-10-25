const loadLogin = function () {
	const btnLogin = document.querySelector('#btnLogin')
	btnLogin.addEventListener('click', function() {
		User.save(document.querySelector('#username').value)
		window.location.href = 'home.html'
	})
}

const  logOut = function (e) {
	e.preventDefault()
	User.remove()
	window.location.href = 'index.html'
}

const showUsername = function () {
	const username = document.querySelector('.username')
	const usernameText = document.createTextNode(User.get() || 'Anónimo')
	username.appendChild(usernameText)
}

const init = function () {
	document.querySelector('.logout').addEventListener('click', logOut)
	document.querySelector('#btnSearch').addEventListener('click', function () {
		let query = document.querySelector('#search').value
		const show = new Show()
		show.findBy(query)
	})
	showUsername()
}

class Show {
	constructor () {
		this.API = 'http://api.tvmaze.com/search/shows?q='
	}

	findBy (query) {
		$.ajax({
			type: 'GET',
			url: `${this.API}${query}`,
			dataType: 'json',
			beforeSend: function () {
				document.querySelector('.load').classList.remove('hidden')
			}
		})
		.done(function (data) {
			let showContainer = document.querySelector('#showContainer')
			
			let series = data.map(s => {
				const serie = new Serie(s.show.name, s.show.image, s.show.summary)
				const show = new Show()
				return show.template(serie)
			}).join('')//La función join une todos los elementos de una matriz y los transforma en array
			showContainer.innerHTML = series
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			console.error('Ocurrió un error')
		})
		.always(function () {
			document.querySelector('.load').classList.add('hidden')
		})
	} 

	template (serie) {
		//En caso de que la serie no cuenta con imagen, se muestra una imagen default
		const DEFAULT_IMG = 'https://www.union.edu/sites/default/files/union-marketing-layer/201803/picture.jpg'
		//En caso de que la serie no cuenta con descripción, se muestra una descripción default
		const DEFAULT_DESCRIPTION = '<p>Sin descripción</p>'

		const  template = `<article class="show">
			<div class="show-img">
				<img src="${serie.image ? serie.image.medium : DEFAULT_IMG}">
				<span class="show-title">${serie.name}</span>
			</div>
			<div class="favs text-right">
				<a href="#"><i class="fas fa-star"></i></a>
			</div>
			${serie.summary || DEFAULT_DESCRIPTION}
		</article>`
		return template
	}
}

//Clase para la información de las series
class Serie {
	constructor(id, name, image, summary) {
		this.id = id
		this.name = name
		this.image = image
		this.summary = summary
	}

	addFavorite () {

	}

	isFavorite () {

		return 
	}
}

//Clase que permite agregar una seria a favoritos
class Favorito () {

	constructor () {
		
	}

	static getKey () {
		const KEY = 'favoritos'
		return KEY
	}

	static addFavorito (idSerie) {
		if(!Favorito.isFavorito(idSerie)) {
			const favoritos = Favorito.getAll()
			localStorage.setItem(Favorito.getKey(), )
		}
	}

	static isFavorito (idSerie) {
		const favoritos = Favorito.getAll()
		return favoritos.include(idSerie)
	}

	static getAll () {
		const favoritos = JSON.parse(localStorage.setItem(Favorito.getKey())) || []
		return favoritos
	}
}

class User {
	constructor  () {
	}

	static getKey () {
		const KEY = 'username'
		return KEY
	}

	static save (user) {
		localStorage.setItem(User.getKey(), user)
	}

	static get () {
		return localStorage.getItem(User.getKey())
	}

	static remove () {
		localStorage.removeItem(User.getKey())
	}

}