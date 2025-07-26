import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

export async function showAllFasting() {
  hideAll();
  const el = document.getElementById("allFastingInfo");
  el.style.display = "block";

  try {
    // Firestore에서 '없음'이 아닌 fasting 필드만 가져오기
    const q = query(collection(db, "participants"), where("fasting", "!=", "없음"));
    const snap = await getDocs(q);

    if (snap.empty) {
      el.innerHTML = `<p>🙏 금식 기도자 명단이 없습니다.</p>`;
      return;
    }

    // 숫자 fasting 값을 실제 시간대 이름으로 매핑
    const fastingLabels = {
      "1": "1일차 점심",
      "2": "1일차 저녁",
      "3": "2일차 아침",
      "4": "2일차 점심",
      "5": "2일차 저녁",
      "6": "3일차 아침",
    };

    // 정렬 순서를 위한 키 배열
    const order = ["1", "2", "3", "4", "5", "6"];

    // 각 fasting 숫자에 해당하는 사람들을 저장할 맵
    const fastingMap = {};

    snap.docs.forEach(doc => {
      const { name, team, fasting } = doc.data();
      const key = fasting?.toString().trim();
      if (!fastingLabels[key]) return; // 유효하지 않은 값은 제외

      if (!fastingMap[key]) fastingMap[key] = [];
      fastingMap[key].push(`${name} (${team}조)`);
    });

    // HTML 렌더링
    const rows = order.map(key => {
      const label = fastingLabels[key];
      const names = fastingMap[key] || [];
      return `
        <tr>
          <td><strong>${label}</strong></td>
          <td>${names.length > 0 ? names.map(n => `<div>${n}</div>`).join("") : "—"}</td>
        </tr>
      `;
    }).join("");

    el.innerHTML = `
      <h2>🙏 전체 금식 기도자 명단</h2>
      <div class="fasting-table-wrapper">
        <table class="fasting-table">
          <thead>
            <tr><th>시간</th><th>금식기도자</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;

    el.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("전체 금식 기도자 조회 오류:", error);
    el.innerHTML = `<p>❗ 금식기도자 정보를 불러오는 중 오류가 발생했습니다.</p>`;
  }
}
