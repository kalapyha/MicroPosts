import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
// Listen for add a post
ui.postSubmit.addEventListener('click', submitPost);
// Listen for delete post
ui.posts.addEventListener('click', deletePost);
//Listen for edit state
ui.posts.addEventListener('click', enableEdit);
//Listen for cancel
ui.card.addEventListener('click', cancelEdit);

// Get Post
function getPosts() {
	http
		.get('http://localhost:3000/posts')
		.then((data) => ui.showPosts(data))
		.catch((err) => console.log(err));
}

// Submit Post, ADD and PUT goes here
function submitPost() {
	const title = ui.titleInput.value;
	const body = ui.bodyInput.value;
	const id = ui.idInput.value;

	if (title === '' || body === '') {
		ui.showAlert(
			'One or more fields empty. Please check your input values!',
			'alert alert-danger'
		);
	} else {
		const data = {
			title,
			body,
		};
		if (id === '') {
			//Create and publish post
			http
				.post('http://localhost:3000/posts', data)
				.then((data) => {
					ui.showAlert('Post added', 'alert alert-success');
					ui.clearFields();
					getPosts();
				})
				.catch((err) => console.log(err));
		} else {
			//  Update post
			//Create and publish post
			http
				.put(`http://localhost:3000/posts/${id}`, data)
				.then((data) => {
					ui.showAlert('Post updated', 'alert alert-success');
					ui.changeFormState('add');
					getPosts();
				})
				.catch((err) => console.log(err));
		}
	}
}
//Delete post
function deletePost(e) {
	e.preventDefault();
	if (e.target.parentElement.classList.contains('delete')) {
		const id = Number(e.target.parentNode.dataset.id);
		//remove post from db
		if (confirm('Are you sure you want to dlelete this post?')) {
			http
				.delete(`http://localhost:3000/posts/${id}`)
				.then((data) => {
					ui.showAlert('Post have been deleted', 'alert alert-success');
					getPosts();
				})
				.catch((err) => console.log(err));
		}
	}
}

function enableEdit(e) {
	if (e.target.parentElement.classList.contains('edit')) {
		const id = Number(e.target.parentNode.dataset.id);
		const title =
			e.target.parentNode.previousElementSibling.previousElementSibling
				.textContent;
		const body = e.target.parentNode.previousElementSibling.textContent;
		const data = { id, title, body };

		//Fill form with data
		ui.fillForm(data);
	}
}

//cancel edit State
function cancelEdit(e) {
	if (e.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	}
	e.preventDefault();
}
