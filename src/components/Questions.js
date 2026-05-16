import React, { useState } from "react";
import { ActionTypes } from "../components/actionTypes";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { Button, Stack } from "@mui/material";
import Iconify from "./Iconify";
import {  updateScore } from '../services/JRMFeedService';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../routes/paths';

const mapStateToProps = (state) => ({
    ...state.quiz,
    ...state.mode,
    ...state.pager,
});

const mapDispatchToProps = (dispatch) => ({
    onAnswer: (payload) => dispatch({ type: ActionTypes.QuizAnswer, payload }),
    onSubmit: (payload) => {dispatch({ type: ActionTypes.QuizSubmit, payload });
    },
});
 function Questions(props) {
    const navigate = useNavigate();
    const pId = localStorage.getItem("partnerId");
    const cId = localStorage.getItem("childId");
    const date = localStorage.getItem("qdate");
    const gameName = localStorage.getItem('path');
    const token = localStorage.getItem("jwt");
    const [finalScore, setFinalScore] = useState(0);
    const questions =  props.quiz.questions
            ?  props.quiz.questions.slice(
                   props.pager.index,
                   props.pager.index +  props.pager.size
              )
            : [];


   const onAnswer=(question, option) =>{
        let quiz = JSON.parse(JSON.stringify( props.quiz));
        let q = quiz.questions.find((x) => x.id === question.id);
        
            q.options.forEach((x) => {
                x.selected = false;
            });
        
        q.options.find((x) => x.id === option.id).selected = true;
         props.onAnswer(quiz);
         q.isCorrect = q.options.every((x) => x.selected === x.answer);
            if (q.isCorrect === true) {
                setFinalScore(finalScore + 1);
            }
    }


    const setMode = async (e) => {props.onSubmit(e.target.id)
        
        const result = await updateScore(pId, cId, date, finalScore,token, gameName);
        console.log("quiz submit", result);
        if ( !result ) {
            toast.error ("Error: Unable to communicate");
            console.log("Error: Unable to communicate")
            return;
        }
        if (!result.ok) {
          console.log("respose code", result.status)
          if ( result.status === 401) {
              toast.error ("error",result);
              console.log("error", result);
          } 
          return;
      }  
        console.log ("Scored Value", finalScore);
        toast.success ("Congradulations!!!");

        alert("Score: " +
        finalScore );
        console.log(
            "Score: " +
                finalScore   );
         navigate(PATH_DASHBOARD.general.myapp);
        // window.location.href = "https://google.com";
    
    };
    

        return (
            <div id="quiz">
                <h2 className="text-center font-weight-normal">
                    { props.quiz.name}
                </h2>
                <hr />
                {questions.map((q) => (
                    <div key={q.id}>
                        <div className="badge badge-info qno">
                            Question { props.pager.index + 1} of{" "}
                            { props.pager.count}.
                        </div>
                        <h3 className="question">
                            { props.pager.index + 1}. <span>{q.name}</span>
                        </h3>
                        <div className="row">
                            {q.options.map((option) => (
                                <div key={option.id} className="options">
                                    <div className="option">
                                        <label
                                            className="font-weight-normal"
                                            htmlFor={option.id}>
                                            <input
                                                className="quest"
                                                id={option.id}
                                                checked={option.selected}
                                                type="radio"
                                                name={option.questionId}
                                                onChange={() =>
                                                     onAnswer(q, option)
                                                }
                                            />
                                            {option.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <hr />
               
                    <Stack spacing={2} direction="column" sx={{ mt: 2, mb: 1}}>
                   
                    {( props.quiz.config.allowBack &&   props.pager.index+1 !== 1) && (
                        
                        <Button id='prev'
                         color='info'
                         variant="contained"
                         startIcon={<Iconify icon={'material-symbols:arrow-back-rounded'} />}
                          onClick={props.move}>
                             Prev
                              </Button>
                        
                    )}
                    {  props.pager.index +1 !==  props.pager.count &&
                    <Button id='next' 
                    color='primary'
                     variant="contained"
                     endIcon={<Iconify icon={'material-symbols:arrow-forward'} />}
                      onClick={props.move}>
                         Next 
                         </Button>
                   
                     }
                     {  props.pager.index +1 ===  props.pager.count &&
                         <div className="col text-center">
                         <hr />
                       
                        <Button id='submit' 
                        variant="contained" 
                        endIcon={<Iconify icon={'material-symbols:arrow-circle-right-rounded'} />}
                        onClick={setMode}> 
                        Submit 
                        </Button>
                        
                     </div>
                     }
                   
                    </Stack>
              
            </div>
        );
    }

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
