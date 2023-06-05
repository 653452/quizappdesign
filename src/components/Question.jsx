import { useEffect, useState } from "react";

function Question(props) {
  const { question, options, correctAnswer, onSelect } = props;

  const [select, setSelect] = useState(null);
  const [isDisableSelect, setIsDisableSelect] = useState(false);
  const [isDisableConfirm, setIsDisableConfirm] = useState(true);
  const [correct, setCorrect] = useState(null);

  const color = (option) => {
    let result = "w-40 py-2 border rounded-full";
    if (correct === option) {
      return `${result} bg-green-900`;
    } else if (select === option) {
      return `${result} bg-red-700`;
    }
    return result;
  };

  useEffect(() => {
    setIsDisableSelect(false);
  }, [question, options]);

  const handleSelect = (option) => {
    setSelect(option);
    setIsDisableConfirm(false);
  };

  const handleConfirm = () => {
    if (select) {
      setIsDisableSelect(true);
      setIsDisableConfirm(true);
      setCorrect(correctAnswer);
      onSelect(select);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold my-5">{question}</h2>
      <div className="flex flex-col justify-center items-center gap-3">
        {options.map((option, index) => (
          <button
            className={color(option)}
            disabled={isDisableSelect}
            key={index}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="w-40 py-2 bg-cyan-700 text-white px-3 py-1 rounded-full my-3 text-xs mt-10" style={{backgroundColor:' #d250db'}}
        disabled={isDisableConfirm}
        onClick={handleConfirm}
      >
        Xác nhận
      </button>
    </div>
  );
}

export default Question;
