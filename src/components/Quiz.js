import React from "react";
import { ActionTypes } from "../components/actionTypes";
// import Review from "./Review";
import Questions from "./Questions";
import Result from "./Result";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        ...state.quiz,
        ...state.mode,
        ...state.pager,

    };
};

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (payload) => dispatch({ type: ActionTypes.QuizSubmit, payload }),
    onPagerUpdate: (payload) =>
        dispatch({ type: ActionTypes.PagerUpdate, payload }),
});

function Quiz(props) {
    const move = (e) => {
        let id = e.target.id;
        let index = 0;
        if (id === "first") index = 0;
        else if (id === "prev") index = props.pager.index - 1;
        else if (id === "next") index = props.pager.index + 1;
        else if (id === "last") index = props.pager.count - 1;
        else index = parseInt(e.target.id, 10);

        if (index >= 0 && index < props.pager.count) {
            let pager = {
                index: index,
                size: 1,
                count: props.pager.count,
            };
            props.onPagerUpdate(pager);
        }
    };

    // const gameOver = () =>{
    //     let questions =  props.quiz.questions;
    //     questions.forEach((q) => {
    //         q.isCorrect = q.options.every((x) => x.selected === x.answer);
    //     });
    //     console.log(questions);
    // }

    // const setMode = (e) =>  props.onSubmit(e.target.id);


    const renderMode = () => {
        if (props.mode === "quiz") {
            return <Questions move={move} />;
            // } else if ( props.mode === "review") {
            //     return <Review quiz={ props.quiz} move={ move} />;
        }
        else if (props.mode === "result") {
            return (
                <Result
                    questions={props.quiz.questions || []}

                />
            );
        }
    }

    return (
        <div>
            {renderMode()}

        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
