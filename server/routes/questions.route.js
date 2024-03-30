const express = require('express');
const router = express.Router();

let Question = require('../models/question.model');

router.get('/', async (req, res) => {

    const questions = await Question.find({}, {correct: false});

    res.json({status: 'success', data: {questions}});
})

module.exports = router;