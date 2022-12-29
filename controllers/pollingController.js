const { findById } = require('../models/questionSchema');
const quest = require('../models/questionSchema');
//create question
module.exports.questionCreation = async function (req, res) {
   
        console.log(req.body);
        await quest.create({
            question: req.body.question
        }, (err, question) => {
            if (err) {
                console.log(`error in creating question ${err}`);
                return;
            }

            console.log('quest created');
            return res.send(question);
        })
    }
//addoption
module.exports.addOption = async function (req, res) {
    
    await quest.findById(req.body.id, async function (err, question) {
        if (err) {
            return res.send("internal error");
        }
        if (!question) {
            return res.json({ "message": "make sure id in body is valid" });
        }
        const op = {
            "optiontext": req.body.optiontext,
            "toVote": `http://localhost:${process.env.PORT}/${req.body.id}/${question.options.length + 1}/add_vote`
            }
        try {
            question.options.push(op);
            await question.save();
            res.json(question);
        }
        catch (err) {
            console.log('err here in ctach', err)
            res.json({ message: "cannot add more than 4 options to a polling question" });
        } 
    }).clone().catch(function (err) { console.log('error caught in here', err) });
}
//see all question limit 10
module.exports.seeAllQuest = async function (req, res) {
    return res.send(await quest.find().limit(10).exec());
    
}
//addvote
module.exports.addVoteTo = async function (req, res) { 
    
    await quest.findById(req.body.questionId, async function (err, question) {
        if (err) {
            return console.log('err1', err);
        }

        if (!question) {
            return res.json({message: "make sure Id is valid"})
        }
        console.log(question.options);
        for (var i = 0; i < question.options.length; i++) {
            if (req.body.optionId == question.options[i]._id) {
                question.options[i].votes = question.options[i].votes + 1;
            }
        }
        question.save();
        return res.send(question);
    }).clone().catch(function (err) { console.log('error caught in here', err) });

}

//delete question
module.exports.deleteOption = async function (req, res) {
    await quest.findById(req.body.questionId, async function (err, question) {
        if (err) {
            return res.json({messsage: "internal error try after some time"})
        }
        if (!question) {
            return res.join({message: "seems like the question id you gave is invalid"})
        }
        console.log(question.options);
        for (var i = 0; i < question.options.length; i++) {
            if (question.options[i]._id == req.body.optionId) {
                if (question.options[i].votes > 0) {
                    return res.json({ message: "the option has few votes, can't delete option" })
                } else {
                    question.options[i].remove();
                }
               
            }

        }
        question.save();
        return res.send(question);
    }).clone().catch(function (err) { console.log('error caught in here', err) });
}


//delte question
module.exports.deleteQuestion = async function (req, res) {
    await quest.findById(req.body.questionId, async function (err, question) {
        if (err) {
            return res.json({ messsage: "internal error try after some time" })
        }
        if (!question) {
            return res.json({ message: "seems like the question id you gave is invalid" })
        }
        //console.log(question.options);
        for (var i = 0; i < question.options.length; i++) {
            if (question.options[i].votes > 0) {
                return res.json({ message: "one the options in the question has few votes; cannot delete this question" })
            }
        }

        var fmessage = await safeTodelete(req.body.questionId);
        return res.send({ message: fmessage });
    }).clone().catch(function (err) { console.log('error caught in here', err) });
}

async function safeTodelete(id) {
    quest.findByIdAndDelete(id, function (err) {
        if (err) {
            return  "sorry try after some time";
        }

        return "Question deleted successfully";
    }).clone().catch(function (err) { console.log('error caught in here', err) });
}


