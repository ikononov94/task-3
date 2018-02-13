    function upgrade() {
        alert('Please use Google Chrome for best experience');
    }

    window.onload = function() {

        if (!(window.webkitSpeechRecognition) && !(window.speechRecognition)) {
            upgrade();
        } else {

            let recognizing;

            let speech = new webkitSpeechRecognition() || speechRecognition();

            speech.continuous = true;
            speech.interimResults = true;
            speech.lang = 'ru-RU';

            document.onkeydown = function(event) {
                if(event.keyCode == "17") {
                    if(!recognizing) {
                        reset();
                        speech.start();
                    }
                }
            };

            document.onkeyup = function(event) {
                if(event.keyCode == "17") {
                    if(recognizing) {
                        reset();
                        speech.stop();
                    }
                }
            };

            function reset() {
                entryField.value = '';
                recognizing = false;
            }

            speech.onstart = function() {
                recognizing = true;
                console.log('start');
            };

            speech.onresult = function(event) {
                let final_transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {

                    event.results[i].isFinal ? final_transcript += event.results[i][0].transcript : '';

                }

                if(final_transcript.endsWith('.')) {
                    let arrayFinalTranscript = final_transcript.split('');
                    final_transcript = arrayFinalTranscript.slice(0, final_transcript.length - 2).join('');
                }

                entryField.value = final_transcript.trim();
            };

            speech.onerror = function(event) {
                console.error(event.error);
            };

            speech.onend = function() {
                checkInputFieldValue(entryField.value.toLowerCase());
                console.log('end');
            };
        }
    };
