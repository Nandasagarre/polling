const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const option = new Schema({
    optiontext: {
        type: String,
      //  required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    toVote: {
        type: String,
       // required: true
    }
});



const entry = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [option],
        validate: [arrayLimit, '{PATH} cannot add option exceeds the limit of 4']
    }

});

function arrayLimit(val) {
    return val.length <= 4;
}

const quest = mongoose.model('question', entry);

module.exports = quest;