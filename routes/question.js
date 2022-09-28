var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var auth = require('../middlewares/auth');
var Question = require('../models/Question');
var Answer = require('../models/Answer');
var slug = require('slug');
var lodash = require('lodash');

// POST question 
router.post('/', auth.verifyToken, async (req, res, next) => {
    req.body.tags = req.body.tags.split(',').map((ele) => ele.trim());
    req.body.author = req.user.userId;
    try {
        req.body.slug =  await slug(req.body.title);
        let question = await Question.create(req.body);
        res.send(question);
    } catch (error) {
        next(error);
    }
})

// GET list of questions 
router.get('/', async (req, res, next) => {
    try {
        let questions = await Question.find({}).populate('author', 'username').populate('answer').exec();
        res.send(questions);
    } catch (error) {
        next(error);
    }
})

// UPDATE questions 
router.put('/:questionId', auth.verifyToken, async(req, res, next) => {
    let questionId = req.params.questionId;
    try {
        if(req.body.title){
            req.body.slug = await slug(req.body.title);
        }
        let updatedQuestion = await Question.findByIdAndUpdate(questionId, req.body, {new: true})
        res.json({updatedQuestion});
    } catch (error) {
        next(error);
    }
})

// Delete Question 
router.delete('/:slug', auth.verifyToken, async(req, res, next) => {
    let slug = req.params.slug;
    try {
        const deletedQuestion = await Question.findOneAndDelete({slug});
        if(!deletedQuestion) return res.send('No question available to delete!');
        console.log(deletedQuestion);
        await Answer.findByIdAndDelete(deletedQuestion.answer);
        res.send({deletedQuestion});
    } catch (error) {
        next(error)
    }
})

// ANSWER 
// POST answer 
router.post('/:questionId/answers', auth.verifyToken, async(req, res, next) => {
    const questionId = req.params.questionId;
    req.body.author = req.user.userId;
    try {
        const question = await Question.findById(questionId);
        if(question.answer) return res.json({Message: 'This question is already associated with an answer, first delete answer to insert new one'});
        const answer = await Answer.create(req.body);
        await Question.findByIdAndUpdate(questionId, {answer:answer.id});
        res.json({answer})
    } catch (error) {
        next(error);
    }
})

// GET answer 
router.get('/:questionId/answers', auth.verifyToken, async(req, res, next) => {
    const questionId = req.params.questionId;
    try {
    const questionId = req.params.questionId;
        const question = await Question.find({_id:questionId},'answer').populate('answer');
        res.json({answer:question[0].answer})
    } catch (error) {
        next(error);
    }
})

// UPDATE answer 
router.put('/answers/:answerId', auth.verifyToken, async(req, res, next) => {
    const answerId = req.params.answerId;
    try {
        let updatedAnswer = await Answer.findByIdAndUpdate(answerId, req.body, {new: true});
        res.json({updatedAnswer});
    } catch (error) {
        next(error)
    }
})
// DELETE Answer 
router.delete('/answers/:answerId', auth.verifyToken,async (req, res, next) => {
    const answerId = req.params.answerId;
    try {
        let deletedAnswer = await Answer.findByIdAndDelete(answerId);
        await Question.findOneAndUpdate({answer: deletedAnswer.id}, {answer:null}, {new:true});
        res.json({deletedAnswer});
    } catch (error) {
        next(error);
    }
})

// GET tags 
router.get('/tags', async (req, res, next) => {
    try {
        let questions = await Question.find({});
        tags = questions.map(ele => ele.tags).flat(Infinity);
        tags = await lodash.uniq(tags);
        res.json({tags})
    } catch (error) {
        
    }
})

module.exports = router;