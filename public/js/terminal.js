define(['jquery', 'js/command_processor', 'js/screen'], function ($, command, screen) {

    var Terminal = function () {

    };

    Terminal.prototype = {

        init: function (opts) {
            this.container = $(opts.container);
            this.form  = $(opts.form);
            this.input = $(opts.input);
            this.output = $(opts.output);
            screen.init(this.output);
            command.init(this.output, this.input);
            this.setSizeAndFocusCursor();
            this.listenForEvents();
            this.welcome();
        },

        setSizeAndFocusCursor: function () {
            var windowHeight = $(window).height(),
                maxHeight = (windowHeight - this.input.height() - 50) + 'px';

            this.container.height(windowHeight);
            screen.setHeight(maxHeight);
            this.input.focus();
        },

        listenForEvents: function () {

            var terminal = this;

            this.container.on('click', function () {
                terminal.input.focus();
            });

            this.form.on('submit', function (e) {
                terminal.processCommand();
                e.preventDefault();
                return false;
            });
        },

        processCommand: function () {
            var cmd = command.clean(this.input.val());
            console.log(cmd)
            this.input.val('');
            screen.stdout('$ ' + cmd);
            command.process(cmd, function () {
                screen.prompt(cmd);
            });
        },

        welcome: function () {
            screen.stdout("Dhruv Nenwani's terminal.");
            screen.stdout("Try typing `help` into the terminal, then hit Return");
            screen.stdout(".....................................................");
            screen.prompt();
        }
    };

    return new Terminal();
});
