const parseOptionListFromText = (questionText) => {
  /*
  raw한 문제 OCR text 로부터 선택지와 문두 추출 & 문제 넘버링 제거
  **문제는 객관식이며, 최소 5개의 선지**로 "... (1) ~~ (2) ~~ ... (5) ~~" 형태라고 가정
  6번 선지 이후는 5번 선지에 통합됨
  **questionText가 가정에 맞지 않을 경우, isValid=false 로 이후 filter out**
  */

  const optionPos = [];
  for (let optionNum = 1; optionNum < 6; optionNum += 1) {
    optionPos.push(questionText.lastIndexOf(`(${optionNum})`));
  }
  const optionPosSorted = [...optionPos].sort((a, b) => a - b);

  const isValid =
    optionPos.length > 0 &&
    optionPos.every((pos) => pos > 0) &&
    JSON.stringify(optionPos) === JSON.stringify(optionPosSorted);

  if (isValid) {
    const optionList = optionPos.map((pos, idx, arr) => {
      return questionText.slice(pos + 3, arr[idx + 1]).trim();
    });

    let questionTextFiltered = questionText.slice(0, optionPos[0]).trim();

    /* text가 번호로 시작할 경우, 불필요한 넘버링이므로 제거 */
    const firstWord = questionTextFiltered.split(/\s+/)[0];
    if (!Number.isNaN(firstWord - parseFloat(firstWord))) {
      questionTextFiltered = questionTextFiltered.slice(firstWord.length);
    }

    return { isValid, questionTextFiltered, optionList };
  }
  return { isValid: false };
};

const aggregateProblemAndFigure = (problemData, figureUrl) => {
  /*
  DB에서 그대로 가져온 problemData를 figureUrl과 병합해
  내부에서 사용하는 problem object로 반환
  isValid : 선택지 추출이 정상적인지 (이후 filter out 하기 위해)
  */
  const { uid, text: questionText, answer = 1 } = problemData;

  const {
    isValid,
    questionTextFiltered = "",
    optionList = [],
  } = parseOptionListFromText(questionText);

  return {
    uid,
    imgSrc: figureUrl,
    questionText: questionTextFiltered,
    optionList,
    answer,
    isValid,
  };
};

export default aggregateProblemAndFigure;
