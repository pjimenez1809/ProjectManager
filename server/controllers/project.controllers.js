const Project = require('../models/project.model');

module.exports.findAllProjects= (req, res) => {
    Project.find()
    .then(allProjects=> res.json({projects: allProjects}))
    .catch(err => res.json({error: err}));
}

module.exports.creatNewProject = (req, res) => {
    Project.create(req.body)
    .then(newProject => res.send({project: newProject}))
    .catch(err => res.status(409).send(err));
        // res.send({errors: err}));
}

module.exports.getOneSingleProject = (req, res) => {
    Project.findOne({_id: req.params.id})
    .then(project => res.json({project: project}))
    .catch(err => res.status(404).json(err));
}

module.exports.updateProject = (req, res) => {
    Project.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(updatedProject => res.json({project: updatedProject}))
    .catch(err => res.status(404).json(err));
}

module.exports.deleteProject = (req, res) => {
    Project.deleteOne({_id: req.params.id})
    .then(response => res.json({response: response}))
    .catch(err => res.json(err))
}