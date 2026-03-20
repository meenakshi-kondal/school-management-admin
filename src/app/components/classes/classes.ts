import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '../../sharedComponents/form/form';
import { Button } from '../../sharedComponents/button/button';
import { ApiService } from '../../services/api.service';
import { FORM, BUTTONDATA } from '../../interfaces/common';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [Form, Button, CommonModule],
  templateUrl: './classes.html',
  styleUrl: './classes.scss'
})
export class Classes implements OnInit {
  @ViewChild(Form) classForm!: Form;
  isFormVisible = false;

  addClassButton: BUTTONDATA = {
    value: 'Add Class',
    type: 'primary',
    icon: '<i class="fa-solid fa-plus me-2"></i>'
  };

  backListButton: BUTTONDATA = {
    value: 'Back to List',
    type: 'secondary',
    icon: '<i class="fa-solid fa-arrow-left me-2"></i>'
  };

  classFormConfig: FORM = {
    title: 'Add New Class',
    sections: [
      {
        sectionTitle: 'Class Information',
        fields: [
          { key: 'className', label: 'Class Name', type: 'text', required: true, colSpan: 2, placeholder: 'e.g. Standard 01' },
          { key: 'subjects', label: 'Subjects (comma separated)', type: 'text', required: true, colSpan: 2, placeholder: 'e.g. Maths, Science, English' },
        ]
      }
    ],
    submitButton: {
      value: 'Save Class',
      type: 'primary',
      icon: '<i class="fa-solid fa-save me-2"></i>'
    }
  };

  class_info: any[] = [];

  constructor(
    private apiService: ApiService,
    private notify: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.fetchClasses();
  }

  fetchClasses() {
      this.notify.success('welcom');
    this.apiService.getClasses().subscribe({
      next: (res) => {
        const data = res?.data || (Array.isArray(res) ? res : []);
        this.class_info = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.notify.error('Failed to load classes');
        console.error('Fetch error:', err);
      }
    });
  }

  onViewDetails(item: any) {
    this.selectedClassData = item;
    this.classFormConfig = {
      ...this.classFormConfig,
      title: 'Class Details: ' + item.class_name,
      sections: [
        {
          sectionTitle: 'Class Information',
          fields: [
            { key: 'className', label: 'Class Name', type: 'text', required: true, colSpan: 2, value: item.class_name },
            { key: 'subjects', label: 'Subjects (comma separated)', type: 'text', required: true, colSpan: 2, value: (item.subjects || []).join(', ') },
          ]
        }
      ],
      submitButton: {
        value: 'Update Class',
        type: 'primary',
        icon: '<i class="fa-solid fa-save me-2"></i>'
      }
    };
    this.isFormVisible = true;
  }

  showForm(event: any) {
    if (event.value === 'Back to List') {
      this.isFormVisible = false;
      this.selectedClassData = null;
    } else {
      this.selectedClassData = null;
      this.classFormConfig = {
        ...this.classFormConfig,
        title: 'Add New Class'
      };
      if (this.classForm) this.classForm.resetForm();
      this.isFormVisible = true;
    }
  }

  onFormSubmit(data: any) {

    if (!data.className || !data.subjects) {
      this.notify.error('Please fill all required fields');
      return;
    }

    const subjectsArray = data.subjects
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s !== '');

    const uniqueSubjects = Array.from(new Set(subjectsArray));

    const payload = {
      class_name: data.className,
      subjects: uniqueSubjects
    };

    if (this.selectedClassData?._id) {
      this.apiService.updateClass(this.selectedClassData._id, payload).subscribe({
        next: (res) => {
          this.notify.success('Class updated successfully!');
          this.fetchClasses();
          this.isFormVisible = false;
          this.selectedClassData = null;
          if (this.classForm) this.classForm.resetForm();
        },
        error: (err) => {
          console.error('Error updating class:', err);
          this.notify.error(err.error?.message || 'Failed to update class');
        }
      });
      return;
    }

    this.apiService.addClass(payload).subscribe({
      next: (res) => {
        this.notify.success('Class created successfully!');
        this.fetchClasses();
        this.isFormVisible = false;
        this.class_info = [...this.class_info];
        if (this.classForm) this.classForm.resetForm();
      },
      error: (err) => {
        this.notify.error(err.error?.message || 'Failed to add class');
      }
    });
  }

  selectedClassData: any = null;

  public getCardColor(index: number) {
    const cardColor = [
      '#3e3eb5f2',
      '#cf4242',
      '#e1b44b',
      '#075A6D',
      '#F17404',
      '#695845',
    ];
    return cardColor[index % cardColor.length];
  }
}
