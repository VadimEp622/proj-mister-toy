import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
// import { TextField } from '@mui/material'


import { LabelList } from "../cmps/label-list.jsx"



const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.number()
        .required('Required')
        .positive()
        .integer(),
    inStock: Yup.bool(),
})

// function CustomInput(props) {
//     return <TextField id="outlined-basic" label="Outlined" variant="outlined" {...props} />
// }


export function ToyEditForm({ formValues, onSubmit, toyId, labels, handleChange }) {

    return (
        <Formik
            initialValues={formValues}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
        >
            {({ errors, touched }) => (
                <Form className='formik'>
                    <section className="main-input">
                        <article>
                            <label>Name: </label>
                            <Field type="text" name="name" placeholder="Enter toy name" />
                            {errors.name && touched.name
                                ? (<aside className="aside-required">{errors.name}</aside>)
                                : null}
                        </article>
                        <article>
                            <label>Price: </label>
                            <Field required type="number" name="price" placeholder="Enter price" />
                            {errors.price && touched.price
                                ? (<aside className="aside-required">{errors.price}</aside>)
                                : null}
                        </article>
                        <article>
                            <label>In Stock: </label>
                            <Field type="checkbox" name="inStock" />
                        </article>
                    </section>
                    <LabelList labels={labels} handleChange={handleChange} />


                    <button
                        type="submit"
                        className="custom-button"
                    // onClick={(ev) => handleAddToy(ev)}
                    >{toyId ? 'Edit' : 'Add'}</button>

                </Form>
            )}
        </Formik>
    )
}