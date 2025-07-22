import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

const nameInput = document.getElementById("nameInput");

export async function findTeam() {
  hideAll();
  const name = nameInput.value.trim();
  if (!name) return alert("이름을 입력해주세요.");

  const el = document.getElementById("teamInfo");
  el.style.display = "block";

  try {
    // 1. 입력한 이름으로 참가자 검색
    const q1 = query(collection(db, "participants"), where("name", "==", name));
    const snap1 = await getDocs(q1);

    if (snap1.empty) {
      el.innerHTML = `<p>😢 '${name}' 님을 찾을 수 없습니다.</p>`;
      return;
    }

    const userData = snap1.docs[0].data();
    const teamNumber = userData.team;

    // 2. 해당 조의 모든 조원 검색
    const q2 = query(collection(db, "participants"), where("team", "==", teamNumber));
    const snap2 = await getDocs(q2);

    const teammates = snap2.docs
      .map(doc => doc.data())
      .sort((a, b) => a.member === "팀장" ? -1 : 1); // 팀장 먼저

    // 3. 결과 출력
    el.innerHTML = `
      <h3>✅ 조 정보</h3>
      <p><strong>${userData.name}</strong> 님은 <strong>${teamNumber}조</strong>입니다.</p>
      <h4>👥 ${teamNumber}조 구성원 (${teammates.length}명)</h4>
      <ul>
        ${teammates.map(p => `
          <li>${p.name} <span style="color:gray;">(${p.member})</span></li>
        `).join("")}
      </ul>
    `;
    el.scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    console.error("조 찾기 오류:", error);
    el.innerHTML = `<p>❗ 오류가 발생했습니다.</p>`;
  }
}
