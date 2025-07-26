import { db } from '../firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ CSV 파싱 라이브러리 필요 (HTML에서 `<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js"></script>` 포함되어야 함)
console.log("📥 importCSV 함수 실행됨");

window.importCSV = async function () {
  const input = document.getElementById("csvInput");
  const file = input.files[0];
  const resultEl = document.getElementById("importResult");

  if (!file) {
    resultEl.innerText = "⚠️ CSV 파일을 먼저 선택해주세요.";
    return;
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async function (results) {
      let success = 0;
      let failed = 0;
        console.log("📑 CSV 파싱 시작", results.data);

      for (const row of results.data) {
        try {
          // ✅ CSV 열 이름에 맞게 필드 매핑 (열 이름은 정확히 일치해야 함)
          const data = {
            name: row["이름"]?.trim(),
            team: row["조번호"]?.trim(),
            member: row["팀장팀원"]?.trim(),
            church: row["지교회"]?.trim(),
            position: row["직분"]?.trim(),
            room: row["숙소위치"]?.trim(),
            fasting: row["금식기도"]?.trim() 
          };

          // 유효성 검사 (이름, 조번호는 필수)
          if (!data.name || !data.team) {
            throw new Error("필수값 누락");
          }

          // Firestore에 추가
          await addDoc(collection(db, "participants"), data);
          success++;
        } catch (err) {
          console.error("❌ 업로드 실패:", err, row);
          failed++;
        }
      }

      resultEl.innerHTML = `
        <p>✅ 등록 완료: ${success}명</p>
        <p>❌ 실패: ${failed}명 (콘솔 확인)</p>
      `;
    }
  });
};
