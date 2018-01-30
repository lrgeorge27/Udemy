var answer = "Now that a good question!";

module.exports.ask = function(question){
    console.log(question);
    return answer;
};

//exposed a method by chaining it to module.exports