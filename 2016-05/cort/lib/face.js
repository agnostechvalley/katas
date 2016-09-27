'use strict';

module.exports = class Face {

    constructor(code) {

        this.code = code;
        switch (code) {
            case ('2'): {
                this.name = 'Two';
                this.value = parseInt(code);
                break;
            }
            case ('3'): {
                this.name = 'Three';
                this.value = parseInt(code);
                break;
            }
            case ('4'): {
                this.name = 'Four';
                this.value = parseInt(code);
                break;
            }
            case ('5'): {
                this.name = 'Five';
                this.value = parseInt(code);
                break;
            }
            case ('6'): {
                this.name = 'Six';
                this.value = parseInt(code);
                break;
            }
            case ('7'): {
                this.name = 'Seven';
                this.value = parseInt(code);
                break;
            }
            case ('8'): {
                this.name = 'Eight';
                this.value = parseInt(code);
                break;
            }
            case ('9'): {
                this.name = 'Nine';
                this.value = parseInt(code);
                break;
            }
            case ('10'): {
                this.name = 'Ten';
                this.value = parseInt(code);
                break;
            }
            case ('J'): {
                this.name = 'Jack';
                this.value = 11;
                break;
            }
            case ('Q'): {
                this.name = 'Queen';
                this.value = 12;
                break;
            }
            case ('K'): {
                this.name = 'King';
                this.value = 13;
                break;
            }
            case ('A'): {
                this.name = 'Ace';
                this.value = 14;
                break;
            }
        }
    };

    getCode() {

        return this.code;
    };

    getName() {

        return this.name;
    };

    getValue() {

        return this.value;
    };
};

