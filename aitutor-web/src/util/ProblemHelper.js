const removeNumbering = (text) => {
  /* text가 번호로 시작할 경우, 불필요한 넘버링이므로 제거 */
  const firstWord = text.split(/\s+/)[0];
  const numberingRemoved = !Number.isNaN(firstWord - parseFloat(firstWord))
    ? text.slice(firstWord.length)
    : text;

  return numberingRemoved;
};

const parseTabularForKatex = (text) => {
  /*
  데이터에서 OCR된 텍스트는 LaTeX 포맷으로, KaTeX와 충돌 발생
  text에 표(tabular)를 포함할 경우, array로 변환하여 KaTeX가 인식하도록 전처리
  */

  /* "\begin{tabular} ~~ \end{tabular}" 형태 검색, 안쪽의 내용 (~~) 추출해 저장 */
  const pattern = /\\begin\{tabular\}([\s\S]+)\\end\{tabular\}/;
  const tabularSearched = pattern.exec(text);

  if (tabularSearched) {
    /* tabular 내부에서 inline 표현 "$~~$" 사용 시 오류 발생하므로, 제거 */
    const tabularContentForKatex = tabularSearched[1].replaceAll("$", "");
    const tabularForKatex = `
    $$
    \\begin{array}
    ${tabularContentForKatex}
    \\end{array}
    $$
    `;
    return text.replace(pattern, tabularForKatex);
  }

  return text;
};

const parseQuestionText = (questionText) => {
  const numberingRemoved = removeNumbering(questionText);

  const tabularParsed = parseTabularForKatex(numberingRemoved);

  return tabularParsed;
};

const extractOptionListFromText = (questionText) => {
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

    const realQuestionText = questionText.slice(0, optionPos[0]).trim();

    return { isValid, questionTextFiltered: parseQuestionText(realQuestionText), optionList };
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
  } = extractOptionListFromText(questionText);

  return {
    uid,
    imgSrc: figureUrl,
    questionText: questionTextFiltered,
    optionList,
    answer,
    isValid,
  };
};

export { aggregateProblemAndFigure, extractOptionListFromText };
