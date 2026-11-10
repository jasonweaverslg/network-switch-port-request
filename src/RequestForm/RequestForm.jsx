import { useState } from "react";
import QuestionSection from "./QuestionSection";
import { Navigate, useNavigate } from "react-router";

const QUESTIONS = [
  { id: "q1", label: "Question 1", options: ["Num1", "Num2", "Num3"] },
  { id: "q2", label: "Question 2", options: ["Num4", "Num5", "Num6"] },
  { id: "q3", label: "Question 3", options: ["Num7", "Num8", "Num9"] },
];

const initialAnswers = Object.fromEntries(
  QUESTIONS.map((question) => [question.id, ""]),
);

export default function RequestForm() {
  const [answers, setAnswers] = useState(initialAnswers);
  const navigate = useNavigate();

  //Store answers when question answer is changed
  function handleChange(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  // Form submission handling
  function handleSubmit(e) {
    e.preventDefault();

    // Temporary handling
    console.log(answers);
    navigate("/submitted");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {QUESTIONS.map((question) => {
          return (
            <QuestionSection
              key={question.id}
              id={question.id}
              label={question.label}
              options={question.options}
              value={answers[question.id]}
              onChange={(value) => handleChange(question.id, value)}
            />
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
