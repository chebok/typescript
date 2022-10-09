"use strict";
class User {
    addSkill(skillOrList) {
        if (typeof skillOrList === 'string') {
            this.skills.push(skillOrList);
        }
        else {
            this.skills.push(...skillOrList);
        }
    }
}
