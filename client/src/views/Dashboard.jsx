import React, { useEffect, useState } from 'react';
import ProjectService from '../services/ProjectService';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import '../App.scss';


const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const projectService = new ProjectService();
    const history = useHistory();
    
    const StStartProject = async (id, project) => {
        try {
            const updatedProyInService = await projectService.updateProject(id, { ...project, status:'activo' })
            getProjectsFromService();
            return updatedProyInService;
        } catch (error) {
            console.error(error);
        }
    }

    const StFinishProject = async (id, project) => {
        try {
            const updatedProyInService = await projectService.updateProject(id, { ...project, status:'terminado' })
            getProjectsFromService();
            return updatedProyInService;
        } catch (error) {
            console.error(error);
        }
    }

    const deleteProject = async (id) => {
        try {
            const deleteProjectInDB = await projectService.deleteProject(id);
            deleteProjectInDB && history.push('/');
            getProjectsFromService();
            
        } catch (err) {
            console.log(err);
        }
    }

    const getProjectsFromService = async () => {
        try {
            const projectsList = await projectService.getAllProjects();
            setProjects(projectsList);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProjectsFromService()
    }, [])

    return (
        <div>
            <div className="form-container">
                <div className="Contain1">
                    <h3>Backlog</h3>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Date Due</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                                projects.length > 0 ? projects.filter(prop => {
                                return prop.status==='ingresado'}).map(project => ( 
                                <tr key={project._id}>
                                    <td>{project.name}</td>
                                    <td>{moment(project.date_due).format("DD/MM/YYYY")}</td>
                                    <td>
                                        <Button variant="info" onClick={() => StStartProject(project._id, project)} >Start Project</Button>
                                    </td>
                                </tr>
                                )) : 'No hay ninguna propiedad'
                            }

                        </tbody>
                    </Table>
                </div> 
                
                <div className="Contain2">
                    <h3>In Progress</h3>
                    <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Date Due</th>
                                {/*   <th>Status</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects.length > 0 ? projects.filter(prop => {
                                    return prop.status==='activo'}).map(project => ( 
                                    <tr key={project._id}>
                                        <td>{project.name}</td>
                                        <td>{moment(project.date_due).format("DD/MM/YYYY")}</td>
                                  {/*       <td>{project.date_due}</td> */}
                                    {/*    <td>{project.status}</td> */}
                                        <td>
                                            <Button variant="info" onClick={() => StFinishProject(project._id)} >Move to Completed</Button>
                                        </td>
                                    </tr>
                                    )) : 'No hay ninguna propiedad'
                                }

                            </tbody>
                    </Table>
                </div>
                
                <div className="Contain3">
                    <h3>Finished</h3>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Date Due</th>
                            {/*   <th>Status</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                projects.length > 0 ? projects.filter(prop => {
                                return prop.status==='terminado'}).map(project => ( 
                                <tr key={project._id}>
                                    <td>{project.name}</td>
                                    <td>{moment(project.date_due).format("DD/MM/YYYY")}</td>
                                    {/* <td>{project.date_due}</td> */}
                                {/*    <td>{project.status}</td> */}
                                    <td>
                                        <Button variant="info" onClick={ () => deleteProject(project._id, project) }>Remove Project</Button>
                                    </td>
                                </tr>
                                    )) : 'No hay ninguna propiedad'
                                }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;