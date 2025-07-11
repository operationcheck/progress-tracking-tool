export interface ReportDetail {
  number: number;
  progress: number;
  score: number | null;
  expiration: string;
}

export interface Report {
  count: number;
  allCount: number;
}

export interface Schooling {
  attendanceCount: number;
  entryCount: number;
  necessaryCount: number;
}

export interface Test {
  examStatus: number;
  periodicExamResult: number | null;
  makeupExamUrl: string | null;
}

export interface Acquired {
  acquisitionStatus: number;
  academicCredit: number;
  approvedCredit: number;
  evaluation: string | null;
  criterionReferencedEvaluation: string | null;
}

export interface Course {
  curriculumCode: string;
  curriculumName: string;
  subjectCode: string;
  subjectName: string;
  subjectStatus: number;
  previousRegistration: boolean;
  report: Report;
  reportDetails: ReportDetail[];
  schooling: Schooling;
  test: Test;
  acquired: Acquired;
}

export interface TermYear {
  termYear: number;
  grade: string;
  term: number;
  subjectStatus: number;
  entryAvailability: boolean;
  entryStatus: number;
  testDetailDestinationUrl: string | null;
  courses: Course[];
}

export interface PreviousRegistration {
  previousRegistrationAcademicCredit: number;
  previousRegistrationCredit: number;
}

export interface EducationData {
  educationProcessName: string;
  previousRegistration: PreviousRegistration;
  termYears: TermYear[];
}

export interface ApiResponse {
  result: {
    data: EducationData;
  };
}

export interface MonthlyProgress {
  month: number;
  year: number;
  progress: number;
  score: number | null;
  reportNumber: number;
  expiration: string;
}

export interface SubjectProgress {
  subjectName: string;
  curriculumName: string;
  progress: number;
  completedReports: number;
  totalReports: number;
  averageScore: number | null;
  monthlyProgress: MonthlyProgress[];
}

export interface CurriculumProgress {
  curriculumName: string;
  subjects: SubjectProgress[];
  overallProgress: number;
  totalSubjects: number;
  completedSubjects: number;
}

export interface GradeProgress {
  grade: string;
  curriculums: CurriculumProgress[];
  overallProgress: number;
  totalSubjects: number;
  completedSubjects: number;
}
