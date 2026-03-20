export interface INPUTDETAILS {
  label: string;
  type: string;
  maxLength: number;
  value?: string;
  required?: boolean;
}

export interface BUTTONDATA {
  value: string;
  type: string;
  icon?: string
}

interface FILTER {
  label: string,
  type: string,
  placeholder: string,
  maxLength: number
}

export interface TABLE {
  title?: string;
  filters?: FILTER[];
  button?: BUTTONDATA;
  column: {
    key: string;
    name: string;
  }[];
  path: string;
  dataSource?: any[];
  pagination?: boolean;
  action?: {
    name: string
  }[]
}

export interface FORMFIELD {
  key: string;
  label: string;
  type: string;
  options?: any[]; // For select, radio, etc.
  placeholder?: string;
  required?: boolean;
  value?: any;
  colSpan?: number; // For grid layout (1, 2, 3, or 4)
}

export interface FORM {
  title?: string;
  sections: {
    sectionTitle?: string;
    fields: FORMFIELD[];
  }[];
  submitButton?: BUTTONDATA;
}

export interface ROUTINEROW {
  class_name: string;
  teacher_name: string;
  teacher_img: string;
  time_table: {
    [key: string]: string;

  }
}
