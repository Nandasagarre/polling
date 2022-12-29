const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/pollingController');
console.log('router loaded');

router.get('/', (req, res) =>{
    return res.send('welcome to polling APIs');
})

router.get('/seeallquest', QuestionController.seeAllQuest);

router.post('/createquest', QuestionController.questionCreation);

router.post('/addoptionto', QuestionController.addOption);

router.post('/addVoteTo', QuestionController.addVoteTo);

router.post('/deleteoption', QuestionController.deleteOption);

router.post('/deletequestion', QuestionController.deleteQuestion);

module.exports = router;