import { db } from '../firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { hideAll } from './utils.js';

export async function showAllTeams() {
  hideAll();
  const snap = await getDocs(collection(db, "participants"));
  const teamMap = new Map();

  snap.forEach(doc => {
    let { team, name, member } = doc.data();

    team = team?.toString().trim();
    name = name?.trim();
    member = member?.trim();

    if (!team || team === "-" || team.includes("-") || !name || !member) return;
    if (!team || !name || !member) return; // 누락 방지
    if (!teamMap.has(team)) teamMap.set(team, []);
    teamMap.get(team).push({ name, member });
  });

  const el = document.getElementById("allTeams");
  el.style.display = "block";

const sorted = [...teamMap.entries()].sort(([aTeam], [bTeam]) => {
  const getNum = str => {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : Infinity;
  };
  return getNum(aTeam) - getNum(bTeam);
});

  const rows = sorted.map(([team, people]) => {
    const leader = people.find(p => p.member === "팀장");
    const members = people
      .filter(p => p.member !== "팀장")
      .map(p => p.name)
      .sort((a, b) => a.localeCompare(b))
      .join(", ");

    return `
      <tr>
        <td><strong>${team}</strong></td>
        <td>${leader ? leader.name : "<span style='color:red;'>없음</span>"}</td>
        <td>${members}</td>
      </tr>
    `;
  }).join("");

  el.innerHTML = `
    <h2>👥 전체 조 명단</h2>
    <table class="result-table">
      <thead>
        <tr>
          <th>조 번호</th>
          <th>조장</th>
          <th>조원</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  el.scrollIntoView({ behavior: "smooth" });
}
