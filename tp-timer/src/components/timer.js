import { Stack, Button, Box } from '@mui/material';
import { formatTimeForDisplay } from '../helpers/times';

function Timer(props) {
    const {
        timerInterval, 
        startTimer, 
        stopTimer, 
        resetTimer, 
        lapTimer, 
        totalTime
    } = props

    return (
      <Box className="timer-container">
        <Stack alignItems="center" justifyContent="center" className="timer-stack">
          <Stack className="timer-button-row" direction="row" justifyContent="center" spacing={2}>
            {timerInterval !== undefined
              ? <Button className="timer-button" size="large" variant="contained" onClick={stopTimer}>Stop Timer</Button>
              : <Button className="timer-button" size="large" variant="contained" onClick={() => startTimer()}>Start Timer</Button>
            }
          </Stack>
          <Box className="timer-time-container">
            <div className="timer-time">{formatTimeForDisplay(totalTime)}</div>
          </Box>
          <Stack className="timer-button-row" direction="row" justifyContent="center" spacing={2}>
            {timerInterval !== undefined 
            ? <Button className="timer-button" size="large" variant="contained" color="secondary" onClick={lapTimer}>Lap</Button>
            : <Button className="timer-button" size="large" variant="contained" color="warning" onClick={resetTimer}>Reset</Button>
            }
          </Stack>  
        </Stack>
      </Box>
    )
}

export default Timer