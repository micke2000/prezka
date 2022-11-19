export const getAllCitiesFromStudents = (students: IStudent[] | undefined) => {
  if (students) {
    const cities = students.reduce(
      (acc: string[], student) => (acc.includes(student.city) ? acc : acc.concat(student.city)),
      []
    );
    return cities;
  }
  return [];
};
