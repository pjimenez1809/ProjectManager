const ProjectController = require('../controllers/project.controllers');

module.exports = app => {
    app.get('/api/projects', ProjectController.findAllProjects);
    app.put('/api/projects/update/:id', ProjectController.updateProject);
    app.get('/api/projects/:id', ProjectController.getOneSingleProject);
    app.post('/api/projects/new', ProjectController.creatNewProject);
    app.delete('/api/projects/delete/:id', ProjectController.deleteProject);
}