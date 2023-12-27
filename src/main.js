/* Web Audio API 用の変数を定義する */
let audioCtx;

/* 変数を定義する */
// すべてのkey要素を取得する
const keys = document.querySelectorAll(".key");
// 自動演奏ボタンの要素を取得する
const autoplayButton = document.getElementById('autoplay');
// 音階表示用の要素を取得する
const display = document.getElementById('display');
// 曲名表示用の要素を取得する
const pl_display = document.getElementById('pl_display');
let timer;
// 自動演奏中かどうかを管理するフラグを定義する
let isAutoplaying = false;

/* 各音階の 表示文字 と 音の周波数値 と 再生時間 を設定する */
const notes = [
    {note: "", hz: 0, duration: 1000},
    {note: "ド", hz: 261.63, duration: 1000},
    {note: "レ", hz: 293.66, duration: 1000},
    {note: "ミ", hz: 329.63, duration: 1000},
    {note: "ファ", hz: 349.23, duration: 1000},
    {note: "ソ", hz: 392.00, duration: 1000},
    {note: "ラ", hz: 440.00, duration: 1000},
    {note: "シ", hz: 493.88, duration: 1000},
    {note: "ド(高音)", hz: 523.25, duration: 1000}
];

/* きらきら星の楽譜を設定する */
const kirakiraboshi_score = [
    {note: "ド", hz: 261.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ド", hz: 261.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ソ", hz: 392.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ソ", hz: 392.00, duration: 500},
    {note: "", hz: 0, duration: 500},

    {note: "ラ", hz: 440.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ラ", hz: 440.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ソ", hz: 392.00, duration: 1000},

    {note: "ファ", hz: 349.23, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ファ", hz: 349.23, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "", hz: 0, duration: 500},

    {note: "レ", hz: 293.66, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ド", hz: 261.63, duration: 1000},

    {note: "ソ", hz: 392.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ソ", hz: 392.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ファ", hz: 349.23, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ファ", hz: 349.23, duration: 500},
    {note: "", hz: 0, duration: 500},

    {note: "ミ", hz: 329.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "レ", hz: 293.66, duration: 1000},

    {note: "ソ", hz: 392.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ソ", hz: 392.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ファ", hz: 349.23, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ファ", hz: 349.23, duration: 500},
    {note: "", hz: 0, duration: 500},

    {note: "ミ", hz: 329.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "レ", hz: 293.66, duration: 1000},

    {note: "ド", hz: 261.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ド", hz: 261.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ソ", hz: 392.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ソ", hz: 392.00, duration: 500},
    {note: "", hz: 0, duration: 500},

    {note: "ラ", hz: 440.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ラ", hz: 440.00, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ソ", hz: 392.00, duration: 1000},

    {note: "ファ", hz: 349.23, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ファ", hz: 349.23, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "", hz: 0, duration: 500},

    {note: "レ", hz: 293.66, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "", hz: 0, duration: 500},
    {note: "ド", hz: 261.63, duration: 1000},
];

/* チューリップの楽譜を設定する */
const tulip_score = [
    {note: "ド", hz: 261.63, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "ミ", hz: 329.63, duration: 1000},
    {note: "ド", hz: 261.63, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "ミ", hz: 329.63, duration: 1000},

    {note: "ソ", hz: 392.00, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "ド", hz: 261.63, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "レ", hz: 293.66, duration: 1000},

    {note: "ド", hz: 261.63, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "ミ", hz: 329.63, duration: 1000},
    {note: "ド", hz: 261.63, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "ミ", hz: 329.63, duration: 1000},
    {note: "ソ", hz: 392.00, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "ド", hz: 261.63, duration: 500},
    {note: "レ", hz: 293.66, duration: 500},
    {note: "ミ", hz: 329.63, duration: 500},
    {note: "ド", hz: 261.63, duration: 1000},

    {note: "ソ", hz: 392.00, duration: 250},
    {note: "", hz: 0, duration: 250},
    {note: "ソ", hz: 392.00, duration: 250},
    {note: "", hz: 0, duration: 250},
    {note: "ミ", hz: 329.63, duration: 250},
    {note: "", hz: 0, duration: 250},
    {note: "ソ", hz: 392.00, duration: 250},
    {note: "", hz: 0, duration: 250},

    {note: "ラ", hz: 440.00, duration: 250},
    {note: "", hz: 0, duration: 250},
    {note: "ラ", hz: 440.00, duration: 250},
    {note: "", hz: 0, duration: 250},
    {note: "ソ", hz: 392.00, duration: 1000},

    {note: "ミ", hz: 329.63, duration: 250},
    {note: "", hz: 0, duration: 250},
    {note: "ミ", hz: 329.63, duration: 250},
    {note: "", hz: 0, duration: 250},
    {note: "レ", hz: 293.66, duration: 250},
    {note: "", hz: 0, duration: 250},
    {note: "レ", hz: 293.66, duration: 250},
    {note: "", hz: 0, duration: 250},
    {note: "ド", hz: 261.63, duration: 1000},
];

/* 演奏用の関数 */
function play(note, hz, duration){
    audioCtx = new AudioContext();
    let osc = audioCtx.createOscillator();
    osc.frequency.value = parseInt(hz);
    var audioDestination = audioCtx.destination;
    osc.connect(audioDestination);
    timer = setInterval( function() {
        osc.start()
    }, 100);
    display.textContent = note;
    setTimeout(function()  {
        display.textContent = "";
        osc.stop();
        clearInterval(timer)
    }, duration);
    return new Promise(resolve => setTimeout(resolve, duration));
}

/* 自動演奏用の関数 */
async function autoplayButtonClicked() {
    if (!isAutoplaying) { // 自動演奏中でなければ、自動演奏を開始する
        isAutoplaying = true;
        autoplayButton.value = "自動演奏中止";

        let score_array = [];
        if (Math.floor(Math.random() * 2) + 1 == 1) {
            pl_display.textContent = "自動演奏中です：きらきら星";
            score_array = [...kirakiraboshi_score];
        } else {
            pl_display.textContent = "自動演奏中です：チューリップ";
            score_array = [...tulip_score];
        }

        for (let i=0; i < score_array.length; i++){
            const n = score_array[i].note;
            const h = score_array[i].hz;
            const d = score_array[i].duration;
            await play(n,h,d);
            if (!isAutoplaying) { // 自動演奏中でなくなったら演奏を中止する
                break;
            }
        }
        isAutoplaying = false; // 自動演奏が終了したのでフラグをリセットする
        pl_display.textContent = "自動演奏：曲名";
        autoplayButton.value = "自動演奏";
    } else { // 自動演奏中に自動演奏ボタンを押した場合、演奏を中止する
        isAutoplaying = false;
        pl_display.textContent = "自動演奏：曲名";
        autoplayButton.value = "自動演奏";
    }
}

/* 鍵盤による手動演奏用のイベントリスナー */
keys.forEach((key) => {
    key.addEventListener("click", () => {
        if (!isAutoplaying) {
            const n = key.getAttribute("data-note");
            const h = key.getAttribute("data-hz");
            const d = key.getAttribute("data-duration");
            key.style.backgroundColor = "#00ff00";
            key.style.color = "#fff";
            play(n, h, d).then(function(){
                key.style.backgroundColor = "#7fff00";
                key.style.color = "#000"; 
            });
        }
    });
});

/* 自動演奏用のイベントリスナー */
autoplayButton.addEventListener('click', autoplayButtonClicked);
