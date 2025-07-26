// js/main.js
import { findTeam } from './findTeam.js';
import { findRoom } from './findRoom.js';
import { showAllTeams } from './showAllTeams.js';
import { showAllRooms } from './showAllRooms.js';
import { showSchedule } from './showSchedule.js';
import { showFood } from './showFood.js';
import { showEmergency } from './showEmergency.js';
import { showResolution } from './showResolution.js';
import { showFasting } from './showFasting.js';
import { showAllFasting } from './showAllFasting.js';
import { typingText } from './typingText.js';

export const appHandlers = {
  findTeam,
  findRoom,
  showAllTeams,
  showAllRooms,
  showSchedule,
  showFood,
  showEmergency,
  showResolution,
  showFasting,
  showAllFasting,
  typingText
};

window.appHandlers = appHandlers;



window.addEventListener('DOMContentLoaded', typingText);
