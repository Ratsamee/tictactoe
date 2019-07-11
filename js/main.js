
let objTictactoe = tictactoe;
let $resultShow;
let $box;
let $btnReplay;

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
        $btnReplay.show();
    }
};

$('document').ready(function(){
    $resultShow = $('.show-result');
    $box = $(".box");
    $btnReplay = $("#btnReplay");

    $resultShow.hide();
    $btnReplay.hide();

    $box.on('click', function(){
        if (objTictactoe.mark(+this.id)){
            // user play
            $(this).text("X");
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
    });

    $btnReplay.on('click', function(){
        window.location.reload();
    });
    
})
