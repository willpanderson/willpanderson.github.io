import { InfoField } from '../../models/infoField.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AboutService {
  private works: InfoField[] = [
    new InfoField('Stock Associate', 'Hollister Co.', 'June 2017 - January 2019', 'https://www.hollisterco.com/shop/us'),
    new InfoField('Seasonal Store Associate', 'Lowes', 'May 2018 - July 2018', 'https://www.lowes.com'),
    new InfoField('Dishwasher', 'Grimaldis Coal Brick Oven Pizzeria', 'January 2018 - March. 2018', 'https://www.grimaldis.com')
    
  ];

  private education: InfoField[] = [
    new InfoField(
      'Bachelors of Science in Software Engineering',
      'The University of Texas at Arlington',
      'August 2018 - August 2022',
      'https://www.uta.edu/academics/schools-colleges/engineering/academics/undergraduate/software-major'
    ),
    new InfoField(
      'High School Diploma',
      'Lawrence E. Elkins High School',
      'August 2014 - May 2018',
      'https://www.fortbendisd.com/ehs'
    )
    
  ];

  private languages: InfoField[] = [
    new InfoField('English', 'Bilingual or native competence', ' ', ' '),
    new InfoField('Spanish', 'Elementary competence', ' ', ' ')
  ];

  getEducation(): InfoField[] {
    return this.education;
  }

  getWorks(): InfoField[] {
    return this.works;
  }

  getLanguages(): InfoField[] {
    return this.languages;
  }
}
