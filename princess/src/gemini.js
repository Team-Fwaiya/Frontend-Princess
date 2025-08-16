const API_KEY = 'AIzaSyBgWycf5DkS46QXCOhWBdWbqhF_W7Bh_n0'; 

const API_URL = 'https://generativelace.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Gemini API를 호출하여 프롬프트에 대한 답변을 받아오는 함수
 * @param {string} prompt - Gemini에게 보낼 질문 또는 명령어
 * @returns {Promise<string>} - Gemini가 생성한 텍스트 답변
 */
export const callGeminiApi = async (prompt) => {
  // API 키가 입력되었는지 확인
  if (!API_KEY || API_KEY === 'AIzaSyBgWycf5DkS46QXCOhWBdWbqhF_W7Bh_n0') {
    return "오류: API 키가 설정되지 않았습니다. src/gemini.js 파일을 확인해주세요.";
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || 'API 호출에 실패했습니다.');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("Gemini API 호출 중 에러 발생:", error);
    return `죄송합니다. 답변 생성 중 문제가 발생했습니다: ${error.message}`;
  }
};