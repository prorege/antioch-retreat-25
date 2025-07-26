import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

// HTML 특수문자 이스케이프 함수
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

export async function findRoom() {
  hideAll();
  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value.trim();
  const el = document.getElementById("roomInfo");
  el.style.display = "block";

  if (!name) {
    el.innerHTML = `<p>⚠️ 이름을 입력해주세요.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  try {
    // 이름 일부 포함 검색 (ex. "이찬")
    const q = query(
      collection(db, "participants"),
      where("name", ">=", name),
      where("name", "<=", name + '\uf8ff')
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      el.innerHTML = `<p>😢 '${escapeHTML(name)}' 을(를) 포함하는 참가자를 찾을 수 없습니다.</p>`;
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (snap.size > 1) {
      // 동명이인 선택
      el.innerHTML = `
        <h3>🔎 '${escapeHTML(name)}' 검색 결과 (${snap.size}명)</h3>
        <p>정확한 이름을 선택하세요:</p>
        <ul>
          ${snap.docs.map(doc => {
            const p = doc.data();
            return `<li><button class="select-room-btn" data-name="${escapeHTML(p.name)}">${escapeHTML(p.name)}</button></li>`;
          }).join("")}
        </ul>
      `;

      el.querySelectorAll('.select-room-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          renderRoomInfo(btn.dataset.name, el);
        });
      });

      el.scrollIntoView({ behavior: "smooth" });
    } else {
      const userData = snap.docs[0].data();
      await renderRoomInfo(userData.name, el);
    }

  } catch (err) {
    console.error("숙소 검색 오류:", err);
    el.innerHTML = `<p>❗ 오류가 발생했습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
  }
}

async function renderRoomInfo(selectedName, el) {
  const q = query(collection(db, "participants"), where("name", "==", selectedName));
  const snap = await getDocs(q);

  if (snap.empty) {
    el.innerHTML = `<p>❗ 선택된 이름 '${escapeHTML(selectedName)}'의 참가자가 존재하지 않습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const userData = snap.docs[0].data();
  const room = userData.room;

  if (!room) {
    el.innerHTML = `<p>⚠️ '${escapeHTML(userData.name)}' 님의 숙소 정보가 등록되어 있지 않습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const roommatesSnap = await getDocs(query(collection(db, "participants"), where("room", "==", room)));
  const roommates = roommatesSnap.docs
    .map(doc => doc.data().name)
    .sort((a, b) => a.localeCompare(b, 'ko'));

  el.innerHTML = `
    <h3>🏠 숙소 정보</h3>
    <p><strong>${escapeHTML(userData.name)}</strong> 님의 숙소는 <strong>${escapeHTML(room)}</strong>입니다.</p>
    <h4>🏘 같은 숙소 참가자 (${roommates.length}명)</h4>
    <ul>
      ${roommates.map(n => `<li>${escapeHTML(n)}</li>`).join("")}
    </ul>
  `;
  el.scrollIntoView({ behavior: "smooth" });
}
