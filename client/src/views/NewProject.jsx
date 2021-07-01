import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ProjectService from '../services/ProjectService';
import { useHistory } from "react-router-dom";

/* import { format } from 'date-fns'; */


const NewProject = () => {

    const projectService = new ProjectService();
    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Este campo es requerido'),
        date_due: Yup.date()
            .required('Este campo es requerido')
    });

    const history = useHistory();

    return (
        <div>
            <h1>Ingresar nuevo Proyecto</h1>
            <div className="form-container">

                <Formik
                    initialValues={{
                        name: '',
                        status: 'ingresado'
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        try {
                        console.log(values);
                        projectService.createProject(values);
                        history.push("/");
                        } catch (err) {
                            /* alert(err.response.data.errors.name.message); */
                            alert(err);
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <label htmlFor="">Project Name</label>
                            <Field name="name" />
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                            <label htmlFor="">Date Due</label>
                            <Field name="date_due" />
                            {errors.date_due && touched.date_due ? (
                                <div>{errors.date_due}</div>
                            ) : null}
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default NewProject;