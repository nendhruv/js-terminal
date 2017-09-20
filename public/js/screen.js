define(['jquery'], function ($) {

    var Screen = function (output) {
    };

    Screen.prototype = {

        init: function (output) {
            this.output = output;
        },

        outputToTerminal: function (type, contents) {
            console.log(type, contents)
            this.output.append('<p class="' + type +'">' + contents + '</p>');
        },

        stdout: function (output) {
            this.outputToTerminal('terminal__output', output);
        },

        stderr: function (output) {
            this.outputToTerminal('terminal__error', output);
        },

        prompt: function (cmd) {
            if (cmd) {
                var command = cmd.split(' ');
                switch(command[1]) {
                    case "about":
                    var directory = command[1];
                    break;
                    case "blog":
                    var directory = command[1];
                    break;
                    default:
                    var directory = "";
                }
                var prompt = '<font color="white">guest</font> in <font color="white">/'+directory+'</font>';
                this.outputToTerminal('terminal__prompt', prompt);
                this.scrollToCursor();
            }

        },

        scrollToCursor: function () {
            var output = this.output[0];
            // need to setTimeout to allow time for the dom appending elements
            setTimeout(function () {
                output.scrollTop = output.scrollHeight;
            }, 1);
        },

        setHeight: function (height) {
            this.output.css('max-height', height);
        },

        clear: function (args) {
            console.log(args)
            if (args === ''){
                this.output.html('');
            }
            else {
                this.myPage(args);
            }
        },

        myPage: function (page){
            switch(page) {
                case "about":
                    this.output.html('type "cd ../" and press return to go back');
                    break;
                case "contact":
                    this.output.html('contact');
                    break;
                default:
                    this.output.html('You are looking for something you should not!');
            }
        }
    };

    return new Screen();
});
