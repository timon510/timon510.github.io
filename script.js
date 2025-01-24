let currentUser = null;
const users = {
    admin: 'password'
};

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        currentUser = username;
        alert('Login successful!');
        document.getElementById('login-form').reset();
        if (username === 'admin') {
            document.getElementById('admin-link').style.display = 'block';
            document.getElementById('admin').style.display = 'block';
            loadAdminProjects();
        }
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!currentUser) {
        alert('Please log in to upload projects.');
        return;
    }

    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const projectFile = document.getElementById('project-file').files[0];
    const image = document.getElementById('project-image').files[0];

    if (projectFile && image) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const cardContainer = document.getElementById('project-cards');

            const card = document.createElement('div');
            card.className = 'card';

            const cardImage = document.createElement('img');
            cardImage.src = e.target.result;

            const cardTitle = document.createElement('h3');
            cardTitle.textContent = title;

            const cardDescription = document.createElement('p');
            cardDescription.textContent = description;

            const cardLink = document.createElement('a');
            cardLink.href = URL.createObjectURL(projectFile);
            cardLink.textContent = 'Download Project';
            cardLink.download = projectFile.name;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'X';
            deleteBtn.onclick = function() {
                if (currentUser === 'admin' || currentUser === username) {
                    cardContainer.removeChild(card);
                } else {
                    alert('You do not have permission to delete this project.');
                }
            };

            card.appendChild(cardImage);
            card.appendChild(cardTitle);
            card.appendChild(cardDescription);
            card.appendChild(cardLink);
            card.appendChild(deleteBtn);

            cardContainer.appendChild(card);

            // Clear the form
            document.getElementById('upload-form').reset();
        };

        reader.readAsDataURL(image);
    } else {
        alert('Please select both an image and a project file.');
    }
});

function loadAdminProjects() {
    const adminCardContainer = document.getElementById('admin-project-cards');
    adminCardContainer.innerHTML = '';

    const projectCards = document.getElementById('project-cards').children;
    for (let card of projectCards) {
        const adminCard = card.cloneNode(true);
        adminCardContainer.appendChild(adminCard);
    }
}