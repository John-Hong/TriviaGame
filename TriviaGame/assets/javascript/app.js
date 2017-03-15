
// Lookup a group of radio buttons with the given name and
// return the value of the "checked" button, or null if no
// buttons are checked.
function getChecked(name) {
	var buttons = document.getElementsByName(name);
	
	if( !buttons )
		return null;

	for( var i = 0; i < buttons.length; i++ )
		if( buttons[i].checked )
			return buttons[i].value;
	return null;
}

// This code will run as soon as the page loads
window.addEventListener("load", function() {
	var time = 70;
	var timer; // will hold a setInterval return value, representing our timer
	var timer_display = document.getElementById("timer_display");

	var submitQuiz = function() {
		clearInterval(timer);
		console.log("Quiz over!"); // DEBUG
		
		// grade the quiz
		var answer_key = [
			{ name: "question1", answer: "C" },
			{ name: "question2", answer: "A" },
			{ name: "question3", answer: "C" },
			{ name: "question4", answer: "B" },
			{ name: "question5", answer: "A" },
			{ name: "question6", answer: "A" },
			{ name: "question7", answer: "C" },
			{ name: "question8", answer: "B" }

		];
		var correct = 0;
		var incorrect = 0;
		var unanswered = 0;
		for( var i = 0; i < answer_key.length; i++ ) {
			var guess = getChecked( answer_key[i].name );
			if( guess === null )
				unanswered++;
			else if( guess == answer_key[i].answer )
				correct++;
			else
				incorrect++;
		}

		// change UI
		document.getElementById("result_correct").innerHTML = "" + correct;
		document.getElementById("result_incorrect").innerHTML = "" + incorrect;
		document.getElementById("result_unanswered").innerHTML = "" + unanswered;
		document.getElementById("quiz_page").style.display = "none";
		document.getElementById("result_page").style.display = "block";
	};

	// Handel Quiz Start Button (on Start Page)
	$("#start").on("click", function() {

		// change UI
		timer_display.innerHTML = "" + time;
		document.getElementById("start_page").style.display = "none";
		document.getElementById("quiz_page").style.display = "block";

		timer = setInterval( function() {
			time--;
			timer_display.innerHTML = "" + time;
			console.log("time left: " + time); // DEBUG
			if( time <= 0 )
				submitQuiz();
		}, 1000 );

	});

	// Handel Quiz Submit Button
	$("#quiz_submit_button").on("click", submitQuiz);
});
