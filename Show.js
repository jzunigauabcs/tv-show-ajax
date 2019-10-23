class Show {
	constructor ({name, image, summary}) {
		this.name = name
		this.image = image
		this.summary = summary
	}

	template () {
		const defaultImg = 'https://www.union.edu/sites/default/files/union-marketing-layer/201803/picture.jpg'
		let showTemplate = `<article class="show">
                <div class="show-img">
                	<img src="${this.image ? this.image.medium : defaultImg}" alt="">
                    <span class="show-title">${this.name}</span>
                </div>
                ${this.summary || ''}
            </article>`
        return showTemplate
	}
}