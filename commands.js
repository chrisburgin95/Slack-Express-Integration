/*jshint esnext: true */
(function () {
    "use strict";

    // Requirements
    const request = require('request');
    const data = require('./data.js');

    // Slack API Entry Point
    const url = 'https://hooks.slack.com/services/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';


    // Database Functions
    const Commands = (function () {

        // Help
        // declare -- cmd
        let help = function(cmd) {
            return 'help command';
        };

        // Add
        // declare -- cmd -- name -- url -- category
        let add = function(cmd) {
            if (data.uniquename(cmd[2])) {
                let meme = { "id" : data.nextid(),
                             "url" : cmd[3],
                             "name" : cmd[2],
                             "category" : cmd[4] };
                data.save(meme);
                return "We added your meme!";
            } else {
                return "Error: Please Provide A Unique Name";
            }
        };

        // Remove
        // declare -- cmd -- name
        let remove = function(cmd) {
            let object = data.fetchdata();
            for (let i = 0; i < object.length; i++) {
                if (cmd[2] === object[i].name) {
                    object.splice(i , 1);
                    break;
                }
            }
            data.save(object, true);
        };

        // Random
        // declare -- cmd -- *category*
        let random = function(cmd) {
            let object = data.fetchdata();
            let length = object.length;
            let rand = Math.floor(Math.random() * length, + 1);
            return object[rand].url;
        };

        // FetchMeme
        let fetchmeme = function(cmd) {
            let object = data.fetchdata();
            for (let i = 0; i < object.length; i++) {
                if (cmd[1] === object[i].name) {
                    return object[i].url;
                }
            }
            return 'Error: No meme by the name ' + cmd[1];
        };

        return { help, add, remove, random, fetchmeme, };
    }());
    module.exports = Commands;
}());