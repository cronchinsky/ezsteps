(function ($) {
  
  // Constructor function for the Quiz "class"
  function Quiz(selector) {

    // This will hold an array of questions.
    this.questions = [];

    // The number of questions in the quiz.
    this.numQuestions = 0;

    // The index of the questions array
    this.currentQuestion = 0;
    
    // The container div for the node's fields that Drupal prints on the page.
    this.$dataWrapper = $(selector);
    
    // A newly constructed div for containing the quiz.
    this.$wrapper = $('<div class="ezsteps-quiz-wrapper"></div>').insertBefore('.node-quiz .content');
    
    // The open ended question form.
    //this.$form = this.$dataWrapper.find('form').clone();
    
     this.$form = this.$dataWrapper.find('form').clone();

    
    // Load the quiz data from the HTML that Drupal prints on the page.
    this.loadData();

    // Remove all of the quiz data html.
    this.removeHtml();
    
    // Start the quiz.
    this.start();
  }

  // Loads the data from the HTML quiz information.
  Quiz.prototype.loadData = function () {
    
    // Loop through all of the questions.
    $questions = $('.field-name-field-quiz-questions > .field-items > div');
    this.numQuestions = $questions.length;
    
    var quiz = this;
    $.each($questions, function (index, questionDiv) {
      
      // Create a question object and set the prompt based on the printed field value.
      var question = {  
        prompt: $(questionDiv).find('.field-name-field-quiz-prompt > .field-items > .field-item').html(),
        answers: []
      }

      // Loop through the answer fields and put them in the question object.
      var $answers = $(questionDiv).find('.field-name-field-quiz-answers > .field-items > .field-item');
      $.each($answers, function (index, answerDiv) {
        $answer = $(answerDiv);
        var answer = {
          text: $answer.find('.field-name-field-quiz-answer-text .field-item').text(),
          feedback: $answer.find('.field-name-field-quiz-feedback .field-item').html(),
          correct: $answer.find('.field-name-field-quiz-answer-correct .field-item').text() == 'Incorrect' ? false : true
        };
        question.answers.push(answer);
      });
      
      // Add the new question object to the quiz's array of questions.
      quiz.questions.push(question);
    });
  }
  
  // Removes Drupal's HTML with the quiz data.
  Quiz.prototype.removeHtml = function () {
    this.$dataWrapper.remove();
  }
  
  // Start the quiz.
  Quiz.prototype.start = function () {
    this.currentQuestion = 0;
    this.showQuestion();
  }
  
  // Move to the next question in the quiz.
  Quiz.prototype.next = function () {
    this.currentQuestion = this.currentQuestion + 1;
   
    // Check if this is the last question, if so, we're done.
    if (this.currentQuestion == this.numQuestions) {
      this.done();
      return;
    }
    this.showQuestion();
  }
  
  // Call this when they've completed the quiz.
  Quiz.prototype.done = function () {
    var quiz = this;
    
    // Fade out the wrapper
    this.$wrapper.fadeOut(function () {
      
      // Replace the quiz content with the open ended form.
      $(this).html('');
      //quiz.$wrapper.append(quiz.$form);
      
      quiz.$wrapper.append(quiz.$form);

      
      // And fade it back in.
      $(this).fadeIn();
    });
  }
  
  // When they get a question correct.
  Quiz.prototype.correct = function () {
    
    // Add a next button to the quiz that calls Quiz.next() when clicked.
    var $nextButton = $('<a href="#">Next</a>');
    var quiz = this;
    $div = $('<div class="ezsteps-quiz-next-wrapper"></div>');
    $div.append($nextButton);
    this.$wrapper.append($div);
    $('.ezsteps-quiz-next-wrapper a').click(function () {
      quiz.next();
    });
  }
  
  // A function for showing the user feedback, can be switched to do some modal
  // stuff later if that's what we want.
  Quiz.prototype.feedback = function (feedback) {
    this.$wrapper.find('.ezsteps-quiz-feedback').html(feedback);
  }
  
  // Replaces whatever is showing now with with the current quiz question.
  Quiz.prototype.showQuestion = function () {
    var quiz = this;
    
    // Fade the quiz out, rebuild its contents, and then fade it back in.
    this.$wrapper.fadeOut(function () {
      var $wrapper = $(this);
      $wrapper.html('');
      
      // Get the question object from the quiz object's array of questions.
      var question = quiz.questions[quiz.currentQuestion];
      
      // Add div for the prompt.
      $wrapper.append('<div class="ezsteps-quiz-prompt">' + question.prompt + '</div>');      
      var $answers = ('<div class="ezsteps-quiz-answers"></div>');

      
      // Loop through each of the answers and add a div / link for each.
      $.each(question.answers, function (index, answer) {
        var $answerLink = $('<a href="#">' + answer.text + '</a>');
        $answerLink.data('correct', answer.correct);
        $answerLink.data('feedback', answer.feedback);
        
        // When the user clicks on an answer, display the feedback, and if they
        // got it correct, call the correct function.
        $answerLink.click(function () {
          quiz.feedback($(this).data('feedback'));
          if ($(this).data('correct')) {
            quiz.correct();
          }
          return false;
        });
        
        var $div = $('<div class="ezsteps-quiz-answer-link"></div>');
        $div.append($answerLink);
        $wrapper.append($div);
      });
      
      // Add div for the feedback
      $wrapper.append('<div class="ezsteps-quiz-feedback"></div>');

      $wrapper.fadeIn();
    });
  }

  // Once the dom is loaded, instantiate the quiz on the node's content.
  Drupal.behaviors.ezstepsQuiz = {
    attach: function () {
      Drupal.ezstepsQuiz = new Quiz('.node-quiz .content');
    }
  };
})(jQuery);