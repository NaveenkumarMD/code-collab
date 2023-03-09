import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import _ from "underscore"
import { Box } from '@mui/material';

import { db } from '../App';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { toastGenerator } from '../Functions/toast';

function Comments() {
    const [comments, setComments] = useState([])
    const [reload, setreload] = useState("1")
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("question"))
        let comments=_.unique(data.comments)
        setComments(comments)
    }, [reload])
    return (
        <>
            <Box sx={{ p: "60px" }}>
                <Newcomment setreload={setreload}  setComments={setComments}/>
            </Box>
            <Typography color="primary" variant='h5' >Other's comments</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                {
                    comments && comments.map((com, idx) => {
                        return (
                            <>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={com.name}
                                        secondary={
                                            <React.Fragment>
                                                {com.comment}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>

                        )
                    })
                }

            </List>

        </>
    );
}
export default Comments

function Newcomment({ setreload,setComments }) {
    const [comment, setComment] = useState("")
    const handleclick = async () => {
        let userdata = JSON.parse(localStorage.getItem("userdata"))
        let questiondata = JSON.parse(localStorage.getItem("question"))
        questiondata = {
            ...questiondata,
            comments: [
                ...(questiondata.comments ? questiondata.comments : []),
                {
                    name: userdata.name,
                    email: userdata.email,
                    comment
                }
            ]
        }
        let comments=_.unique([
            ...(questiondata.comments ? questiondata.comments : []),
            {
                name: userdata.name,
                email: userdata.email,
                comment
            }
        ])
        setComments(comments)
        localStorage.setItem("question", JSON.stringify(questiondata))
        const questionref = doc(db, "questions", `${questiondata.id}`)
        setreload("1")
        try {
            await updateDoc(questionref, {
                comments: arrayUnion({
                    name: userdata.name,
                    email: userdata.email,
                    comment
                })
            });
            toastGenerator("success", "Comment updated")
        } catch (error) {
            toastGenerator("error", "Failed to comment")
        }


    }
    return (
        <>
            <Grid container sx={{ gap: "20px" }} item>
                <Grid item>
                    <TextField onChange={e => setComment(e.target.value)} sx={{ width: "400px" }} fullWidth label="Comment" variant="standard" />
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                    <div className="btn-run" onClick={handleclick}>
                        Submit
                    </div>
                </Grid>
            </Grid>
        </>
    )
}