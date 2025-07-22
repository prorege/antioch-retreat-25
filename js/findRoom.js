import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

const nameInput = document.getElementById("nameInput");

export async function findRoom() {
  hideAll();
  const name = nameInput.value.trim();
  if (!name) return alert("이름을 입력해주세요.");

  const el = document.getElementById("roomInfo");
  el.style.display = "block";

  try {
    // 1. 이름으로 참가자 정보 검색
    const q1 = query(collection(db, "participants"), where("name", "==", name));
    const snap1 = await getDocs(q1);

    if (snap1.empty) {
      el.innerHTML = `<p>😢 '${name}' 님을 찾을 수 없습니다.</p>`;
      return;
    }

    const userData = snap1.docs[0].data();
    const room = userData.room;

    // 2. 같은 숙소에 배정된 참가자들 검색
    const q2 = query(collection(db, "participants"), where("room", "==", room));
    const snap2 = await getDocs(q2);

    const roommates = snap2.docs.map(doc => doc.data().name).sort();

    el.innerHTML = `
      <h3>🏠 숙소 정보</h3>
      <p><strong>${userData.name}</strong> 님의 숙소는 <strong>${room}</strong>입니다.</p>
      <h4>🏘 같은 숙소 참가자 (${roommates.length}명)</h4>
      <ul>
        ${roommates.map(n => `<li>${n}</li>`).join("")}
      </ul>
    `;
    el.scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    console.error("숙소 검색 오류:", error);
    el.innerHTML = `<p>❗ 오류가 발생했습니다. 콘솔을 확인해주세요.</p>`;
  }
}
