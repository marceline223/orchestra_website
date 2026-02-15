export type EducationDegree = {
  key: string,
  name: string
}

const educationDegrees: EducationDegree[] = [
  {
    key: 'BACHELOR',
    name: 'Бакалавриат',
  },
  {
    key: 'SPECIALITY',
    name: 'Специалитет',
  },
  {
    key: 'MASTER',
    name: 'Магистратура',
  },
  {
    key: 'POSTGRADUATE',
    name: 'Аспирантура',
  },
  {
    key: 'SCHOOL',
    name: 'Среднее общее образование',
  },
  {
    key: 'COLLEGE',
    name: 'Среднее профессиональное образование',
  },
];

export {educationDegrees}
