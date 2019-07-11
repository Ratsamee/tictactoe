const winnerWays = [[0, 1, 2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
const USER = 'mark_by_user';
const AI = 'mark_by_ai';

const checkWay = function(positonList, way){
    let found = true;
    for (let i = 0; i < way.length; i++) {
        const element = way[i];
        if (!positonList.includes(element)){
            found = false;
            break;
        }
    }
    return found;
}
const checkWinner = function(positionList, winnerName){
    if (positionList.length > 2){
        for (let i = 0; i < winnerWays.length; i++) {
            const way = winnerWays[i];
            if (checkWay(positionList, way)){
                tictactoe.winner.way = way.join(",");
                tictactoe.winner.name = winnerName;
                break;
            }
        }
    }
}

const findPossibilitiesWaysToWin = function(positionList, otherPositionList) {
    const winnerWaysRemoveUserSelected = [];
    winnerWays.forEach(element =>{
        winnerWaysRemoveUserSelected.push(element.slice(0));
    });
    positionList.forEach(selectedWay => {
        winnerWaysRemoveUserSelected.forEach(way => {
            let indexOfWinner = way.indexOf(selectedWay);
            if (indexOfWinner > -1){
                // delete exist position
                way.splice(indexOfWinner, 1);
            }
        });
    });

    const possibilitiesToWin = winnerWaysRemoveUserSelected.filter(element =>{
        return element.length === 1 && !otherPositionList.includes(element[0]);
    });

    // return array of winner ways
    return possibilitiesToWin;
}

const randomPositionId = function(){
    const totalPosition = tictactoe.userWays.concat(tictactoe.aiWays);
    let positionId = 0;
    if ((totalPosition.length === 1) && (totalPosition[0] !== 4)){
        // select the center if user did not chose
        positionId = 4;
    } else {
        // check AI possibililty way to win, give array
        let possibilities = findPossibilitiesWaysToWin(tictactoe.aiWays, tictactoe.userWays);
        if (possibilities.length > 0){
            positionId = possibilities[0][0];
        }
    }

    if (positionId === 0){
        // check User possibililty way to win, give array
        let possibilities = findPossibilitiesWaysToWin(tictactoe.userWays, tictactoe.aiWays);
        if (possibilities.length > 0){
            positionId = possibilities[0][0];
        }
    }

    if (positionId === 0){
        // position doesn't assign, once random position id
        while(totalPosition.includes(positionId)){
            positionId = Math.floor((Math.random() * 8))
        }
    }
    
    return positionId;
}

const tictactoe = {
    userWays: [],
    aiWays: [],
    totalCount: 0,
    winner: {
        name: "",
        way: ""
    },
    mark: function(positionId, markBy){
        if (markBy){
            if (markBy === USER){
                this.userWays.push(positionId);
                checkWinner(this.userWays, USER);
                return true;
            }else{
                this.aiWays.push(positionId);
                checkWinner(this.aiWays, AI);
                return true;
            }
        }else{
            if (this.userWays.includes(positionId) || this.aiWays.includes(positionId)){
                // positionId has already marked
                return false;
            }
            this.userWays.push(positionId);
            checkWinner(this.userWays, USER);
            return true;
        }
        
    },
    markByAI: function(){
        const positionId = randomPositionId();
        this.aiWays.push(positionId);
        checkWinner(this.aiWays, AI);
        return positionId;
    }
}