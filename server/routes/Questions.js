import express from 'express';
import {AskQuestion, getAllQuestions, deleteQuestions, voteQuestion} from '../controllers/Questions.js'
import auth from '../middleware/auth.js '

const router= express.Router()


router.post('/Ask', auth, AskQuestion);
router.get('/get', getAllQuestions)
router.delete('/delete/:id',auth, deleteQuestions)
router.patch('/vote/:id',auth, voteQuestion)
export default router