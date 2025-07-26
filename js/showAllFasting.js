import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

export async function showAllFasting() {
  hideAll();
  const el = document.getElementById("allFastingInfo");
  el.style.display = "block";

  try {
    const q = query(collection(db, "participants"), where("fasting", "!=", "없음"));
    const snap = await getDocs(q);

    if (snap.empty) {
      el.innerHTML = `<p>🙏 금식 기도자 명단이 없습니다.</p>`;
      return;
    }

    // 🧠 fasting 정보별로 그룹화
    const fastingMap = {};

    snap.docs.forEach(doc => {
      const { name, team, church, fasting } = doc.data();
      if (!fastingMap[fasting]) fastingMap[fasting] = [];
      fastingMap[fasting].push(`${name} (${church} / ${team}조)`);
    });

    // 시간순 정렬을 위한 고정된 순서
    const order = [
      "1일차 점심", "1일차 저녁",
      "2일차 아침", "2일차 점심", "2일차 저녁",
      "3일차 아침", "3일차 점심"
    ];

    // 💡 HTML 렌더링
    const rows = order.map(slot => {
      const names = fastingMap[slot] || [];
      return `
        <tr>
          <td><strong>${slot}</strong></td>
          <td>${names.length > 0 ? names.map(n => `<div>${n}</div>`).join("") : "—"}</td>
        </tr>
      `;
    }).join("");

    el.innerHTML = `
      <h3>🙏 전체 금식 기도자 명단</h3>
      <div class="fasting-table-wrapper">
        <table class="fasting-table">
          <thead>
            <tr><th>식사 시간</th><th>금식자</th></tr>
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
