type OrmModel = {
  ID: string;
  CreatedAt: Date;
};

declare interface UserInterface {
  ID?: number;
  name: string;
  phone: number;
}
declare interface Categories {
  ID?: number;
  title: string;
}

declare type CvModel = {
  title: string;
  owner?: string;
  cvLanguage: string;
} & OrmModel;

declare type PersonalDetailsType = {
  fullName: string;
  phone: string;
  jobTitle?: string;
  email?: string;
  country?: string;
  city?: string;
  bio?: string;
  cv_id: string;
} & OrmModel;

declare type Educations = {
  title: string;
  collage: string;
  start: string;
  end: string;
  cv_id: string;
} & OrmModel;

declare type Works = {
  title: string;
  company: string;
  start: string;
  end: string;
  description: string;
  cv_id: string;
} & OrmModel;

declare type Skills = {
  title: string;
  description: string;
  cv_id: string;
} & OrmModel;

declare type Courses = {
  title: string;
  company: string;
  start: string;
  end: string;
  description: string;
  cv_id: string;
} & OrmModel;
