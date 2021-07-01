import axios from 'axios';

class ProjectService {

    constructor() {}

    async createProject(project) {
        try {
            const newProject = await axios.post('http://localhost:8000/api/projects/new', project);
            return newProject.data;

        } catch(err) { 
            // console.log(err.response);
            console.log('error ingreso',err.response.data.errors.name.message);
            return err.response.data.errors.name.message;
        }
    }

    async deleteProject(id) {
        try{
            const deleteProject = await axios.delete(`http://localhost:8000/api/projects/delete/${id}`)
            return deleteProject.data.response;
        } catch(err) {
            return err;
        }
    }


    async getAllProjects() {
        try {
            const projectsList = await axios.get('http://localhost:8000/api/projects');
            console.log("🚀 ~ file: Home.jsx ~ line 10 ~ getAllProjects ~ projectsList", projectsList)
            return projectsList.data.projects;

        } catch (error) {
            return error;
        }
    }

    async updateProject(id, project) {
        try {
            const updatedProject = await axios.put(`http://localhost:8000/api/projects/update/${id}`, project)
            return updatedProject.data.project;
        } catch(err) {
            return err;
        }
    }

    async registerUser(user) {
        try {
            const response = await axios.post('http://localhost:8000/api/users/new', user);
            return response.data.user;

        } catch(err) {
            return err;
        }
    }

    async loginUser(user) {
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', user);
            return response.data.user;

        } catch(err) {
            return err;
        }
    }


}

export default ProjectService;