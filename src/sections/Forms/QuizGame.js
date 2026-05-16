// import React, { Component } from "react";
// // import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../../App.css";
// import Quiz from "../../components/Quiz";
// import { connect } from "react-redux";
// import { ActionTypes } from "../../components/actionTypes";
// import config from "../../partnerconfig.json";

// const mapStateToProps = (state) => {
//   return { ...state.quiz };
// };

// const mapDispatchToProps = (dispatch) => ({
//   onQuizLoad: (payload) => dispatch({ type: ActionTypes.QuizLoad, payload }),
//   onPagerUpdate: (payload) =>
//     dispatch({ type: ActionTypes.PagerUpdate, payload }),
// });

// class App extends Component {
//   url = config.jrmClientUrl;
//   date = localStorage.getItem("date");
//   category = localStorage.getItem("category");
//   qno = localStorage.getItem("qdate");
//   month = new Date(this.qno).getMonth() + 1;
//   day = new Date(this.qno).getDate();

//   state = {
//     quizes: [
//       { id: "data/javascript.json", name: "Bible Quiz" },
//       // { id: "data/aspnet.json", name: "Asp.Net" },
//       // { id: "data/csharp.json", name: "C Sharp" },
//       // { id: "data/designPatterns.json", name: "Design Patterns" },
//     ],
//     // quizId: `${config.jrmClientUrl}jrms/v1/kidsmas/questions/2022/12/${localStorage.getItem("qdate")}/${localStorage.getItem("category")}`,
//     // quizId: `${config.jrmClientUrl}jrms/v1/kidsmas/questions/2024/${ths.month}/${this.day}/${this.category}`, //need to set the category as same for all this time
//     quizId: `${config.jrmClientUrl}jrms/v1/kidsmas/questions/2025/${this.month}/${this.day}/senior`, //need to set the category as same for all this time
//   };

//   pager = {
//     index: 0,
//     size: 1,
//     count: 1,
//   };

//   componentDidMount() {
//     this.load(this.state.quizId);
//   }

//   load(quizId) {
//     let urlfetch = quizId || this.props.quizId;
//     console.log(quizId);

//     fetch(`${urlfetch}`)
//       .then((res) => res.json())
//       .then((res) => {
//         const quiz = res;
//         console.log(res);
//         console.log(quiz);
//         this.start = res.questions.length;

//         quiz.questions.forEach((q) => {
//           q.options.forEach((o) => (o.selected = false));
//         });
//         quiz.config = Object.assign(this.props.quiz.config || {}, quiz.config);
//         console.log("config-quiz", this.props.quiz.config);
//         this.pager.count = quiz.questions.length / this.pager.size;
//         this.props.onQuizLoad(quiz);
//         this.props.onPagerUpdate(this.pager);
//       });
//   }

//   // onChange = (e) => {
//   //     this.setState({ quizId: e.target.value });
//   //     this.load(e.target.value);
//   // };

//   render() {
//     return (
//       <div className="container">
//         {this.start === 0 ? (
//           <>
//             <div className="question-count">
//               <span>
//                 {" "}
//                 Quiz is not yet started.
//                 <br /> Quiz will start after the program ends
//               </span>
//             </div>
//           </>
//         ) : (
//           <Quiz
//             quiz={this.state.quiz}
//             quizId={this.state.quizId}
//             mode={this.state.mode}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Quiz from "../../components/Quiz";
import { connect } from "react-redux";
import { ActionTypes } from "../../components/actionTypes";
import config from "../../partnerconfig.json";

const mapStateToProps = (state) => {
  return { ...state.quiz };
};

const mapDispatchToProps = (dispatch) => ({
  onQuizLoad: (payload) => dispatch({ type: ActionTypes.QuizLoad, payload }),
  onPagerUpdate: (payload) =>
    dispatch({ type: ActionTypes.PagerUpdate, payload }),
});

class App extends Component {
  url = config.jrmClientUrl;
  date = localStorage.getItem("date");
  category = localStorage.getItem("category");
  qno = localStorage.getItem("qdate");
  month = new Date(this.qno).getMonth() + 1;
  // cateh
  day = new Date(this.qno).getDate();

  state = {
    quizes: [
      { id: "data/javascript.json", name: "Bible Quiz" },
      // { id: "data/aspnet.json", name: "Asp.Net" },
      // { id: "data/csharp.json", name: "C Sharp" },
      // { id: "data/designPatterns.json", name: "Design Patterns" },
    ],
    // quizId: `${config.jrmClientUrl}jrms/v1/kidsmas/questions/2022/12/${localStorage.getItem("qdate")}/${localStorage.getItem("category")}`,
    // quizId: `${config.jrmClientUrl}jrms/v1/kidsmas/questions/2024/${ths.month}/${this.day}/${this.category}`, //need to set the category as same for all this time
    quizId: `${config.jrmClientUrl}jrms/v1/kidsmas/questions/2026/${this.month}/${this.day}/${this.category}`, //need to set the category as same for all this time
  };

  pager = {
    index: 0,
    size: 1,
    count: 1,
  };

  componentDidMount() {
    this.load(this.state.quizId);
  }

  load(quizId) {
    let urlfetch = quizId || this.props.quizId;
    console.log(quizId);

    fetch(`${urlfetch}`)
      .then((res) => res.json())
      .then((res) => {
        const quiz = res;
        console.log(res);
        console.log(quiz);
        this.start = res.questions.length;

        quiz.questions.forEach((q) => {
          q.options.forEach((o) => (o.selected = false));
        });
        quiz.config = Object.assign(this.props.quiz.config || {}, quiz.config);
        console.log("config-quiz", this.props.quiz.config);
        this.pager.count = quiz.questions.length / this.pager.size;
        this.props.onQuizLoad(quiz);
        this.props.onPagerUpdate(this.pager);
      });
  }

  // onChange = (e) => {
  //     this.setState({ quizId: e.target.value });
  //     this.load(e.target.value);
  // };

  render() {
    return (
      <div className="container">
        {this.start === 0 ? (
          <>
            <div className="question-count">
              <span>
                {" "}
                Quiz is not yet started.
                <br /> Quiz will start after the program ends
              </span>
            </div>
          </>
        ) : (
          <Quiz
            quiz={this.state.quiz}
            quizId={this.state.quizId}
            mode={this.state.mode}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

