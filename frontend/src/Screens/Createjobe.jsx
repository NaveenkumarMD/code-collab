import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';

export default function Createjobe({ open, setOpen }) {

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const formik = useFormik({
        initialValues: {
            interview_name: "",
            company_name: "",
            time: "",
            date: "",
            position: "",
            expected_salary: ""
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })
    return (
        <div style={{width:"900px"}}>
            <Dialog  fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogTitle>Create Job</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the details of the job from the top to bottom
                    </DialogContentText>
                    <div style={{ margin: "20px 0px"}}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Interview name"
                                id='interview_name'
                                name='interview_name'
                                fullWidth
                                variant="outlined"
                                value={formik.values.interview_name}
                                onChange={formik.handleChange}
                            />
                            <br /><br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="company_name"
                                name="company_name"
                                label="Company name"
                                fullWidth
                                variant="outlined"
                                value={formik.values.company_name}
                                onChange={formik.handleChange}
                            /><br /><br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="time"
                                name="time"
                                label="Time"
                                fullWidth
                                variant="outlined"
                                value={formik.values.time}
                                onChange={formik.handleChange}
                            /><br /><br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="date"
                                name="date"
                                label="Date"
                                fullWidth
                                variant="outlined"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                            /><br /><br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="position"
                                name="position"
                                label="Position"
                                fullWidth
                                variant="outlined"
                                value={formik.values.position}
                                onChange={formik.handleChange}
                            /><br /><br />
                              <TextField
                                autoFocus
                                margin="dense"
                                id="expected_salary"
                                name="expected_salary"
                                label="Salary"
                                fullWidth
                                variant="outlined"
                                value={formik.values.expected_salary}
                                onChange={formik.handleChange}
                            />
                        </form>
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <div className="btn-run" onClick={() => formik.handleSubmit()}>
                        Create job
                    </div>
                </DialogActions>
            </Dialog>
        </div >
    );
}