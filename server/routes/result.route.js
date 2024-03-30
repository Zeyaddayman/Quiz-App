const express = require('express');
const router = express.Router();

let Question = require('../models/question.model');

router.post('/', async (req, res) => {

    const userAnswers = req.body;

    const questions = await Question.find({});

    const totalQuestions = questions.length;

    if (userAnswers.length < totalQuestions) {
        return res.status(400).json({status: 'fail', data: {result: 'no data'}})
    }

    const totalPoints = totalQuestions * 10;

    let userEarnedPoints = 0;

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].correct === userAnswers[i]) {
            userEarnedPoints += 10;
        }
    }

    let isPassed = userEarnedPoints >= totalPoints / 2;

    const result = {
        totalQuestions,
        totalPoints,
        userEarnedPoints,
        isPassed
    };

    res.status(200).json({status: 'success', data: {result}});
})

module.exports = router;