
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
        objTictactoe.winner.way.split(",").forEach(way => {
            $(`#${way}`).css({"background-color":"indianred", "color":"whitesmoke"}).hover(function(){
                $(this).css('background-color', 'indianred');
            }, function(){
                $(this).css('background-color', 'indianred');
            });
        });
    }else if(objTictactoe.totalCount === 9){
        // no one win
        result = "Draw!!!!";
    }
    if (result){
        $resultShow.text(result).show(400);
        $btnExit.show(400);
    }
};

$('document').ready(function(){
    $resultShow = $('.show-result');
    $box = $(".box");
    $btnExit = $("#btnExit");
    $btnPlay1 = $('#btnPlay1');
    $btnPlay2 = $('#btnPlay2');

    $resultShow.text("").hide(300);
    $btnExit.hide(300);

    const afterDisabledPlayerButton = function(){
        $box.css('background-color', 'rgba(177, 239, 241, 0.7)');
        $box.hover(function(){
            $(this).css('background-color', 'lightgray');
        }, function(){
            $(this).css('background-color', 'rgba(177, 239, 241, 0.7)');
        });
    }
    $btnPlay1.on('click', function(){
        if (countPlayer !== 0){
            e.preventDefault();
        }
        countPlayer = 1;
        $btnPlay2.prop("disabled", true);
        $box.on('click', boxOnClick);
        afterDisabledPlayerButton();
    });

    $btnPlay2.on('click', function(){
        if (countPlayer !== 0){
            e.preventDefault();
        }
        countPlayer = 2;
        $btnPlay1.prop("disabled", true);
        $box.on('click', boxOnClick);
        afterDisabledPlayerButton();
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
            // count click number
            objTictactoe.totalCount += 1;
        }
        showResult();
    }

    const boxOnClick = function(){
        let $this =$(this);
        $this.off('click');
        if (countPlayer===1 || countPlayer === 0){
            play1($this);
        }else if (countPlayer===2){
            play2($this);
        }
    }

    $btnExit.on('click', function(){
        window.location.reload();
    });

    $box.css('background-color', 'gray');
});
