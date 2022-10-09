class User {
  skills: string[];

  addSkill(skill: string);
  addSkill(listOfSkills: string[]);
  addSkill(skillOrList: string | string[]):void {
    if (typeof skillOrList === 'string') {
      this.skills.push(skillOrList);
    } else {
      this.skills.push(...skillOrList);
    }
  }
}