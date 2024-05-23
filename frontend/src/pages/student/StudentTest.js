import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { IconButton, Paper } from "@mui/material";
import TableTemplate from "../../components/TableTemplate";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import DeleteIcon from "@mui/icons-material/Delete";
import { BlueButton } from "../../components/buttonStyles";

export default function StudentTest() {
  const { subjectsList, loading, error, response } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  const [begin, setBegin] = useState("begin");
  const [test, setTest] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // Thời gian làm bài kiểm tra (15 phút)
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const [subjects, setSubject] = useState([]);

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  const loadSubject = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Student/${currentUser._id}`
    );
    setSubject(result.data.subject);
  };

  useEffect(() => {
    loadSubject();
  }, []);

  // Danh sách các đáp án học viên chọn
  const handleAnswerChange = (answer, questionIndex) => {
    const listSelectedAnswer = selectedAnswer.map((question, index) => {
      if (index === questionIndex) {
        return answer;
      } else {
        return question;
      }
    });
    console.log(listSelectedAnswer);
    setSelectedAnswer(listSelectedAnswer);
  };

  //   const SubjectsButtonHaver = ({ row }) => {
  //     return (
  //       <>
  //         <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
  //           <DeleteIcon color="error" />
  //         </IconButton>
  //         <BlueButton
  //           variant="contained"
  //           onClick={() =>
  //             navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)
  //           }
  //         >
  //           Xem
  //         </BlueButton>
  //       </>
  //     );
  //   };

  const handleBegin = async (subject) => {
    loadTest(subject);
    setBegin("start");
    startTimer();
  };

  const handleSubmit = async () => {
    clearInterval(timerRef.current); // Dừng đếm ngược khi nộp bài
    let mark = 0;
    setBegin("submit");
    for (let i = 0; i < selectedAnswer.length; i++) {
      if (selectedAnswer[i] === test[i].options[test[i].option_correct]) {
        mark++;
      }
    }
    console.log(mark);
    setScore(mark);
  };

  const loadTest = async (subject) => {
    console.log(`${process.env.REACT_APP_BASE_URL}/testCreate`);
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/testCreate/${subject}`
    );
    console.log(result);
    setTest(result.data.questions);
    setSelectedAnswer(result.data.questions.map(() => null)); // Initialize selectedAnswer array
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(); // Tự động nộp bài khi hết thời gian
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  const subjectColumns = [
    { id: "subName", label: "Tên môn học", minWidth: 170 },
  ];

  const subjectRows = subjects.map((subject) => {
    return {
      subName: subject.subName,
      sessions: subject.sessions,
      sclassName: subject.sclassName.sclassName,
      sclassID: subject.sclassName._id,
      id: subject._id,
    };
  });

  const SubjectsButtonHaver = ({ row }) => {
    console.log(row);
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => {
            handleBegin(row.id);
          }}
        >
          Làm bài kiểm tra
        </BlueButton>
      </>
    );
  };

  return (
    <>
      {begin === "begin" && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {Array.isArray(subjectsList) && (
            <TableTemplate
              buttonHaver={SubjectsButtonHaver}
              columns={subjectColumns}
              rows={subjectRows}
            />
          )}
          {/* <SpeedDialTemplate actions={actions} /> */}
        </Paper>
      )}
      {begin === "start" && (
        <div className="w-[90%] mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-10 text-center">
            Kiểm tra
          </h1>
          <div className="text-right mb-5 text-xl font-semibold text-red-600">
            Thời gian còn lại: {formatTime(timeLeft)}
          </div>
          {test.map((question, questionIndex) => {
            return (
              <div className="mb-10" key={questionIndex}>
                <h3 className="text-xl font-semibold text-gray-700 mb-5">
                  Câu hỏi {questionIndex + 1}: {question.content}
                </h3>
                <div className="space-y-4">
                  {question.options.map((answer, answerIndex) => (
                    <div
                      key={answerIndex}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAnswer[questionIndex] === answer
                          ? "bg-blue-100 border-blue-500 text-blue-700"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => handleAnswerChange(answer, questionIndex)}
                    >
                      <span>{answer}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <button
            className="flex rounded-full bg-orange-500 p-1 py-2 px-8 md:py-2 justify-center font-semibold md:font-bold text-sm md:text-base text-center hover:bg-orange-300 hover:text-orange-500 transition text-white"
            onClick={handleSubmit}
          >
            Nộp bài
          </button>
        </div>
      )}
      {begin === "submit" && (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-10 text-center">
            Kết quả
          </h1>
          <p className="text-xl text-gray-700 text-center">
            Bạn đã đạt được {score}/{test.length} điểm.
          </p>
          <p
            className="flex rounded-full bg-orange-500 p-1 py-2 px-8 md:py-2 justify-center font-semibold md:font-bold text-sm md:text-base text-center hover:bg-orange-300 hover:text-orange-500 transition text-white mt-5 cursor-pointer"
            onClick={() => {
              setBegin("begin");
              setTimeLeft(15 * 60); // Reset thời gian làm bài kiểm tra
              setSelectedAnswer([]); // Reset đáp án đã chọn
            }}
          >
            Làm lại
          </p>
        </div>
      )}
    </>
  );
}
