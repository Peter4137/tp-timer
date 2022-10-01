import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { displayWithSign } from '../helpers/times';

function SplitTable(props) {
    const { targetLapTimes, lapTimes, lapDiffs, handleTargetLapTimeChange } = props;

    return (
    <Container className="table-container">
        <Table padding="none" size="small" stickyHeader
            align="left" className="table-container">
            <TableHead>
            <TableRow padding="normal" className="table-row">
                <TableCell align="left"><b>Lap Number</b></TableCell>
                <TableCell align="left"><b>Target Lap Time /s</b></TableCell>
                <TableCell align="left"><b>Lap Time /s</b></TableCell>
                <TableCell align="left"><b>Diff /s</b></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {targetLapTimes.map((targetLapTime, i) => {
                return (
                <TableRow key={i} className="table-row">
                    <TableCell className="table-cell">{i + 1}</TableCell>
                    <TableCell className="table-cell">
                        <TextField className="table-input"
                            size="small"
                            variant="outlined"
                            value={targetLapTime}
                            onChange={(e) => handleTargetLapTimeChange(i, e.target.value)}>
                        </TextField>
                    </TableCell>
                    <TableCell className="table-cell" align="left">{lapTimes[i]}</TableCell>
                    <TableCell className="table-cell" align="left" sx={{
                        color: lapDiffs[i] >= 0 ? 'red' : 'green'
                    }}>{displayWithSign(lapDiffs[i])}</TableCell>
                </TableRow>
                )
            })}
            </TableBody>
        </Table>
    </Container>
    )
}

export default SplitTable