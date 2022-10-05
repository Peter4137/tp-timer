import './App.css';
import * as React from 'react';
import { Modal, Box, Stack, Divider } from '@mui/material';
import SplitTable from './components/splitTable';
import Timer from './components/timer';
import { roundToDecimals, displayWithSign} from './helpers/times';

const RACE_DISTANCE_METRES = 4000
const TRACK_LENGTH_METRES = 250
const LAPS = RACE_DISTANCE_METRES / TRACK_LENGTH_METRES
const DIFF_MODAL_ACTIVE_MILLIS = 12000
const MODAL_PREVENT_CLICK_MILLIS = 3000

function App() {
  const [targetLapTimes, setTargetLapTimes] = React.useState(Array(LAPS).fill(15));
  const [totalTime, setTotalTime] = React.useState(0);
  const [timerInterval, setTimerInterval] = React.useState(undefined);
  const [lapTimes, setLapTimes] = React.useState([]);
  const [lapModalOpen, setLapModalOpen] = React.useState(false);
  const [lapModalCloseTimeout, setLapModalCloseTimeout] = React.useState(undefined);
  const [lapDiffs, setLapDiffs] = React.useState([]);
  const [modalOpenedTime, setModalOpenedTime] = React.useState(0);

  function handleTargetLapTimeChange(index, value) {
    let values = [...targetLapTimes];
    values[index] = value;
    setTargetLapTimes(values);
  }

  function startTimer() {
    setTimerInterval(setInterval(() => {
      setTotalTime(totalTime => roundToDecimals(totalTime + 0.1, 1));
    }, 100));
  }

  function stopTimer() {
    clearInterval(timerInterval);
    setTimerInterval(undefined);
  }

  function lapTimer() {
    const lapTime = lapTimes.length === 0 
      ? totalTime
      : totalTime - lapTimes.reduce((a,b) => a + b, 0);
    const lapDiff = lapTime - targetLapTimes[lapTimes.length];
    setLapTimes(lapTimes => lapTimes.concat(roundToDecimals(lapTime, 1)));
    setLapDiffs(lapDiffs => lapDiffs.concat(roundToDecimals(lapDiff, 1)));
    openLapModal();
  }

  function resetTimer() {
    setTotalTime(0);
    setLapTimes([]);
    setLapDiffs([]);
  }

  function openLapModal() {
    setLapModalOpen(true);
    setModalOpenedTime(Date.now())
    setLapModalCloseTimeout(setTimeout(() => setLapModalOpen(false), DIFF_MODAL_ACTIVE_MILLIS));
  }

  function getModalColours(lapDiff) {
    const primaryColour = lapDiff <= 0 ? "green" : "red";
    if (Math.abs(lapDiff) > 0.5) {
      return {
        "background-color": "black",
        "color": primaryColour,
      };
    } else {
      return {
        "background-color": primaryColour,
        "color": "black",
      }
    }
  }

  function handleModalClick() {
    if (Date.now() - modalOpenedTime > MODAL_PREVENT_CLICK_MILLIS) {
      clearTimeout(lapModalCloseTimeout);
      setLapModalOpen(false);
    }
  }

  return (
    <header className="App">
      <Stack direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2} className="page-stack">
        <SplitTable
            {...{
              targetLapTimes,
              lapTimes,
              lapDiffs,
              handleTargetLapTimeChange
          }}
        />
        <Timer
          {...{
            timerInterval,
            startTimer,
            stopTimer,
            resetTimer,
            lapTimer,
            totalTime
          }}
        />
      </Stack>
      <Modal open={lapModalOpen} onClose={() => setLapModalOpen(false)}>
        <Box className="lap-modal-container" sx={getModalColours(lapDiffs[lapDiffs.length - 1])}
          onClick={handleModalClick}>
            <div className="lap-modal-text">{displayWithSign(roundToDecimals(lapDiffs[lapDiffs.length - 1], 1))}</div>
        </Box>
      </Modal>
    </header>
  );
}

export default App;
