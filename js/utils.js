export const resultSections = [
  "teamInfo", "roomInfo", "allTeams", "allRooms",
  "emergencyInfo", "scheduleInfo", "foodInfo", "resolutionInfo",
  "fastingInfo", "allFastingInfo"
];

export function hideAll() {
  resultSections.forEach(id => {
    const el = document.getElementById(id);
    el.style.display = "none";
    el.innerHTML = "";
  });
}
