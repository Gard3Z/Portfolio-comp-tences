document.addEventListener('DOMContentLoaded', () => {
  const projectCardsContainer = document.getElementById('project-cards');

  // Affichage des projets sur la page d'accueil
  if (projectCardsContainer) {
      fetch('data/projects.json')
          .then(response => response.json())
          .then(projects => {
              projects.forEach(project => {
                  const cardElement = document.createElement('div');
                  cardElement.classList.add('card');

                  cardElement.innerHTML = `
                      <img src="${project.images[0]}" alt="${project.title}">
                      <div class="card-content">
                          <h3 class="card-title">${project.title}</h3>
                          <p class="card-description">${project.description.substring(0, 100)}...</p>
                          <div class="card-action">
                              <a href="project-detail.html?id=${project.id}">Voir les détails</a>
                          </div>
                      </div>
                  `;

                  projectCardsContainer.appendChild(cardElement);
              });
          })
          .catch(error => console.error('Error loading projects:', error));
  }

  // Gestion des détails du projet sur la page de détails
  if (window.location.pathname.includes('project-detail.html')) {
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('id');

      fetch('data/projects.json')
          .then(response => response.json())
          .then(projects => {
              const project = projects.find(p => p.id == projectId);
              if (project) {
                  document.getElementById('project-title').textContent = project.title;
                  document.getElementById('project-description').textContent = project.description;
                  document.getElementById('project-action').textContent = project.action;
                  document.getElementById('project-auto-eval').textContent = project["auto-eval"];

                  const acListElement = document.getElementById('project-ac-list');
                  project.AC.forEach(ac => {
                      const acElement = document.createElement('li');
                      acElement.innerHTML = `<strong>${ac.code}</strong> - ${ac.description}<p>${ac.justification}</p>`;
                      acListElement.appendChild(acElement);
                  });

                  const tasksListElement = document.getElementById('project-tasks-list');
                  project.tache.forEach(task => {
                      const taskElement = document.createElement('li');
                      taskElement.textContent = task;
                      tasksListElement.appendChild(taskElement);
                  });

                  const imagesElement = document.getElementById('project-images');
                  project.images.forEach(image => {
                      const imgElement = document.createElement('img');
                      imgElement.src = image;
                      imgElement.alt = project.title;
                      imagesElement.appendChild(imgElement);
                  });

                  // Mise à jour de l'image de fond du Hero
                  document.getElementById('hero').style.backgroundImage = `url('${project.images[0]}')`;
              } else {
                  console.error('Project not found');
              }
          })
          .catch(error => console.error('Error loading project details:', error));
  }
});
