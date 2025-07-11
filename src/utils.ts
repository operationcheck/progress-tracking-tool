import type { Course, TermYear, SubjectProgress, CurriculumProgress, GradeProgress } from './types';

export const calculateSubjectProgress = (course: Course): SubjectProgress => {
  const { reportDetails } = course;
  const completedReports = reportDetails.filter(report => report.progress === 100).length;
  const totalReports = reportDetails.length;
  const progress = totalReports > 0 ? (completedReports / totalReports) * 100 : 0;
  
  const scoresWithValues = reportDetails.filter(report => report.score !== null).map(report => report.score!);
  const averageScore = scoresWithValues.length > 0 
    ? scoresWithValues.reduce((sum, score) => sum + score, 0) / scoresWithValues.length 
    : null;

  // Calculate monthly progress from report details
  const monthlyProgress = reportDetails.map(report => {
    const date = new Date(report.expiration);
    return {
      month: date.getMonth() + 1, // Convert to 1-12
      year: date.getFullYear(),
      progress: report.progress,
      score: report.score,
      reportNumber: report.number,
      expiration: report.expiration
    };
  }).sort((a, b) => {
    // Sort by year then month
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  return {
    subjectName: course.subjectName,
    curriculumName: course.curriculumName,
    progress: Math.round(progress),
    completedReports,
    totalReports,
    averageScore: averageScore ? Math.round(averageScore) : null,
    monthlyProgress
  };
};

export const calculateCurriculumProgress = (courses: Course[]): CurriculumProgress[] => {
  const curriculumMap = new Map<string, Course[]>();
  
  courses.forEach(course => {
    if (!curriculumMap.has(course.curriculumName)) {
      curriculumMap.set(course.curriculumName, []);
    }
    curriculumMap.get(course.curriculumName)!.push(course);
  });

  return Array.from(curriculumMap.entries()).map(([curriculumName, curriculumCourses]) => {
    const subjects = curriculumCourses.map(calculateSubjectProgress);
    const totalSubjects = subjects.length;
    const completedSubjects = subjects.filter(subject => subject.progress === 100).length;
    const overallProgress = subjects.length > 0 
      ? Math.round(subjects.reduce((sum, subject) => sum + subject.progress, 0) / subjects.length)
      : 0;

    return {
      curriculumName,
      subjects,
      overallProgress,
      totalSubjects,
      completedSubjects
    };
  });
};

export const calculateGradeProgress = (termYear: TermYear): GradeProgress => {
  const curriculums = calculateCurriculumProgress(termYear.courses);
  const totalSubjects = curriculums.reduce((sum, curriculum) => sum + curriculum.totalSubjects, 0);
  const completedSubjects = curriculums.reduce((sum, curriculum) => sum + curriculum.completedSubjects, 0);
  const overallProgress = curriculums.length > 0 
    ? Math.round(curriculums.reduce((sum, curriculum) => sum + curriculum.overallProgress, 0) / curriculums.length)
    : 0;

  return {
    grade: termYear.grade,
    curriculums,
    overallProgress,
    totalSubjects,
    completedSubjects
  };
};

export const getGradeDisplayName = (grade: string): string => {
  switch (grade) {
    case '1年次':
      return '1st Year';
    case '2年次':
      return '2nd Year';
    case '3年次':
      return '3rd Year';
    default:
      return grade;
  }
};

export const getProgressColor = (progress: number): string => {
  if (progress >= 90) return 'bg-green-500';
  if (progress >= 70) return 'bg-blue-500';
  if (progress >= 50) return 'bg-yellow-500';
  if (progress >= 30) return 'bg-orange-500';
  return 'bg-red-500';
};

export const getProgressTextColor = (progress: number): string => {
  if (progress >= 90) return 'text-green-700';
  if (progress >= 70) return 'text-blue-700';
  if (progress >= 50) return 'text-yellow-700';
  if (progress >= 30) return 'text-orange-700';
  return 'text-red-700';
};