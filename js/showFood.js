import { hideAll } from './utils.js';

export function showFood() {
  hideAll();
  const el = document.getElementById("foodInfo");

  const foodData = {
    day1: {
      date: "7월 31일 (목)",
      breakfast: [
        "백미밥", "콩나물국", "궁중너비아니", "호박참치볶음",
        "비엔나어묵볼조림", "우엉조림", "김치", "야쿠르트",
        "콘샐러드", "모닝베이커리", "딸기잼포션"
      ],
      lunch: [
        "백미밥", "닭정육야채볶음", "튀김만두", "알미트볼조림",
        "새송이버섯볶음", "오이부추무침", "김치", "멸치볶음", "미역냉국"
      ],
      dinner: [
        "백미밥", "소불고기덮밥", "용가리치킨", "도라지미역무침",
        "김치", "신선야채사라다", "두부구이", "오이냉국", "계절과일"
      ]
    },
    day2: {
      date: "8월 1일 (금)",
      breakfast: [
        "백미밥", "생선까스(타르타르소스)", "오이피클", "신선야채사라다",
        "조미김", "배추김치", "드링크야쿠르트", "단배추된장국",
        "계절과일", "모닝베이커리", "버터포션"
      ],
      lunch: [
        "삼계탕", "녹두찹쌀죽", "깍두기", "풋고추, 쌈장", 
        "양파지", "바나나"
      ],
      dinner: [
        "백미밥", "제육볶음", "양배추쌈", "멸치볶음", 
        "오이무침", "배추김치", "낙지젓갈", "숙주무침", 
        "건새우마늘쫑볶음", "계절과일"
      ]
    },
    day3: {
      date: "8월 2일 (토)",
      breakfast: [
        "백미밥", "생선까스(타르타르소스)", "오이피클", "신선야채사라다",
        "조미김", "배추김치", "드링크야쿠르트", "단배추된장국",
        "계절과일", "모닝베이커리", "버터포션"
      ],
      lunch: [
        "비빔밥 (고사리, 취나물, 콩나물, 당근나물, 호박나물, 도라지)",
        "미역부각", "소고기볶음 고추장", "계란지단", 
        "김치", "겉절이", "계절과일", "미역냉국"
      ],
      dinner: [
        "백미밥", "제육볶음", "양배추쌈", "멸치볶음",
        "오이무침", "배추김치", "낙지젓갈", "숙주무침",
        "건새우마늘쫑볶음", "계절과일"
      ]
    }
  };

  el.innerHTML = `
    <h3 class="schedule-title">🍽 수련회 식단표</h3>
    <div class="schedule-buttons">
      <button class="day-btn" data-day="day1">7월 31일 (목)</button>
      <button class="day-btn" data-day="day2">8월 1일 (금)</button>
      <button class="day-btn" data-day="day3">8월 2일 (토)</button>
    </div>
    <div id="foodCardContainer"></div>
  `;

  const container = document.getElementById("foodCardContainer");

  document.querySelectorAll(".day-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const day = btn.dataset.day;
      const meals = foodData[day];

      container.innerHTML = `
        <div class="schedule-card">
          <h4>${meals.date}</h4>
          <table class="food-table">
            <thead><tr><th>식사</th><th>메뉴</th></tr></thead>
            <tbody>
              <tr class="breakfast"><td><strong>아침</strong></td><td>${meals.breakfast.join('<br>')}</td></tr>
              <tr class="lunch"><td><strong>점심</strong></td><td>${meals.lunch.join('<br>')}</td></tr>
              <tr class="dinner"><td><strong>저녁</strong></td><td>${meals.dinner.join('<br>')}</td></tr>
            </tbody>
          </table>
        </div>
      `;

      container.scrollIntoView({ behavior: "smooth" });
    });
  });

  el.style.display = "block";
  el.scrollIntoView({ behavior: "smooth" });
}
