import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from 'Static_values';

@Component({
  selector: 'app-prescribe-medication',
  templateUrl: './prescribe-medication.component.html',
  styleUrls: ['./prescribe-medication.component.css']
})
export class PrescribeMedicationComponent implements OnInit {
  appointments: any[] = [];
  showPopup = false;
  prescribedMedicine = '';
  medichine: any[] = [];
  user = JSON.parse(localStorage.getItem('User-login-uok-pms') || '{}');
  popup_appointment_id: number = 0;

  allMedicines: string[] = [
    'Aspirin',
    'Ibuprofen',
    'Acetaminophen',
    'Diphenhydramine',
    'Amoxicillin',
    'Ciprofloxacin',
    'Doxycycline',
    'Metformin',
    'Atorvastatin',
    'Lisinopril',
    'Amlodipine',
    'Metoprolol',
    'Omeprazole',
    'Simvastatin',
    'Losartan',
    'Levothyroxine',
    'Hydrochlorothiazide',
    'Albuterol',
    'Gabapentin',
    'Sertraline',
    'Furosemide',
    'Cetirizine',
    'Prednisone',
    'Zolpidem',
    'Citalopram',
    'Trazodone',
    'Clonazepam',
    'Tramadol',
    'Oxycodone',
    'Naproxen',
    'Azithromycin',
    'Clarithromycin',
    'Fluconazole',
    'Lorazepam',
    'Bupropion',
    'Sildenafil',
    'Pantoprazole',
    'Ranitidine',
    'Montelukast',
    'Rosuvastatin',
    'Duloxetine',
    'Paroxetine',
    'Venlafaxine',
    'Escitalopram',
    'Lamotrigine',
    'Quetiapine',
    'Aripiprazole',
    'Risperidone',
    'Olanzapine',
    'Hydrocodone',
    'Gabapentin',
    'Dexamethasone',
    'Clopidogrel',
    'Warfarin',
    'Insulin Glargine',
    'Insulin Aspart',
    'Metronidazole',
    'Dicyclomine',
    'Ondansetron',
    'Methotrexate',
    'Cyclobenzaprine',
    'Duloxetine',
    'Amitriptyline',
    'Propranolol',
    'Alprazolam',
    'Diazepam',
    'Esomeprazole',
    'Famotidine',
    'Tamsulosin',
    'Finasteride',
    'Spironolactone',
    'Carvedilol',
    'Enalapril',
    'Nifedipine',
    'Verapamil',
    'Diltiazem',
    'Labetalol',
    'Fluticasone',
    'Budesonide',
    'Formoterol',
    'Salmeterol',
    'Ipratropium',
    'Tiotropium',
    'Mometasone',
    'Beclomethasone',
    'Prednisolone',
    'Methotrexate',
    'Hydroxychloroquine',
    'Sulfasalazine',
    'Adalimumab',
    'Etanercept',
    'Infliximab',
    'Golimumab',
    'Certolizumab',
    'Abatacept',
    'Rituximab',
    'Tofacitinib',
    'Baricitinib',
    'Ustekinumab',
    'Secukinumab',
    'Ixekizumab',
    'Apremilast',
    'Omalizumab',
    'Mepolizumab',
    'Dupilumab',
    'Blood report',
    'Urine report',
    'X-ray report',
    'CT Scan report',
    'MRI report',
    'ECG report',
    'Ultrasound report',
    'Endoscopy report',
    'Colonoscopy report',
    'Biopsy report'
  ];

  filteredMedicines: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  // Filter medicines based on user input
  filterMedicines(event: any): void {
    const query = event.target.value.toLowerCase();
    if (query) {
      this.filteredMedicines = this.allMedicines.filter(medicine =>
        medicine.toLowerCase().includes(query)
      );
    } else {
      this.filteredMedicines = [...this.allMedicines]; // Show all if the query is empty
    }
  }

  // Show all medicines when the input field is focused
  showAllMedicines(): void {
    this.filteredMedicines = [...this.allMedicines];
  }

  // Hide suggestions when the input field is not in focus
  hideSuggestions(): void {
    setTimeout(() => this.filteredMedicines = [], 200); // Small delay to allow click event on suggestion
  }

  openPopup(id: number): void {
    // get medichine for the appointment
    this.http.get(`${settings.APIURL}/doctor/get-medichine/${id}`, { withCredentials: true }).subscribe({
      next: (medichine: any) => {
        if (medichine == null) {
          this.medichine = [];
        } else {
          this.medichine = medichine;
        }
      },
      error: (error) => {
        console.error('Error fetching medichine:', error);
        alert('There was an error fetching medichine. Please try again later.');
      }
    });
    this.popup_appointment_id = id;
    this.showPopup = true;
  }

  closePopup(): void {
    this.popup_appointment_id = 0;
    this.showPopup = false;
  }

  loadAppointments(): void {
    this.fetchAppointmentsForDoctor().subscribe({
      next: (appointments) => this.appointments = appointments,
      error: (error) => {
        console.error('Error fetching appointments:', error);
        alert('There was an error fetching appointments. Please try again later.');
      }
    });
  }

  fetchAppointmentsForDoctor() {
    const doctorId = this.user.ID;
    return this.http.get<any[]>(`${settings.APIURL}/doctor/Accept_appointments/${doctorId}`, { withCredentials: true });
  }

  rejectAppointment(appointmentId: number): void {
    if (confirm('Are you sure you want to reject this appointment?')) {
      this.http.delete(`${settings.APIURL}/doctor/delete-appointment/${appointmentId}`, { withCredentials: true }).subscribe({
        next: () => this.loadAppointments(),
        error: (error) => {
          console.error('Error rejecting appointment:', error);
          alert('There was an error rejecting the appointment. Please try again later.');
        }
      });
    }
  }

  prescribeMedicine(): void {
    console.log(this.prescribedMedicine);
    console.log(this.medichine);

    if (this.prescribedMedicine != '' && this.medichine.includes(this.prescribedMedicine) == false) {
      this.medichine.push(this.prescribedMedicine);
      this.prescribedMedicine = '';
    } else {
      alert('Please enter a valid medicine name');
    }
  }

  deletmedi(_t38: string) {
    // delete element from array by value
    const index = this.medichine.indexOf(_t38);
    if (index > -1) {
      this.medichine.splice(index, 1);
    }
  }

  Prescribe() {
    if (this.medichine.length != 0) {
      this.http.post(`${settings.APIURL}/doctor/set-medichine`, { id: this.popup_appointment_id, medichine: JSON.stringify(this.medichine) }, { withCredentials: true }).subscribe({
        error: (error) => {
          console.error('Error prescribing medicine:', error);
          alert('There was an error prescribing medicine. Please try again later.');
        }
      });
      this.medichine = [];
      alert('Medicine prescribed successfully ');
      this.closePopup();
    } else {
      alert('Please add some medicine to prescribe');
    }
  }

  Finesh(appointmentId: Number) {
    if (confirm('Are you sure you want to Finesh this appointment?')) {
      this.http.post(`${settings.APIURL}/doctor/finish-appointment`, { appointmentId }, { withCredentials: true }).subscribe({
        next: () => this.loadAppointments(),
        error: (error) => {
          console.error('Error accepting appointment:', error);
          alert('There was an error accepting the appointment. Please try again later.');
        }
      });
    }
  }
}