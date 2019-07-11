
let objTictactoe = tictactoe;
let $resultShow;
let $box;
let $btnExit;
let countPlayer=0;
let $btnPlay1;
let $btnPlay2;

const showResult = function(){
    let result = "";
    if (objTictactoe.winner.way) {
        $box.off('click');
        result = `${objTictactoe.winner.name===USER?"Player X": "Player O"} is winner.`;
    }else if(objTictactoe.totalCount === 9){
        // no one win
        result = "Draw!!!!";
    }
    if (result){
        $resultShow[0].innerText = result;
        $resultShow.show();
        $btnExit.show();
    }
};

$('document').ready(function(){
    $resultShow = $('.show-result');
    $box = $(".box");
    $btnExit = $("#btnExit");
    $btnPlay1 = $('#btnPlay1');
    $btnPlay2 = $('#btnPlay2');

    $resultShow.hide();
    $btnExit.hide();

    $btnPlay1.on('click', function(){
        countPlayer = 1;
        $btnPlay2.prop("disabled", true);
        $box.on('click', boxOnClick);
    });

    $btnPlay2.on('click', function(){
        countPlayer = 2;
        $btnPlay1.prop("disabled", true);
        $box.on('click', boxOnClick);
    })

    const play1 = function($this){
        if (objTictactoe.mark(+$this.attr('id'))){
            // user play
            $this.text("X");
            // count click number
            objTictactoe.totalCount += 1;
        }
        if ((objTictactoe.winner.way === "") && (objTictactoe.totalCount !== 9)){
            // user is not winner
            const positionId = objTictactoe.markByAI();
            if (positionId !== -1){
                // AI play
                $("#"+ positionId).text("O");
                // count click number
                objTictactoe.totalCount += 1;
            }
        }
        showResult();
    }

    const play2 = function($this){
        let markBy = (objTictactoe.totalCount % 2 === 0)?USER: AI;
        if (objTictactoe.mark(+$this.attr('id'), markBy)){
            console.log(+$this.attr('id'));
            console.log('markBy', markBy);
            $this.text((markBy === USER)?"X": "O");
            $this.off('click');
            // count click number
            objTictactoe.totalCount += 1;
        }
        showResult();
    }

    const boxOnClick = function(){
        let $this =$(this);
        if (countPlayer===1 || countPlayer === 0){
            play1($this);
        }else if (countPlayer===2){
            play2($this);
        }
    }

    $btnExit.on('click', function(){
        window.location.reload();
    });
    
});
