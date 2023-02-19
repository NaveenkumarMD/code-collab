import { db } from "../App";

import { doc, setDoc ,writeBatch} from "firebase/firestore"; 
import arr from '../Assets/Questions/questions.json'

async function addx(){
    console.log(arr)
    const batch = writeBatch(db);
    arr.questions.forEach((question,idx)=>{
        const questionRef = doc(db, "questions", `${idx+1}`);
        batch.set(questionRef, question);
    })
 await batch.commit()

}

export default addx


