import React, {useState, useMemo, useEffect, Fragment} from "react";
import {Field, Formik, useFormik} from "formik";
import * as Yup from "yup";
import './App.css';

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    twoFactorAuthenticationRequired: false,
    twoFactorAuthenticationType: ''
}

const validation = Yup.object().shape({
    name: Yup.string().min(3).required("Please Enter the Name"),
    email: Yup.string().email("Please Enter a valid Email").required("Please Enter the Email"),
    password: Yup.string().min(5).required("Please Enter the Password"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password Not Matched").required("Please Enter the Confirm Password"),
    twoFactorAuthenticationRequired: Yup.boolean().required("Please Select your Response"),
    twoFactorAuthenticationType: Yup.string().notRequired()
});

function DynamicForm () {

    const formik= useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log("The Formik Forms Values are ", values);
        },
        validationSchema: validation
    })

    return (
        <div >
            <form action="" className="form-page-container" onSubmit={formik.handleSubmit}>
                <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange("name")} value={formik.values.name} placeholder="Name"/>
                {formik.errors.name && <div className="errorMessageContainer">{formik.errors.name}</div>}
                <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange("email")} value={formik.values.email} placeholder="Email"/>
                {formik.errors.email && <div className="errorMessageContainer">{formik.errors.email}</div>}

                <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange("password")} value={formik.values.password} placeholder="Password"/>
                {formik.errors.password && <div className="errorMessageContainer">{formik.errors.password}</div>}

                <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange("confirmPassword")} value={formik.values.confirmPassword} placeholder="Confirm Password"/>
                {formik.errors.confirmPassword && <div className="errorMessageContainer">{formik.errors.confirmPassword}</div>}

                <select value={formik.values.twoFactorAuthenticationRequired} onBlur={formik.handleBlur} onChange={formik.handleChange("twoFactorAuthenticationRequired")}>
                    <option value={true}>Yes Required</option>
                    <option value={false}>Not Required</option>
                </select>
                {formik.errors.twoFactorAuthenticationRequired && <div className="errorMessageContainer">{formik.errors.twoFactorAuthenticationRequired}</div>}

                {formik.values.twoFactorAuthenticationRequired.toString() === "true" &&
                    <Fragment>
                        <select value={formik.values.twoFactorAuthenticationType} onBlur={formik.handleBlur} onChange={formik.handleChange("twoFactorAuthenticationType")}>
                            <option value="Google Authenticator">Google Authenticator</option>
                            <option value="Authy">Authy</option>
                            <option value=''>None</option>
                        </select>
                        {formik.errors.twoFactorAuthenticationType && <div className="errorMessageContainer">{formik.errors.twoFactorAuthenticationType}</div>}

                    </Fragment>

                }


                <h1></h1>

                <input type="submit"/>
            </form>
        </div>
    )
}

export default DynamicForm;
