import React, { useEffect } from "react";

function Result(props) {
	let questions = props.questions;
	let finalScore = 0;

	useEffect(() => {
		questions.forEach((q) => {
			q.isCorrect = q.options.every((x) => x.selected === x.answer);
			if (q.isCorrect === true) {
				finalScore += 1;
			}
		});

		// window.location.href = "https://google.com";
	}, [questions]);



	return (
		<div className="result">
			<h2 className="text-center font-weight-normal">Quiz Game</h2>
			
			<h4 className="alert alert-info text-center">
				Thank you for playing<br />
			</h4>
		</div>
	);
}

export default Result;
