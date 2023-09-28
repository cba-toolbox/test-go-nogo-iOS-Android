/* 課題に関するコードを以下に書く */

const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
        "<p style='text-align:left;font-size:20pt'>これはテスト課題です。</p>" +
        "<p style='text-align:left;font-size:20pt'>画面に数字が提示されますので，２がでてきたら，[Go]ボタンを押してください。</p>" +
        "<p style='text-align:left;font-size:20pt'>キーボードのキーをどれか押すと課題が始まります。準備ができたら始めてください。</p>",
    // post_trial_gap: 1000
    choices: ['はじめる'],
    prompt: ""
};

/*課題*/
var stimuli = [
    { number: "<p style='font-size:40pt'>1</p>", data:{target: "0"}},
    { number: "<p style='font-size:40pt'>2</p>", data:{target: "1"}},
    { number: "<p style='font-size:40pt'>3</p>", data:{target: "0"}},
    { number: "<p style='font-size:40pt'>4</p>", data:{target: "0"}},
    { number: "<p style='font-size:40pt'>5</p>", data:{target: "0"}},
    { number: "<p style='font-size:40pt'>6</p>", data:{target: "0"}},
    { number: "<p style='font-size:40pt'>7</p>", data:{target: "0"}},
    { number: "<p style='font-size:40pt'>8</p>", data:{target: "0"}},
    { number: "<p style='font-size:40pt'>9</p>", data:{target: "0"}},
];

const choice = {
    timeline:[{
        type: jsPsychHtmlButtonResponse,
        stimulus: jsPsych.timelineVariable("number"),
        choices: ['Go'],
        trial_duration: 800,
        prompt: '2が出たら[Go]を押す',
        data: jsPsych.timelineVariable('data'),
        on_finish: function(data){
            var correct = 0;
            var false_alarm = 0;
            if(data.response == 0 && data.target == '1'){
                console.log("Corerct")
                correct = 1;
            } else if (data.response == 0 && data.target == '0'){
                console.log("False alarm")
                false_alarm = 1;
            } else if (data.response == null) {
                console.log("NoGo")
            } else {
                console.log("Unexpected Response.")
            }
            data.correct = correct;
            data.false_alarm = false_alarm;
        },
        post_trial_gap: function() {
            return Math.floor(Math.random() * 1500) + 500;
        }
    }],
    timeline_variables: stimuli,
    sample: {type: 'fixed-repetitions',size: 1}
};

/*デブリーフィング*/
var debrief = {
    type: jsPsychHtmlButtonResponse,
    // type: "html-keyboard-response",
    stimulus: function() {
        var correct_rate = Math.round(jsPsych.data.get().filter({correct: 1}).count() / 1 * 100);
        var false_alarm_rate = Math.round(jsPsych.data.get().filter({false_alarm: 1}).count() / 8 * 100);
        return "<p>あなたの正答率は，<strong>"+correct_rate+"%</strong>でした。</p> " +
            "<p>そして，お手つき率(間違って[Go]ボタンを押した確率)は，<strong>"+false_alarm_rate+"%</strong>でした。</p> ";
    },
    choices: "",
    prompt: "",
    trial_duration: 7000
};

/*タイムラインの設定*/
const timeline = [instructions, choice, debrief];
