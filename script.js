document.addEventListener("DOMContentLoaded", function () {
    var player = document.getElementById("my-video");
    var playPauseBtn = document.getElementById("play-pause-btn");
    var seekBar = document.getElementById("seek-bar");
    var volumeBar = document.getElementById("volume-bar");
    var lyricsContainer = document.getElementById("lyrics");

    // 歌詞データ
    var lyricsData = [
        { time: 0, text: "ベニテングタケ、森のエリート" },
        { time: 3, text: "赤い傘広げて、毒も強力" },
        { time: 5, text: "誰もが恐れる、その美しさ" },
        { time: 7, text: "ファンタジーとリアルの間の深さ" },
        { time: 10, text: "森の中、俺は孤高の存在" },
        { time: 13, text: "踏み入れたら最後、夢見る状態" },
        { time: 15, text: "見た目は派手でも、触れるな危険" },
        { time: 18, text: "でもその魅力、引き寄せる人間" },
        { time: 25, text: "Amanita flow 毒と美の調和" },
        { time: 28, text: "見つめるだけで心は不安定だ" },
        { time: 30, text: "Amanita flow, 誰もが見とれる" },
        { time: 32, text: "でも近づくなよ、その先は知れぬ" }
    ];

    // 歌詞をHTMLに追加
    lyricsData.forEach((line) => {
        var div = document.createElement("div");
        div.classList.add("lyrics-line");
        div.dataset.time = line.time;
        div.textContent = line.text;

        // 歌詞クリックで該当時間にジャンプ
        div.addEventListener("click", function () {
            player.currentTime = line.time;
            updateLyrics();
        });

        lyricsContainer.appendChild(div);
    });

    // 再生・一時停止ボタン
    playPauseBtn.addEventListener("click", function () {
        if (player.paused) {
            player.play();
            playPauseBtn.textContent = "⏸";
        } else {
            player.pause();
            playPauseBtn.textContent = "▶️";
        }
    });

    // シークバー
    player.addEventListener("loadedmetadata", function () {
        seekBar.max = player.duration;
    });

    player.addEventListener("timeupdate", function () {
        seekBar.value = player.currentTime;
        updateLyrics();
    });

    seekBar.addEventListener("input", function () {
        player.currentTime = seekBar.value;
    });

    // 音量調整
    volumeBar.addEventListener("input", function () {
        player.volume = volumeBar.value;
    });

    // 歌詞のハイライト＆自動スクロール
    function updateLyrics() {
        var currentTime = player.currentTime;
        var lyricsLines = document.querySelectorAll(".lyrics-line");
        var activeLine = null;

        lyricsLines.forEach((line) => {
            var time = parseFloat(line.dataset.time);
            if (currentTime >= time) {
                document.querySelectorAll(".lyrics-line").forEach(l => l.classList.remove("lyrics-active"));
                line.classList.add("lyrics-active");
                activeLine = line;
            }
        });

        if (activeLine) {
            activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
});
