import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

export async function showFasting() {
  hideAll();  // 🔁 모든 결과 영역 숨기기
  const el = document.getElementById("fastingInfo");
  el.style.display = "block";  // 🔔 금식기도 div 보이게

  const nameInput = document.getElementById("nameInput").value.trim();
  if (!nameInput) {
    el.innerHTML = "<p>⚠️ 이름을 입력해주세요 ⬆</p>";
    el.scrollIntoView({ behavior: "smooth" });  // ⚠ 이름 없을 때도 스크롤 이동
    return;
  }

  try {
    const q = query(
      collection(db, "participants"),
      where("name", "==", nameInput)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      el.innerHTML = `<p>😢 '${nameInput}' 님을 찾을 수 없습니다.</p>`;
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const user = snap.docs[0].data();
    const fasting = user.fasting;
    const order = {
      '1': '1일차 점심',
      '2': '1일차 저녁',
      '3': '2일차 아침',
      '4': '2일차 점심',
      '5': '2일차 저녁',
      '6': '3일차 아침'
    };

    if (!fasting || fasting === "없음") {
      el.innerHTML = `<p><strong>${user.name}</strong> 님은 금식기도에 참여하지 않습니다.</p>`;
    } else {
      const label = order[fasting] || "미지정";
      el.innerHTML = `<p><strong>${user.name}</strong> 님은 금식기도<br> <strong class="emp">${label}(${fasting}조)</strong> 입니다. 🙏</p>`;
    }


    el.scrollIntoView({ behavior: "smooth" });  // ✅ 항상 결과로 이동
  } catch (error) {
    console.error("금식기도 정보 조회 오류:", error);
    el.innerHTML = `<p>❗ 금식기도 정보를 불러오는 중 오류가 발생했습니다.</p>`;
    el.scrollIntoView({ behavior: "smooth" });
  }
}
