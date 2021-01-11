class UI {
	constructor() {
		this.card = document.querySelector('.card-form');
		this.formEnd = document.querySelector('.form-end');
		this.posts = document.querySelector('#posts');
		this.titleInput = document.querySelector('#title');
		this.bodyInput = document.querySelector('#body');
		this.idInput = document.querySelector('#id');
		this.postSubmit = document.querySelector('.post-submit');
		this.postsContainer = document.querySelector('.postsContainer');
		this.formState = 'add';
	}

	showPosts(posts) {
		let output = posts.reduce((acc, post) => {
			return (
				acc +
				`
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class = "edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class = "delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `
			);
		}, '');
		this.posts.innerHTML = output;
	}

	fillForm(data) {
		this.titleInput.value = data.title;
		this.bodyInput.value = data.body;
		this.idInput.value = data.id;

		this.changeFormState('edit');
	}

	changeFormState(type) {
		if (type === 'edit') {
			this.postSubmit.textContent = 'Update Post';
			this.postSubmit.className = 'post-submit btn btn-warning btn-block';

			//create Cancel btn
			const btn = document.createElement('button');
			btn.className = 'post-cancel btn btn-light btn-block';
			btn.appendChild(document.createTextNode('Cancel'));

			//Insert cansel btn to DOM
			this.card.insertBefore(btn, this.formEnd);
		} else {
			this.postSubmit.textContent = 'Post it';
			this.postSubmit.className = 'post-submit btn btn-primary btn-block';
			//remove cancel btn
			if (document.querySelector('.post-cancel')) {
				document.querySelector('.post-cancel').remove();
			}
			//Clear ID input
			this.clearID();
			//Clear Fields
			this.clearFields();
		}
	}

	showAlert(message, className) {
		this.clearAlert();

		//create div
		const div = document.createElement('div');
		//add class names
		div.className = className;
		//add text
		div.appendChild(document.createTextNode(message));
		//get parent and insert div
		this.postsContainer.insertAdjacentElement('beforebegin', div);
	}
	clearAlert() {
		setTimeout(() => {
			document.querySelector('.alert').remove();
		}, 3000);
	}
	clearFields() {
		this.titleInput.value = '';
		this.bodyInput.value = '';
	}
	clearID() {
		this.idInput.value = '';
	}
}

export const ui = new UI();
