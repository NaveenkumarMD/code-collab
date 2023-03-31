import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from '../App'
import { Card, Box, Typography, CardContent, Button } from '@mui/material';
import '../Styles/ViewJobs.css'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';

import { toast, ToastContainer } from "react-toastify"




export default function ViewJobs({ open, setOpen }) {
    const [jobs, setJobs] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        let job = []
        const docRef = collection(db, "jobs");
        getDocs(docRef).then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let data = doc.data()
                job = [...job, data]
            })
            setJobs(job)

        }).catch(err => {
            console.log(err)

        })
    }, [])


    return (
        <div style={{ width: "900px" }}>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogTitle>View Job</DialogTitle>
                <DialogContent>

                    <div className="container">
                        {jobs && jobs.map((job, index) => {
                            return (
                                <Box key={index} className="card-box">
                                    <Card>{
                                        <>
                                            <CardContent className='card-content'>
                                                <div>
                                                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                                                        {job.position}
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        {job.company_name}
                                                    </Typography>
                                                </div>
                                                <div className='cntnt'>
                                                    <Typography variant="body2" className='salary'>
                                                        {"Rs " + job.expected_salary}
                                                    </Typography>
                                                    <Button className='btn'>
                                                        View Job
                                                    </Button>
                                                </div>

                                            </CardContent>

                                        </>
                                    }</Card>
                                </Box>)
                        })}
                    </div >
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}