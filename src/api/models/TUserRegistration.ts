/* istanbul ignore file */
/* eslint-disable */

export type TUserRegistration = {
  email: string
  first_name: string
  last_name: string
  level: TUserRegistration.level
  direction: TUserRegistration.direction
  experience: TUserRegistration.experience
  password: string
}

export namespace TUserRegistration {
  export enum level {
    TRAINEE = 'Trainee',
    JUNIOR = 'Junior',
    MIDDLE = 'Middle',
    SENIOR = 'Senior',
    TECH_ARCHITECTOR = 'Tech architector',
  }

  export enum direction {
    FRONTEND = 'Frontend',
    BACKEND = 'Backend',
  }

  export enum experience {
    NO_EXPERIENCE = 'No experience',
    LESS_THAN_1_YEAR = 'Less than 1 year',
    _1_3_YEARS = '1-3 years',
    MORE_THAN_3_YEARS = 'More than 3 years',
  }
}
